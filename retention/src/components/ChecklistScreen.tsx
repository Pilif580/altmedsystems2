
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

interface ChecklistScreenProps {
  onComplete: (data: Record<string, boolean>) => void;
}

const checklistItems = [
  { id: 'supplements', text: 'Take your morning supplement stack', emoji: '🌞' },
  { id: 'diet', text: 'Avoid gluten and dairy today', emoji: '🥦' },
  { id: 'mindfulness', text: '10-minute mindfulness break', emoji: '🧘‍♀️' },
  { id: 'water', text: 'Drink 2L of water', emoji: '💧' },
  { id: 'journaling', text: 'Evening journaling or gratitude reflection', emoji: '📓' },
];

const ChecklistScreen: React.FC<ChecklistScreenProps> = ({ onComplete }) => {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const handleItemCheck = (itemId: string, checked: boolean) => {
    setCheckedItems(prev => ({
      ...prev,
      [itemId]: checked
    }));
  };

  const completedCount = Object.values(checkedItems).filter(Boolean).length;
  const totalCount = checklistItems.length;
  const isComplete = completedCount === totalCount;

  const handleContinue = () => {
    onComplete(checkedItems);
  };

  return (
    <div className="min-h-screen p-6 flex items-center justify-center">
      <div className="max-w-lg w-full animate-fade-in">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full wellness-gradient mb-4">
            <CheckCircle2 className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-wellness-earth mb-2">
            Your Action Plan for Today
          </h1>
          <p className="text-gray-600">
            Check off each item as you complete it throughout your day
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Progress</span>
            <span>{completedCount}/{totalCount} completed</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="wellness-gradient h-2 rounded-full transition-all duration-500"
              style={{ width: `${(completedCount / totalCount) * 100}%` }}
            />
          </div>
        </div>

        {/* Checklist */}
        <Card className="bg-white/80 backdrop-blur-sm border border-white/20 shadow-lg">
          <CardContent className="p-6">
            <div className="space-y-4">
              {checklistItems.map((item, index) => (
                <div 
                  key={item.id}
                  className={`flex items-center space-x-4 p-4 rounded-xl transition-all duration-200 hover:bg-wellness-sage/10 ${
                    checkedItems[item.id] ? 'bg-wellness-sage/20' : 'bg-gray-50/50'
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <Checkbox
                    id={item.id}
                    checked={checkedItems[item.id] || false}
                    onCheckedChange={(checked) => handleItemCheck(item.id, checked as boolean)}
                    className="w-5 h-5"
                  />
                  <label 
                    htmlFor={item.id}
                    className={`flex-1 cursor-pointer transition-all duration-200 ${
                      checkedItems[item.id] ? 'line-through text-gray-500' : 'text-gray-800'
                    }`}
                  >
                    <span className="text-xl mr-3">{item.emoji}</span>
                    {item.text}
                  </label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Continue Button */}
        <div className="mt-8 text-center">
          <Button
            onClick={handleContinue}
            className="px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 wellness-gradient text-white hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Continue to Reflection
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChecklistScreen;
