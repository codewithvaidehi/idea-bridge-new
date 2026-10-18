export type ValidationStageNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export interface ValidationStage {
  id: ValidationStageNumber;
  name: string;
  shortName: string;
  status: 'completed' | 'active' | 'upcoming';
  passedDate?: string;
  metricLabel?: string;
  description: string;
}

export interface SubChallenge {
  id: string;
  title: string;
  iconName: string;
}

export interface BlockerDiagnosis {
  id: string;
  problemId: string;
  title: string;
  severity: 'Critical' | 'High' | 'Moderate';
  diagnosedBy: string;
  needsProposals: boolean;
  rootCause: string;
  subChallenges: SubChallenge[];
}

export interface EvidenceItem {
  id: string;
  problemId: string;
  title: string;
  type: 'receipt' | 'survey' | 'ai_synthesis' | 'document';
  verifiedBadge: string;
  description: string;
  images?: string[];
  docCountNotice?: string;
  confidenceScore?: number;
  userConfirmed?: boolean;
  confirmCredits?: number;
}

export interface Quest {
  id: string;
  problemId: string;
  title: string;
  categoryTag: string;
  rewardCredits: number;
  description: string;
  squadMembers: {
    name: string;
    avatarUrl?: string;
    initials: string;
    role: string;
  }[];
  spotsFilled: number;
  spotsTotal: number;
  status: 'open' | 'claimed' | 'in_progress' | 'completed';
}

export interface SolutionProposal {
  id: string;
  problemId: string;
  title: string;
  leadArchitect: string;
  status: 'Under Peer Review' | 'Active Squad' | 'Pilot Ready';
  description?: string;
  feasibilityScore?: number;
  pilotSOPTitle?: string;
}

export interface Problem {
  id: string;
  title: string;
  sector: string;
  date: string;
  impact: 'High' | 'Moderate' | 'Critical';
  description: string;
  gateLabel: string;
  activeGate: number;
  totalGates: number;
  quorumPercentage: number;
  systemicBlockersCount: number;
  confirmationsCount: number;
  evidenceCount: number;
  rootFrictionUnlocked: string;
  imageUrl?: string;
  empiricalPassRate?: number;
  urgencyStatus?: 'NEEDS FIELD CORROBORATION' | 'SECTOR SPRINT' | 'BLOCKED';
  urgencySeverity?: 'High Severity' | 'Critical Severity' | 'Moderate Severity';
  urgencySummary?: string;
  corroboratedByCurrentUser?: boolean;
  evidenceItems: EvidenceItem[];
  blocker?: BlockerDiagnosis;
  activeQuests: Quest[];
  proposals: SolutionProposal[];
  contributors: { initials: string; bgClass: string }[];
}

export interface UserProfile {
  name: string;
  handle: string;
  avatarUrl: string;
  credits: number;
  role: string;
  confirmedProblemIds: string[];
  claimedQuestIds: string[];
  joinedSquadIds: string[];
  bookmarkedProblemIds: string[];
}
