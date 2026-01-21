
import React, { useState, useCallback } from 'react';
import { ChevronLeft, RotateCcw, CheckCircle2, XCircle, CheckCircle, MapPin, Star, ShieldCheck, ArrowRight, Menu, RefreshCw, Zap, Shield, Lock, Check, Target, Phone, Globe, Navigation, Search, Loader2, Send, FileText, AlertTriangle } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { STEPS, THEME, generateDiagnosticReport, ReportSection } from './constants';
import { FormData } from './types';

const SUCCESS_GREEN = '#22C55E';
const SUCCESS_TEAL = '#2FBBA8';
const WHATSAPP_LINK = "https://wa.me/5521985899548?text=Ol%C3%A1!%20Li%20meu%20Relat%C3%B3rio%20de%20Diagn%C3%B3stico%20e%20gostaria%20de%20entender%20qual%20o%20caminho%20seguro%20para%20ajustar%20meu%20perfil.";

const WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbw0bu5Ygr7RRqt8diSRVhEWORDBlcFG6aWrsoah9IKwMJIcLBaZXvg7SjfMCjNWHgNg/exec"; 

const GlobalStyles = () => (
  <style>{`
    @keyframes fade-in { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes slide-up-fade { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes bounce-subtle { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }
    @keyframes pulse-cta { 0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.4); } 70% { transform: scale(1.03); box-shadow: 0 0 0 15px rgba(34, 197, 94, 0); } 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(34, 197, 94, 0); } }
    .animate-fade-in { animation: fade-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
    .animate-slide-up-fade { animation: slide-up-fade 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
    .animate-bounce-subtle { animation: bounce-subtle 2s ease-in-out infinite; }
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

const renderDescriptionWithoutCTA = (text: string | undefined) => {
  if (!text) return null;
  const ctaPhrase = "Clique abaixo para ler seu relatório.";
  const content = text.replace(ctaPhrase, "").trim();
  return content;
};

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

const DetailedBrowserMockup = () => (
  <div className="w-full bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden text-left mt-8 animate-slide-up-fade opacity-0" style={{ animationDelay: '200ms' }}>
    <div className="bg-[#F1F3F4] px-3 py-2 flex items-center gap-3 border-b border-gray-200">
      <span className="text-[10px] font-bold text-gray-400">OK</span>
      <div className="flex-1 bg-white rounded-full py-1 px-4 flex items-center justify-center gap-2 border border-gray-200">
        <div className="w-2 h-2 rounded-full bg-blue-500" />
        <span className="text-[10px] text-gray-500 font-medium">business.google.com</span>
      </div>
      <div className="flex items-center gap-2">
        <Menu size={14} className="text-gray-400" />
        <RefreshCw size={12} className="text-gray-400" />
      </div>
    </div>
    <div className="p-5 font-sans">
      <div className="flex items-center gap-1 mb-4">
        <span className="text-xs font-black text-gray-800">Think with {renderText('Google')}</span>
        <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[5px] border-t-gray-400 mt-0.5" />
      </div>
      <p className="text-[11px] leading-relaxed text-gray-600 font-medium">
        No Brasil, o uso do digital tem crescido significativamente.{' '}
        <span className="font-bold" style={{ color: THEME.primary }}>91% das buscas</span> relacionadas a serviços e produtos{' '}
        <span className="font-bold underline decoration-2" style={{ color: THEME.primary }}>acontecem antes mesmo de as people irem à empresa.</span>{' '}
        Isso significa que o futuro do setor tende a ser mais online. A pergunta que fica é: a sua empresa está pronta para navegar neste contexto?
      </p>
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

    <div 
      className="bg-green-50 rounded-2xl p-5 border border-green-100 text-center space-y-3 animate-slide-up-fade opacity-0"
      style={{ animationDelay: `${reportData.length * 150}ms`, animationFillMode: 'forwards' }}
    >
      <p className="text-sm font-bold text-green-800">Próximo Passo</p>
      <p className="text-xs text-green-700 leading-relaxed">
        Se fizer sentido para você, posso te explicar com mais clareza qual seria o caminho mais seguro a partir daqui.
      </p>
    </div>
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

const SubmissionLoading = ({ isAnalyzing }: { isAnalyzing: boolean }) => (
  <div className="h-screen bg-white flex flex-col items-center justify-center px-10 text-center animate-fade-in">
    <GlobalStyles />
    <SkippLogo />
    <div className="relative mb-8">
      <div className="w-24 h-24 rounded-full border-4 border-gray-50 flex items-center justify-center"><Loader2 size={48} className="text-blue-500 animate-spin" /></div>
      <div className="absolute inset-0 flex items-center justify-center animate-pulse"><FileText size={24} className="text-blue-300" /></div>
    </div>
    <h2 className="text-2xl font-black text-gray-900 mb-4 leading-tight">
      {isAnalyzing ? 'A I.A. está analisando seu perfil...' : 'Gerando seu Relatório...'}
    </h2>
    <p className="text-sm font-bold text-gray-400 leading-relaxed uppercase tracking-widest">
      {isAnalyzing ? 'Conectando ao Google Maps para verificar suas informações.' : 'Identificando gargalos e oportunidades.'}
    </p>
  </div>
);

const App: React.FC = () => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [formData, setFormData] = useState<FormData>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiAnalysisResult, setAiAnalysisResult] = useState<string | null>(null);

  const currentStep = STEPS[currentStepIndex] || STEPS[0];

  const analyzeProfileWithGemini = async (link: string, answers: Record<string, string>) => {
    try {
      if (!process.env.API_KEY) {
        console.warn("API Key não encontrada.");
        return null;
      }

      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const answersSummary = JSON.stringify(answers);
      
      const prompt = `
        Atue como um AUDITOR SÊNIOR DE ALGORITMOS. Não aja como consultor educador.
        
        O usuário forneceu o link: ${link}
        Resumo do questionário: ${answersSummary}

        Gere um parágrafo único de "Diagnóstico de Impacto Técnico".
        
        OBJETIVO:
        Apontar falhas técnicas invisíveis que causam perda de dinheiro, criando um "GAP de Conhecimento" que só pode ser preenchido contratando o especialista.

        LISTA NEGRA (PROIBIDO USAR):
        - Palavras-chave / Keywords
        - Responder avaliações / Reviews
        - Postar fotos / Postagens
        - Preencher perfil
        - Dicas práticas
        - "Melhore..." / "Tente..."
        
        VOCABULÁRIO OBRIGATÓRIO (Use termos como):
        - Indexação
        - Sinais de Relevância
        - Score de Autoridade
        - Atrito Algorítmico
        - Perda de Tração
        - Ineficiência de Dados

        Exemplo APROVADO: "Identifiquei uma desconexão nos sinais de relevância local. O perfil não está emitindo a frequência de dados necessária para que o algoritmo o classifique como autoridade na região, resultando em supressão de visibilidade."

        Seja conciso (máximo 60 palavras). Tom sério e analítico.
      `;

      const result = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
          tools: [{googleSearch: {}}]
        }
      });

      return result.text;
    } catch (error) {
      console.error("Erro na análise da IA:", error);
      return null;
    }
  };

  const submitLead = async (data: FormData) => {
    if (isSubmitting || isSubmitted) return;

    setIsSubmitting(true);
    
    // Preparar respostas
    const answers: Record<string, string> = {};
    const stepIds = STEPS.map(s => s.id).filter(id => id !== 14 && id !== 0); 
    
    stepIds.forEach((id) => {
      const step = STEPS.find(s => s.id === id);
      const val = data[id];
      let label = 'Não informado';
      
      if (val && step) {
        if (Array.isArray(val)) {
          label = val.map(v => step.options?.find(o => o.id === v)?.label || v).join(', ');
        } else if (step.options) {
          label = step.options.find(o => o.id === val)?.label || val;
        } else {
          label = String(val);
        }
      }
      const key = id.toString().padStart(2, '0');
      answers[key] = label;
    });

    // Passo de Análise da IA (se houver link no passo 13)
    const gmnLink = data[13] as string;
    if (gmnLink && gmnLink.length > 5) {
      setIsAnalyzing(true);
      const analysis = await analyzeProfileWithGemini(gmnLink, answers);
      if (analysis) {
        setAiAnalysisResult(analysis);
        // Adiciona a análise ao payload do webhook se desejar salvar no futuro
        answers['99_ai_analysis'] = analysis;
      }
      setIsAnalyzing(false);
    }

    const payload = {
      timestamp: new Date().toLocaleString('pt-BR'),
      device: window.innerWidth < 768 ? 'Mobile' : 'Desktop',
      metadata: {
        utm_source: new URLSearchParams(window.location.search).get('utm_source') || 'direto'
      },
      answers: answers
    };

    try {
      await fetch(WEBHOOK_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8'
        },
        body: JSON.stringify(payload)
      });

      if (typeof window !== 'undefined' && (window as any).fbq) {
        (window as any).fbq('track', 'Lead');
      }

      await new Promise(resolve => setTimeout(resolve, 1500)); // Pequeno delay final para UX
    } catch (e) {
      console.error("Erro no envio técnico:", e);
    } finally {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }
  };

  const handleNext = useCallback(() => {
    // Se não for a última tela (Info/Report)
    if (currentStepIndex < STEPS.length - 1) {
       // O último step é o 14 (Report), então STEPS.length - 1 é o index dele.
       // Se estivermos no STEPS.length - 2, é a última pergunta (Link do perfil).
       if (currentStepIndex === STEPS.length - 2) {
         submitLead(formData);
       } else {
         setCurrentStepIndex(prev => prev + 1);
       }
    }
  }, [currentStepIndex, formData, isSubmitting, isSubmitted]);

  const handleSelect = (optionId: string) => {
    if (currentStep.type === 'checkbox') {
      const currentValues = (formData[currentStep.id] as string[]) || [];
      const newValues = currentValues.includes(optionId) ? currentValues.filter(v => v !== optionId) : [...currentValues, optionId];
      setFormData(prev => ({ ...prev, [currentStep.id]: newValues }));
    } else {
      setFormData(prev => ({ ...prev, [currentStep.id]: optionId }));
      setTimeout(() => handleNext(), 400);
    }
  };
  
  const handleTextChange = (value: string) => {
    setFormData(prev => ({ ...prev, [currentStep.id]: value }));
  };

  const isStepValid = () => {
    if (!currentStep) return false;
    if (currentStep.type === 'info' || currentStep.type === 'intro') return true;
    
    const value = formData[currentStep.id];
    
    // Validação para Texto
    if (currentStep.type === 'text') {
      // Opcional para o Link (ID 13)
      if (currentStep.id === 13) return true; 
      return value && String(value).trim().length > 0;
    }

    if (!value) return false;
    if (Array.isArray(value) && value.length === 0) return false;
    return true;
  };

  const handleBack = () => { if (currentStepIndex > 0) setCurrentStepIndex(prev => prev - 1); };
  const handleReset = () => { setCurrentStepIndex(0); setFormData({}); setIsSubmitted(false); setIsSubmitting(false); setAiAnalysisResult(null); };

  if (isSubmitting) return <SubmissionLoading isAnalyzing={isAnalyzing} />;
  if (isSubmitted) return <SalesPage onReset={handleReset} formData={formData} aiAnalysis={aiAnalysisResult} />;

  return (
    <div className="h-screen bg-white flex flex-col max-w-md mx-auto relative overflow-hidden">
      <GlobalStyles />
      <div className="fixed top-0 left-0 right-0 z-50 bg-gray-100 h-1.5 max-w-md mx-auto">
        <div className="h-full transition-all duration-700 ease-in-out" style={{ background: THEME.brandGradient, width: `${currentStep?.progress ?? 0}%` }} />
      </div>
      <main className="flex-1 pt-12 pb-40 px-6 flex flex-col overflow-y-auto no-scrollbar">
        <SkippLogo />
        <div key={currentStepIndex} className="w-full flex-1 animate-fade-in flex flex-col">
          {currentStep.type === 'intro' ? (
            <div className="text-center flex flex-col items-center">
              <p className="text-sm font-bold text-gray-500 mb-6 leading-relaxed">{currentStep.description}</p>
              <h1 className="text-3xl font-black text-gray-900 leading-tight mb-4 text-center">{renderText(currentStep.title)}</h1>
              <p className="text-xs font-medium text-gray-400 mb-8 italic">{currentStep.subtitle}</p>
              <button onClick={handleNext} className="w-full py-5 rounded-[2rem] text-white text-lg font-black shadow-2xl transition-all active:scale-95 flex items-center justify-center gap-2 mb-2" style={{ background: THEME.brandGradient }}>Continuar</button>
              <DetailedBrowserMockup />
            </div>
          ) : (
            <div className="flex flex-col flex-1">
              <h1 className="text-2xl font-black text-center leading-tight mb-4 text-gray-900">{renderText(currentStep.title)}</h1>
              {currentStep.description && <p className="text-center text-gray-400 mb-6 font-medium text-sm leading-relaxed px-2 whitespace-pre-line">{renderDescriptionWithoutCTA(currentStep.description)}</p>}
              {currentStep.subtitle && <p className="text-center text-gray-500 mb-8 font-bold text-xs leading-relaxed">{currentStep.subtitle.split('\n').map((line, i) => <React.Fragment key={i}>{line}<br/></React.Fragment>)}</p>}
              {currentStep.type === 'info' ? (
                <div className="space-y-6 flex-1 flex flex-col items-center pb-12"><div className="w-full text-center"><p className="text-sm text-gray-500">Toque abaixo para ver seu relatório</p></div><ActionButton className="mb-2" text="Ver Diagnóstico" /><FooterCopyright /></div>
              ) : currentStep.type === 'text' ? (
                <div className="flex flex-col gap-4 pb-10 w-full animate-slide-up-fade opacity-0" style={{ animationDelay: '100ms', animationFillMode: 'forwards' }}>
                  <input 
                    type="text" 
                    placeholder={currentStep.placeholder}
                    value={(formData[currentStep.id] as string) || ''}
                    onChange={(e) => handleTextChange(e.target.value)}
                    className="w-full p-6 text-lg rounded-[2.5rem] border-2 border-gray-100 bg-white focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all font-medium text-gray-900 placeholder:text-gray-300 shadow-sm"
                  />
                  <p className="text-xs text-center text-gray-400 font-medium px-4 opacity-60">
                    Seus dados estão seguros e não serão compartilhados.
                  </p>
                </div>
              ) : (
                <div className="flex flex-col gap-4 pb-10">
                  <div className={`grid gap-4 ${currentStep.gridCols === 2 ? 'grid-cols-2' : 'grid-cols-1'}`}>
                    {currentStep.options?.map((option, index) => {
                      const isSelected = currentStep.type === 'checkbox' ? ((formData[currentStep.id] as string[]) || []).includes(option.id) : formData[currentStep.id] === option.id;
                      return (
                        <button 
                          key={option.id} 
                          onClick={() => handleSelect(option.id)} 
                          className={`relative p-6 rounded-[2.5rem] text-left transition-all duration-300 border-2 shadow-sm animate-slide-up-fade opacity-0 ${isSelected ? 'bg-[#EFF6FF] scale-[1.02] shadow-md' : 'border-gray-100 bg-white hover:border-gray-200'}`} 
                          style={{ 
                            borderColor: isSelected ? THEME.primary : '#F3F4F6',
                            animationDelay: `${index * 50}ms`,
                            animationFillMode: 'forwards'
                          }}
                        >
                          <div className="flex items-center gap-4">
                            <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${isSelected ? '' : 'border-gray-200 bg-white'}`} style={{ background: isSelected ? THEME.brandGradient : 'white', borderColor: isSelected ? THEME.primary : '#E5E7EB' }}>{isSelected && <CheckCircle2 size={18} color="white" strokeWidth={3} />}</div>
                            <span className={`text-base font-black leading-snug transition-colors ${isSelected ? 'text-[#0B0B0B]' : 'text-gray-600'}`}>{option.label}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/95 backdrop-blur-md z-50 border-t border-gray-50 pb-safe">
        {(currentStep.type === 'checkbox' || currentStep.type === 'text') && (
          <div className="p-4 pt-2">
             <button onClick={handleNext} disabled={!isStepValid()} className="w-full py-5 rounded-[2rem] text-white text-lg font-black shadow-2xl transition-all active:scale-95 disabled:opacity-50 disabled:grayscale flex items-center justify-center gap-2" style={{ background: THEME.brandGradient }}>Continuar</button>
          </div>
        )}
        <footer className="p-5 flex justify-between items-center px-10">
          <button onClick={handleBack} disabled={currentStepIndex === 0} className="w-10 h-10 flex items-center justify-center text-gray-900 disabled:opacity-20 active:scale-90 transition-all"><ChevronLeft size={28} /></button>
          <div className="flex gap-2 items-center">{STEPS.map((s, idx) => <div key={idx} className={`rounded-full transition-all duration-300 ${idx === currentStepIndex ? 'w-6 h-1.5' : 'w-1.5 h-1.5 bg-gray-200'}`} style={{ backgroundColor: idx === currentStepIndex ? THEME.primary : undefined }} />)}</div>
          <button onClick={() => { if(window.confirm('Reiniciar?')) handleReset(); }} className="w-10 h-10 flex items-center justify-center active:scale-90 transition-all"><RotateCcw size={22} className="text-gray-300" /></button>
        </footer>
      </div>
    </div>
  );
};

export default App;
