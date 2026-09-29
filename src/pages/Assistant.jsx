import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
  Bot,
  Send,
  User,
  ArrowRight,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import Button from '../components/Button';
import { useToast } from '../context/ToastContext';

export const Assistant = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const messagesEndRef = useRef(null);

  const initialQuery = searchParams.get('query') || '';

  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 'm1',
      sender: 'ai',
      timestamp: 'Just now',
      text: 'Hello Rajesh Kumar Sharma! I am your Nagrik Mitra Assistant. You can ask me questions about any government scheme, check why an application or payment is pending, find out what documents you need, or learn how to file a complaint.',
      quickActions: [
        { label: 'Check PM Kisan status', route: '/applications/APP-2024-8901' },
        { label: 'Check Ayushman card eligibility', route: '/eligibility?scheme=ayushman-bharat' },
        { label: 'How to file a complaint', route: '/grievances' },
      ],
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    if (initialQuery) {
      handleUserSend(initialQuery);
    }
  }, [initialQuery]);

  const promptSuggestions = [
    'Why is my PM Kisan 17th installment delayed?',
    'What are the income criteria for Post-Matric Scholarship?',
    'How do I fix the Aadhaar seeding error on NPCI mapper?',
    'How to upload geotagged photo for PMAY housing?',
  ];

  const handleUserSend = (textToSend) => {
    const text = (textToSend || input).trim();
    if (!text) return;

    const userMsg = {
      id: Date.now().toString(),
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      let replyText = '';
      let replyActions = [];

      const lower = text.toLowerCase();
      if (lower.includes('kisan') || lower.includes('payment') || lower.includes('installment')) {
        replyText = `Based on your linked Aadhaar record (ending 4819), your PM Kisan Application (APP-2024-8901) is currently at Step 3: 'Land Verification'. The Tehsil desk in Varanasi cleared your record on 20-Sep-2024. Next, the Sub-Divisional Magistrate will release the sanction order. No action is required from you at this moment.`;
        replyActions = [
          { label: 'View Application Details', route: '/applications/APP-2024-8901' },
          { label: 'Verify Land Record Document', route: '/documents' },
        ];
      } else if (lower.includes('ayushman') || lower.includes('golden card') || lower.includes('health')) {
        replyText = `Under the SECC household database, your family is registered under ID #829104. Your Ayushman Golden Card is APPROVED and verified. You have access to cashless hospital care up to ₹5,00,000 across all empanelled hospitals.`;
        replyActions = [
          { label: 'View Approved Golden Card', route: '/applications/APP-2024-7623' },
          { label: 'Check DigiLocker Documents', route: '/documents' },
        ];
      } else if (lower.includes('grievance') || lower.includes('complaint') || lower.includes('dealer')) {
        replyText = `You can submit an official complaint under CPGRAMS rules. All complaints submitted through Nagrik Mitra are monitored at the district level with a mandated 30-day resolution guarantee.`;
        replyActions = [
          { label: 'File a Complaint on CPGRAMS', route: '/grievances' },
        ];
      } else if (lower.includes('pmay') || lower.includes('housing') || lower.includes('photo')) {
        replyText = `Your PMAY housing application (APP-2024-5110) needs a photo re-upload: The Block Development Officer requested a geotagged photo of your current residence. Please upload the clear photograph in your application page.`;
        replyActions = [
          { label: 'Resolve Action on Application', route: '/applications/APP-2024-5110' },
        ];
      } else {
        replyText = `I have checked the government welfare guidelines for you. You can check your personalized eligibility using our Eligibility Checker, or browse the directory of 450+ schemes.`;
        replyActions = [
          { label: 'Check Your Eligibility', route: '/eligibility' },
          { label: 'Browse All Schemes', route: '/services' },
        ];
      }

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'ai',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          text: replyText,
          quickActions: replyActions,
        },
      ]);
      setIsTyping(false);
    }, 700);
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: 'm-reset',
        sender: 'ai',
        timestamp: 'Just now',
        text: 'Conversation cleared. How can I help you with government schemes or applications today?',
        quickActions: [
          { label: 'Check Scheme Eligibility', route: '/eligibility' },
          { label: 'Track Applications', route: '/applications' },
        ],
      },
    ]);
    toast.info('Conversation Cleared', 'Assistant session has been reset.');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-4 py-2">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-teal-100 flex items-center justify-center text-teal-800 shadow-sm">
            <Bot className="w-5 h-5 text-teal-700" />
          </div>
          <div>
            <h1 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center space-x-2">
              <span>Nagrik Mitra Assistant</span>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                Official Guide
              </span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-500">
              Ask any question in simple everyday words to get clear guidance
            </p>
          </div>
        </div>

        <Button
          variant="secondary"
          size="xs"
          icon={RotateCcw}
          onClick={handleResetChat}
        >
          Clear Chat
        </Button>
      </div>

      {/* Main Conversation Box */}
      <div className="card-hover bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col h-[calc(100vh-13rem)] min-h-[440px] max-h-[720px]">
        {/* Messages Stream */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-slate-50/50">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${
                msg.sender === 'user' ? 'flex-row-reverse' : ''
              }`}
            >
              {/* Avatar */}
              <div
                className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center text-xs font-semibold ${
                  msg.sender === 'user'
                    ? 'bg-teal-700 text-white'
                    : 'bg-white text-teal-800 border border-slate-200 shadow-sm'
                }`}
              >
                {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              {/* Message Bubble */}
              <div
                className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed shadow-sm ${
                  msg.sender === 'user'
                    ? 'bg-teal-700 text-white'
                    : 'bg-white border border-slate-200 text-slate-800'
                }`}
              >
                <div className="flex items-center justify-between text-[11px] mb-1.5 opacity-70">
                  <span className="font-semibold">
                    {msg.sender === 'user' ? 'You' : 'Nagrik Mitra Assistant'}
                  </span>
                  <span>{msg.timestamp}</span>
                </div>

                <p className="whitespace-pre-line">{msg.text}</p>

                {/* Embedded Action Pills */}
                {msg.quickActions && msg.quickActions.length > 0 && (
                  <div className="mt-3 pt-2.5 border-t border-slate-100 flex flex-wrap gap-2">
                    {msg.quickActions.map((action, idx) => (
                      <button
                        key={idx}
                        onClick={() => navigate(action.route)}
                        className="inline-flex items-center space-x-1 px-3 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 text-xs font-medium transition-colors"
                      >
                        <span>{action.label}</span>
                        <ArrowRight className="w-3 h-3 text-teal-700" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full shrink-0 flex items-center justify-center bg-white text-teal-800 border border-slate-200 shadow-sm">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-white border border-slate-200 p-3.5 rounded-2xl text-xs text-slate-500 shadow-sm flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-teal-600 animate-pulse" />
                <span>Checking official scheme guidelines...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Prompt Suggestions */}
        <div className="px-4 py-2.5 bg-white border-t border-slate-200 flex items-center space-x-2 overflow-x-auto text-xs">
          <span className="text-slate-500 shrink-0 font-medium">Suggestions:</span>
          {promptSuggestions.map((prompt, i) => (
            <button
              key={i}
              onClick={() => handleUserSend(prompt)}
              className="px-3 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 text-xs whitespace-nowrap transition-colors"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3.5 bg-white border-t border-slate-200">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleUserSend();
            }}
            className="flex items-center space-x-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about any government scheme, document, or application..."
              className="flex-1 px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-teal-700 focus:bg-white focus:ring-1 focus:ring-teal-700 transition-colors"
            />
            <Button
              type="submit"
              variant="primary"
              disabled={!input.trim() || isTyping}
              icon={Send}
            >
              Send
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Assistant;
