// Domain and assessment related types
export interface DomainScore {
  name: string;
  score: number;
  maxScore: number;
  target?: number;
  capability?: number;
  capabilityTarget?: number;
  inScope?: string;
  subdomains?: SubdomainScore[];
}

export interface SubdomainScore {
  name: string;
  score: number;
  target?: number;
  capability?: number;
  capabilityTarget?: number;
  inScope?: string;
}

export interface DetailedFunction {
  function: string;
  category: string;
  maturityScore: number;
  capabilityScore: string | number;
}

// Assessment types
export interface Assessment {
  id: string;
  name: string;
  date: string;
  status: 'in-progress' | 'completed';
  progress: number;
  domains: DomainScore[];
  overallScore?: number;
}
