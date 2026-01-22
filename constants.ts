
import { QuestionStep, FormData } from './types';

// CONFIGURAÇÃO DO PIXEL DO FACEBOOK
// Substitua '123456789012345' pelo ID do seu Pixel
export const FACEBOOK_PIXEL_ID = '1594556251572961';

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
    title: 'Hoje, o Google gera contatos reais para o seu negócio com que frequência?',
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
    description: '(94% dos Clientes que buscam um produto ou serviço no Google, costumam escolher os primeiros resultados)',
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
    title: 'Você responde avaliações estrategicamente para atrair novos clientes?',
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
    title: 'Se o Google começasse a gerar clientes toda semana, o que mudaria primeiro no seu negócio?',
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
    title: 'Sua Análise está Pronta!',
    // Alteração da copy para foco em vendas/conversão
    description: 'Identificamos gargalos ocultos que estão fazendo você perder clientes diariamente.\n\nApós o envio, você receberá um diagnóstico personalizado direto no WhatsApp.\n\nToque no botão abaixo para desbloquear seu diagnóstico e descobrir como dominar sua região no Google.'
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
  
  // --- LÓGICA DE INSIGHT DINÂMICO ---
  let mainInsight = "";
  let archetype = "";
  let urgencyLabel = "";

  // Identificar o pilar mais crítico
  const scores = [
    { id: 'vis', val: visibilidadeScore, name: 'Visibilidade' },
    { id: 'aut', val: autoridadeScore, name: 'Autoridade' },
    { id: 'eng', val: engajamentoScore, name: 'Engajamento' }
  ];
  // Ordena do menor para o maior
  scores.sort((a, b) => a.val - b.val);
  const lowestPilar = scores[0];

  // Geração de Arquétipo e Urgência baseada no Score Geral + Pilar Fraco
  if (overallScore < 30) {
    archetype = "Fantasma Digital";
    urgencyLabel = "CRÍTICO";
  } else if (overallScore < 50) {
    if (lowestPilar.id === 'vis') archetype = "Tesouro Escondido"; // Bom serviço, ninguém vê
    else if (lowestPilar.id === 'aut') archetype = "Vitrine Vazia"; // Aparece, mas não converte
    else archetype = "Negócio Estagnado";
    urgencyLabel = "ALERTA";
  } else if (overallScore < 75) {
    archetype = "Gigante Adormecido";
    urgencyLabel = "OPORTUNIDADE";
  } else {
    archetype = "Referência Local";
    urgencyLabel = "OTIMIZAR";
  }

  // Geração de Insight "Cirúrgico" baseado no pilar mais fraco e respostas específicas
  if (lowestPilar.id === 'vis') {
    // Problema de Visibilidade
    if (data[4] === 'sim') {
      mainInsight = "O Google está desviando seus potenciais clientes para a concorrência. Seu perfil existe, mas sem as palavras-chave certas indexadas, você perde a 'batalha da primeira página' diariamente.";
    } else if (data[3] === 'nao_aparece' || data[3] === 'quase_nunca') {
      mainInsight = "Seu negócio é invisível para quem não te conhece. Hoje, você depende 100% de indicações ou tráfego pago, pois o Google Orgânico (gratuito) não está trabalhando a seu favor.";
    } else {
      mainInsight = "Seu posicionamento geográfico está limitado. Você aparece apenas para quem está muito perto, perdendo clientes de bairros vizinhos que buscam pelo seu serviço e encontram outros.";
    }
  } else if (lowestPilar.id === 'aut') {
    // Problema de Autoridade
    if (data[5] === 'nenhuma' || data[5] === '1_10') {
      mainInsight = "Você sofre do 'Efeito Restaurante Vazio'. O cliente te encontra, mas ao ver poucas avaliações, sente insegurança e clica no concorrente que tem mais prova social, mesmo que o serviço dele seja inferior.";
    } else if (data[8] === 'nao' || data[8] === 'mais_menos') {
      mainInsight = "Sua vitrine digital está desarrumada. Fotos antigas ou informações incompletas passam a impressão de amadorismo, fazendo com que clientes qualificados descartem sua empresa antes mesmo de ligar.";
    } else {
      mainInsight = "Falta validação externa. Você tem visibilidade, mas sua taxa de conversão é baixa porque seu perfil não transmite a autoridade de um líder de mercado na sua região.";
    }
  } else {
    // Problema de Engajamento/Manutenção (Eng) ou Score Alto Geral
    if (overallScore > 80) {
      mainInsight = "Você já domina o básico, mas está deixando dinheiro na mesa ao não usar recursos avançados. Pequenos ajustes de SEO semântico podem blindar sua posição contra novos concorrentes.";
    } else if (data[6] === 'raramente' || data[6] === 'nunca') {
      mainInsight = "O algoritmo do Google odeia perfis 'abandonados'. Ao não responder avaliações ou postar atualizações, o robô entende que a empresa fechou ou não se importa, derrubando seu alcance gradativamente.";
    } else {
      mainInsight = "Seu perfil sofre do 'Efeito Gangorra'. Você sobe e desce nos resultados porque não tem uma rotina de alimentação de dados (fotos/posts) que sinalize 'frescor' (freshness) constante para o Google.";
    }
  }

  const categories: ReportCategory[] = [
    {
      id: 'vis',
      title: 'Visibilidade Local',
      score: visibilidadeScore,
      status: visibilidadeScore < 40 ? 'critical' : visibilidadeScore < 75 ? 'warning' : 'optimal',
      findings: visibilidadeScore < 40 
        ? ['Ranking inexistente para termos de compra.', 'Concorrência capturando >80% da demanda local.'] 
        : visibilidadeScore < 75 
        ? ['Visibilidade instável (aparece e some).', 'Indexação fraca para bairros vizinhos.']
        : ['Excelente domínio geográfico.', 'Primeiras posições consolidadas.']
    },
    {
      id: 'aut',
      title: 'Autoridade e Confiança',
      score: autoridadeScore,
      status: autoridadeScore < 40 ? 'critical' : autoridadeScore < 75 ? 'warning' : 'optimal',
      findings: autoridadeScore < 40
        ? ['Gatilho de prova social ausente (poucas estrelas).', 'Percepção de marca inferior à qualidade real.']
        : autoridadeScore < 75
        ? ['Volume de avaliações não blinda contra concorrentes.', 'Falta de respostas gera desconfiança.']
        : ['Perfil transmite alta credibilidade.', 'Marca consolidada digitalmente.']
    },
    {
      id: 'eng',
      title: 'Saúde do Algoritmo',
      score: engajamentoScore,
      status: engajamentoScore < 40 ? 'critical' : engajamentoScore < 75 ? 'warning' : 'optimal',
      findings: engajamentoScore < 40
        ? ['Sinal de "Abandono Digital" ativado.', 'Algoritmo reduzindo entrega por inatividade.']
        : engajamentoScore < 75
        ? ['Frequência irregular de posts/fotos.', 'Interação reativa em vez de proativa.']
        : ['Excelente sinalização de "Freshness".', 'Alta afinidade com o robô do Google.']
    }
  ];

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
