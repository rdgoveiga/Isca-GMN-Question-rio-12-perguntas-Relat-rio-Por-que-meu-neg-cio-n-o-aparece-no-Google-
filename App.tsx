
import React, { useState, useCallback } from 'react';
import { ChevronLeft, RotateCcw, CheckCircle2, XCircle, CheckCircle, MapPin, Star, ShieldCheck, ArrowRight, Menu, RefreshCw, Zap, Shield, Lock, Check, Target, Phone, Globe, Navigation, Search, Loader2, Send, FileText, AlertTriangle, Database } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { STEPS, THEME, generateDiagnosticReport, ReportSection } from './constants';
import { FormData } from './types';

const SUCCESS_GREEN = '#22C55E';
const WHATSAPP_LINK = "https://wa.me/5521985899548?text=Ol%C3%A1!%20Li%20meu%20Relat%C3%B3rio%20de%20Diagn%C3%B3stico%20e%20gostaria%20de%20entender%20qual%20o%20caminho%20seguro%20para%20ajustar%20meu%20perfil.";

// Script URL para Google Sheets atualizado conforme solicitação
const WEBHOOK_URL = "https://script.google.com/macros/s/AKfycby9O59l0TD_Z5LAg4LdmJEo6iqSvSaOEfSwAUQ2DoVNoE_XC1OdoJWNV-ii9mhbNEok/exec"; 

/**
 * DICA PARA O USUÁRIO:
 * Para este webhook funcionar, você deve criar um Google Apps Script na sua planilha com a função doPost(e).
 * O script deve receber o JSON e inserir uma nova linha com as chaves correspondentes.
 */

const GlobalStyles = () => (
  <style>{`
    @keyframes fade-in { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes slide-up-fade { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes pulse-cta { 0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.4); } 70% { transform: scale(1.03); box-shadow: 0 0 0 15px rgba(34, 197, 94, 0); } 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(34, 197, 94, 0); } }
    .animate-fade-in { animation: fade-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
    .animate-slide-up-fade { animation: slide-up-fade 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
    .animate-pulse-cta { animation: pulse-cta 2s infinite cubic-bezier(0.4, 0, 0.6, 1); }
    .pb-safe { padding-bottom: env(safe-area-inset-bottom); }
  `}</style>
);

const GoogleBrandText = () => (
  <span className="inline-flex font-black">
    <span style={{ color: '#4285F4' }}>G</span>
    <span style={{ color: '#EA4335' }}>o</span>
    <span style={{ color: '#FBBC05' }}>o</span>
    <span style={{ color: '#4285F4' }}>g</span>
    <span style={{ color: '#34A853' }}>l</span>
    <span style={{ color: '#EA4335' }}>e</span>
  </span>
);

const renderText = (text: string | undefined) => {
  if (!text) return null;
  const parts = text.split(/(Google)/g);
  return (
    <>
      {parts.map((part, i) => 
        part === 'Google' ? <GoogleBrandText key={i} /> : part
      )}
    </>
  );
};

const ActionButton = ({ className = "", text = "Entender o caminho seguro" }: { className?: string, text?: string }) => (
  <a 
    href={WHATSAPP_LINK}
    target="_blank"
    rel="noopener noreferrer"
    className={`w-full max-w-sm py-6 rounded-[2rem] text-white font-black text-lg shadow-xl transition-all active:scale-95 flex items-center justify-center gap-2 animate-pulse-cta ${className}`}
    style={{ background: SUCCESS_GREEN, textDecoration: 'none' }}
  >
    <Send size={20} />
    {text}
  </a>
);

const FooterCopyright = () => (
  <div className="mt-8 mb-4 opacity-30 text-center">
    <p className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">
      © 2025 - Skipp Digital - Todos os direitos reservados
    </p>
  </div>
);

const SkippLogo = () => (
  <div className="flex flex-col items-center justify-center mb-8 w-full max-w-[320px] mx-auto animate-fade-in">
    <div className="flex flex-col items-center gap-0">
      <div className="flex items-center leading-none">
        <span className="text-3xl font-black italic tracking-tighter" style={{ 
          background: THEME.brandGradient,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Skipp
        </span>
        <span className="text-3xl font-bold text-[#0B0B0B] tracking-tight">
          Digital
        </span>
      </div>
      <span className="text-[10px] font-medium text-gray-400 uppercase tracking-[0.3em] mt-1.5">
        Relatório de Diagnóstico
      </span>
    </div>
  </div>
);

const DiagnosticReportView = ({ reportData }: { reportData: ReportSection[] }) => (
  <div className="w-full max-w-sm space-y-6">
    {reportData.map((section, idx) => (
      <div 
        key={idx} 
        className={`rounded-2xl p-5 animate-slide-up-fade opacity-0 ${section.type === 'highlight' ? 'bg-blue-50 border-2 border-blue-100' : section.type === 'alert' ? 'bg-yellow-50 border border-yellow-100' : 'bg-white border border-gray-100 shadow-sm'}`}
        style={{ animationDelay: `${idx * 150}ms`, animationFillMode: 'forwards' }}
      >
        <div className="flex items-center gap-2 mb-3">
          {section.type === 'highlight' && <FileText size={18} className="text-blue-600" />}
          {section.type === 'alert' && <AlertTriangle size={18} className="text-yellow-600" />}
          <h3 className={`font-black text-sm uppercase tracking-wide ${section.type === 'alert' ? 'text-yellow-800' : 'text-gray-800'}`}>
            {section.title}
          </h3>
        </div>
        
        {section.type === 'list' ? (
          <ul className="space-y-3">
            {section.content.map((item, i) => (
              <li key={i} className="flex gap-3 text-xs leading-relaxed text-gray-600 font-medium">
                <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        ) : (
          <div className="space-y-3">
            {section.content.map((para, i) => (
              <p key={i} className="text-xs leading-relaxed text-gray-600 font-medium text-justify">
                {para}
              </p>
            ))}
          </div>
        )}
      </div>
    ))}
  </div>
);

const SalesPage = ({ onReset, formData, aiAnalysis }: { onReset: () => void, formData: FormData, aiAnalysis: string | null }) => {
  const report = generateDiagnosticReport(formData, aiAnalysis);

  return (
    <div className="h-screen w-full max-w-md mx-auto bg-white overflow-y-auto no-scrollbar animate-fade-in flex flex-col items-center px-6 pb-20 pt-8">
      <GlobalStyles />
      <SkippLogo />
      
      <div className="w-full text-center mb-6">
        <h2 className="text-xl font-black text-gray-900 leading-tight">Resultado do Diagnóstico</h2>
        <p className="text-xs text-gray-400 font-medium mt-1">Análise gerada em {new Date().toLocaleDateString('pt-BR')}</p>
      </div>

      <DiagnosticReportView reportData={report} />

      <div className="mt-8 mb-4 w-full flex flex-col items-center animate-slide-up-fade opacity-0" style={{ animationDelay: `${(report.length + 1) * 150}ms`, animationFillMode: 'forwards' }}>
        <ActionButton />
        <p className="text-[10px] text-gray-400 mt-3 max-w-[200px] text-center">
          Clique no botão para falar sobre seu relatório no WhatsApp
        </p>
      </div>

      <button onClick={onReset} className="text-gray-400 text-xs font-bold flex items-center gap-1 opacity-50 mb-4 mt-8 animate-fade-in" style={{ animationDelay: '1s' }}><RotateCcw size={12} /> Refazer diagnóstico</button>
      <FooterCopyright />
    </div>
  );
};

const SubmissionLoading = ({ isAnalyzing, isSaving }: { isAnalyzing: boolean, isSaving: boolean }) => (
  <div className="h-screen bg-white flex flex-col items-center justify-center px-10 text-center animate-fade-in">
    <GlobalStyles />
    <SkippLogo />
    <div className="relative mb-8">
      <div className="w-24 h-24 rounded-full border-4 border-gray-50 flex items-center justify-center">
        <Loader2 size={48} className="text-blue-500 animate-spin" />
      </div>
      <div className="absolute inset-0 flex items-center justify-center animate-pulse">
        {isSaving ? <Database size={24} className="text-green-500" /> : <FileText size={24} className="text-blue-300" />}
      </div>
    </div>
    <h2 className="text-2xl font-black text-gray-900 mb-4 leading-tight">
      {isAnalyzing ? 'A I.A. está analisando seu perfil...' : isSaving ? 'Salvando seu diagnóstico...' : 'Gerando seu Relatório...'}
    </h2>
    <p className="text-sm font-bold text-gray-400 leading-relaxed uppercase tracking-widest">
      {isAnalyzing ? 'Conectando ao Google Maps para verificar suas informações.' : isSaving ? 'Segurança e criptografia de dados ativa.' : 'Identificando gargalos e oportunidades.'}
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

  const analyzeProfileWithGemini = async (link: string, answers: Record<string, string>) => {
    try {
      if (!process.env.API_KEY) return null;
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `Atue como AUDITOR SÊNIOR. Gere um parágrafo único de "Diagnóstico de Impacto Técnico" para o link ${link} e respostas ${JSON.stringify(answers)}. Aponte falhas invisíveis. Use termos como: Indexação, Sinais de Relevância, Score de Autoridade. Seja conciso (máximo 50 palavras).`;
      const result = await ai.models.generateContent({ model: 'gemini-3-flash-preview', contents: prompt });
      return result.text;
    } catch (e) { return null; }
  };

  const submitLead = async (data: FormData) => {
    if (isSubmitting || isSubmitted) return;
    setIsSubmitting(true);
    
    // 1. Mapeamento amigável para a planilha
    const friendlyAnswers: Record<string, string> = {
      timestamp: new Date().toLocaleString('pt-BR'),
      nome: String(data[11] || ''),
      whatsapp: String(data[12] || ''),
      perfil_google: String(data[13] || ''),
      possui_perfil: String(data[1] || ''),
      frequencia_contato: String(data[2] || ''),
      visibilidade: String(data[3] || ''),
      concorrencia: String(data[4] || ''),
      avaliacoes: String(data[5] || ''),
      responde_avaliacoes: String(data[6] || ''),
      frequencia_updates: String(data[7] || ''),
      profissionalismo: String(data[8] || ''),
      frase_momento: String(data[9] || ''),
      objetivo: String(data[10] || ''),
      device: window.innerWidth < 768 ? 'Mobile' : 'Desktop',
      utm_source: new URLSearchParams(window.location.search).get('utm_source') || 'direto'
    };

    // 2. Análise da IA
    if (friendlyAnswers.perfil_google && friendlyAnswers.perfil_google.length > 5) {
      setIsAnalyzing(true);
      const analysis = await analyzeProfileWithGemini(friendlyAnswers.perfil_google, friendlyAnswers);
      if (analysis) {
        setAiAnalysisResult(analysis);
        friendlyAnswers['analise_ia'] = analysis;
      }
      setIsAnalyzing(false);
    }

    // 3. Salvamento na Base de Dados (Google Sheets via Webhook)
    setIsSaving(true);
    try {
      await fetch(WEBHOOK_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(friendlyAnswers)
      });
      await new Promise(r => setTimeout(r, 1000));
    } catch (e) {
      console.error("Erro ao salvar dados:", e);
    } finally {
      setIsSaving(false);
      setIsSubmitting(false);
      setIsSubmitted(true);
    }
  };

  const handleNext = useCallback(() => {
    if (currentStepIndex < STEPS.length - 1) {
       if (currentStepIndex === STEPS.length - 2) {
         submitLead(formData);
       } else {
         setCurrentStepIndex(prev => prev + 1);
       }
    }
  }, [currentStepIndex, formData]);

  const handleSelect = (optionId: string) => {
    setFormData(prev => ({ ...prev, [currentStep.id]: optionId }));
    setTimeout(() => handleNext(), 400);
  };
  
  const handleTextChange = (value: string) => {
    setFormData(prev => ({ ...prev, [currentStep.id]: value }));
  };

  const isStepValid = () => {
    if (!currentStep) return false;
    if (currentStep.type === 'info') return true;
    const value = formData[currentStep.id];
    if (currentStep.type === 'text') {
      if (currentStep.id === 13) return true; 
      return value && String(value).trim().length > 0;
    }
    return !!value;
  };

  const handleBack = () => { if (currentStepIndex > 0) setCurrentStepIndex(prev => prev - 1); };
  const handleReset = () => { setCurrentStepIndex(0); setFormData({}); setIsSubmitted(false); setIsSubmitting(false); setAiAnalysisResult(null); };

  return (
    <div className="h-screen bg-white flex flex-col max-w-md mx-auto relative overflow-hidden">
      <GlobalStyles />
      <div className="fixed top-0 left-0 right-0 z-50 bg-gray-100 h-1.5 max-w-md mx-auto">
        <div className="h-full transition-all duration-700 ease-in-out" style={{ background: THEME.brandGradient, width: `${currentStep?.progress ?? 0}%` }} />
      </div>
      <main className="flex-1 pt-12 pb-40 px-6 flex flex-col overflow-y-auto no-scrollbar">
        <SkippLogo />
        <div key={currentStepIndex} className="w-full flex-1 animate-fade-in flex flex-col">
          <h1 className="text-2xl font-black text-center leading-tight mb-4 text-gray-900">{renderText(currentStep.title)}</h1>
          {currentStep.subtitle && <p className="text-center text-gray-500 mb-8 font-bold text-xs leading-relaxed">{currentStep.subtitle}</p>}
          
          {currentStep.type === 'text' ? (
            <div className="flex flex-col gap-4 animate-slide-up-fade">
              <input 
                type="text" 
                placeholder={currentStep.placeholder}
                value={(formData[currentStep.id] as string) || ''}
                onChange={(e) => handleTextChange(e.target.value)}
                className="w-full p-6 text-lg rounded-[2.5rem] border-2 border-gray-100 bg-white focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all font-medium text-gray-900 shadow-sm"
              />
            </div>
          ) : currentStep.type === 'radio' ? (
            <div className="flex flex-col gap-4">
              {currentStep.options?.map((option, index) => {
                const isSelected = formData[currentStep.id] === option.id;
                return (
                  <button 
                    key={option.id} 
                    onClick={() => handleSelect(option.id)} 
                    className={`relative p-6 rounded-[2.5rem] text-left transition-all border-2 shadow-sm animate-slide-up-fade ${isSelected ? 'bg-[#EFF6FF] border-blue-500' : 'border-gray-100 bg-white'}`} 
                    style={{ animationDelay: `${index * 50}ms`, animationFillMode: 'forwards' }}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center shrink-0 ${isSelected ? 'bg-blue-600 border-blue-600' : 'border-gray-200'}`}>{isSelected && <CheckCircle2 size={18} color="white" />}</div>
                      <span className="text-base font-black text-gray-700">{option.label}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          ) : (
             <div className="flex flex-col items-center gap-6">
                <p className="text-center text-gray-400 text-sm font-medium">Seu diagnóstico personalizado está concluído e pronto para ser visualizado.</p>
                <button onClick={handleNext} className="w-full py-6 rounded-[2rem] text-white font-black text-lg shadow-xl flex items-center justify-center gap-2 animate-pulse-cta" style={{ background: THEME.brandGradient }}>
                  Visualizar Agora
                </button>
             </div>
          )}
        </div>
      </main>
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/95 backdrop-blur-md z-50 border-t border-gray-50 pb-safe">
        {currentStep.type === 'text' && (
          <div className="p-4 pt-2">
             <button onClick={handleNext} disabled={!isStepValid()} className="w-full py-5 rounded-[2rem] text-white text-lg font-black shadow-2xl transition-all disabled:opacity-50" style={{ background: THEME.brandGradient }}>Continuar</button>
          </div>
        )}
        <footer className="p-5 flex justify-between items-center px-10">
          <button onClick={handleBack} disabled={currentStepIndex === 0} className="w-10 h-10 flex items-center justify-center disabled:opacity-20"><ChevronLeft size={28} /></button>
          <div className="flex gap-2 items-center">{STEPS.map((_, idx) => <div key={idx} className={`rounded-full transition-all ${idx === currentStepIndex ? 'w-6 h-1.5 bg-blue-500' : 'w-1.5 h-1.5 bg-gray-200'}`} />)}</div>
          <button onClick={() => window.confirm('Reiniciar?') && handleReset()} className="w-10 h-10 flex items-center justify-center"><RotateCcw size={22} className="text-gray-300" /></button>
        </footer>
      </div>
    </div>
  );
};

export default App;
