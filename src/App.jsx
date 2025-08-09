"use client";

import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAppState } from "./hooks";
import {
  Header,
  AISidebar,
  OutputSidebar,
  QuickActionsPanel,
  AnimatedBackground,
} from "./components/layout";
import { appStyles } from "./styles/AppStyles";

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    // State
    theme,
    code,
    language,
    sidebarOpen,
    outputSidebarOpen,
    chatMessages,
    chatInput,
    isTyping,
    aiAssistantEnabled,
    user,

    // Setters
    setCode,
    setLanguage,
    setChatInput,

    // Actions
    toggleTheme,
    toggleSidebar,
    toggleOutputSidebar,
    toggleAiAssistant,
    handleExplainCode,
    handleAutocomplete,
    handleChatSubmit,
    handleLoadCode,
    handleQuickSave,
  } = useAppState();

  // Navigation handlers using React Router
  const handleGetStarted = () => navigate("/editor");
  const handleGoHome = () => navigate("/");
  const handleShowCodeManager = () => navigate("/code-manager");
  const handleShowCodeTreasure = () => navigate("/code-treasure");
  const handleShowSettings = () => navigate("/settings");
  const handleBackFromCodeManager = () => navigate("/editor");
  const handleBackFromTreasure = () => navigate("/editor");
  const handleBackFromSettings = () => navigate("/editor");

  // Check if current route is editor
  const isEditorRoute = location.pathname === "/editor";

  return (
    <div className="relative">
      {/* Animated Background */}
      <AnimatedBackground theme={theme} />

      {/* Main app UI */}
      <div
        className={`relative z-10 flex flex-col ${
          isEditorRoute ? "h-screen" : "min-h-screen"
        }`}
      >
        {/* Header - Only show for editor route */}
        {isEditorRoute && (
          <Header
            theme={theme}
            currentRoute="editor"
            user={user}
            aiAssistantEnabled={aiAssistantEnabled}
            sidebarOpen={sidebarOpen}
            outputSidebarOpen={outputSidebarOpen}
            toggleTheme={toggleTheme}
            toggleAiAssistant={toggleAiAssistant}
            toggleSidebar={toggleSidebar}
            toggleOutputSidebar={toggleOutputSidebar}
            handleGoHome={handleGoHome}
            handleShowCodeManager={handleShowCodeManager}
          />
        )}

        {/* Main Content */}
        <div
          className={`flex-1 flex relative ${
            isEditorRoute ? "overflow-hidden" : ""
          }`}
        >
          {/* Routes Content */}
          <div
            className={`${
              isEditorRoute
                ? "flex-1 h-full" // Take full width for editor
                : "flex-1 overflow-y-auto"
            }`}
          >
            <Outlet
              context={{
                theme,
                toggleTheme,
                sidebarOpen,
                outputSidebarOpen,
                code,
                setCode,
                language,
                setLanguage,
                user,
                handleExplainCode,
                handleAutocomplete,
                aiAssistantEnabled,
                handleQuickSave,
                handleShowCodeManager,
                handleGetStarted,
                handleShowCodeTreasure,
                handleShowSettings,
                handleBackFromCodeManager,
                handleBackFromTreasure,
                handleBackFromSettings,
                handleLoadCode,
                onBack: handleBackFromCodeManager,
                onLoadCode: handleLoadCode,
                currentCode: code,
                currentLanguage: language,
                onGetStarted: handleGetStarted,
                onShowCodeTreasure: handleShowCodeTreasure,
              }}
            />
          </div>

          {/* AI Sidebar - Only show for editor route */}
          {isEditorRoute && (
            <AISidebar
              theme={theme}
              sidebarOpen={sidebarOpen}
              user={user}
              aiAssistantEnabled={aiAssistantEnabled}
              chatMessages={chatMessages}
              chatInput={chatInput}
              isTyping={isTyping}
              toggleSidebar={toggleSidebar}
              setChatInput={setChatInput}
              handleChatSubmit={handleChatSubmit}
              handleShowSettings={handleShowSettings}
            />
          )}

          {/* Output Sidebar - Only show for editor route */}
          {isEditorRoute && (
            <OutputSidebar
              theme={theme}
              outputSidebarOpen={outputSidebarOpen}
              toggleOutputSidebar={toggleOutputSidebar}
              code={code}
              language={language}
              aiAssistantEnabled={aiAssistantEnabled}
              handleShowSettings={handleShowSettings}
            />
          )}

          {/* Quick Actions Panel - Only show for editor route */}
          {isEditorRoute && (
            <QuickActionsPanel
              theme={theme}
              sidebarOpen={sidebarOpen}
              outputSidebarOpen={outputSidebarOpen}
              user={user}
              aiAssistantEnabled={aiAssistantEnabled}
              toggleSidebar={toggleSidebar}
              toggleOutputSidebar={toggleOutputSidebar}
              handleShowCodeManager={handleShowCodeManager}
              handleExplainCode={handleExplainCode}
              handleAutocomplete={handleAutocomplete}
              handleShowSettings={handleShowSettings}
            />
          )}
        </div>
      </div>

      {/* Global Styles */}
      <style jsx>{appStyles}</style>
    </div>
  );
}

export default App;
