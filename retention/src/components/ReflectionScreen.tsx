
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, MessageCircle } from 'lucide-react';

interface ReflectionScreenProps {
  onComplete: (data: Record<string, string>) => void;
}

const reflectionQuestions = [
  {
    id: 'challenge',
    question: 'What was the most challenging part of your day?',
    placeholder: 'Share what felt difficult today...'
  },
  {
    id: 'proud',
    question: 'What\'s one thing you\'re proud of today?',
    placeholder: 'Celebrate your wins, big or small...'
  },
  {
    id: 'practitioner',
    question: 'Anything you\'d like your practitioner to know?',
    placeholder: 'Share any concerns, symptoms, or insights...'
  }
];

const ReflectionScreen: React.FC<ReflectionScreenProps> = ({ onComplete }) => {
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const answeredCount = Object.values(answers).filter(answer => answer.trim().length > 0).length;
  const totalQuestions = reflectionQuestions.length;
  const canContinue = answeredCount >= 1; // At least one question answered

  const handleContinue = () => {
    onComplete(answers);
  };

  return (
    <div className="min-h-screen p-6 flex items-center justify-center">
      <div className="max-w-2xl w-full animate-fade-in">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full wellness-gradient mb-4">
            <MessageCircle className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-wellness-earth mb-2">
            Daily Reflection
          </h1>
          <p className="text-gray-600">
            Take a moment to reflect on your day and connect with your inner wisdom
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Questions answered</span>
            <span>{answeredCount}/{totalQuestions}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="wellness-gradient h-2 rounded-full transition-all duration-500"
              style={{ width: `${(answeredCount / totalQuestions) * 100}%` }}
            />
          </div>
        </div>

        {/* Reflection Questions */}
        <div className="space-y-6">
          {reflectionQuestions.map((item, index) => (
            <Card 
              key={item.id}
              className="bg-white/80 backdrop-blur-sm border border-white/20 shadow-lg animate-scale-in"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <CardHeader>
                <CardTitle className="text-lg text-wellness-earth">
                  {item.question}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder={item.placeholder}
                  value={answers[item.id] || ''}
                  onChange={(e) => handleAnswerChange(item.id, e.target.value)}
                  className="min-h-[120px] resize-none border-gray-200 focus:border-primary focus:ring-primary/20 rounded-xl"
                />
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Continue Button */}
        <div className="mt-8 text-center">
          <Button
            onClick={handleContinue}
            disabled={!canContinue}
            className={`px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 ${
              canContinue 
                ? 'wellness-gradient text-white hover:scale-105 shadow-lg hover:shadow-xl' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Complete Today's Check-In
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
          
          {!canContinue && (
            <p className="text-sm text-gray-500 mt-3">
              Answer at least one question to continue
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReflectionScreen;
