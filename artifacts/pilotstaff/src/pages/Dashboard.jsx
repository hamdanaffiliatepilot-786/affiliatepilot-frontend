import { useState, useEffect, useCallback, useMemo } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "../lib/authContext";
import { apiRequest, clearApiCache } from "../lib/api";

const ALL_AGENTS = [
  { id: "receptionist", icon: "🤖", name: "AI Receptionist", type: "chat", endpoint: "/api/agent/receptionist", placeholder: "Type your customer question..." },
  { id: "sales-agent", icon: "💼", name: "AI Sales Agent", type: "chat", endpoint: "/api/agent/sales-agent", placeholder: "Describe your sales situation..." },
  { id: "support-agent", icon: "🛡️", name: "AI Support Agent", type: "chat", endpoint: "/api/agent/support-agent", placeholder: "Describe your support issue..." },
  { id: "social-staff", icon: "📱", name: "AI Social Staff", type: "content", endpoint: "/api/agent/social-staff", placeholder: "Your business niche..." },
  { id: "content-writer", icon: "✍️", name: "AI Content Writer", type: "content", endpoint: "/api/agent/content-writer", placeholder: "Blog topic..." },
  { id: "seo-expert", icon: "🔍", name: "AI SEO Expert", type: "content", endpoint: "/api/agent/seo-expert", placeholder: "Website URL or target market..." },
  { id: "email-marketer", icon: "📧", name: "AI Email Marketer", type: "content", endpoint: "/api/agent/email-marketer", placeholder: "Offer or product..." },
  { id: "video-scriptwriter", icon: "🎬", name: "AI Video Scriptwriter", type: "content", endpoint: "/api/agent/video-scriptwriter", placeholder: "Video topic..." },
  { id: "conversion-funnel-architect", icon: "🔷", name: "Funnel Architect", type: "content", endpoint: "/api/agent/conversion-funnel-architect", placeholder: "Describe your funnel goal..." },
  { id: "linkedin-growth-hacker", icon: "💼", name: "LinkedIn Hacker", type: "content", endpoint: "/api/agent/linkedin-growth-hacker", placeholder: "Your LinkedIn goals..." },
  { id: "reputation-manager", icon: "⭐", name: "Reputation Manager", type: "content", endpoint: "/api/agent/reputation-manager", placeholder: "Your reputation concern..." },
];

const FREE_TOOLS = [
  { slug: "ai-humanizer", icon: "✍️", name: "AI Humanizer" },
  { slug: "ai-website-builder", icon: "🌐", name: "Website Builder" },
  { slug: "ai-blog-writer", icon: "📝", name: "Blog Writer" },
  { slug: "ai-image-generator", icon: "🖼️", name: "Image Generator" },
  { slug: "seo-audit-checker", icon: "🔍", name: "SEO Audit" },
  { slug: "ai-logo-maker", icon: "🎨", name: "Logo Maker" },
  { slug: "meta-tag-generator", icon: "🏷️", name: "Meta Tags" },
  { slug: "privacy-policy-generator", icon: "📄", name: "Privacy Policy" },
  { slug: "resume-builder", icon: "📋", name: "Resume Builder" },
  { slug: "paragraph-rewriter", icon: "🔄", name: "Rewriter" },
  { slug: "ad-copy-generator", icon: "📢", name: "Ad Copy" },
  { slug: "email-writer", icon: "📧", name: "Email Writer" },
];

const ALL_TASK_AGENTS = [
  { id: "receptionist", name: "AI Receptionist" },
  { id: "sales-agent", name: "AI Sales Agent" },
  { id: "support-agent", name: "AI Support Agent" },
  { id: "social-staff", name: "AI Social Staff" },
  { id: "content-writer", name: "AI Content Writer" },
  { id: "seo-expert", name: "AI SEO Expert" },
  { id: "email-marketer", name: "AI Email Marketer" },
  { id: "video-scriptwriter", name: "AI Video Scriptwriter" },
  { id: "conversion-funnel-architect", name: "Funnel Architect" },
  { id: "linkedin-growth-hacker", name: "LinkedIn Hacker" },
  { id: "reputation-manager", name: "Reputation Manager" },
];

const NAV_ITEMS = [
  { id: "overview", label: "Overview", icon: "📊" },
  { id: "staff", label: "My AI Staff", icon: "🤖" },
  { id: "setup", label: "Business Setup", icon: "⚙️" },
  { id: "tasks", label: "Automations", icon: "🔄" },
  { id: "outputs", label: "Outputs", icon: "📝" },
  { id: "tools", label: "Free Tools", icon: "🧰" },
];

function convertSetup(raw) {
  if (!raw) return null;
  return {
    businessName: raw.business_name || raw.businessName || "",
    businessType: raw.business_type || raw.businessType || "",
    websiteUrl: raw.website || raw.website_url || raw.websiteUrl || "",
    targetAudience: raw.target_audience || raw.targetAudience || "",
    goals: raw.goals || "",
    brandTone: raw.tone || raw.brand_tone || raw.brandTone || "",
    services: raw.services || "",
    offers: raw.offers || "",
    channels: raw.channels || "",
    faq: raw.faq || "",
  };
}

function Toast({ message, onClose }) {
  useEffect(() => {
    if (!message) return;
    const t = setTimeout(onClose, 3500);
    return () => clearTimeout(t);
  }, [message, onClose]);

  if (!message) return null;
  return (
    <div className="fixed top-5 right-5 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-lg text-sm flex items-center gap-3">
      {message}
      <button onClick={onClose} className="text-slate-400 hover:text-white">✕</button>
    </div>
  );
}

function CardSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 animate-pulse">
      <div className="h-4 bg-slate-200 rounded w-24 mb-3" />
      <div className="h-8 bg-slate-200 rounded w-16" />
    </div>
  );
}

function TableSkeleton({ rows = 3 }) {
  return (
    <div className="space-y-3">
      {[...Array(rows)].map((_, i) => (
        <div key={i} className="bg-white rounded-2xl border border-slate-200 p-5 animate-pulse flex items-center gap-4">
          <div className="flex-1">
            <div className="h-4 bg-slate-200 rounded w-48 mb-2" />
            <div className="h-3 bg-slate-100 rounded w-32" />
          </div>
          <div className="h-8 w-20 bg-slate-200 rounded-lg" />
        </div>
      ))}
    </div>
  );
}

function ChatSkeleton() {
  return (
    <div className="space-y-3 animate-pulse">
      <div className="flex justify-end"><div className="bg-blue-200 rounded-xl p-3 w-48 h-12" /></div>
      <div className="flex justify-start"><div className="bg-slate-200 rounded-xl p-3 w-64 h-16" /></div>
    </div>
  );
}

function OverviewTab({ staffCount, taskCount, outputCount, loading }) {
  if (loading) {
    return (
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900">Dashboard</h1>
        <p className="text-slate-500 mt-1">Manage your AI workforce.</p>
        <div className="grid md:grid-cols-3 gap-5 mt-7">
          <CardSkeleton /><CardSkeleton /><CardSkeleton />
        </div>
      </div>
    );
  }
  return (
    <div>
      <h1 className="text-3xl font-extrabold text-slate-900">Dashboard</h1>
      <p className="text-slate-500 mt-1">Manage your AI workforce.</p>
      <div className="grid md:grid-cols-3 gap-5 mt-7">
        <div className="bg-white rounded-2xl border border-slate-200 p-5">
          <p className="text-sm text-slate-500">Active AI Staff</p>
          <p className="text-3xl font-extrabold text-slate-900 mt-2">{staffCount}</p>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 p-5">
          <p className="text-sm text-slate-500">Automation Tasks</p>
          <p className="text-3xl font-extrabold text-slate-900 mt-2">{taskCount}</p>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 p-5">
          <p className="text-sm text-slate-500">Generated Outputs</p>
          <p className="text-3xl font-extrabold text-slate-900 mt-2">{outputCount}</p>
        </div>
      </div>
    </div>
  );
}

function StaffTab({ agents, setup, loading, showMessage }) {
  const [activeAgent, setActiveAgent] = useState(null);
  const [chatInput, setChatInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [contentInput, setContentInput] = useState("");
  const [contentResult, setContentResult] = useState(null);
  const [sending, setSending] = useState(false);

  const sendChat = useCallback(async () => {
    if (!chatInput.trim() || !activeAgent || sending) return;
    const msg = chatInput;
    setChatHistory((prev) => [...prev, { role: "user", text: msg }]);
    setChatInput("");
    setSending(true);
    try {
      let body = {};
      if (activeAgent.id === "receptionist") body = { question: msg, businessType: setup.businessType || "general business" };
      else if (activeAgent.id === "sales-agent") body = { question: msg, product: setup.services || "AI services", price: setup.offers || "$29/month" };
      else body = { question: msg, orderNumber: "N/A", issueType: "general" };
      const data = await apiRequest(activeAgent.endpoint, { method: "POST", body });
      setChatHistory((prev) => [...prev, { role: "ai", text: data.output || data.answer || data.content || data.result || data.error || "Done!" }]);
    } catch (err) {
      setChatHistory((prev) => [...prev, { role: "ai", text: err?.message || "Network error" }]);
    } finally {
      setSending(false);
    }
  }, [chatInput, activeAgent, sending, setup]);

  const runContent = useCallback(async () => {
    if (!contentInput.trim() || !activeAgent || sending) return;
    setSending(true);
    setContentResult(null);
    try {
      let body = {};
      if (activeAgent.id === "seo-expert") body = { url: setup.websiteUrl || contentInput, niche: contentInput, goal: setup.goals || "rank higher" };
      else if (activeAgent.id === "email-marketer") body = { product: contentInput, audience: setup.targetAudience || "potential customers" };
      else if (activeAgent.id === "social-staff") body = { niche: contentInput, days: 7, platforms: setup.channels || "Instagram, Twitter, LinkedIn" };
      else body = { topic: contentInput, tone: setup.brandTone || "professional" };
      const data = await apiRequest(activeAgent.endpoint, { method: "POST", body });
      setContentResult(data);
    } catch (err) {
      setContentResult({ success: false, error: err?.message || "Network error" });
    } finally {
      setSending(false);
    }
  }, [contentInput, activeAgent, sending, setup]);

  return (
    <div>
      <h1 className="text-3xl font-extrabold text-slate-900">My AI Staff</h1>
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5 mt-7">
        {agents.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <p className="text-slate-500">No AI staff hired yet.</p>
            <Link href="/staff" className="inline-block mt-4 text-blue-600 font-bold">Hire AI Staff →</Link>
          </div>
        ) : (
          agents.map((item) => (
            <button key={item.id} onClick={() => { setActiveAgent(item); setChatHistory([]); setContentResult(null); }}
              className={`bg-white text-left rounded-2xl border p-6 transition-all ${activeAgent?.id === item.id ? "border-blue-400 shadow-md" : "border-slate-200 hover:border-blue-400"}`}>
              <div className="text-4xl">{item.icon}</div>
              <h3 className="font-extrabold text-slate-900 mt-3">{item.name}</h3>
              <p className="text-sm text-slate-500 mt-1">Click to start working</p>
            </button>
          ))
        )}
      </div>

      {activeAgent && (
        <div className="mt-8 bg-white rounded-2xl border border-slate-200 p-6">
          <div className="flex justify-between gap-4">
            <div>
              <h2 className="text-xl font-extrabold">{activeAgent.icon} {activeAgent.name}</h2>
              <p className="text-sm text-slate-500 mt-1">AI workspace</p>
            </div>
            <button onClick={() => setActiveAgent(null)} className="text-slate-400 hover:text-slate-600 text-lg">✕</button>
          </div>

          {activeAgent.type === "chat" ? (
            <div className="mt-5">
              <div className="min-h-48 max-h-96 overflow-y-auto rounded-xl bg-slate-50 p-4 space-y-3">
                {chatHistory.length === 0 && <p className="text-sm text-slate-400">Start a conversation below.</p>}
                {sending && chatHistory.length === 0 && <ChatSkeleton />}
                {chatHistory.map((m, i) => (
                  <div key={i} className={`text-sm p-3 rounded-xl ${m.role === "user" ? "bg-blue-600 text-white ml-10" : "bg-white border border-slate-200 text-slate-700 mr-10"}`}>
                    {m.text}
                  </div>
                ))}
              </div>
              <div className="flex gap-2 mt-3">
                <input value={chatInput} onChange={(e) => setChatInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && sendChat()}
                  placeholder={activeAgent.placeholder} className="flex-1 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-400" disabled={sending} />
                <button onClick={sendChat} disabled={sending} className="bg-blue-600 text-white px-5 rounded-xl font-bold disabled:opacity-50">
                  {sending ? "..." : "Send"}
                </button>
              </div>
            </div>
          ) : (
            <div className="mt-5">
              <textarea value={contentInput} onChange={(e) => setContentInput(e.target.value)} placeholder={activeAgent.placeholder} rows={5}
                className="w-full border border-slate-200 rounded-xl p-4 text-sm outline-none focus:border-blue-400" disabled={sending} />
              <button onClick={runContent} disabled={sending} className="mt-3 bg-blue-600 text-white px-5 py-3 rounded-xl font-bold disabled:opacity-50">
                {sending ? "Working..." : "Generate"}
              </button>
              {contentResult && (
                <pre className="mt-4 whitespace-pre-wrap text-sm bg-slate-50 border border-slate-200 rounded-xl p-4 overflow-auto max-h-96">
                  {contentResult.success === false ? contentResult.error : contentResult.output || contentResult.answer || contentResult.content || contentResult.result || contentResult.audit || contentResult.script || JSON.stringify(contentResult, null, 2)}
                </pre>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function SetupTab({ initialSetup, email, loading, showMessage }) {
  const [form, setForm] = useState({
    businessName: "", businessType: "", websiteUrl: "", targetAudience: "",
    goals: "", brandTone: "", services: "", offers: "", channels: "", faq: "",
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (initialSetup) setForm(initialSetup);
  }, [initialSetup]);

  const update = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));

  const save = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const data = await apiRequest("/api/client/setup", {
        method: "POST",
        body: {
          business_name: form.businessName,
          business_type: form.businessType,
          website: form.websiteUrl,
          target_audience: form.targetAudience,
          goals: form.goals,
          tone: form.brandTone,
          services: form.services,
          offers: form.offers,
          channels: form.channels,
          faq: form.faq,
        },
      });
      if (data.success) {
        showMessage("✅ Business profile saved");
      } else {
        showMessage(`❌ ${data.error || "Failed to save"}`);
      }
    } catch (err) {
      showMessage(`❌ ${err?.message || "Failed to save"}`);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900">Business Setup</h1>
        <div className="bg-white rounded-2xl border border-slate-200 p-6 animate-pulse space-y-4 mt-7">
          {[...Array(4)].map((_, i) => <div key={i} className="h-12 bg-slate-200 rounded-xl" />)}
          <div className="h-24 bg-slate-200 rounded-xl" />
          <div className="h-12 bg-slate-200 rounded-xl w-32" />
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-extrabold text-slate-900">Business Setup</h1>
      <p className="text-slate-500 mt-1">Help your AI staff understand your business.</p>

      <form onSubmit={save} className="mt-7 bg-white rounded-2xl border border-slate-200 p-6 grid md:grid-cols-2 gap-4">
        {[
          ["Business Name", "businessName", "Your company name"],
          ["Business Type", "businessType", "e.g. SaaS, E-commerce, Coaching"],
          ["Website URL", "websiteUrl", "https://yourwebsite.com"],
          ["Brand Tone", "brandTone", "e.g. professional, friendly, bold"],
        ].map(([label, field, placeholder]) => (
          <div key={field} className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-slate-600">{label}</label>
            <input value={form[field]} onChange={(e) => update(field, e.target.value)} placeholder={placeholder}
              className="border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-blue-400 outline-none" />
          </div>
        ))}

        {[
          ["Target Audience", "targetAudience", "Who are your customers?"],
          ["Goals", "goals", "What do you want to achieve?"],
          ["Services / Products", "services", "What do you sell?"],
          ["Offers & Pricing", "offers", "e.g. $29/month starter plan"],
          ["Marketing Channels", "channels", "e.g. Instagram, LinkedIn, Email"],
        ].map(([label, field, placeholder]) => (
          <div key={field} className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-slate-600">{label}</label>
            <input value={form[field]} onChange={(e) => update(field, e.target.value)} placeholder={placeholder}
              className="border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-blue-400 outline-none" />
          </div>
        ))}

        <div className="md:col-span-2 flex flex-col gap-1">
          <label className="text-xs font-semibold text-slate-600">FAQ / Common Questions</label>
          <textarea value={form.faq} onChange={(e) => update("faq", e.target.value)} placeholder="Add your frequently asked questions..."
            rows={4} className="border border-slate-200 rounded-xl p-4 text-sm focus:border-blue-400 outline-none" />
        </div>

        <div className="md:col-span-2">
          <button type="submit" disabled={saving} className="bg-blue-600 text-white rounded-xl px-6 py-3 font-bold disabled:opacity-50">
            {saving ? "Saving..." : "Save Business Profile"}
          </button>
        </div>
      </form>
    </div>
  );
}

function TasksTab({ tasks, onRefresh, loading, showMessage }) {
  const [taskForm, setTaskForm] = useState({ title: "", agentId: "content-writer", prompt: "", scheduleType: "manual", requiresApproval: false });
  const [creating, setCreating] = useState(false);
  const [runningId, setRunningId] = useState("");

  const updateForm = (field, value) => setTaskForm((prev) => ({ ...prev, [field]: value }));

  const createTask = async (e) => {
    e.preventDefault();
    if (!taskForm.title.trim() || !taskForm.prompt.trim()) { showMessage("❌ Fill task title and prompt"); return; }
    setCreating(true);
    try {
      const data = await apiRequest("/api/tasks", { method: "POST", body: taskForm });
      if (data.success) {
        setTaskForm({ title: "", agentId: "content-writer", prompt: "", scheduleType: "manual", requiresApproval: false });
        clearApiCache("/api/tasks");
        onRefresh();
        showMessage("✅ Task created");
      } else {
        showMessage(`❌ ${data.error || "Failed to create task"}`);
      }
    } catch (err) {
      showMessage(`❌ ${err?.message || "Failed to create task"}`);
    } finally {
      setCreating(false);
    }
  };

  const runTask = async (taskId) => {
    setRunningId(taskId);
    try {
      const data = await apiRequest(`/api/tasks/${taskId}/run`, { method: "POST" });
      if (data.success) { clearApiCache("/api/tasks"); onRefresh(); showMessage("✅ Task executed"); }
      else showMessage(`❌ ${data.error || "Task failed"}`);
    } catch (err) {
      showMessage(`❌ ${err?.message || "Task failed"}`);
    } finally {
      setRunningId("");
    }
  };

  const toggleApproval = async (taskId, approved) => {
    try {
      const data = await apiRequest(`/api/tasks/${taskId}/approve`, { method: "POST", body: { approved } });
      if (data.success) { clearApiCache("/api/tasks"); onRefresh(); showMessage(approved ? "✅ Approved" : "✅ Paused"); }
      else showMessage(`❌ ${data.error || "Failed"}`);
    } catch (err) {
      showMessage(`❌ ${err?.message || "Failed"}`);
    }
  };

  if (loading) {
    return (
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900">Automation Tasks</h1>
        <div className="bg-white rounded-2xl border border-slate-200 p-6 animate-pulse space-y-4 mt-7">
          {[...Array(4)].map((_, i) => <div key={i} className="h-12 bg-slate-200 rounded-xl" />)}
        </div>
        <TableSkeleton />
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-extrabold text-slate-900">Automation Tasks</h1>
      <form onSubmit={createTask} className="mt-7 bg-white rounded-2xl border border-slate-200 p-6 grid md:grid-cols-2 gap-4">
        <input value={taskForm.title} onChange={(e) => updateForm("title", e.target.value)} placeholder="Task title"
          className="border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-blue-400 outline-none" required />
        <select value={taskForm.agentId} onChange={(e) => updateForm("agentId", e.target.value)} className="border border-slate-200 rounded-xl px-4 py-3 text-sm">
          {ALL_TASK_AGENTS.map((a) => <option key={a.id} value={a.id}>{a.name}</option>)}
        </select>
        <textarea value={taskForm.prompt} onChange={(e) => updateForm("prompt", e.target.value)} placeholder="What should this task do?"
          className="md:col-span-2 border border-slate-200 rounded-xl p-4 text-sm focus:border-blue-400 outline-none" rows={4} required />
        <select value={taskForm.scheduleType} onChange={(e) => updateForm("scheduleType", e.target.value)} className="border border-slate-200 rounded-xl px-4 py-3 text-sm">
          <option value="manual">Manual</option>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
        </select>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={taskForm.requiresApproval} onChange={(e) => updateForm("requiresApproval", e.target.checked)} />
          Require approval
        </label>
        <button className="md:col-span-2 bg-blue-600 text-white rounded-xl py-3 font-bold disabled:opacity-50" disabled={creating}>
          {creating ? "Creating..." : "Create Task"}
        </button>
      </form>

      <div className="mt-6 space-y-3">
        {tasks.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center">
            <p className="text-4xl mb-3">🔄</p>
            <p className="text-slate-500">No tasks created yet. Create one above.</p>
          </div>
        ) : (
          tasks.map((task) => (
            <div key={task.id} className="bg-white rounded-2xl border border-slate-200 p-5 flex flex-wrap items-center gap-3">
              <div className="flex-1 min-w-0">
                <h3 className="font-bold truncate">{task.title}</h3>
                <p className="text-sm text-slate-500 truncate">{task.prompt}</p>
              </div>
              <button onClick={() => runTask(task.id)} disabled={runningId === task.id} className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-bold disabled:opacity-50">
                {runningId === task.id ? "Running..." : "Run"}
              </button>
              <button onClick={() => toggleApproval(task.id, !task.approved)} className="border border-slate-200 px-4 py-2 rounded-xl text-sm hover:bg-slate-50">
                {task.approved ? "Pause" : "Approve"}
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function OutputsTab({ outputs, loading }) {
  if (loading) {
    return (
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900">Task Outputs</h1>
        <TableSkeleton />
      </div>
    );
  }
  return (
    <div>
      <h1 className="text-3xl font-extrabold text-slate-900">Task Outputs</h1>
      <div className="mt-7 space-y-4">
        {outputs.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center">
            <p className="text-4xl mb-3">📝</p>
            <p className="text-slate-500">No outputs yet. Run a task to see results here.</p>
          </div>
        ) : (
          outputs.map((output, i) => (
            <div key={output.id || i} className="bg-white rounded-2xl border border-slate-200 p-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold">{output.task_title || output.title || "Task Output"}</h3>
                {output.agent_id && <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">{output.agent_id}</span>}
              </div>
              <pre className="whitespace-pre-wrap text-sm text-slate-600 bg-slate-50 rounded-xl p-4 overflow-auto max-h-96">
                {output.output || output.content || JSON.stringify(output, null, 2)}
              </pre>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function ToolsTab() {
  return (
    <div>
      <h1 className="text-3xl font-extrabold text-slate-900">Free AI Tools</h1>
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4 mt-7">
        {FREE_TOOLS.map((tool) => (
          <Link key={tool.slug} href={`/tools/${tool.slug}`} className="bg-white border border-slate-200 rounded-2xl p-5 hover:border-blue-400 hover:shadow-md transition-all">
            <div className="text-3xl">{tool.icon}</div>
            <h3 className="font-bold mt-3">{tool.name}</h3>
            <p className="text-sm text-slate-500 mt-1">Open free tool →</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function Dashboard() {
  const [location] = useLocation();
  const { user } = useAuth();
  const [, navigate] = useLocation();

  const searchParams = new URLSearchParams(typeof window !== "undefined" ? window.location.search : "");
  const upgraded = searchParams.get("upgraded");
  const requestedTab = searchParams.get("tab");

  const email = user?.email || "";

  const [tab, setTab] = useState(requestedTab || "overview");
  const [subs, setSubs] = useState([]);
  const [setup, setSetup] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [outputs, setOutputs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");

  const activeSubIds = useMemo(() => subs.map((s) => s.agent_id), [subs]);
  const myAgents = useMemo(() => ALL_AGENTS.filter((a) => activeSubIds.includes(a.id)), [activeSubIds]);

  const showMessage = useCallback((text) => setMsg(text), []);
  const clearMessage = useCallback(() => setMsg(""), []);

  const loadDashboard = useCallback(async () => {
    if (!email) { setLoading(false); return; }
    setLoading(true);
    try {
      const results = await Promise.allSettled([
        apiRequest("/api/my-subscriptions", { cache: true }),
        apiRequest("/api/client/setup", { cache: true }),
        apiRequest("/api/tasks", { cache: true }),
        apiRequest("/api/tasks/outputs", { cache: true }),
      ]);

      const [subsResult, setupResult, tasksResult, outputsResult] = results;

      if (subsResult.status === "fulfilled" && subsResult.value?.success) setSubs(subsResult.value.subs || []);
      if (setupResult.status === "fulfilled" && setupResult.value?.success) setSetup(convertSetup(setupResult.value.setup));
      if (tasksResult.status === "fulfilled" && tasksResult.value?.success) {
        const td = tasksResult.value;
        setTasks(td.tasks || td.data || []);
      }
      if (outputsResult.status === "fulfilled" && outputsResult.value?.success) {
        const od = outputsResult.value;
        setOutputs(od.outputs || od.data || []);
      }
    } catch (err) {
      console.error("Dashboard load error:", err);
    } finally {
      setLoading(false);
    }
  }, [email]);

  const refreshData = useCallback(() => { clearApiCache(); loadDashboard(); }, [loadDashboard]);

  useEffect(() => {
    if (!user) { navigate("/login"); return; }
    loadDashboard();
  }, [user, loadDashboard, navigate]);

  useEffect(() => {
    if (requestedTab) setTab(requestedTab);
  }, [requestedTab]);

  if (!user) return null;

  return (
    <div className="min-h-screen flex bg-slate-50">
      <aside className="w-64 bg-white border-r border-slate-200 fixed h-full flex flex-col z-40">
        <div className="p-5 border-b border-slate-200">
          <Link href="/" className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center text-white text-sm font-extrabold">P</div>
            <span className="font-extrabold text-slate-900">PilotStaff</span>
          </Link>
          <p className="text-xs text-slate-400 truncate">{email || "Guest"}</p>
        </div>

        <nav className="p-3 space-y-1 flex-1 overflow-y-auto">
          {NAV_ITEMS.map((item) => {
            const count = item.id === "staff" ? myAgents.length : item.id === "tasks" ? tasks.length : item.id === "outputs" ? outputs.length : null;
            return (
              <button key={item.id} onClick={() => setTab(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${tab === item.id ? "bg-blue-50 text-blue-700" : "text-slate-600 hover:bg-slate-50"}`}>
                <span>{item.icon}</span>
                <span className="flex-1 text-left">{item.label}</span>
                {count !== null && count > 0 && <span className="text-xs bg-slate-100 px-2 py-0.5 rounded-full">{count}</span>}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-200">
          <Link href="/staff" className="block text-center bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-2.5 text-sm font-bold transition-colors">
            + Hire AI Staff
          </Link>
        </div>
      </aside>

      <main className="ml-64 flex-1 p-8">
        <Toast message={msg} onClose={clearMessage} />

        {upgraded && (
          <div className="mb-6 rounded-xl bg-emerald-50 border border-emerald-200 p-4 text-emerald-700">
            🚀 {upgraded} activated successfully.
          </div>
        )}

        {tab === "overview" && <OverviewTab staffCount={myAgents.length} taskCount={tasks.length} outputCount={outputs.length} loading={loading} />}
        {tab === "staff" && <StaffTab agents={myAgents} setup={setup || {}} loading={loading} showMessage={showMessage} />}
        {tab === "setup" && <SetupTab initialSetup={setup} email={email} loading={loading} showMessage={showMessage} />}
        {tab === "tasks" && <TasksTab tasks={tasks} onRefresh={refreshData} loading={loading} showMessage={showMessage} />}
        {tab === "outputs" && <OutputsTab outputs={outputs} loading={loading} />}
        {tab === "tools" && <ToolsTab />}
      </main>
    </div>
  );
}
