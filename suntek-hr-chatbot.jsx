import { useState, useRef, useEffect } from "react";

const HR_SYSTEM_PROMPT = `You are ARIA (Automated Resource & Information Assistant), the official HR chatbot for Suntek AI — a profitable, self-sustaining technology startup headquartered in New Jersey with a core product team in India. You help employees get instant answers to HR-related queries.

Be warm, professional, and concise. Respond in 2-4 short paragraphs max. Use bullet points for lists. Always direct employees to Khushi Ash (HR) via email for sensitive or unresolved matters.

=============================
COMPANY OVERVIEW
=============================
- Suntek AI is profitable & unfunded — growth is driven by revenue and results, not external funding.
- Offices: HQ in New Jersey, core product team in India.
- Clients include: Myntra, Miracle, Bambi Baby, The Outset (Scarlett Johansson Brand).
- Founders: Faisal Shakeel & Vedang Singh.

TEAM:
Under Faisal Shakeel: Manav Goel (Marketing Manager), Suman Saha (Lead Web Developer), Khushi Ash (Assistant Manager HR), Rahul Bhatt (Associate Product Manager), Suhita Paik (Senior Product Manager), Ashwin Tyagi (Assistant Manager).
Under Vedang Singh: Apralim Mahata (Junior Developer), Madhushree BJ (UI/UX Head), Soumya Kanta M. (Head of Ecommerce), Shubham Pandey (Junior Software Developer), Hrithik Singh (Associate Product Manager), Mohan Nandana (Web Analyst).

=============================
ONBOARDING — FIRST 48 HOURS
=============================
1. Get Your Credentials: HR provides your official email ID and Slack access on or before Day 1.
2. Complete Your Profile: Fill in personal and bank details on the HRMS portal for payroll and system access.
3. Meet Your Manager: Your manager will reach out once accounts are active to share initial tasks and expectations.

Documents/details required on Day 1:
- Full Name & Contact Number
- Date of Birth
- Emergency Contact Details
- Blood Group
- Permanent Address
- Bank Details for Salary

=============================
PAYROLL
=============================
- Salary is disbursed between the 1st and 5th of each month.
- Ensure HRMS profile has correct bank details on Day 1 for smooth payroll.

=============================
WORKING HOURS & ATTENDANCE
=============================
- Core Days: Monday to Friday. Occasional Saturdays may be needed for critical deadlines.
- Flexible Hours: Focus is on results, not just hours clocked. Flexible hours are welcome as long as work is delivered on time, communication is prompt, and productivity targets are met.
- Attendance: Daily start and end times are recorded via designated physical or digital systems — for accountability, payroll validation, and performance evaluation.
- Note: Founders and team members may work unconventional hours. Find the schedule that makes you most productive while staying aligned with your team.

=============================
DEVICE & INFRASTRUCTURE (BYOD)
=============================
- Suntek AI follows a "Bring Your Own Device" (BYOD) model.
- Employees use their own personal laptops for work.
- Device purchase, maintenance, and repair costs are NOT reimbursed.
- A stable Wi-Fi connection is required. Wi-Fi expenses are NOT reimbursed by the company.

=============================
LEAVE POLICY (Effective Jan–Dec calendar year)
All leaves are prorated for mid-year joiners.
=============================

PRIVILEGE LEAVE (PL) — 12 days/year:
- Available only AFTER completing the 3-month probation period.
- Best for: Planned vacations, personal work, long breaks.
- Can be carried forward up to 24 days max. Beyond 24 days, it lapses.
- PL is the ONLY leave eligible for encashment at the time of resignation/separation. CL and SL are NOT encashable.
- Longer leave (beyond standard) is possible after 10–12 months of service, with approval.
- Must be applied in advance (exceptions for emergencies).

SICK LEAVE (SL) — 6 days/year:
- Available from Day 1.
- For illness, medical emergencies, or critical personal tasks like passport renewal.
- No prior approval needed for sudden illness, but inform your manager ASAP.
- Medical certificate required if sick leave exceeds 2 consecutive days.
- Unused SL lapses at year end — NOT carried forward.
- Can be taken as a full day or half-day.

CASUAL LEAVE (CL) — 6 days/year:
- Available from Day 1.
- For short, unplanned absences or urgent personal matters.
- Apply in advance where possible.
- Unused CL lapses at year end — NOT carried forward.
- Can be taken as a full day or half-day.

MATERNITY LEAVE:
- Eligibility: Female employees who have completed at least 90 days of service in the 12 months before the expected delivery date.
- Duration for 1st and 2nd child: 26 weeks (6 months) paid leave.
- Duration for 3rd or subsequent child: 12 weeks (3 months) paid leave.
- Up to 8 weeks can be taken BEFORE the expected delivery date. Remaining is post-delivery.
- Miscarriage or medical complications: 6 weeks of paid leave.
- Pay: At employee's basic salary.
- Notice: Inform your immediate supervisor at least 8 weeks before the expected delivery date.
- Governed by the Maternity Benefit Act, 2017 (India).
- Employers cannot dismiss or fire an employee on maternity leave — it is a legal offence.

PATERNITY LEAVE:
- 5 days of paid paternity leave.
- Must be availed within 6 months of the child's birth.
- Paid at full basic salary.

LEAVE WITHOUT PAY (LWP):
- Applicable only when all leave balances are exhausted.
- Requires formal approval from both your reporting manager AND HR.
- No salary is paid during LWP.
- If LWP exceeds 1 month, some employment benefits may be reviewed.
- Unapproved LWP is a policy violation and may lead to disciplinary action.

HALF-DAY LEAVE:
- Requires prior approval from reporting manager.
- Can be morning or afternoon session.
- Deducted from PL or SL balance. If no balance, treated as LWP.

LEAVE APPLICATION PROCEDURE:
- Planned leave: Apply at least 7 days in advance.
- Unplanned leave (illness etc.): Inform your manager within 2 hours of your scheduled start time.
- During probation: Focus on continuity and minimize non-essential leave. PL is NOT available during probation.
- Public holidays are per the official company holiday calendar.

=============================
COMMUNICATION GUIDELINES
=============================
For Day-to-Day Work & Performance:
- Contact: Your Immediate Manager
- Channel: Slack or as per team norms

For HR & Admin (Salary, Leave, Policy, HRMS):
- Contact: Khushi Ash / HR Department
- Channel: EMAIL ONLY — WhatsApp and informal messages are discouraged.
- Urgent matters only: You may call.
- HR responds within 24 hours.

=============================
IMPORTANT RULES
=============================
- Never make up information not listed here.
- If something is outside your knowledge base, say: "I don't have that specific detail right now — please email Khushi Ash (HR) for a tracked response."
- Never speculate on salary amounts, individual employee data, or disciplinary decisions.`;

const QUICK_QUESTIONS = [
  "How many leaves do I get?",
  "When is salary credited?",
  "BYOD policy?",
  "How to apply for sick leave?",
  "What is maternity leave?",
  "Who is the HR contact?",
  "What do I do on Day 1?",
  "Can I carry forward my PL?",
];

const BotIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <rect x="3" y="8" width="18" height="13" rx="3" fill="currentColor" opacity="0.2"/>
    <rect x="3" y="8" width="18" height="13" rx="3" stroke="currentColor" strokeWidth="1.5"/>
    <circle cx="9" cy="14" r="1.5" fill="currentColor"/>
    <circle cx="15" cy="14" r="1.5" fill="currentColor"/>
    <path d="M9 19h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M12 8V5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="12" cy="4" r="1" fill="currentColor"/>
    <path d="M7 8V6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M17 8V6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);
const SendIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path d="M22 2L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const UserIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

function TypingDots() {
  return (
    <div style={{ display: "flex", gap: 4, alignItems: "center", padding: "4px 0" }}>
      {[0,1,2].map(i => (
        <div key={i} style={{
          width:7,height:7,borderRadius:"50%",background:"#22d3ee",
          animation:"bounce 1.2s infinite",animationDelay:`${i*0.2}s`
        }}/>
      ))}
    </div>
  );
}

function Message({ msg }) {
  const isBot = msg.role === "assistant";
  return (
    <div style={{
      display:"flex", gap:10,
      flexDirection: isBot ? "row" : "row-reverse",
      marginBottom:18, animation:"fadeSlide 0.3s ease"
    }}>
      <div style={{
        width:34, height:34, borderRadius:"50%",
        background: isBot ? "linear-gradient(135deg,#06b6d4,#0891b2)" : "linear-gradient(135deg,#6366f1,#4f46e5)",
        display:"flex", alignItems:"center", justifyContent:"center",
        color:"white", flexShrink:0, marginTop:2,
        boxShadow: isBot ? "0 0 12px rgba(6,182,212,0.4)" : "0 0 12px rgba(99,102,241,0.4)",
      }}>
        {isBot ? <BotIcon/> : <UserIcon/>}
      </div>
      <div style={{
        maxWidth:"74%",
        background: isBot ? "linear-gradient(135deg,rgba(6,182,212,0.07),rgba(8,145,178,0.03))" : "linear-gradient(135deg,rgba(99,102,241,0.12),rgba(79,70,229,0.06))",
        border: isBot ? "1px solid rgba(6,182,212,0.18)" : "1px solid rgba(99,102,241,0.2)",
        borderRadius: isBot ? "4px 16px 16px 16px" : "16px 4px 16px 16px",
        padding:"12px 16px", color:"#e2e8f0", fontSize:14, lineHeight:1.65, whiteSpace:"pre-wrap",
      }}>
        {msg.content}
      </div>
    </div>
  );
}

export default function SuntekHRBot() {
  const [messages, setMessages] = useState([{
    role:"assistant",
    content:"👋 Hi! I'm ARIA, Suntek AI's HR Assistant.\n\nI've been trained on your actual company documents:\n📄 Employee Onboarding Guide\n📄 Leave Policy 2026\n📄 Maternity Benefit Act 2017\n\nAsk me anything about leave, payroll, onboarding, BYOD, or HR contacts!"
  }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showQuick, setShowQuick] = useState(true);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({behavior:"smooth"}); }, [messages, loading]);

  const sendMessage = async (text) => {
    const userText = text || input.trim();
    if (!userText || loading) return;
    setInput(""); setShowQuick(false);
    const newMessages = [...messages, {role:"user", content:userText}];
    setMessages(newMessages);
    setLoading(true);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({
          model:"claude-sonnet-4-20250514", max_tokens:1000,
          system: HR_SYSTEM_PROMPT,
          messages: newMessages.map(m=>({role:m.role, content:m.content}))
        })
      });
      const data = await res.json();
      const reply = data.content?.[0]?.text || "I'm having trouble responding. Please try again.";
      setMessages(prev => [...prev, {role:"assistant", content:reply}]);
    } catch {
      setMessages(prev => [...prev, {role:"assistant", content:"⚠️ Connection issue. Please email Khushi Ash (HR) directly."}]);
    }
    setLoading(false);
    inputRef.current?.focus();
  };

  return (
    <div style={{
      minHeight:"100vh",
      background:"linear-gradient(135deg,#020617 0%,#0c1a2e 50%,#020617 100%)",
      display:"flex", alignItems:"center", justifyContent:"center",
      fontFamily:"'DM Sans','Segoe UI',sans-serif", padding:20,
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Space+Grotesk:wght@600;700&display=swap');
        @keyframes bounce{0%,60%,100%{transform:translateY(0)}30%{transform:translateY(-6px)}}
        @keyframes fadeSlide{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.5}}
        ::-webkit-scrollbar{width:4px}
        ::-webkit-scrollbar-thumb{background:rgba(6,182,212,0.3);border-radius:4px}
        textarea:focus{outline:none} textarea{resize:none}
        .qbtn:hover{background:rgba(6,182,212,0.12)!important;color:#22d3ee!important;border-color:rgba(6,182,212,0.35)!important}
      `}</style>

      <div style={{
        width:"100%", maxWidth:700,
        background:"rgba(2,12,27,0.92)", backdropFilter:"blur(20px)",
        border:"1px solid rgba(6,182,212,0.15)", borderRadius:24,
        boxShadow:"0 0 80px rgba(6,182,212,0.08),0 40px 80px rgba(0,0,0,0.6)",
        display:"flex", flexDirection:"column",
        height:"92vh", maxHeight:820, overflow:"hidden",
      }}>

        {/* Header */}
        <div style={{padding:"16px 22px 12px", borderBottom:"1px solid rgba(6,182,212,0.1)", background:"linear-gradient(135deg,rgba(6,182,212,0.05),transparent)"}}>
          <div style={{display:"flex", alignItems:"center", gap:12, marginBottom:10}}>
            <div style={{
              width:44, height:44, borderRadius:13,
              background:"linear-gradient(135deg,#06b6d4,#0369a1)",
              display:"flex", alignItems:"center", justifyContent:"center",
              boxShadow:"0 0 20px rgba(6,182,212,0.35)", fontSize:21
            }}>🤖</div>
            <div style={{flex:1}}>
              <div style={{fontFamily:"'Space Grotesk',sans-serif", fontSize:16, fontWeight:700, color:"#e2e8f0", letterSpacing:"-0.3px"}}>
                ARIA — Suntek AI HR Assistant
              </div>
              <div style={{fontSize:11, color:"#22d3ee", display:"flex", alignItems:"center", gap:5, marginTop:2}}>
                <div style={{width:5,height:5,borderRadius:"50%",background:"#22d3ee",animation:"pulse 2s infinite"}}/>
                Online · Powered by your real HR documents
              </div>
            </div>
          </div>
          {/* Doc pills */}
          <div style={{display:"flex", gap:5, flexWrap:"wrap"}}>
            {["📋 Onboarding Guide","📅 Leave Policy 2026","🤰 Maternity Benefit Act"].map(d=>(
              <span key={d} style={{
                fontSize:10, color:"#34d399",
                background:"rgba(16,185,129,0.07)",
                border:"1px solid rgba(16,185,129,0.18)",
                borderRadius:20, padding:"2px 9px"
              }}>{d}</span>
            ))}
          </div>
        </div>

        {/* Messages */}
        <div style={{flex:1, overflowY:"auto", padding:"18px 18px 6px"}}>
          {messages.map((msg,i) => <Message key={i} msg={msg}/>)}
          {loading && (
            <div style={{display:"flex", gap:10, marginBottom:18}}>
              <div style={{
                width:34,height:34,borderRadius:"50%",
                background:"linear-gradient(135deg,#06b6d4,#0891b2)",
                display:"flex",alignItems:"center",justifyContent:"center",
                color:"white",flexShrink:0,boxShadow:"0 0 12px rgba(6,182,212,0.4)"
              }}><BotIcon/></div>
              <div style={{background:"rgba(6,182,212,0.06)",border:"1px solid rgba(6,182,212,0.15)",borderRadius:"4px 16px 16px 16px",padding:"12px 16px"}}>
                <TypingDots/>
              </div>
            </div>
          )}
          <div ref={bottomRef}/>
        </div>

        {/* Quick Questions */}
        {showQuick && (
          <div style={{padding:"0 18px 10px"}}>
            <div style={{fontSize:10,color:"rgba(148,163,184,0.4)",marginBottom:6,letterSpacing:"0.6px",textTransform:"uppercase"}}>Quick questions</div>
            <div style={{display:"flex",flexWrap:"wrap",gap:5}}>
              {QUICK_QUESTIONS.map((q,i)=>(
                <button key={i} className="qbtn" onClick={()=>sendMessage(q)} style={{
                  background:"rgba(6,182,212,0.04)", border:"1px solid rgba(6,182,212,0.13)",
                  borderRadius:20, padding:"5px 11px", fontSize:12, color:"#94a3b8",
                  cursor:"pointer", transition:"all 0.2s"
                }}>{q}</button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div style={{padding:"10px 18px 16px", borderTop:"1px solid rgba(6,182,212,0.08)"}}>
          <div style={{
            display:"flex", gap:8, alignItems:"flex-end",
            background:"rgba(255,255,255,0.03)",
            border:"1px solid rgba(6,182,212,0.2)",
            borderRadius:15, padding:"9px 11px",
          }}>
            <textarea ref={inputRef} rows={1} value={input}
              onChange={e=>{
                setInput(e.target.value);
                e.target.style.height="auto";
                e.target.style.height=Math.min(e.target.scrollHeight,100)+"px";
              }}
              onKeyDown={e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();sendMessage();}}}
              placeholder="Ask about leave, payroll, onboarding, BYOD..."
              style={{flex:1,background:"transparent",border:"none",color:"#e2e8f0",fontSize:14,lineHeight:1.5,fontFamily:"inherit",padding:0,maxHeight:100,overflowY:"auto"}}
            />
            <button onClick={()=>sendMessage()} disabled={!input.trim()||loading} style={{
              width:34,height:34,borderRadius:9,
              background:input.trim()&&!loading?"linear-gradient(135deg,#06b6d4,#0891b2)":"rgba(6,182,212,0.08)",
              border:"none",cursor:input.trim()&&!loading?"pointer":"default",
              display:"flex",alignItems:"center",justifyContent:"center",
              color:input.trim()&&!loading?"white":"rgba(6,182,212,0.25)",
              transition:"all 0.2s",flexShrink:0,
              boxShadow:input.trim()&&!loading?"0 0 14px rgba(6,182,212,0.3)":"none",
            }}><SendIcon/></button>
          </div>
          <div style={{fontSize:10,color:"rgba(100,116,139,0.4)",textAlign:"center",marginTop:6}}>
            Sensitive matters → Email Khushi Ash (HR) · Enter to send
          </div>
        </div>
      </div>
    </div>
  );
}
