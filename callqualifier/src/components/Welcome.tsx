
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

interface WelcomeProps {
  onStart: () => void;
}

const Welcome = ({ onStart }: WelcomeProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-100 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Logo and Welcome Text */}
        <div className="text-center lg:text-left space-y-6">
          <div className="flex justify-center lg:justify-start">
            <img 
              src="/lovable-uploads/ea35da22-7f88-42fb-9a7e-be2a525fb93f.png" 
              alt="AltMed Systems Logo" 
              className="h-20 w-auto"
            />
          </div>
          <div className="space-y-4">
            <h1 className="text-4xl lg:text-5xl font-bold text-slate-800 leading-tight">
              Welcome to Your
              <span className="text-emerald-600 block">Practice Growth Quiz</span>
            </h1>
            <p className="text-xl text-slate-600 max-w-md mx-auto lg:mx-0">
              Discover how we can help scale your alternative medicine practice with our proven systems.
            </p>
          </div>
        </div>

        {/* Quiz Preview Card */}
        <Card className="bg-white/80 backdrop-blur-sm border-emerald-200 shadow-xl p-8 rounded-2xl">
          <div className="space-y-6">
            <div className="text-center space-y-3">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto">
                <ArrowRight className="w-6 h-6 text-emerald-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800">
                Quick 6-Question Assessment
              </h2>
              <p className="text-slate-600">
                Takes less than 3 minutes to complete
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                <span className="text-slate-700">Identify your biggest growth challenges</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                <span className="text-slate-700">Get personalized recommendations</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                <span className="text-slate-700">Connect with our growth specialists</span>
              </div>
            </div>

            <Button 
              onClick={onStart}
              size="lg" 
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
            >
              Start Assessment
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Welcome;
