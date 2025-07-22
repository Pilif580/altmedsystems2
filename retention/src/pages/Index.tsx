
import React, { useState } from 'react';
import WelcomeScreen from '@/components/WelcomeScreen';
import ChecklistScreen from '@/components/ChecklistScreen';
import ReflectionScreen from '@/components/ReflectionScreen';
import ConfirmationScreen from '@/components/ConfirmationScreen';

type AppStep = 'welcome' | 'checklist' | 'reflection' | 'confirmation';

const Index = () => {
  const [currentStep, setCurrentStep] = useState<AppStep>('welcome');
  const [checklistData, setChecklistData] = useState<Record<string, boolean>>({});
  const [reflectionData, setReflectionData] = useState<Record<string, string>>({});

  const nextStep = () => {
    switch (currentStep) {
      case 'welcome':
        setCurrentStep('checklist');
        break;
      case 'checklist':
        setCurrentStep('reflection');
        break;
      case 'reflection':
        setCurrentStep('confirmation');
        break;
      case 'confirmation':
        // Could navigate to progress view or reset
        setCurrentStep('welcome');
        break;
    }
  };

  const handleChecklistComplete = (data: Record<string, boolean>) => {
    setChecklistData(data);
    nextStep();
  };

  const handleReflectionComplete = (data: Record<string, string>) => {
    setReflectionData(data);
    nextStep();
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'welcome':
        return <WelcomeScreen onStart={nextStep} />;
      case 'checklist':
        return <ChecklistScreen onComplete={handleChecklistComplete} />;
      case 'reflection':
        return <ReflectionScreen onComplete={handleReflectionComplete} />;
      case 'confirmation':
        return (
          <ConfirmationScreen 
            onContinue={nextStep}
            checklistData={checklistData}
            reflectionData={reflectionData}
          />
        );
      default:
        return <WelcomeScreen onStart={nextStep} />;
    }
  };

  return (
    <div className="min-h-screen bg-wellness-warm">
      {renderCurrentStep()}
    </div>
  );
};

export default Index;
