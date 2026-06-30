#!/bin/sh
set -e

TOKEN="${GITHUB_PERSONAL_ACCESS_TOKEN}"
REPO_URL="https://${TOKEN}@github.com/hamdanaffiliatepilot-786/affiliatepilot-frontend.git"
WORKSPACE="/home/runner/workspace"

cd "$WORKSPACE"

git config user.email "pilotstaff@replit.com"
git config user.name "PilotStaff Replit"

# Remove existing github remote if it exists
git remote remove github 2>/dev/null || true

# Add fresh remote with token
git remote add github "$REPO_URL"

echo "Remote added. Pushing..."

# Push main branch (force to overwrite the old separate-repo structure)
git push github main --force

echo "Done! Successfully pushed to GitHub."
