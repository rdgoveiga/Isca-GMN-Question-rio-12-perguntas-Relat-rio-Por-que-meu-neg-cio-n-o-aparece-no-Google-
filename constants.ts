
import { QuestionStep, FormData } from './types';

export const THEME = {
  primary: '#3B82F6',
  secondary: '#A020F0',
  success: '#22C55E',
  warning: '#F59E0B',
  danger: '#EF4444',
  cardBg: '#EFF6FF',
  textBlack: '#0B0B0B',
  textGray: '#6B6B6B',
  brandGradient: 'linear-gradient(135deg, #3B82F6, #A020F0)',
};

export const STEPS: QuestionStep[] = [
  // --- BLOCO 1: CONTEXTO ---
  {
    id: 1,
    type: 'radio',
    progress: 5,
    title: 'Você já possui um Perfil de Empresas no Google ativo?',
    subtitle: '(Antigo Google Meu Negócio)',
    options: [
      { id: 'sim', label: 'Sim' },
      { id: 'nao', label: 'Não' },
      { id: 'nao_certeza', label: 'Não tenho certeza' }
    ]
  },
  {
    id: 2,
    type: 'radio',
    progress: 10,
    title: 'Hoje, você recebe contatos pelo Google com que frequência?',
    options: [
      { id: 'todos_dias', label: 'Todos os dias' },
      { id: 'semana', label: 'Algumas vezes na semana' },
      { id: 'raramente', label: 'Raramente' },
      { id: 'nunca', label: 'Nunca' }
    ]
  },
  // --- BLOCO 2: VISIBILIDADE PERCEBIDA ---
  {
    id: 3,
    type: 'radio',
    progress: 20,
    title: 'Quando você pesquisa seu serviço no Google, o seu perfil aparece:',
    subtitle: '(Ex: Nutricionista em São Paulo ou Pizzaria em Brasília)',
    options: [
      { id: 'primeiros', label: 'Entre os primeiros resultados' },
      { id: 'demora', label: 'Aparece, mas demora' },
      { id: 'quase_nunca', label: 'Quase nunca aparece' },
      { id: 'nao_aparece', label: 'Não aparece' }
    ]
  },
  {
    id: 4,
    type: 'radio',
    progress: 30,
    title: 'Seus principais concorrentes aparecem antes de você?',
    options: [
      { id: 'sim', label: 'Sim' },
      { id: 'alguns', label: 'Alguns' },
      { id: 'nao', label: 'Não' },
      { id: 'nunca_reparei', label: 'Nunca reparei' }
    ]
  },
  // --- BLOCO 3: AUTORIDADE ---
  {
    id: 5,
    type: 'radio',
    progress: 40,
    title: 'Quantas avaliações seu perfil possui hoje?',
    options: [
      { id: 'nenhuma', label: 'Nenhuma' },
      { id: '1_10', label: 'De 1 a 10' },
      { id: '11_30', label: 'De 11 a 30' },
      { id: '30_mais', label: 'Mais de 30' }
    ]
  },
  {
    id: 6,
    type: 'radio',
    progress: 50,
    title: 'Você costuma responder avaliações no Google?',
    options: [
      { id: 'sempre', label: 'Sempre' },
      { id: 'as_vezes', label: 'Às vezes' },
      { id: 'raramente', label: 'Raramente' },
      { id: 'nunca', label: 'Nunca' }
    ]
  },
  // --- BLOCO 4: CONSISTÊNCIA ---
  {
    id: 7,
    type: 'radio',
    progress: 60,
    title: 'Seu perfil recebe atualizações com que frequência?',
    options: [
      { id: 'toda_semana', label: 'Toda semana' },
      { id: 'mes', label: 'Algumas vezes no mês' },
      { id: 'raramente', label: 'Raramente' },
      { id: 'nunca', label: 'Nunca' }
    ]
  },
  {
    id: 8,
    type: 'radio',
    progress: 70,
    title: 'Você sente que seu perfil transmite profissionalismo?',
    options: [
      { id: 'sim', label: 'Sim' },
      { id: 'mais_menos', label: 'Mais ou menos' },
      { id: 'nao', label: 'Não' },
      { id: 'nunca_pensei', label: 'Nunca pensei nisso' }
    ]
  },
  // --- BLOCO 5: MATURIDADE ---
  {
    id: 9,
    type: 'radio',
    progress: 80,
    title: 'Qual dessas frases mais representa você hoje?',
    options: [
      { id: 'nao_sei_comecar', label: 'Sei que preciso melhorar, mas não sei por onde começar' },
      { id: 'nao_funcionou', label: 'Já tentei ajustar, mas não funcionou' },
      { id: 'sem_tempo', label: 'Não tenho tempo para mexer nisso' },
      { id: 'nao_serio', label: 'Nunca levei o Google a sério' }
    ]
  },
  // --- BLOCO 6: OBJETIVO ---
  {
    id: 10,
    type: 'radio',
    progress: 85,
    title: 'O que mais mudaria no seu negócio se o Google gerasse clientes toda semana?',
    options: [
      { id: 'agenda', label: 'Agenda mais previsível' },
      { id: 'independencia', label: 'Menos dependência de indicação' },
      { id: 'faturamento', label: 'Mais faturamento' },
      { id: 'tranquilidade', label: 'Mais tranquilidade' }
    ]
  },
  // --- BLOCO FINAL: CONTATO ---
  {
    id: 11,
    type: 'text',
    progress: 90,
    title: 'Como podemos te chamar?',
    placeholder: 'Digite seu nome',
  },
  {
    id: 12,
    type: 'text',
    progress: 95,
    title: 'Qual o melhor WhatsApp para receber seu diagnóstico?',
    placeholder: '(DD) 99999-9999',
  },
  {
    id: 13,
    type: 'text',
    progress: 98,
    title: 'Link do seu Perfil de Empresas no Google',
    subtitle: '(Opcional, deixe em branco se não souber)',
    placeholder: 'Cole o link aqui',
  },
  {
    id: 14,
    type: 'info',
    progress: 100,
    title: 'Seu Relatório está pronto!',
    description: 'Com base nas suas respostas, geramos um diagnóstico estratégico do seu perfil. \n\nClique abaixo para ler seu relatório.'
  }
];

export interface ReportCategory {
  id: string;
  title: string;
  score: number; // 0 a 100
  status: 'critical' | 'warning' | 'optimal';
  findings: string[];
}

export interface DiagnosticResult {
  overallScore: number;
  archetype: string;
  urgencyLabel: string;
  mainInsight: string;
  categories: ReportCategory[];
  aiAnalysis?: string;
  name: string;
}

export const generateDiagnosticData = (data: FormData, aiAnalysis?: string | null): DiagnosticResult => {
  const name = (data[11] as string)?.split(' ')[0] || 'Gestor(a)';
  
  // Cálculo de Score por pilares
  let visibilidadeScore = 0;
  let autoridadeScore = 0;
  let engajamentoScore = 0;

  // 1. Visibilidade (Q1, Q3, Q4)
  if (data[1] === 'sim') visibilidadeScore += 20;
  if (data[3] === 'primeiros') visibilidadeScore += 40;
  else if (data[3] === 'demora') visibilidadeScore += 20;
  if (data[4] === 'nao') visibilidadeScore += 40;
  else if (data[4] === 'alguns') visibilidadeScore += 15;

  // 2. Autoridade (Q5, Q8)
  if (data[5] === '30_mais') autoridadeScore += 60;
  else if (data[5] === '11_30') autoridadeScore += 40;
  else if (data[5] === '1_10') autoridadeScore += 10;
  if (data[8] === 'sim') autoridadeScore += 40;
  else if (data[8] === 'mais_menos') autoridadeScore += 15;

  // 3. Engajamento (Q2, Q6, Q7)
  if (data[2] === 'todos_dias') engajamentoScore += 30;
  else if (data[2] === 'semana') engajamentoScore += 15;
  if (data[6] === 'sempre') engajamentoScore += 35;
  else if (data[6] === 'as_vezes') engajamentoScore += 15;
  if (data[7] === 'toda_semana') engajamentoScore += 35;
  else if (data[7] === 'mes') engajamentoScore += 15;

  const overallScore = Math.round((visibilidadeScore + autoridadeScore + engajamentoScore) / 3);
  
  const categories: ReportCategory[] = [
    {
      id: 'vis',
      title: 'Visibilidade Local',
      score: visibilidadeScore,
      status: visibilidadeScore < 40 ? 'critical' : visibilidadeScore < 75 ? 'warning' : 'optimal',
      findings: visibilidadeScore < 40 
        ? ['Inexistência de ranking para palavras-chave principais.', 'Concorrência domina 100% da área de cobertura.'] 
        : visibilidadeScore < 75 
        ? ['Aparece intermitentemente apenas para buscas específicas.', 'Padrão de ranking instável (Efeito Gangorra).']
        : ['Excelente posicionamento geográfico.', 'Domínio das primeiras posições locais.']
    },
    {
      id: 'aut',
      title: 'Autoridade e Trust',
      score: autoridadeScore,
      status: autoridadeScore < 40 ? 'critical' : autoridadeScore < 75 ? 'warning' : 'optimal',
      findings: autoridadeScore < 40
        ? ['Vazio de confiança: zero ou baixas avaliações.', 'Identidade visual amadora ou desatualizada.']
        : autoridadeScore < 75
        ? ['Volume de avaliações insuficiente para gerar segurança absoluta.', 'Falta de prova social constante.']
        : ['Perfil transmite segurança e liderança de mercado.', 'Forte presença de depoimentos positivos.']
    },
    {
      id: 'eng',
      title: 'Atividade e Sinais',
      score: engajamentoScore,
      status: engajamentoScore < 40 ? 'critical' : engajamentoScore < 75 ? 'warning' : 'optimal',
      findings: engajamentoScore < 40
        ? ['Sinal de abandono detectado pelo robô do Google.', 'Ausência crítica de interação com usuários.']
        : engajamentoScore < 75
        ? ['Atualizações esporádicas prejudicam a "freshness".', 'Taxa de resposta abaixo do ideal estratégico.']
        : ['Perfil altamente ativo com alimentação constante de dados.', 'Excelente engajamento com o público.']
    }
  ];

  let archetype = "";
  let urgencyLabel = "";
  let mainInsight = "";

  if (overallScore < 35) {
    archetype = "Inexistente";
    urgencyLabel = "CRÍTICO";
    mainInsight = "Seu perfil está tecnicamente 'invisível'. O Google não confia no seu negócio o suficiente para indicá-lo aos clientes da sua região.";
  } else if (overallScore < 60) {
    archetype = "Subutilizado";
    urgencyLabel = "ALERTA";
    mainInsight = "Você tem uma ferramenta potente, mas está usando apenas 20% da capacidade. A concorrência está capturando leads que deveriam ser seus.";
  } else {
    archetype = "Otimizável";
    urgencyLabel = "OPORTUNIDADE";
    mainInsight = "Seu perfil é bom, mas faltam ajustes finos de indexação para você dominar completamente a primeira posição e aumentar o ticket médio.";
  }

  return {
    overallScore,
    archetype,
    urgencyLabel,
    mainInsight,
    categories,
    aiAnalysis: aiAnalysis || undefined,
    name
  };
};
