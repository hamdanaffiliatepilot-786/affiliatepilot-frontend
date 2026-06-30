const { env } = require('../config/env');
const WEBSITE_URL = env('WEBSITE_URL') || 'https://pilotstaff.com';

const toolRoutes = [
    // === VIRAL TOOLS ===
    {
        path: 'ai-humanizer',
        prompt: (t) => `You are an expert AI Humanizer. Rewrite the following text to sound 100% human-written. Remove AI cliches like "delve", "tapestry", "moreover", "furthermore", "in conclusion", "landscape", "realm", "testament", "pivotal", "seamless", "navigating the complexities". Use varied sentence lengths. Add slight imperfections in flow that humans naturally have. Use conversational transitions. Keep the exact same meaning and facts. Do NOT add new information. Do NOT add hashtags or bullet points unless the original had them.\n\nText to humanize: "${t}"\n\nOUTPUT ONLY THE HUMANIZED TEXT. No explanations.`
    },
    {
        path: 'seo-audit-checker',
        prompt: (t) => `Act as a strict Technical SEO Auditor with 15 years of experience. Analyze this website/URL: "${t}". Give a realistic score out of 100. Format STRICTLY as JSON: {"score": 85, "grade": "B", "summary": "One line summary", "critical_issues": [{"issue": "Exact issue name", "impact": "High", "fix": "Exact step to fix"}], "warnings": [{"issue": "Exact issue name", "impact": "Medium", "fix": "Exact step to fix"}], "passed": ["Check name that passed"], "top_recommendation": "The single most important thing to fix first"} Give at least 3 critical issues, 3 warnings, and 3 passed checks. OUTPUT ONLY JSON.`
    },
    {
        path: 'youtube-to-blog',
        prompt: (t) => `Convert this YouTube video transcript/content into a highly engaging, SEO-optimized blog post: "${t}". Requirements: 1. Write a catchy H1 title with primary keyword. 2. Write a 150-char meta description. 3. Break into 5-6 H2 sections with engaging subheadings. 4. Remove all filler words. 5. Add bullet points for key takeaways. 6. Include internal link: <a href="${WEBSITE_URL}/tools" style="color:#2563eb;font-weight:600;">free AI tools</a>. 7. Add conclusion with CTA. OUTPUT ONLY HTML.`
    },

    // === CONTENT CREATION ===
    {
        path: 'ai-website-builder',
        prompt: (t) => `Create a COMPLETE single-page website for "${t}". Inline CSS only. Include: sticky navbar with "PilotStaff" logo, hero with gradient and CTA, 6 feature cards in grid, how-it-works 3 steps, 3 testimonials with stars, pricing table 3 plans (Free/$0, Pro/$29, Enterprise/$99) with Pro highlighted, FAQ accordion, footer. Modern, responsive. OUTPUT ONLY HTML.`
    },
    {
        path: 'blog-writer-free',
        prompt: (t) => `Write a 1500+ word SEO blog about "${t}". H1 with keyword. First 155 chars as meta description. 5-6 H2 sections. Short paragraphs. Bullet lists. Include: <a href="${WEBSITE_URL}/tools" style="color:#2563eb;font-weight:600;">free AI tools</a> and <a href="${WEBSITE_URL}/tools/ai-blog-writer" style="color:#2563eb;font-weight:600;">AI blog writer</a>. Conclusion with CTA. OUTPUT ONLY HTML.`
    },
    { path: 'image-generator', type: 'image' },
    { path: 'logo-maker', type: 'logo' },
    {
        path: 'paragraph-rewriter',
        prompt: (t) => `Rewrite this paragraph to be more engaging, professional, and readable. Improve vocabulary and flow while keeping ALL original facts and meaning. Do NOT add new information. Make it sound human-written, not AI-generated.\n\nParagraph: "${t}"\n\nOUTPUT ONLY THE REWRITTEN PARAGRAPH. No explanations.`
    },
    {
        path: 'ad-copy-generator',
        prompt: (t) => `Generate 5 ad copies for "${t}". 2 Facebook, 2 Google, 1 Instagram. Each with headline and body. Use AIDA framework. OUTPUT JSON: {"copy":[{"platform":"facebook","headline":"...","body":"..."}]} No markdown.`
    },
    {
        path: 'email-writer',
        prompt: (t) => `Write 3 emails for "${t}". Cold outreach, follow-up, newsletter. Each with subject line under 50 chars. OUTPUT JSON: {"emails":[{"type":"cold","subject":"...","body":"..."}]} No markdown.`
    },
    {
        path: 'landing-page-copywriter',
        prompt: (t) => `Write 3 landing page copy variations for "${t}" using AIDA framework. Each with headline, subheadline, CTA, benefits, social proof. OUTPUT JSON: {"copy":[{"headline":"...","subheadline":"...","cta":"...","body":"..."}]} No markdown.`
    },
    {
        path: 'ai-code-generator',
        prompt: (t) => `Generate code for: "${t}". Include working code, explanation, and usage example. OUTPUT JSON: {"code":"...","explanation":"...","usage":"..."} No markdown.`
    },
    {
        path: 'meeting-notes-generator',
        prompt: (t) => `Convert these meeting notes into a structured format: "${t}". OUTPUT JSON: {"meeting_title":"...","date":"...","attendees":["..."],"key_decisions":["..."],"action_items":[{"task":"...","assignee":"...","deadline":"..."}],"summary":"..."} No markdown.`
    },
    {
        path: 'ai-press-release',
        prompt: (t) => `Write a professional press release for: "${t}". Include headline, dateline, lead paragraph with 5 W's, body with quotes from executives, boilerplate "About Company" section, and contact info. AP style. OUTPUT ONLY HTML with proper formatting.`
    },
    {
        path: 'ai-newsletter-writer',
        prompt: (t) => `Write an engaging email newsletter for: "${t}". Include: attention-grabbing subject line, personalized opening, 3 main sections with value, 1 featured tip, 1 CTA, and sign-off. Conversational tone. OUTPUT JSON: {"subject":"...","preview":"...","body":"...","cta":"..."} No markdown.`
    },
    {
        path: 'ai-twitter-thread',
        prompt: (t) => `Write a viral Twitter/X thread about "${t}". 10 tweets. Tweet 1: hook (under 280 chars, stops scroll). Tweets 2-9: value, insights, data. Tweet 10: CTA. Each tweet numbered. Use short sentences. Add emojis. OUTPUT JSON: {"tweets":["tweet 1...","tweet 2..."]} No markdown.`
    },
    {
        path: 'ai-sales-email-sequence',
        prompt: (t) => `Write a 7-email sales sequence for "${t}". Each email: subject, day number, purpose, body. Day 1: Welcome. Day 2: Value. Day 3: Social Proof. Day 4: Pain Point. Day 5: Offer. Day 6: Urgency. Day 7: Last Chance. OUTPUT JSON: {"sequence":[{"day":1,"subject":"...","purpose":"...","body":"..."}]} No markdown.`
    },
    {
        path: 'ai-cold-dm',
        prompt: (t) => `Generate 5 high-converting cold DM templates for "${t}". Each for a different platform: LinkedIn, Instagram, Twitter, WhatsApp, Email. Each under 150 words. Personalized, value-first, clear CTA. OUTPUT JSON: {"dms":[{"platform":"LinkedIn","message":"..."}]} No markdown.`
    },
    {
        path: 'ai-tagline-generator',
        prompt: (t) => `Generate 20 powerful brand taglines for "${t}". Mix: emotional, benefit-driven, action-oriented, question-based, and minimalist styles. Each under 10 words. OUTPUT JSON: {"taglines":["...", "..."]} No markdown.`
    },
    {
        path: 'ai-youtube-script',
        prompt: (t) => `Write a complete YouTube video script for: "${t}". Include: HOOK (first 15 seconds), INTRO (subscribe CTA), MAIN CONTENT (4-5 sections), B-ROLL suggestions, OUTRO with subscribe CTA. Target 8-12 minutes. Conversational, engaging tone. OUTPUT ONLY HTML with clear section labels.`
    },
    {
        path: 'ai-podcast-script',
        prompt: (t) => `Write a complete podcast episode script for: "${t}". Include: intro music cue, host intro, episode teaser, main interview/monologue in 4 segments, transition cues, sponsor slot placeholder, outro with CTA. 20-25 minute episode. OUTPUT ONLY HTML with section labels.`
    },

    // === DESIGN & MEDIA ===
    {
        path: 'youtube-thumbnail-prompt',
        prompt: (t) => `Generate 5 viral YouTube thumbnail concepts for: "${t}". Each with emotion, text overlay, visual description, color scheme. OUTPUT JSON: {"thumbnails":[{"emotion":"...","text":"...","visual":"...","colors":"..."}]} No markdown.`
    },

    // === SEO & MARKETING ===
    {
        path: 'meta-tag-generator',
        prompt: (t) => `Generate SEO meta tags for "${t}". Title under 60 chars, description 150-155 chars, 10 keywords, og_title, og_description. OUTPUT JSON: {"title":"...","description":"...","keywords":["..."],"og_title":"...","og_description":"..."} No markdown.`
    },
    {
        path: 'youtube-seo',
        prompt: (t) => `Generate 5 YouTube titles (under 70 chars, high CTR) and 10 SEO tags for "${t}". OUTPUT JSON: {"titles":["..."],"tags":["..."]} No markdown.`
    },
    {
        path: 'ai-hashtag-generator',
        prompt: (t) => `Generate 1 engaging caption and 20 viral hashtags for "${t}". Mix small, medium, and large hashtags. OUTPUT JSON: {"caption":"...","hashtags":["#..."]} No markdown.`
    },
    {
        path: 'website-auditor',
        prompt: (t) => `Perform a complete SEO audit for: "${t}". Cover: technical SEO, on-page SEO, content quality, backlink profile, mobile optimization, page speed. Give specific actionable fixes with priority levels. OUTPUT CLEAN TEXT.`
    },
    {
        path: 'competitor-analyzer',
        prompt: (t) => `Analyze competitor "${t}". Find: keyword gaps, content gaps, backlink opportunities, traffic sources, top performing pages, content strategy. Give actionable steps to outrank them. OUTPUT CLEAN TEXT.`
    },
    {
        path: 'schema-generator',
        prompt: (t) => `Generate 4 JSON-LD schemas for "${t}": BlogPosting, Product, FAQPage, Organization. Valid structured data. OUTPUT JSON: {"schemas":[{"@type":"BlogPosting",...}]} No markdown.`
    },
    {
        path: 'content-calendar',
        prompt: (t) => `30-day content calendar for "${t}". Each day: topic, keyword, content type, platform. OUTPUT JSON: {"calendar":[{"day":1,"topic":"...","keyword":"...","type":"Blog","platform":"Website"}]} No markdown.`
    },
    {
        path: 'content-repurposer',
        prompt: (t) => `Repurpose "${t}" into 5 formats: Twitter thread, LinkedIn post, newsletter section, Instagram caption, YouTube hook. Platform-optimized. OUTPUT JSON: {"formats":[{"type":"...","content":"..."}]} No markdown.`
    },
    {
        path: 'ai-keyword-clusters',
        prompt: (t) => `Create a keyword cluster strategy for "${t}". Generate 5 topic clusters, each with: pillar keyword, 5 supporting keywords, search intent, content type suggestion, internal linking strategy. OUTPUT JSON: {"clusters":[{"pillar":"...","keywords":["..."],"intent":"...","content_type":"...","linking":"..."}]} No markdown.`
    },
    {
        path: 'ai-google-ads',
        prompt: (t) => `Generate 5 complete Google Ads campaigns for "${t}". Each with: campaign name, 3 responsive search ad headlines (under 30 chars each), 2 descriptions (under 90 chars each), 4 sitelink extensions, bid strategy. OUTPUT JSON: {"campaigns":[{"name":"...","headlines":["..."],"descriptions":["..."],"sitelinks":["..."],"bid_strategy":"..."}]} No markdown.`
    },
    {
        path: 'ai-email-subject-lines',
        prompt: (t) => `Generate 20 high-converting email subject lines for "${t}". Include: curiosity, urgency, benefit, question, and personalization styles. Also give open rate prediction (High/Medium/Low) for each. OUTPUT JSON: {"subject_lines":[{"subject":"...","style":"...","prediction":"High"}]} No markdown.`
    },
    {
        path: 'ai-tiktok-caption',
        prompt: (t) => `Generate 10 viral TikTok captions for "${t}". Each under 150 chars. Include hook, value/entertainment, 5 relevant hashtags. Mix educational, entertaining, and inspirational styles. OUTPUT JSON: {"captions":[{"caption":"...","hashtags":["#..."]}]} No markdown.`
    },
    {
        path: 'ai-pinterest-description',
        prompt: (t) => `Write 5 optimized Pinterest pin descriptions for "${t}". Each 100-200 chars. Include keywords naturally, benefit statement, CTA. Also suggest 10 Pinterest keywords. OUTPUT JSON: {"descriptions":["..."],"keywords":["..."]} No markdown.`
    },
    {
        path: 'ai-ab-test-ideas',
        prompt: (t) => `Generate 10 A/B test ideas for "${t}". For each test: element to test, variant A (control), variant B (variation), hypothesis, expected impact, how to measure. Focus on high-impact tests. OUTPUT JSON: {"tests":[{"element":"...","control":"...","variation":"...","hypothesis":"...","impact":"...","metric":"..."}]} No markdown.`
    },
    {
        path: 'ai-brand-voice',
        prompt: (t) => `Create a complete brand voice guide for "${t}". Include: brand personality (5 adjectives), tone of voice, writing do's and don'ts, example phrases, words to use, words to avoid, before/after examples. OUTPUT ONLY HTML with clean formatting.`
    },

    // === BUSINESS & LEGAL ===
    {
        path: 'business-name-generator',
        prompt: (t) => `Generate 20 business names for "${t}". Format: "Name — Tagline | domain.com". Creative, memorable, brandable. OUTPUT JSON: {"names":["..."]} No markdown.`
    },
    {
        path: 'startup-ideas',
        prompt: (t) => `Generate 5 startup ideas for "${t}". Each: name, problem, market size, revenue model, startup cost, 5 launch steps. OUTPUT JSON: {"ideas":[{"name":"...","problem":"...","market":"...","revenue":"...","cost":"...","steps":["..."]}]} No markdown.`
    },
    {
        path: 'product-description',
        prompt: (t) => `Write 3 product descriptions for "${t}". E-commerce optimized with benefits, features, social proof, SEO keywords. OUTPUT JSON: {"descriptions":[{"headline":"...","body":"..."}]} No markdown.`
    },
    {
        path: 'invoice-generator',
        prompt: (t) => `Create invoice for "${t}". INV-${Math.floor(Math.random() * 9000) + 1000}. Date: ${new Date().toLocaleDateString()}. Professional inline CSS. OUTPUT ONLY HTML.`
    },
    {
        path: 'privacy-policy-generator',
        prompt: (t) => `Write complete Privacy Policy for ${t}. 10 sections. Legal tone. OUTPUT ONLY HTML.`
    },
    {
        path: 'terms-generator',
        prompt: (t) => `Write complete Terms of Service for ${t}. 10 sections. Legal tone. OUTPUT ONLY HTML.`
    },
    {
        path: 'ai-business-plan',
        prompt: (t) => `Write a complete business plan for "${t}". Include: Executive Summary, Company Description, Market Analysis, Products/Services, Marketing Strategy, Operations Plan, Financial Projections (3-year), Funding Requirements. Professional format. OUTPUT ONLY HTML with proper headings and sections.`
    },
    {
        path: 'ai-swot-analysis',
        prompt: (t) => `Perform a detailed SWOT analysis for "${t}". For each quadrant provide 5 specific points with brief explanations. Also provide strategic recommendations for SO, ST, WO, WT strategies. OUTPUT JSON: {"strengths":["..."],"weaknesses":["..."],"opportunities":["..."],"threats":["..."],"strategies":{"so":"...","st":"...","wo":"...","wt":"..."}} No markdown.`
    },
    {
        path: 'ai-job-description',
        prompt: (t) => `Write a complete, attractive job description for "${t}". Include: role overview, responsibilities (8-10 points), requirements (must-have and nice-to-have), benefits, company culture statement, salary range suggestion, and application instructions. OUTPUT ONLY HTML.`
    },
    {
        path: 'ai-nda-generator',
        prompt: (t) => `Draft a professional Non-Disclosure Agreement (NDA) for "${t}". Include: parties, definition of confidential information, obligations, exceptions, term, remedies, governing law, signatures. Legal language. OUTPUT ONLY HTML.`
    },
    {
        path: 'ai-refund-policy',
        prompt: (t) => `Write a complete Refund and Returns Policy for "${t}". Include: eligibility, timeframe, process, non-refundable items, exchange policy, damaged items, contact information. Consumer-friendly yet protective. OUTPUT ONLY HTML.`
    },
    {
        path: 'ai-cookie-policy',
        prompt: (t) => `Write a complete Cookie Policy for "${t}". Include: what cookies are, types used (essential/analytics/marketing), how to manage cookies, third-party cookies, GDPR compliance statement, contact information. OUTPUT ONLY HTML.`
    },
    {
        path: 'ai-pitch-deck-outline',
        prompt: (t) => `Create a detailed pitch deck outline for "${t}". For each of the 12 slides provide: slide title, key message, bullet points, suggested visual, and talking points. Slides: Problem, Solution, Market Size, Product Demo, Business Model, Traction, Competition, Team, Financials, Ask, Use of Funds, Vision. OUTPUT JSON: {"slides":[{"number":1,"title":"...","key_message":"...","bullets":["..."],"visual":"...","talking_points":"..."}]} No markdown.`
    },

    // === SOCIAL & PERSONAL ===
    {
        path: 'social-bio-generator',
        prompt: (t) => `Generate bios for "${t}". Instagram (150 chars), Twitter (160 chars), LinkedIn (260 chars), TikTok (80 chars). Each engaging and platform-optimized. OUTPUT JSON: {"platforms":[{"platform":"instagram","bio":"..."},{"platform":"twitter","bio":"..."},{"platform":"linkedin","bio":"..."},{"platform":"tiktok","bio":"..."}]} No markdown.`
    },
    {
        path: 'resume-builder',
        prompt: (t) => `Create ATS-friendly resume for ${t}. Header, summary, experience with metrics, skills, education. Clean inline CSS. OUTPUT ONLY HTML.`
    },
    {
        path: 'review-response-generator',
        prompt: (t) => `Write professional responses for review: "${t}". Generate responses for 1-star, 3-star, and 5-star reviews. Each empathetic and brand-positive. OUTPUT JSON: {"responses":[{"stars":1,"response":"..."},{"stars":3,"response":"..."},{"stars":5,"response":"..."}]} No markdown.`
    },
    {
        path: 'ai-cover-letter',
        prompt: (t) => `Write a compelling, personalized cover letter for: "${t}". Include: attention-grabbing opening, relevant experience summary with metrics, specific fit for the role, enthusiasm for company, professional closing with CTA. ATS-optimized. OUTPUT ONLY HTML.`
    },
    {
        path: 'ai-linkedin-summary',
        prompt: (t) => `Write 3 LinkedIn "About" section summaries for "${t}". Version 1: storytelling style. Version 2: results-focused. Version 3: thought-leader style. Each under 2000 chars. Add 10 relevant LinkedIn keywords at the end. OUTPUT JSON: {"summaries":[{"style":"storytelling","text":"..."},{"style":"results","text":"..."},{"style":"thought-leader","text":"..."}],"keywords":["..."]} No markdown.`
    },
    {
        path: 'ai-youtube-about',
        prompt: (t) => `Write a compelling YouTube channel About section for "${t}". Include: channel purpose, what viewers gain, upload schedule, featured playlists suggestion, creator bio, and subscribe CTA. Under 1000 chars. Also include 20 channel keywords. OUTPUT JSON: {"about":"...","keywords":["..."]} No markdown.`
    },
    {
        path: 'ai-personal-bio',
        prompt: (t) => `Write 5 personal bios in different lengths for "${t}": One sentence (25 words), Short (50 words), Medium (100 words), Long (200 words), Speaker/Author (300 words). Third-person professional tone. OUTPUT JSON: {"bios":[{"length":"one_sentence","words":25,"text":"..."},{"length":"short","words":50,"text":"..."},{"length":"medium","words":100,"text":"..."},{"length":"long","words":200,"text":"..."},{"length":"speaker","words":300,"text":"..."}]} No markdown.`
    },

    // === PRODUCTIVITY ===
    {
        path: 'ai-translator',
        prompt: (t) => `Detect language and translate to English. If already English, translate to Spanish. Text: "${t}". OUTPUT JSON: {"detected_language":"...","translated_text":"...","pronunciation":"..."} No markdown.`
    },
    {
        path: 'ai-quote-generator',
        prompt: (t) => `Generate 10 original, shareable quotes about "${t}". Each with the quote and a fictional author name + category. OUTPUT JSON: {"quotes":[{"quote":"...","author":"...","category":"..."}]} No markdown.`
    },
    {
        path: 'website-roaster',
        prompt: (t) => `You are a savage, hilarious website reviewer. Roast this website: "${t}". FORMAT STRICTLY AS:\n🔥 FIRST IMPRESSION (1-2 sentences)\n🎭 DESIGN ROAST\n📝 CONTENT ROAST\n🔍 SEO ROAST\n⚖️ THE VERDICT\n💡 ACTUALLY USEFUL ADVICE (3 bullet points)\nBe sarcastic and funny. Use emojis. Under 300 words. OUTPUT CLEAN TEXT.`
    },
    {
        path: 'ai-meeting-agenda',
        prompt: (t) => `Create a professional meeting agenda for: "${t}". Include: meeting title, date/time placeholder, attendees list, objectives, agenda items with time allocations, discussion points, decisions needed, next steps section, and follow-up owner. OUTPUT ONLY HTML with clean table formatting.`
    },
    {
        path: 'ai-smart-goals',
        prompt: (t) => `Convert this goal into 5 SMART goals: "${t}". For each goal provide: Specific, Measurable, Achievable, Relevant, Time-bound breakdown + action plan with 5 steps + potential obstacles + success metrics. OUTPUT JSON: {"goals":[{"goal":"...","specific":"...","measurable":"...","achievable":"...","relevant":"...","timebound":"...","steps":["..."],"obstacles":["..."],"metrics":["..."]}]} No markdown.`
    },
    {
        path: 'ai-pros-cons',
        prompt: (t) => `Create a comprehensive pros and cons analysis for: "${t}". List 8 pros and 8 cons. For each: brief explanation, impact level (High/Medium/Low), who it affects most. Then provide a balanced recommendation. OUTPUT JSON: {"pros":[{"point":"...","explanation":"...","impact":"High","affects":"..."}],"cons":[{"point":"...","explanation":"...","impact":"High","affects":"..."}],"recommendation":"..."} No markdown.`
    },
    {
        path: 'ai-brainstorm',
        prompt: (t) => `Generate 25 creative ideas for: "${t}". Use 5 different brainstorming frameworks: SCAMPER (5 ideas), Reverse Brainstorming (5 ideas), Mind Mapping branches (5 ideas), Random Word Association (5 ideas), "What Would [Famous Person] Do?" (5 ideas with persona). OUTPUT JSON: {"frameworks":[{"method":"SCAMPER","ideas":["..."]}]} No markdown.`
    },
    {
        path: 'ai-faq-generator',
        prompt: (t) => `Generate 15 frequently asked questions and detailed answers for "${t}". Cover: basic questions, intermediate questions, and advanced questions. Each answer 2-4 sentences. Also provide JSON-LD FAQ schema. OUTPUT JSON: {"faqs":[{"question":"...","answer":"...","level":"basic"}],"schema":{}} No markdown.`
    },
    {
        path: 'ai-survey-questions',
        prompt: (t) => `Create a complete survey for "${t}". Include 15 questions: 5 multiple choice, 5 rating scale (1-10), 3 open-ended, 2 yes/no. Add response analysis tips. OUTPUT JSON: {"survey_title":"...","questions":[{"number":1,"type":"multiple_choice","question":"...","options":["..."]}],"analysis_tips":["..."]} No markdown.`
    },
    {
        path: 'ai-project-plan',
        prompt: (t) => `Create a complete project plan for "${t}". Include: Project Overview, Goals, Scope, Milestones (5), Task Breakdown (15 tasks with owner, priority, duration), Risk Register (5 risks with mitigation), Success Metrics, Timeline summary. OUTPUT ONLY HTML with tables.`
    },
    {
        path: 'ai-sop-writer',
        prompt: (t) => `Write a Standard Operating Procedure (SOP) for "${t}". Include: Purpose, Scope, Definitions, Responsibilities, Step-by-Step Procedure (numbered), Quality Checks, Troubleshooting, Related Documents, Revision History. Professional format. OUTPUT ONLY HTML.`
    },

    // === E-COMMERCE ===
    {
        path: 'ai-amazon-listing',
        prompt: (t) => `Write a complete Amazon product listing for "${t}". Include: Title (200 chars, keyword-rich), 5 bullet points (each starting with caps benefit), Product Description (2000 chars, HTML-formatted), Backend Keywords (250 chars), A+ Content suggestion. OUTPUT JSON: {"title":"...","bullets":["..."],"description":"...","keywords":"...","aplus_suggestion":"..."} No markdown.`
    },
    {
        path: 'ai-etsy-description',
        prompt: (t) => `Write an Etsy shop and product description for "${t}". Include: product title (140 chars), shop announcement, product description (story-driven, SEO-optimized, 500 words), tags (13 tags), materials list, and shipping note. OUTPUT JSON: {"title":"...","announcement":"...","description":"...","tags":["..."],"materials":["..."],"shipping_note":"..."} No markdown.`
    },
    {
        path: 'ai-product-title-optimizer',
        prompt: (t) => `Optimize this product title for e-commerce: "${t}". Generate 5 optimized versions for: Amazon, Shopify, Etsy, eBay, and Google Shopping. Each following platform-specific best practices. Also explain what you changed and why. OUTPUT JSON: {"optimized":[{"platform":"Amazon","title":"...","changes":"..."}]} No markdown.`
    },
    {
        path: 'ai-dropshipping-ideas',
        prompt: (t) => `Generate 10 profitable dropshipping product ideas for "${t}" niche. For each: product name, target audience, estimated profit margin, supplier suggestion (AliExpress category), selling price range, marketing angle, competitor analysis, unique selling point. OUTPUT JSON: {"products":[{"name":"...","audience":"...","margin":"...","supplier":"...","price_range":"...","angle":"...","usp":"..."}]} No markdown.`
    },
    {
        path: 'ai-promo-copy',
        prompt: (t) => `Create complete promotional copy for "${t}". Generate: 3 sale announcement emails, 5 social media posts, 3 SMS messages, 2 push notification texts, 1 banner ad headline. All urgency-driven. OUTPUT JSON: {"emails":["..."],"social_posts":["..."],"sms":["..."],"push":["..."],"banner":"..."} No markdown.`
    },

    // === FINANCE & FUNDRAISING ===
    {
        path: 'ai-investor-email',
        prompt: (t) => `Write 3 investor outreach emails for "${t}". Email 1: Cold intro (angel investors). Email 2: VC follow-up. Email 3: Strategic partner pitch. Each with subject line, personalized opening, traction metrics placeholder, ask, and CTA. Under 300 words each. OUTPUT JSON: {"emails":[{"type":"cold_angel","subject":"...","body":"..."},{"type":"vc_followup","subject":"...","body":"..."},{"type":"strategic","subject":"...","body":"..."}]} No markdown.`
    },
    {
        path: 'ai-grant-proposal',
        prompt: (t) => `Write a complete grant proposal for "${t}". Include: Executive Summary, Organization Background, Problem Statement, Project Description, Goals and Objectives, Methodology, Evaluation Plan, Budget Narrative, Sustainability Plan, Conclusion. Professional nonprofit/academic tone. OUTPUT ONLY HTML.`
    },
    {
        path: 'ai-financial-summary',
        prompt: (t) => `Create a financial report summary for "${t}". Generate executive summary with: revenue highlights, expense analysis, profitability metrics, cash flow status, key financial ratios, budget vs actual, YoY comparison, and strategic recommendations. Professional CFO-level language. OUTPUT ONLY HTML with tables.`
    },
    {
        path: 'ai-budget-planner',
        prompt: (t) => `Create a detailed budget plan for "${t}". Include: income sources, fixed expenses, variable expenses, savings goals, emergency fund, investment allocation, monthly breakdown, annual projection, and money-saving recommendations. OUTPUT ONLY HTML with tables.`
    },
];

module.exports = { toolRoutes };
