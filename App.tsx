
import React, { useState, useCallback, useMemo } from 'react';
import { 
  ChevronLeft, RotateCcw, CheckCircle2, FileText, AlertTriangle, 
  Send, Loader2, Database, Shield, Zap, Search, MapPin, 
  ArrowRight, Info, AlertCircle, TrendingDown, Target, BarChart3, ChevronDown, ChevronUp
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { STEPS, THEME, generateDiagnosticData, DiagnosticResult, ReportCategory } from './constants';
import { FormData } from './types';

// O Webhook do Google Sheets via Apps Script funciona melhor com POST + no-cors + URLSearchParams
const WEBHOOK_URL = "https://script.google.com/macros/s/AKfycby9O59l0TD_Z5LAg4LdmJEo6iqSvSaOEfSwAUQ2DoVNoE_XC1OdoJWNV-ii9mhbNEok/exec"; 
const MY_PHONE = "5521985899548";

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

const App: React.FC = () => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [formData, setFormData] = useState<FormData>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentStep = STEPS[currentStepIndex] || STEPS[0];

  const submitAndRedirect = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    
    // 1. Gera os dados do diagnóstico instantaneamente (sem IA para não demorar)
    const data = generateDiagnosticData(formData, null);

    // 2. Prepara a URL do WhatsApp
    const intro = `Oi! Acabei de fazer o diagnóstico do meu perfil no Google e quero saber como posso vender mais com a ajuda de vocês.%0A%0ASegue abaixo o meu diagnóstico:%0A%0A`;
    const header = `*RELATÓRIO TÉCNICO*%0A`;
    const leadInfo = `👤 Nome: ${data.name}%0A📱 WhatsApp: ${formData[12]}%0A🔗 Perfil: ${formData[13] || 'Não enviado'}%0A%0A`;
    const scoreInfo = `📊 *Score Final: ${data.overallScore}%* (${data.archetype})%0A💡 Insight: ${data.mainInsight}%0A%0A`;
    
    const answersText = STEPS
      .filter(s => s.type !== 'info' && s.id < 11) 
      .map(s => `• ${s.title}: _${formData[s.id] || 'N/A'}_`)
      .join('%0A');

    const footer = `%0A%0A_Auditado via Skipp Digital Intelligence_`;
    const whatsappUrl = `https://wa.me/${MY_PHONE}?text=${intro}${header}${leadInfo}${scoreInfo}*DETALHAMENTO:*%0A${answersText}${footer}`;

    // 3. Envia para o Sheets em Background (Fire & Forget para o usuário não esperar)
    const payload = new URLSearchParams();
    payload.append('timestamp', new Date().toLocaleString('pt-BR'));
    payload.append('nome', String(formData[11] || ''));
    payload.append('whatsapp', String(formData[12] || ''));
    payload.append('perfil_link', String(formData[13] || ''));

    STEPS.forEach(step => {
      if (step.id <= 10) {
        const value = formData[step.id];
        payload.append(`q${step.id}_${step.title.substring(0, 20)}`, String(value || 'N/A'));
      }
    });

    // Envio assíncrono sem await para não bloquear o redirect
    fetch(WEBHOOK_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: payload.toString()
    }).catch(e => console.error("Erro background sheet", e));

    // 4. Redireciona imediatamente
    window.open(whatsappUrl, '_blank');
    
    // Reset opcional para não deixar o botão travado se o usuário voltar
    setTimeout(() => setIsSubmitting(false), 2000);
  };

  const handleNext = useCallback(() => {
    if (currentStepIndex < STEPS.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    } else {
      // Se chegou no final (que seria o Step 14 'info'), executa a ação
      submitAndRedirect();
    }
  }, [currentStepIndex, formData]);

  const handleSelect = (optionId: string) => {
    setFormData(prev => ({ ...prev, [currentStep.id]: optionId }));
    setTimeout(() => {
        if (currentStepIndex < STEPS.length - 1) {
            setCurrentStepIndex(prev => prev + 1);
        }
    }, 350);
  };
  
  const handleTextChange = (v: string) => setFormData(prev => ({ ...prev, [currentStep.id]: v }));

  const isStepValid = () => {
    if (currentStep.type === 'info') return true;
    const value = formData[currentStep.id];
    if (currentStep.type === 'text') {
      if (currentStep.id === 13) return true;
      return value && String(value).trim().length > 3;
    }
    return !!value;
  };

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
           
           {/* Descrição da tela final */}
           {currentStep.description && (
             <p className="text-center text-gray-600 font-medium text-sm leading-relaxed mb-8 whitespace-pre-line animate-slide-up">
               {currentStep.description}
             </p>
           )}
          
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
                <div className="bg-green-50 p-6 rounded-full animate-scale-in"><CheckCircle2 size={48} className="text-green-500" /></div>
                
                <button onClick={submitAndRedirect} className="w-full py-6 rounded-[2rem] text-white font-black text-lg shadow-xl flex items-center justify-center gap-3 active:scale-95 animate-pulse-subtle" style={{ background: THEME.brandGradient }}>
                  {isSubmitting ? <Loader2 className="animate-spin" /> : <>Receber Diagnóstico Agora <ArrowRight size={20} /></>}
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
          <button onClick={() => window.confirm('Reiniciar?') && window.location.reload()} className="w-10 h-10 flex items-center justify-center"><RotateCcw size={20} className="text-gray-300" /></button>
        </footer>
      </div>
    </div>
  );
};

export default App;
