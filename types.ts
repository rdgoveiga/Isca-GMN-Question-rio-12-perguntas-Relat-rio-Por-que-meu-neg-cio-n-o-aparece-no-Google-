
export type QuestionType = 'radio' | 'checkbox' | 'grid' | 'info' | 'intro' | 'text';

export interface Option {
  id: string;
  label: string;
}

export interface QuestionStep {
  id: number;
  type: QuestionType;
  progress: number;
  title: string;
  subtitle?: string;
  description?: string;
  options?: Option[];
  gridCols?: number;
  placeholder?: string; // Para inputs de texto
}

export interface FormData {
  [key: number]: string | string[];
  email?: string;
  name?: string;
}

export interface LeadPayload {
  timestamp: string;
  source: string;
  device: string;
  answers: FormData;
  metadata: {
    utm_source?: string;
    utm_medium?: string;
    utm_campaign?: string;
  };
}
