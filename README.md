# ARIA — Suntek AI HR Assistant
 
AI-powered HR chatbot trained on Suntek AI's real company documents.
 
---
 
## 🗂️ Project Structure
 
```
aria-hr-bot/
├── index.html        ← Frontend (the chat UI)
├── api/
│   └── chat.js       ← Backend (serverless API — handles Gemini AI)
├── vercel.json       ← Vercel config
└── README.md
```
 
---
 
## 🚀 Deploy in 5 Steps
 
### STEP 1 — Get your FREE Gemini API Key
1. Go to **https://aistudio.google.com/apikey**
2. Sign in with Gmail
3. Click **"Create API Key"**
4. Copy the key (starts with `AIzaSy...`)
---
 
### STEP 2 — Upload to GitHub
1. Go to **https://github.com/new**
2. Name: `aria-hr-bot` → Click **Create repository**
3. Click **"uploading an existing file"**
4. Drag and drop ALL 3 files:
   - `index.html`
   - `api/chat.js` (create `api` folder first)
   - `vercel.json`
5. Click **Commit changes**
---
 
### STEP 3 — Connect to Vercel
1. Go to **https://vercel.com**
2. Sign in with GitHub
3. Click **"Add New Project"**
4. Select `aria-hr-bot` → Click **Import**
5. Click **Deploy** ← Do NOT add API key yet
---
 
### STEP 4 — Add API Key in Vercel ⭐ IMPORTANT
1. In Vercel → Your project → **Settings**
2. Click **"Environment Variables"**
3. Add:
   - **Name:** `GEMINI_API_KEY`
   - **Value:** paste your key from Step 1
4. Click **Save**
5. Go to **Deployments** → Click **"Redeploy"**
---
 
### STEP 5 — Share your URL!
Your chatbot is live at:
```
https://aria-hr-bot.vercel.app
```
Share this link with all Suntek AI employees! ✅
 
---
 
## 📬 HR Contact
- Khushi Ash: khushi@suntek.ai
- Rashmi: rshmi.s@suntek.ai
## 📚 Documents Trained On
- Employee Onboarding Guide
- Leave Policy 2026
- Maternity Benefit Act 2017
- Expense Claim Handbook
