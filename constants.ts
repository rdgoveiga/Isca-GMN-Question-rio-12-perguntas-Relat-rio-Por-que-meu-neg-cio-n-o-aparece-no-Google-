
import { QuestionStep, FormData } from './types';

export const THEME = {
  primary: '#3B82F6',
  secondary: '#A020F0',
  cardBg: '#EFF6FF',
  textBlack: '#0B0B0B',
  textGray: '#6B6B6B',
  brandGradient: 'linear-gradient(to right, #3B82F6, #A020F0)',
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
    subtitle: '(Não pesquise pelo nome da empresa, e sim pelo serviço — como as pessoas normalmente buscam | Ex: Nutricionista em São Paulo ou Pizzaria em Brasília)',
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
  // --- TELA FINAL (REPORT) ---
  {
    id: 14,
    type: 'info',
    progress: 100,
    title: 'Seu Relatório está pronto!',
    description: 'Com base nas suas respostas, geramos um diagnóstico estratégico do seu perfil. \n\nClique abaixo para ler seu relatório.'
  }
];

// --- LÓGICA DE GERAÇÃO DO RELATÓRIO DINÂMICO ---

export interface ReportSection {
  title: string;
  content: string[];
  type: 'text' | 'list' | 'alert' | 'highlight';
}

export const generateDiagnosticReport = (data: FormData, aiAnalysis?: string | null): ReportSection[] => {
  const sections: ReportSection[] = [];
  const name = (data[11] as string)?.split(' ')[0] || 'Gestor(a)';

  // --- MAPA DE VARIÁVEIS ---
  // Respostas Cruciais
  const R_EXISTE = data[1] === 'sim';
  const R_CONTATO = data[2] as string; // todos_dias, semana, raramente, nunca
  const R_VISIBILIDADE = data[3] as string; // primeiros, demora, quase_nunca, nao_aparece
  const R_CONCORRENTE = data[4] as string; // sim, alguns, nao
  const R_AVALIACOES = data[5] as string; // nenhuma, 1_10, 11_30, 30_mais
  const R_RESPOSTA = data[6] as string; // sempre, raramente, nunca
  const R_UPDATES = data[7] as string; // toda_semana, mes, raramente, nunca
  const R_OBJETIVO = data[10] as string; // agenda, independencia, faturamento, tranquilidade

  // --- 1. DEFINIÇÃO DO ARQUÉTIPO (NÍVEL DE SAÚDE) ---
  let archetype = "";
  let urgencyLevel = "";

  if (!R_EXISTE || data[1] === 'nao' || data[1] === 'nao_certeza') {
    archetype = "OFFLINE";
    urgencyLevel = "CRÍTICO";
  } else if ((R_VISIBILIDADE === 'primeiros' || R_VISIBILIDADE === 'demora') && (R_CONTATO === 'raramente' || R_CONTATO === 'nunca')) {
    archetype = "VITRINE_FANTASMA"; // Aparece mas não converte
    urgencyLevel = "ALERTA MÁXIMO";
  } else if ((R_VISIBILIDADE === 'quase_nunca' || R_VISIBILIDADE === 'nao_aparece')) {
    archetype = "INVISIVEL";
    urgencyLevel = "SEVERO";
  } else if (R_UPDATES === 'nunca' || R_UPDATES === 'raramente') {
    archetype = "ESTAGNADO";
    urgencyLevel = "MODERADO";
  } else {
    archetype = "SUBUTILIZADO";
    urgencyLevel = "OPORTUNIDADE";
  }

  // --- 2. TÍTULO DINÂMICO ---
  let mainTitle = "";
  let mainDesc = "";

  switch (archetype) {
    case "OFFLINE":
      mainTitle = `Status: Inexistência Digital (Nível ${urgencyLevel})`;
      mainDesc = "Não detectamos indexação ativa. Atualmente, 100% da demanda de busca local pelo seu serviço está sendo desviada para a concorrência.";
      break;
    case "VITRINE_FANTASMA":
      mainTitle = `Status: Dissonância de Conversão (Nível ${urgencyLevel})`;
      mainDesc = `Detectamos uma anomalia grave: seu perfil tem impressões, mas falha na conversão final. O tráfego chega, mas é repelido por falta de validação técnica de autoridade.`;
      break;
    case "INVISIVEL":
      mainTitle = `Status: Supressão de Visibilidade (Nível ${urgencyLevel})`;
      mainDesc = "Seu perfil entrou na 'Zona de Amortecimento' do Google. O algoritmo removeu sua prioridade de exibição devido à baixa emissão de sinais de relevância.";
      break;
    case "ESTAGNADO":
      mainTitle = `Status: Decaimento de Sinais (Nível ${urgencyLevel})`;
      mainDesc = "O perfil existe, mas opera com dados expirados (Stale Data). O Google prioriza informações frescas, o que coloca sua empresa em desvantagem progressiva.";
      break;
    default:
      mainTitle = `Status: Capacidade Ociosa`;
      mainDesc = "Sua empresa está operando abaixo do potencial de captura de mercado. Existem camadas de otimização inexploradas que poderiam dobrar sua exposição.";
  }

  // INSERÇÃO DA IA OU DIAGNÓSTICO PRINCIPAL
  if (aiAnalysis) {
    sections.push({ title: "Análise de Algoritmo (I.A.)", content: [aiAnalysis], type: 'highlight' });
    sections.push({ title: "Diagnóstico Técnico Estrutural", content: [mainDesc], type: 'text' });
  } else {
    sections.push({ title: mainTitle, content: [mainDesc], type: 'highlight' });
  }

  // --- 3. CONSTRUÇÃO DOS PONTOS DE ATRITO (Variável por resposta específica) ---
  const blocks: string[] = [];

  // Variavel A: Concorrência (Baseado na Q4)
  if (R_CONCORRENTE === 'sim') {
    blocks.push("Deslocamento Competitivo: O algoritmo identificou perfis concorrentes com 'Data Points' (pontos de dados) mais estruturados, concedendo a eles a preferência de ranking (Rank Brain preference).");
  } else if (R_CONCORRENTE === 'alguns') {
    blocks.push("Instabilidade de Posicionamento: Sua empresa aparece intermitentemente, indicando que seu 'Quality Score' está no limiar mínimo para exibição, sendo facilmente superado.");
  }

  // Variavel B: Avaliações (Baseado na Q5)
  if (R_AVALIACOES === 'nenhuma') {
    blocks.push("Vazio de Confiança (Trust Void): A ausência total de validação social impede a ativação dos gatilhos de conversão. O usuário moderno interpreta 'zero avaliações' como 'empresa de risco'.");
  } else if (R_AVALIACOES === '1_10') {
    blocks.push("Volume Crítico Insuficiente: A densidade atual de avaliações não gera peso estatístico suficiente para o Google validar sua empresa como Autoridade Regional.");
  } else {
    // Se tem avaliações, verifica a resposta (Q6)
    if (R_RESPOSTA === 'nunca' || R_RESPOSTA === 'raramente') {
      blocks.push("Quebra de Protocolo de Engajamento: O Google monitora a 'Taxa de Resposta do Proprietário'. A ausência de interação técnica sinaliza abandono, penalizando o alcance.");
    }
  }

  // Variavel C: Atualizações (Baseado na Q7)
  if (R_UPDATES === 'nunca' || R_UPDATES === 'raramente') {
    blocks.push("Obsolescência de Metadados: O Googlebot varre perfis em busca de 'Freshness' (novidade). A estática do perfil envia sinais de que o negócio pode estar inoperante.");
  } else if (R_UPDATES === 'mes') {
    blocks.push("Ciclos de Indexação Irregulares: A injeção de dados intermitente impede a criação de uma curva de crescimento sólida no gráfico de impressões do buscador.");
  }

  // Variavel D: Profissionalismo (Baseado na Q8)
  if (data[8] === 'nao' || data[8] === 'mais_menos') {
    blocks.push("Deficit de Identidade Visual: O perfil não comunica os atributos de marca necessários para justificar o preço ou a qualidade do serviço, gerando rejeição imediata.");
  }

  sections.push({
    title: "Auditoria de Fricção (Pontos de Falha)",
    content: blocks.length > 0 ? blocks : ["Subutilização geral dos recursos da plataforma (Google Business Profile API)."],
    type: 'list'
  });

  // --- 4. PREVISÃO DE CENÁRIO (Baseado no Objetivo Q10) ---
  // Aqui conectamos o problema técnico ao desejo emocional do usuário
  let futureScenario = "";
  
  switch (R_OBJETIVO) {
    case 'faturamento':
      futureScenario = "Correção do CAC (Custo de Aquisição): Ao ajustar a indexação, o perfil passa a atrair tráfego orgânico qualificado, reduzindo a dependência de descontos ou anúncios pagos para gerar receita.";
      break;
    case 'agenda':
      futureScenario = "Previsibilidade de Fluxo: Um perfil tecnicamente saudável gera uma curva de demanda constante, eliminando os 'vales' na agenda e permitindo planejamento financeiro.";
      break;
    case 'independencia':
      futureScenario = "Ativo Proprietário: Deixar de depender do 'boca a boca' instável e transformar o Google em um canal de aquisição automática que funciona 24/7.";
      break;
    case 'tranquilidade':
      futureScenario = "Automação de Autoridade: O perfil trabalhará como um filtro, respondendo dúvidas e quebrando objeções automaticamente antes mesmo do cliente entrar em contato.";
      break;
    default:
      futureScenario = "Otimização de Conversão: Transformar visualizações passivas em ações de contato rastreáveis.";
  }

  sections.push({
    title: "Projeção de Otimização",
    content: [
      futureScenario,
      "Recuperação de Ranking: Retomada das posições de destaque para palavras-chave transacionais (que indicam intenção de compra).",
      "Indexação Semântica: Ensinar o Google exatamente quem é o seu cliente ideal para que ele pare de entregar tráfego sujo."
    ],
    type: 'text'
  });

  // --- 5. ALERTA E FECHAMENTO ---
  sections.push({
    title: "Protocolo de Segurança",
    content: [
      "Atenção: Correções intuitivas (feitas sem base técnica) frequentemente resultam em bloqueios. O algoritmo do Google é sensível a alterações bruscas de dados."
    ],
    type: 'alert'
  });

  sections.push({
    title: `Conclusão para ${name}`,
    content: [
      `Sua configuração atual está classificada como '${urgencyLevel}'.`,
      "Existe uma lacuna técnica entre como sua empresa opera no mundo real e como ela é lida pelo robô do Google. Fechar essa lacuna é o único caminho para desbloquear a demanda da sua região."
    ],
    type: 'text'
  });

  return sections;
};
