// Complete type system for the SafeSpace AI application

export type ThreatType = 'stalking' | 'threats' | 'grooming' | 'doxxing' | 'blackmail' | 'harassment' | 'impersonation' | 'coordinated_abuse' | 'none';

export type SeverityLevel = 'low' | 'medium' | 'high' | 'critical';

export interface DetectionResult {
  threat_detected: boolean;
  threat_type: ThreatType;
  severity_score: number;
  key_indicators: string[];
  context_needed: string;
  immediate_safety_concerns: boolean;
  reasoning: string;
}

export interface RiskFactors {
  immediate_threat: boolean;
  escalation_pattern: boolean;
  personal_info_exposed: boolean;
  coordination_suspected: boolean;
  repeated_contact: boolean;
}

export interface SeverityAssessment {
  severity_level: SeverityLevel;
  severity_score: number;
  risk_factors: RiskFactors;
  recommended_action: 'document_only' | 'report_to_platform' | 'contact_helpline' | 'emergency_services';
  reasoning: string;
  safety_score: number;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  id?: string;
}

export interface ThreatEvidence {
  message: string;
  date: string;
  platform: string;
  severity: 'high' | 'medium' | 'low';
}

export interface Timeline {
  first_contact?: string;
  pattern_duration: string;
  recent_incident: string;
  escalation_observed: string;
}

export interface IncidentReport {
  report_title: string;
  date_generated: string;
  summary_for_authorities: string;
  personal_summary: string;
  timeline: Timeline;
  threat_evidence: ThreatEvidence[];
  key_indicators_detected: string[];
  severity_assessment: string;
  jurisdiction_relevant: string;
  recommended_next_steps: string[];
  resource_links: {
    crisis_helpline: string;
    platform_reporting: string;
    law_enforcement: string;
    mental_health: string;
  };
  safety_tips: string[];
  export_ready: boolean;
}

export interface PrimaryResource {
  name: string;
  type: string;
  contact: string;
  availability: string;
  description: string;
}

export interface SecondaryResource {
  name: string;
  type: string;
  contact: string;
  why_recommended: string;
}

export interface EmergencyContact {
  if_immediate_danger: string;
  crisis_text_line: string;
  call_rainn: string;
}

export interface SafetyResources {
  urgent_action_needed: boolean;
  emergency_contact: EmergencyContact;
  primary_resource: PrimaryResource;
  secondary_resources: SecondaryResource[];
  next_steps: string[];
  immediate_safety_actions: string[];
}

export interface AppState {
  currentPage: 'home' | 'detector' | 'results' | 'resources';
  inputMessage: string;
  detectionResult: DetectionResult | null;
  severityAssessment: SeverityAssessment | null;
  chatHistory: ChatMessage[];
  incidentReport: IncidentReport | null;
  safetyResources: SafetyResources | null;
  loading: boolean;
  error: string | null;
  darkMode: boolean;
}

export interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  timestamp: Date;
}

export type AppPage = 'home' | 'detector' | 'results' | 'resources';

export interface AnalysisData {
  threatType: ThreatType;
  severityLevel: SeverityLevel;
}

