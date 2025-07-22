
import React from 'react';
import { Button } from '@/components/ui/button';
import { Sparkles, Heart } from 'lucide-react';

interface WelcomeScreenProps {
  onStart: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center animate-fade-in">
        {/* Brand Header */}
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full wellness-gradient mb-4 animate-gentle-bounce">
            <Heart className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-lg font-medium text-wellness-earth mb-1">AltMed Systems</h2>
          <div className="flex items-center justify-center text-2xl font-bold text-gradient mb-2">
            <Sparkles className="w-6 h-6 mr-2 text-primary" />
            Your Personalized Protocol Companion
            <span className="ml-2">🌿</span>
          </div>
        </div>

        {/* Welcome Content */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20">
          <h1 className="text-3xl font-bold text-wellness-earth mb-6">
            Welcome to Your Wellness Tracker 🙌
          </h1>
          
          <p className="text-lg text-gray-600 leading-relaxed mb-8">
            Healing is a journey—and you're not walking it alone. 
            <br /><br />
            Use this companion daily to stay on plan, reflect on your progress, 
            and stay connected with your practitioner.
          </p>

          <Button 
            onClick={onStart}
            className="w-full wellness-gradient text-white font-semibold py-4 px-8 rounded-xl text-lg hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Start Today's Check-In
          </Button>
        </div>

        <p className="text-sm text-gray-500 mt-6">
          Take a moment for yourself—you deserve this care 💚
        </p>
      </div>
    </div>
  );
};

export default WelcomeScreen;
