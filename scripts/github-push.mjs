/**
 * Pushes the Replit monorepo to GitHub via REST API (no git push required).
 * Usage: node scripts/github-push.mjs
 */
import https from 'https';
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const TOKEN = process.env.GITHUB_PERSONAL_ACCESS_TOKEN;
const OWNER = 'hamdanaffiliatepilot-786';
const REPO  = 'affiliatepilot-frontend';
const BRANCH = 'main';
const WORKSPACE = '/home/runner/workspace';

if (!TOKEN) {
  console.error('ERROR: GITHUB_PERSONAL_ACCESS_TOKEN not set');
  process.exit(1);
}

// ── helpers ──────────────────────────────────────────────────────────────────

function apiRequest(method, apiPath, body) {
  return new Promise((resolve, reject) => {
    const data = body ? JSON.stringify(body) : null;
    const opts = {
      hostname: 'api.github.com',
      path: apiPath,
      method,
      headers: {
        Authorization: `token ${TOKEN}`,
        'User-Agent': 'PilotStaff-Replit-Push',
        Accept: 'application/vnd.github+json',
        'Content-Type': 'application/json',
        ...(data ? { 'Content-Length': Buffer.byteLength(data) } : {}),
      },
    };
    const req = https.request(opts, res => {
      let raw = '';
      res.on('data', c => (raw += c));
      res.on('end', () => {
        try {
          const json = JSON.parse(raw);
          if (res.statusCode >= 400) {
            reject(new Error(`GitHub API ${res.statusCode}: ${json.message || raw}`));
          } else {
            resolve(json);
          }
        } catch {
          reject(new Error(`Non-JSON response (${res.statusCode}): ${raw.slice(0, 200)}`));
        }
      });
    });
    req.on('error', reject);
    if (data) req.write(data);
    req.end();
  });
}

async function createBlob(contentB64) {
  const r = await apiRequest('POST', `/repos/${OWNER}/${REPO}/git/blobs`, {
    content: contentB64,
    encoding: 'base64',
  });
  return r.sha;
}

// ── main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log('Fetching file list from git...');
  // git ls-files is read-only – no lock files created
  const lsOut = execSync('git ls-files --full-name', { cwd: WORKSPACE }).toString().trim();
  const files = lsOut.split('\n').filter(Boolean);
  console.log(`  ${files.length} tracked files`);

  // 1. Create blobs for every file
  const treeItems = [];
  let i = 0;
  for (const relPath of files) {
    i++;
    const absPath = path.join(WORKSPACE, relPath);
    let content;
    try {
      content = fs.readFileSync(absPath);
    } catch {
      console.warn(`  SKIP (unreadable): ${relPath}`);
      continue;
    }
    const b64 = content.toString('base64');
    const blobSha = await createBlob(b64);
    treeItems.push({ path: relPath, mode: '100644', type: 'blob', sha: blobSha });
    if (i % 25 === 0) console.log(`  ${i}/${files.length} blobs created`);
  }
  console.log(`  All ${treeItems.length} blobs created`);

  // 2. Create tree
  console.log('Creating tree...');
  const tree = await apiRequest('POST', `/repos/${OWNER}/${REPO}/git/trees`, {
    tree: treeItems,
    // No base_tree – replaces the full tree
  });
  console.log('  Tree SHA:', tree.sha);

  // 3. Create commit (no parent = orphan commit, clean history)
  console.log('Creating commit...');
  const commit = await apiRequest('POST', `/repos/${OWNER}/${REPO}/git/commits`, {
    message: 'chore: import PilotStaff monorepo from Replit\n\nFull monorepo with React/Vite frontend (artifacts/pilotstaff) and Express/Supabase backend (artifacts/api-server). Imported and configured in Replit workspace.',
    tree: tree.sha,
    // No parents → orphan commit (clean break from old history)
  });
  console.log('  Commit SHA:', commit.sha);

  // 4. Force-update the branch ref via API (PATCH with force:true)
  console.log(`Force-updating ${BRANCH} ref...`);
  try {
    await apiRequest('PATCH', `/repos/${OWNER}/${REPO}/git/refs/heads/${BRANCH}`, {
      sha: commit.sha,
      force: true,
    });
    console.log('  Ref updated!');
  } catch (e) {
    if (e.message.includes('Reference does not exist')) {
      // Branch doesn't exist yet – create it
      await apiRequest('POST', `/repos/${OWNER}/${REPO}/git/refs`, {
        ref: `refs/heads/${BRANCH}`,
        sha: commit.sha,
      });
      console.log('  Branch created!');
    } else {
      throw e;
    }
  }

  console.log(`\n✅ Done! https://github.com/${OWNER}/${REPO}/tree/${BRANCH}`);
}

main().catch(e => {
  console.error('FAILED:', e.message);
  process.exit(1);
});
