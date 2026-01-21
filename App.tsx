
import React, { useState, useCallback, useMemo } from 'react';
import { 
  ChevronLeft, RotateCcw, CheckCircle2, FileText, AlertTriangle, 
  Send, Loader2, Database, Shield, Zap, Search, MapPin, 
  ArrowRight, Info, AlertCircle, TrendingDown, Target, BarChart3, ChevronDown, ChevronUp
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { STEPS, THEME, generateDiagnosticData, DiagnosticResult, ReportCategory } from './constants';
import { FormData } from './types';

const WHATSAPP_LINK = "https://wa.me/5521985899548?text=Ol%C3%A1!%20Finalizei%20meu%20diagn%C3%B3stico%20e%20quero%20saber%20como%20subir%20meu%20score%20no%20Google.";
const WEBHOOK_URL = "https://script.google.com/macros/s/AKfycby9O59l0TD_Z5LAg4LdmJEo6iqSvSaOEfSwAUQ2DoVNoE_XC1OdoJWNV-ii9mhbNEok/exec"; 

const GlobalStyles = () => (
  <style>{`
    @keyframes fade-in { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes slide-up { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes scale-in { from { transform: scale(0.9); opacity: 0; } to { transform: scale(1); opacity: 1; } }
    @keyframes progress-grow { from { width: 0; } }
    .animate-fade-in { animation: fade-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
    .animate-slide-up { animation: slide-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
    .animate-scale-in { animation: scale-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
    .animate-pulse-subtle { animation: pulse 2s infinite; }
    @keyframes pulse { 0% { opacity: 1; } 50% { opacity: 0.8; } 100% { opacity: 1; } }
    .no-scrollbar::-webkit-scrollbar { display: none; }
    .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
  `}</style>
);

const GoogleBrandText = () => (
  <span className="inline-flex font-black">
    <span style={{ color: '#4285F4' }}>G</span><span style={{ color: '#EA4335' }}>o</span><span style={{ color: '#FBBC05' }}>o</span><span style={{ color: '#4285F4' }}>g</span><span style={{ color: '#34A853' }}>l</span><span style={{ color: '#EA4335' }}>e</span>
  </span>
);

const ScoreGauge = ({ score }: { score: number }) => {
  const color = score < 40 ? THEME.danger : score < 75 ? THEME.warning : THEME.success;
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center w-40 h-40 animate-scale-in">
      <svg className="w-full h-full -rotate-90">
        <circle cx="80" cy="80" r={radius} fill="transparent" stroke="#F3F4F6" strokeWidth="12" />
        <circle 
          cx="80" cy="80" r={radius} fill="transparent" stroke={color} strokeWidth="12" 
          strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-4xl font-black text-gray-900 leading-none">{score}%</span>
        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Audit Score</span>
      </div>
    </div>
  );
};

const CategoryCard = ({ category }: { category: ReportCategory }) => {
  const [isOpen, setIsOpen] = useState(false);
  const colorClass = category.status === 'critical' ? 'text-red-600 bg-red-50' : category.status === 'warning' ? 'text-orange-600 bg-orange-50' : 'text-green-600 bg-green-50';
  const progressColor = category.status === 'critical' ? 'bg-red-500' : category.status === 'warning' ? 'bg-orange-500' : 'bg-green-500';

  return (
    <div className="w-full bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden animate-slide-up transition-all active:scale-[0.98]">
      <div 
        role="button"
        tabIndex={0}
        onClick={() => setIsOpen(!isOpen)} 
        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setIsOpen(!isOpen)}
        className="w-full p-5 flex items-center justify-between text-left cursor-pointer outline-none"
      >
        <div className="flex flex-col flex-1 pr-4">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm font-black text-gray-800 uppercase tracking-tight">{category.title}</span>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${colorClass}`}>
              {category.status === 'critical' ? 'Crítico' : category.status === 'warning' ? 'Alerta' : 'Excelente'}
            </span>
          </div>
          <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden mt-2">
            <div className={`h-full ${progressColor} transition-all duration-1000`} style={{ width: `${category.score}%` }} />
          </div>
        </div>
        {isOpen ? <ChevronUp size={20} className="text-gray-300" /> : <ChevronDown size={20} className="text-gray-300" />}
      </div>
      
      {isOpen && (
        <div className="px-5 pb-5 pt-0 animate-fade-in">
          <ul className="space-y-3 border-t border-gray-50 pt-4">
            {category.findings.map((f, i) => (
              <li key={i} className="flex gap-3 text-xs leading-relaxed text-gray-500 font-medium">
                <div className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${progressColor}`} />
                {f}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const SkippLogo = () => (
  <div className="flex flex-col items-center justify-center mb-6 w-full animate-fade-in">
    <div className="flex items-center leading-none">
      <span className="text-2xl font-black italic tracking-tighter" style={{ 
        background: THEME.brandGradient, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
      }}>Skipp</span>
      <span className="text-2xl font-bold text-[#0B0B0B] tracking-tight ml-0.5">Digital</span>
    </div>
    <span className="text-[9px] font-medium text-gray-400 uppercase tracking-[0.4em] mt-1.5">Intelligence Audit</span>
  </div>
);

const SalesPage = ({ data, onReset }: { data: DiagnosticResult, onReset: () => void }) => {
  return (
    <div className="h-screen w-full max-w-md mx-auto bg-gray-50/50 overflow-y-auto no-scrollbar pb-32 pt-8 px-6">
      <GlobalStyles />
      <SkippLogo />

      <div className="flex flex-col items-center text-center mb-8">
        <ScoreGauge score={data.overallScore} />
        <h2 className="text-xl font-black text-gray-900 mt-4 leading-tight">
          Status: <span className={data.overallScore < 40 ? 'text-red-600' : data.overallScore < 75 ? 'text-orange-500' : 'text-green-600'}>
            {data.archetype}
          </span>
        </h2>
        <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">Auditado para {data.name}</p>
      </div>

      <div className="bg-white p-5 rounded-[2.5rem] border border-blue-50 shadow-sm mb-6 animate-slide-up">
        <div className="flex items-center gap-2 mb-3">
          <Zap size={18} className="text-blue-500 fill-blue-500" />
          <span className="text-xs font-black text-gray-800 uppercase tracking-widest">Insight Estratégico</span>
        </div>
        <p className="text-xs leading-relaxed text-gray-600 font-medium text-justify italic">
          "{data.mainInsight}"
        </p>
      </div>

      {data.aiAnalysis && (
        <div className="bg-purple-50 p-5 rounded-[2.5rem] border border-purple-100 mb-6 animate-slide-up" style={{ animationDelay: '200ms' }}>
          <div className="flex items-center gap-2 mb-3">
            <Search size={18} className="text-purple-600" />
            <span className="text-xs font-black text-purple-800 uppercase tracking-widest">Análise de IA (Googlebot)</span>
          </div>
          <p className="text-[11px] leading-relaxed text-purple-900 font-bold opacity-80">
            {data.aiAnalysis}
          </p>
        </div>
      )}

      <div className="space-y-4 mb-10">
        <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] px-2 block">Diagnóstico Detalhado</span>
        {data.categories.map((cat, idx) => (
          <div key={cat.id} style={{ animationDelay: `${(idx + 1) * 150}ms` }}>
            <CategoryCard category={cat} />
          </div>
        ))}
      </div>

      <div className="bg-red-50 p-6 rounded-[2.5rem] border border-red-100 mb-10">
        <div className="flex items-center gap-2 mb-2 text-red-600">
          <TrendingDown size={18} />
          <span className="text-xs font-black uppercase tracking-widest">Custo da Omissão</span>
        </div>
        <p className="text-xs text-red-800/80 font-bold leading-relaxed">
          Cada semana com esse score significa pelo menos 3 a 7 novos clientes que clicam no seu concorrente direto em vez de falar com você.
        </p>
      </div>

      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto p-6 bg-white/80 backdrop-blur-xl border-t border-gray-100 z-50">
        <a 
          href={WHATSAPP_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-6 rounded-[2rem] text-white font-black text-lg shadow-xl flex items-center justify-center gap-3 transition-all active:scale-95 animate-pulse-subtle"
          style={{ background: THEME.success }}
        >
          <Send size={20} />
          Recuperar meu Ranking
        </a>
      </div>

      <button onClick={onReset} className="w-full text-center text-gray-400 text-[10px] font-bold uppercase tracking-widest py-4 mb-4"><RotateCcw size={10} className="inline mr-1" /> Refazer Auditoria</button>
    </div>
  );
};

const SubmissionLoading = ({ isAnalyzing, isSaving }: { isAnalyzing: boolean, isSaving: boolean }) => (
  <div className="h-screen bg-white flex flex-col items-center justify-center px-10 text-center animate-fade-in">
    <GlobalStyles />
    <SkippLogo />
    <div className="relative mb-10">
      <div className="w-32 h-32 rounded-full border-2 border-gray-50 flex items-center justify-center">
        <Loader2 size={48} className="text-blue-500 animate-spin" />
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        {isSaving ? <Database size={32} className="text-green-500" /> : <Shield size={32} className="text-blue-400 animate-pulse" />}
      </div>
    </div>
    <h2 className="text-2xl font-black text-gray-900 mb-4 leading-tight">
      {isAnalyzing ? 'Analisando seu Perfil...' : isSaving ? 'Segurança de Dados...' : 'Gerando Diagnóstico...'}
    </h2>
    <div className="w-48 bg-gray-100 h-1.5 rounded-full overflow-hidden">
        <div className="h-full bg-blue-500 animate-[progress-grow_3s_ease-in-out_infinite]" />
    </div>
    <p className="text-[10px] font-bold text-gray-400 mt-6 uppercase tracking-[0.2em] max-w-[200px] leading-relaxed">
      {isAnalyzing ? 'Simulando busca local do Google via API.' : 'Protegendo informações sob protocolos de criptografia.'}
    </p>
  </div>
);

const App: React.FC = () => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [formData, setFormData] = useState<FormData>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [aiAnalysisResult, setAiAnalysisResult] = useState<string | null>(null);

  const currentStep = STEPS[currentStepIndex] || STEPS[0];

  const analyzeProfile = async (link: string, answers: Record<string, string>) => {
    try {
      if (!process.env.API_KEY) return null;
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `Gere uma análise técnica curta (máximo 40 palavras) sobre este Perfil de Empresa: ${link}. Respostas do dono: ${JSON.stringify(answers)}. Foque em palavras como 'Sinais de Frescor', 'Canibalização' ou 'Ranking Geográfico'. Seja direto e profissional.`;
      const response = await ai.models.generateContent({ 
        model: 'gemini-3-flash-preview', 
        contents: prompt 
      });
      return response.text;
    } catch (e) { return null; }
  };

  const submitLead = async () => {
    if (isSubmitting || isSubmitted) return;
    setIsSubmitting(true);
    
    const friendlyAnswers: Record<string, string> = {
      timestamp: new Date().toLocaleString('pt-BR'),
      nome: String(formData[11] || ''),
      whatsapp: String(formData[12] || ''),
      perfil: String(formData[13] || '')
    };

    if (friendlyAnswers.perfil && friendlyAnswers.perfil.length > 5) {
      setIsAnalyzing(true);
      const analysis = await analyzeProfile(friendlyAnswers.perfil, friendlyAnswers);
      if (analysis) setAiAnalysisResult(analysis);
      setIsAnalyzing(false);
    }

    setIsSaving(true);
    try {
      await fetch(WEBHOOK_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify({ ...friendlyAnswers, ...formData })
      });
      await new Promise(r => setTimeout(r, 600));
    } catch (e) {} finally {
      setIsSaving(false);
      setIsSubmitting(false);
      setIsSubmitted(true);
    }
  };

  const handleNext = useCallback(() => {
    if (currentStepIndex < STEPS.length - 1) setCurrentStepIndex(prev => prev + 1);
    else submitLead();
  }, [currentStepIndex, formData]);

  const handleSelect = (optionId: string) => {
    setFormData(prev => ({ ...prev, [currentStep.id]: optionId }));
    setTimeout(() => handleNext(), 350);
  };
  
  const handleTextChange = (v: string) => setFormData(prev => ({ ...prev, [currentStep.id]: v }));

  const isStepValid = () => {
    if (currentStep.type === 'info') return true;
    const value = formData[currentStep.id];
    if (currentStep.type === 'text') {
      if (currentStep.id === 13) return true;
      return value && String(value).trim().length > 0;
    }
    return !!value;
  };

  // Move useMemo before early returns to follow Rules of Hooks
  const diagnosticData = useMemo(() => isSubmitted ? generateDiagnosticData(formData, aiAnalysisResult) : null, [isSubmitted, formData, aiAnalysisResult]);

  if (isSubmitting) return <SubmissionLoading isAnalyzing={isAnalyzing} isSaving={isSaving} />;
  
  if (isSubmitted && diagnosticData) {
    return <SalesPage data={diagnosticData} onReset={() => { setCurrentStepIndex(0); setFormData({}); setIsSubmitted(false); setAiAnalysisResult(null); }} />;
  }

  return (
    <div className="h-screen bg-white flex flex-col max-w-md mx-auto relative overflow-hidden">
      <GlobalStyles />
      <div className="fixed top-0 left-0 right-0 z-50 bg-gray-50 h-1.5 max-w-md mx-auto">
        <div className="h-full transition-all duration-700 ease-in-out" style={{ background: THEME.brandGradient, width: `${currentStep?.progress ?? 0}%` }} />
      </div>
      <main className="flex-1 pt-12 pb-40 px-6 flex flex-col overflow-y-auto no-scrollbar">
        <SkippLogo />
        <div key={currentStepIndex} className="w-full flex-1 animate-fade-in">
          <h1 className="text-2xl font-black text-center leading-tight mb-3 text-gray-900">
            {currentStep.title.split(/(Google)/g).map((p, i) => p === 'Google' ? <GoogleBrandText key={i} /> : p)}
          </h1>
          {currentStep.subtitle && <p className="text-center text-gray-400 mb-8 font-bold text-[11px] leading-relaxed uppercase tracking-wider">{currentStep.subtitle}</p>}
          
          {currentStep.type === 'text' ? (
            <div className="animate-slide-up">
              <input 
                type="text" autoFocus
                placeholder={currentStep.placeholder}
                value={(formData[currentStep.id] as string) || ''}
                onChange={(e) => handleTextChange(e.target.value)}
                className="w-full p-6 text-lg rounded-[2.5rem] border-2 border-gray-100 bg-white focus:border-blue-500 focus:outline-none transition-all font-bold text-gray-900 shadow-sm"
              />
            </div>
          ) : currentStep.type === 'radio' ? (
            <div className="flex flex-col gap-3">
              {currentStep.options?.map((opt, i) => (
                <div 
                  key={opt.id} 
                  role="button"
                  tabIndex={0}
                  onClick={() => handleSelect(opt.id)} 
                  onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleSelect(opt.id)}
                  className={`p-6 rounded-[2.5rem] text-left transition-all border-2 animate-slide-up flex items-center gap-4 cursor-pointer outline-none ${formData[currentStep.id] === opt.id ? 'bg-blue-50 border-blue-500' : 'border-gray-50 bg-white active:bg-gray-50'}`}
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${formData[currentStep.id] === opt.id ? 'bg-blue-600 border-blue-600' : 'border-gray-200'}`}>
                    {formData[currentStep.id] === opt.id && <CheckCircle2 size={16} color="white" />}
                  </div>
                  <span className="text-sm font-black text-gray-700">{opt.label}</span>
                </div>
              ))}
            </div>
          ) : (
             <div className="flex flex-col items-center gap-8 animate-slide-up text-center">
                <div className="bg-green-50 p-6 rounded-full"><CheckCircle2 size={48} className="text-green-500" /></div>
                <p className="text-gray-500 text-sm font-bold uppercase tracking-widest leading-relaxed">Clique no botão abaixo para processar seus dados e gerar sua auditoria técnica.</p>
                <button onClick={handleNext} className="w-full py-6 rounded-[2rem] text-white font-black text-lg shadow-xl flex items-center justify-center gap-3 active:scale-95" style={{ background: THEME.brandGradient }}>
                  Gerar Auditoria <ArrowRight size={20} />
                </button>
             </div>
          )}
        </div>
      </main>
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/95 backdrop-blur-md z-50 border-t border-gray-50 pb-safe">
        {currentStep.type === 'text' && (
          <div className="p-4 pt-2">
             <button onClick={handleNext} disabled={!isStepValid()} className="w-full py-5 rounded-[2rem] text-white text-lg font-black shadow-lg disabled:opacity-30" style={{ background: THEME.brandGradient }}>Continuar</button>
          </div>
        )}
        <footer className="p-5 flex justify-between items-center px-10">
          <button onClick={() => currentStepIndex > 0 && setCurrentStepIndex(c => c - 1)} disabled={currentStepIndex === 0} className="w-10 h-10 flex items-center justify-center disabled:opacity-10"><ChevronLeft size={28} /></button>
          <div className="flex gap-1.5 items-center">{STEPS.map((_, i) => <div key={i} className={`rounded-full transition-all ${i === currentStepIndex ? 'w-5 h-1.5 bg-blue-500' : 'w-1.5 h-1.5 bg-gray-200'}`} />)}</div>
          <button onClick={() => window.confirm('Reiniciar?') && setCurrentStepIndex(0)} className="w-10 h-10 flex items-center justify-center"><RotateCcw size={20} className="text-gray-300" /></button>
        </footer>
      </div>
    </div>
  );
};

export default App;
