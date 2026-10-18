import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { BottomNavigation } from './components/BottomNavigation';
import { DashboardView } from './components/DashboardView';
import { ProblemDetailView } from './components/ProblemDetailView';
import { ProblemsExplorerView } from './components/ProblemsExplorerView';
import { QuestsView } from './components/QuestsView';
import { SolutionsLabView } from './components/SolutionsLabView';
import { CollaborateSquadsView } from './components/CollaborateSquadsView';
import { SubmitProblemModal } from './components/SubmitProblemModal';
import { AddEvidenceModal } from './components/AddEvidenceModal';
import { Toast } from './components/Toast';

const AppContent: React.FC = () => {
  const { activeTab, selectedProblemId, problems } = useApp();

  const selectedProblem = selectedProblemId
    ? problems.find((p) => p.id === selectedProblemId) || problems[0]
    : null;

  return (
    <div className="min-h-screen bg-[#0f131c] text-[#dfe2ee] font-sans flex flex-col selection:bg-[#4d8eff] selection:text-[#002e6a]">
      {/* Top Fixed Header */}
      <Header />

      {/* Main Viewport Canvas */}
      <main className="flex-1 w-full max-w-5xl mx-auto px-3 sm:px-6 pt-20 pb-16">
        {selectedProblem ? (
          <ProblemDetailView problem={selectedProblem} />
        ) : activeTab === 'dashboard' ? (
          <DashboardView />
        ) : activeTab === 'problems' ? (
          <ProblemsExplorerView />
        ) : activeTab === 'quests' ? (
          <QuestsView />
        ) : activeTab === 'solutions' ? (
          <SolutionsLabView />
        ) : (
          <CollaborateSquadsView />
        )}
      </main>

      {/* Fixed Bottom Navigation (Mobile/Tablet) & Submit FAB */}
      <BottomNavigation />

      {/* Global Modals & Notifications */}
      <SubmitProblemModal />
      <AddEvidenceModal />
      <Toast />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
