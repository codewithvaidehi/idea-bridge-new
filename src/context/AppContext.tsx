import React, { createContext, useContext, useState, useEffect } from 'react';
import { Problem, UserProfile, ValidationStage, EvidenceItem } from '../types';
import { INITIAL_PROBLEMS, INITIAL_USER_PROFILE, VALIDATION_STAGES } from '../data/mockData';

export type TabType = 'dashboard' | 'problems' | 'quests' | 'solutions' | 'collaborate';

interface ToastNotification {
  id: string;
  message: string;
  creditsEarned?: number;
  type: 'success' | 'info' | 'accent';
}

interface AppContextType {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  selectedProblemId: string | null;
  setSelectedProblemId: (id: string | null) => void;
  userProfile: UserProfile;
  problems: Problem[];
  validationStages: ValidationStage[];
  triageFilter: string;
  setTriageFilter: (filter: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeToast: ToastNotification | null;
  showToast: (message: string, creditsEarned?: number, type?: 'success' | 'info' | 'accent') => void;
  confirmProblemExperience: (problemId: string, creditsEarned?: number) => void;
  confirmEvidenceItem: (problemId: string, evidenceId: string, credits: number) => void;
  addEvidenceToProblem: (problemId: string, newEvidence: Omit<EvidenceItem, 'id' | 'problemId'>) => void;
  acceptQuest: (questId: string, creditsEarned: number) => void;
  joinBlockerMission: (problemId: string) => void;
  toggleBookmarkProblem: (problemId: string) => void;
  submitNewProblem: (data: {
    title: string;
    sector: string;
    description: string;
    rootFriction: string;
    impact: 'High' | 'Moderate' | 'Critical';
  }) => void;
  isSubmitModalOpen: boolean;
  setIsSubmitModalOpen: (open: boolean) => void;
  isAddEvidenceModalOpen: boolean;
  setIsAddEvidenceModalOpen: (open: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [selectedProblemId, setSelectedProblemId] = useState<string | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile>(INITIAL_USER_PROFILE);
  const [problems, setProblems] = useState<Problem[]>(INITIAL_PROBLEMS);
  const [validationStages] = useState<ValidationStage[]>(VALIDATION_STAGES);
  const [triageFilter, setTriageFilter] = useState<string>('All Problems (42)');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeToast, setActiveToast] = useState<ToastNotification | null>(null);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [isAddEvidenceModalOpen, setIsAddEvidenceModalOpen] = useState(false);

  const showToast = (message: string, creditsEarned?: number, type: 'success' | 'info' | 'accent' = 'success') => {
    const id = Date.now().toString();
    setActiveToast({ id, message, creditsEarned, type });
  };

  useEffect(() => {
    if (activeToast) {
      const timer = setTimeout(() => {
        setActiveToast(null);
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [activeToast]);

  const confirmProblemExperience = (problemId: string, creditsEarned: number = 45) => {
    setProblems((prev) =>
      prev.map((prob) => {
        if (prob.id === problemId) {
          const already = prob.corroboratedByCurrentUser;
          return {
            ...prob,
            confirmationsCount: already ? prob.confirmationsCount : prob.confirmationsCount + 1,
            corroboratedByCurrentUser: true,
            quorumPercentage: Math.min(100, prob.quorumPercentage + (already ? 0 : 2)),
          };
        }
        return prob;
      })
    );

    setUserProfile((prev) => {
      if (prev.confirmedProblemIds.includes(problemId)) return prev;
      return {
        ...prev,
        credits: prev.credits + creditsEarned,
        confirmedProblemIds: [...prev.confirmedProblemIds, problemId],
      };
    });

    showToast(`Corroboration logged! Experience confirmed.`, creditsEarned, 'success');
  };

  const confirmEvidenceItem = (problemId: string, evidenceId: string, credits: number = 25) => {
    setProblems((prev) =>
      prev.map((prob) => {
        if (prob.id === problemId) {
          const updatedEv = prob.evidenceItems.map((ev) => {
            if (ev.id === evidenceId) {
              return { ...ev, userConfirmed: true };
            }
            return ev;
          });
          return {
            ...prob,
            evidenceItems: updatedEv,
            confirmationsCount: prob.confirmationsCount + 1,
          };
        }
        return prob;
      })
    );

    setUserProfile((prev) => ({
      ...prev,
      credits: prev.credits + credits,
    }));

    showToast(`Evidence verified! +${credits} cred points added to your ledger.`, credits, 'accent');
  };

  const addEvidenceToProblem = (problemId: string, newEvidence: Omit<EvidenceItem, 'id' | 'problemId'>) => {
    const evidenceEntry: EvidenceItem = {
      ...newEvidence,
      id: `ev-${Date.now()}`,
      problemId,
    };

    setProblems((prev) =>
      prev.map((prob) => {
        if (prob.id === problemId) {
          return {
            ...prob,
            evidenceCount: prob.evidenceCount + 1,
            evidenceItems: [evidenceEntry, ...prob.evidenceItems],
          };
        }
        return prob;
      })
    );

    setUserProfile((prev) => ({
      ...prev,
      credits: prev.credits + 50,
    }));

    setIsAddEvidenceModalOpen(false);
    showToast(`Field evidence submitted to ledger! +50 Credits`, 50, 'success');
  };

  const acceptQuest = (questId: string, creditsEarned: number) => {
    setUserProfile((prev) => {
      if (prev.claimedQuestIds.includes(questId)) return prev;
      return {
        ...prev,
        credits: prev.credits + creditsEarned,
        claimedQuestIds: [...prev.claimedQuestIds, questId],
      };
    });

    setProblems((prev) =>
      prev.map((prob) => ({
        ...prob,
        activeQuests: prob.activeQuests.map((q) => {
          if (q.id === questId) {
            return {
              ...q,
              spotsFilled: Math.min(q.spotsTotal, q.spotsFilled + 1),
              status: 'claimed',
            };
          }
          return q;
        }),
      }))
    );

    showToast(`Quest accepted! Claim bounty unlocked.`, creditsEarned, 'accent');
  };

  const joinBlockerMission = (problemId: string) => {
    setUserProfile((prev) => {
      const isAlready = prev.joinedSquadIds.includes(problemId);
      const updated = isAlready
        ? prev.joinedSquadIds.filter((id) => id !== problemId)
        : [...prev.joinedSquadIds, problemId];
      return {
        ...prev,
        joinedSquadIds: updated,
        credits: isAlready ? prev.credits : prev.credits + 20,
      };
    });

    const isMember = userProfile.joinedSquadIds.includes(problemId);
    showToast(
      isMember ? 'Left Blocker Mission Squad' : 'Enlisted into Blocker Mission Taskforce!',
      isMember ? undefined : 20,
      'accent'
    );
  };

  const toggleBookmarkProblem = (problemId: string) => {
    setUserProfile((prev) => {
      const exists = prev.bookmarkedProblemIds.includes(problemId);
      return {
        ...prev,
        bookmarkedProblemIds: exists
          ? prev.bookmarkedProblemIds.filter((id) => id !== problemId)
          : [...prev.bookmarkedProblemIds, problemId],
      };
    });
    const exists = userProfile.bookmarkedProblemIds.includes(problemId);
    showToast(exists ? 'Removed from saved problems' : 'Saved to personal watchlist', undefined, 'info');
  };

  const submitNewProblem = (data: {
    title: string;
    sector: string;
    description: string;
    rootFriction: string;
    impact: 'High' | 'Moderate' | 'Critical';
  }) => {
    const newProb: Problem = {
      id: `prob-${Date.now()}`,
      title: data.title,
      sector: data.sector || 'Civic & Infrastructure',
      date: 'Today',
      impact: data.impact || 'High',
      description: data.description,
      gateLabel: 'Gate 01/08 Active',
      activeGate: 1,
      totalGates: 8,
      quorumPercentage: 20,
      systemicBlockersCount: 1,
      confirmationsCount: 1,
      evidenceCount: 1,
      rootFrictionUnlocked: data.rootFriction,
      imageUrl: '/src/assets/images/micro_depot_containers_1792285182592.jpg',
      empiricalPassRate: 85,
      corroboratedByCurrentUser: true,
      blocker: {
        id: `blk-${Date.now()}`,
        problemId: `prob-${Date.now()}`,
        title: 'Initial Operational Friction Lockout',
        severity: 'Moderate',
        diagnosedBy: userProfile.name,
        needsProposals: true,
        rootCause: data.rootFriction,
        subChallenges: [
          { id: 'sub-new-1', title: 'Data Telemetry Verification', iconName: 'sensors' },
          { id: 'sub-new-2', title: 'Stakeholder Economic Incentives', iconName: 'payments' },
        ],
      },
      evidenceItems: [
        {
          id: `ev-initial-${Date.now()}`,
          problemId: `prob-${Date.now()}`,
          title: 'Initial Intake Affidavit & Observations',
          type: 'receipt',
          verifiedBadge: 'Pending Verification',
          description: data.description,
          confirmCredits: 25,
        },
      ],
      activeQuests: [
        {
          id: `quest-new-${Date.now()}`,
          problemId: `prob-${Date.now()}`,
          title: `Field Survey: Validate "${data.title.slice(0, 32)}..."`,
          categoryTag: 'Field Survey',
          rewardCredits: 100,
          description: 'Survey 3 affected domain operators to establish recurring unit cost impact.',
          spotsFilled: 1,
          spotsTotal: 5,
          status: 'open',
          squadMembers: [{ name: userProfile.name, initials: 'ER', role: 'Intake Lead' }],
        },
      ],
      proposals: [],
      contributors: [{ initials: 'YOU', bgClass: 'bg-primary-container text-on-primary' }],
    };

    setProblems([newProb, ...problems]);
    setUserProfile((prev) => ({
      ...prev,
      credits: prev.credits + 100,
    }));
    setIsSubmitModalOpen(false);
    setSelectedProblemId(newProb.id);
    showToast('Problem successfully logged into Gate 1! +100 Credits', 100, 'success');
  };

  return (
    <AppContext.Provider
      value={{
        activeTab,
        setActiveTab,
        selectedProblemId,
        setSelectedProblemId,
        userProfile,
        problems,
        validationStages,
        triageFilter,
        setTriageFilter,
        searchQuery,
        setSearchQuery,
        activeToast,
        showToast,
        confirmProblemExperience,
        confirmEvidenceItem,
        addEvidenceToProblem,
        acceptQuest,
        joinBlockerMission,
        toggleBookmarkProblem,
        submitNewProblem,
        isSubmitModalOpen,
        setIsSubmitModalOpen,
        isAddEvidenceModalOpen,
        setIsAddEvidenceModalOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
