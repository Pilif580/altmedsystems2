
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Welcome from "./Welcome";

interface QuizData {
  practiceType: string;
  customPracticeType?: string;
  challenge: string;
  currentSolution: string;
  decisionMaker: string;
  onlinePresence: string;
  name: string;
  email: string;
}

const Quiz = () => {
  const [showWelcome, setShowWelcome] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const { toast } = useToast();
  
  const [formData, setFormData] = useState<QuizData>({
    practiceType: "",
    customPracticeType: "",
    challenge: "",
    currentSolution: "",
    decisionMaker: "",
    onlinePresence: "",
    name: "",
    email: "",
  });

  const totalSteps = 6;
  const progress = (currentStep / totalSteps) * 100;

  const practiceTypes = [
    "Chiropractic",
    "Functional Medicine", 
    "Holistic Clinic",
    "Acupuncture",
    "Naturopathic",
    "Other"
  ];

  const decisionMakerOptions = [
    "I'm the sole decision maker",
    "I need to consult someone",
    "Other"
  ];

  const handleStart = () => {
    setShowWelcome(false);
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      const submissionData = {
        ...formData,
        practiceType: formData.practiceType === "Other" ? formData.customPracticeType : formData.practiceType,
        timestamp: new Date().toISOString(),
        source: "AltMed Systems Lead Quiz"
      };

      console.log("Submitting quiz data:", submissionData);

      const response = await fetch("https://filipofilip.app.n8n.cloud/webhook/035d0ee4-ed9f-4369-9af5-a5feb5e701dd", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "no-cors",
        body: JSON.stringify(submissionData),
      });

      setShowThankYou(true);
      
      toast({
        title: "Thank you for your submission!",
        description: "We'll be in touch soon to discuss how we can help grow your practice.",
      });

    } catch (error) {
      console.error("Error submitting quiz:", error);
      toast({
        title: "Submission sent!",
        description: "Thank you for completing the quiz. We'll be in touch soon.",
      });
      setShowThankYou(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        if (formData.practiceType === "Other") {
          return formData.customPracticeType.trim() !== "";
        }
        return formData.practiceType !== "";
      case 2:
        return formData.challenge.trim() !== "";
      case 3:
        return formData.currentSolution.trim() !== "";
      case 4:
        return formData.decisionMaker !== "";
      case 5:
        return formData.onlinePresence.trim() !== "";
      case 6:
        return formData.name.trim() !== "" && formData.email.trim() !== "";
      default:
        return false;
    }
  };

  if (showWelcome) {
    return <Welcome onStart={handleStart} />;
  }

  if (showThankYou) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl p-8 bg-white/90 backdrop-blur-sm border-emerald-200 shadow-xl rounded-2xl text-center">
          <div className="space-y-6">
            <div className="flex justify-center mb-6">
              <img 
                src="/lovable-uploads/ea35da22-7f88-42fb-9a7e-be2a525fb93f.png" 
                alt="AltMed Systems Logo" 
                className="h-16 w-auto"
              />
            </div>
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto">
              <ArrowRight className="w-8 h-8 text-emerald-600" />
            </div>
            <h1 className="text-3xl font-bold text-slate-800">Thank You!</h1>
            <p className="text-lg text-slate-600">
              We've received your information and will be in touch within 24 hours to discuss how we can help scale your practice.
            </p>
            <div className="pt-4">
              <Button 
                size="lg" 
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                onClick={() => window.open("https://calendly.com/filip-altmedsystems/30min", "_blank")}
              >
                Book a Strategy Call Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
            <p className="text-sm text-slate-500">
              Or we'll reach out to schedule a time that works for you.
            </p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img 
            src="/lovable-uploads/ea35da22-7f88-42fb-9a7e-be2a525fb93f.png" 
            alt="AltMed Systems Logo" 
            className="h-12 w-auto"
          />
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-slate-600">Question {currentStep} of {totalSteps}</span>
            <span className="text-sm text-slate-600">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2 bg-emerald-100" />
        </div>

        <Card className="p-8 bg-white/90 backdrop-blur-sm border-emerald-200 shadow-xl rounded-2xl">
          <div className="space-y-8">
            {/* Question 1 */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-slate-800 leading-tight">
                  What type of practice do you run?
                </h2>
                <div className="grid gap-3">
                  {practiceTypes.map((type) => (
                    <button
                      key={type}
                      onClick={() => setFormData({ ...formData, practiceType: type })}
                      className={`p-4 text-left rounded-xl border-2 transition-all ${
                        formData.practiceType === type
                          ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                          : "border-slate-200 bg-white text-slate-700 hover:border-emerald-300 hover:bg-emerald-50"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
                {formData.practiceType === "Other" && (
                  <div className="pt-4">
                    <Input
                      placeholder="Please type your practice type"
                      value={formData.customPracticeType || ""}
                      onChange={(e) => setFormData({ ...formData, customPracticeType: e.target.value })}
                      className="bg-white border-slate-300 text-slate-800 placeholder:text-slate-500 text-lg p-4 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  </div>
                )}
              </div>
            )}

            {/* Question 2 */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-slate-800 leading-tight">
                  What's the biggest challenge you're currently facing in your practice?
                </h2>
                <p className="text-slate-600">Be specific - this helps us understand how we can best help you.</p>
                <textarea
                  placeholder="Describe your biggest challenge..."
                  value={formData.challenge}
                  onChange={(e) => setFormData({ ...formData, challenge: e.target.value })}
                  className="w-full min-h-[120px] p-4 bg-white border-slate-300 border rounded-xl text-slate-800 placeholder:text-slate-500 text-lg resize-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>
            )}

            {/* Question 3 */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-slate-800 leading-tight">
                  Are you actively doing anything to fix this right now?
                </h2>
                <p className="text-slate-600">What have you tried or are currently trying?</p>
                <textarea
                  placeholder="Tell us what you've tried or are currently doing..."
                  value={formData.currentSolution}
                  onChange={(e) => setFormData({ ...formData, currentSolution: e.target.value })}
                  className="w-full min-h-[120px] p-4 bg-white border-slate-300 border rounded-xl text-slate-800 placeholder:text-slate-500 text-lg resize-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>
            )}

            {/* Question 4 */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-slate-800 leading-tight">
                  What best describes your decision-making power?
                </h2>
                <div className="grid gap-3">
                  {decisionMakerOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => setFormData({ ...formData, decisionMaker: option })}
                      className={`p-4 text-left rounded-xl border-2 transition-all ${
                        formData.decisionMaker === option
                          ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                          : "border-slate-200 bg-white text-slate-700 hover:border-emerald-300 hover:bg-emerald-50"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Question 5 */}
            {currentStep === 5 && (
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-slate-800 leading-tight">
                  Where can I check out your practice online?
                </h2>
                <p className="text-slate-600">Share your website or social media link so we can learn more about your practice.</p>
                <Input
                  placeholder="https://yourpractice.com or social media link"
                  value={formData.onlinePresence}
                  onChange={(e) => setFormData({ ...formData, onlinePresence: e.target.value })}
                  className="bg-white border-slate-300 text-slate-800 placeholder:text-slate-500 text-lg p-4 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>
            )}

            {/* Question 6 */}
            {currentStep === 6 && (
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-slate-800 leading-tight">
                  Final step — what's your name and email?
                </h2>
                <p className="text-slate-600">We'll use this to send you a personalized growth plan for your practice.</p>
                <div className="grid gap-4">
                  <Input
                    placeholder="Your full name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="bg-white border-slate-300 text-slate-800 placeholder:text-slate-500 text-lg p-4 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="bg-white border-slate-300 text-slate-800 placeholder:text-slate-500 text-lg p-4 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between items-center pt-8">
              <Button
                variant="ghost"
                onClick={handleBack}
                disabled={currentStep === 1}
                className="text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-xl"
              >
                <ArrowLeft className="mr-2 w-4 h-4" />
                Back
              </Button>

              {currentStep < totalSteps ? (
                <Button
                  onClick={handleNext}
                  disabled={!canProceed()}
                  size="lg"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  Continue
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={!canProceed() || isSubmitting}
                  size="lg"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  {isSubmitting ? "Submitting..." : "Complete Quiz"}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Quiz;
