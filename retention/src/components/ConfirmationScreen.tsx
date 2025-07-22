
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Trophy, Calendar, ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ConfirmationScreenProps {
  onContinue: () => void;
  checklistData: Record<string, boolean>;
  reflectionData: Record<string, string>;
}

const ConfirmationScreen: React.FC<ConfirmationScreenProps> = ({ 
  onContinue, 
  checklistData, 
  reflectionData 
}) => {
  const { toast } = useToast();
  const completedTasks = Object.values(checklistData).filter(Boolean).length;
  const totalTasks = Object.keys(checklistData).length;
  const answeredQuestions = Object.values(reflectionData).filter(answer => answer.trim().length > 0).length;

  const handleWebhookSubmit = async () => {
    const webhookUrl = "https://filipofilip.app.n8n.cloud/webhook-test/8ff40f0f-ed8e-4572-9f5e-e66d1090afaa";
    
    const payload = {
      timestamp: new Date().toISOString(),
      date: new Date().toLocaleDateString(),
      checklist: checklistData,
      completed_tasks: completedTasks,
      total_tasks: totalTasks,
      completion_rate: `${Math.round((completedTasks / totalTasks) * 100)}%`,
      reflection: reflectionData,
      answered_questions: answeredQuestions,
      source: "AltMed Systems Wellness Tracker"
    };

    try {
      await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "no-cors",
        body: JSON.stringify(payload),
      });

      toast({
        title: "Data Submitted! 📤",
        description: "Your progress has been shared with your practitioner.",
      });
    } catch (error) {
      console.error("Error submitting data:", error);
      toast({
        title: "Submission Note",
        description: "Your data was processed locally. Please check with your practitioner.",
        variant: "default",
      });
    }
  };

  React.useEffect(() => {
    // Submit data automatically when confirmation screen loads
    handleWebhookSubmit();
  }, []);

  return (
    <div className="min-h-screen p-6 flex items-center justify-center">
      <div className="max-w-lg w-full animate-fade-in">
        {/* Celebration Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full wellness-gradient mb-4 animate-gentle-bounce">
            <Trophy className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-wellness-earth mb-4">
            You Did It! 👏
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            You showed up for yourself today—and that matters.
            <br />
            Your practitioner will see your progress and check in if anything needs attention.
            <br />
            <strong>Keep going—this journey is yours.</strong>
          </p>
        </div>

        {/* Progress Summary */}
        <Card className="bg-white/80 backdrop-blur-sm border border-white/20 shadow-lg mb-8">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-wellness-earth mb-4">Today's Summary</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-wellness-sage/10 rounded-xl">
                <div className="flex items-center">
                  <div className="w-3 h-3 wellness-gradient rounded-full mr-3"></div>
                  <span className="font-medium">Tasks Completed</span>
                </div>
                <span className="text-lg font-bold text-wellness-earth">
                  {completedTasks}/{totalTasks}
                </span>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-wellness-sage/10 rounded-xl">
                <div className="flex items-center">
                  <div className="w-3 h-3 wellness-gradient rounded-full mr-3"></div>
                  <span className="font-medium">Reflection Questions</span>
                </div>
                <span className="text-lg font-bold text-wellness-earth">
                  {answeredQuestions}/3
                </span>
              </div>

              <div className="flex items-center justify-between p-4 bg-wellness-sage/10 rounded-xl">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 text-wellness-sage mr-3" />
                  <span className="font-medium">Date Completed</span>
                </div>
                <span className="text-lg font-bold text-wellness-earth">
                  {new Date().toLocaleDateString()}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Continue Button */}
        <div className="text-center">
          <Button
            onClick={onContinue}
            className="px-8 py-4 wellness-gradient text-white font-semibold text-lg rounded-xl hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            See Weekly Progress
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
          
          <p className="text-sm text-gray-500 mt-4">
            Your progress has been automatically shared with your practitioner 💚
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationScreen;
