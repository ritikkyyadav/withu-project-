
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageSquare, Send, Bot, User } from "lucide-react";

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

interface AIChatAssistantProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AIChatAssistant = ({ isOpen, onClose }: AIChatAssistantProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: 'Hello! I\'m your AI financial assistant. I can help you with expense tracking, budget planning, financial insights, and answer questions about your finances. How can I assist you today?',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const predefinedQuestions = [
    "How much did I spend on food this month?",
    "What's my savings rate?",
    "Create a budget plan for next month",
    "Show me my expense trends"
  ];

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: generateAIResponse(inputMessage),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);

    setInputMessage('');
  };

  const generateAIResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('food') || input.includes('eat')) {
      return 'Based on your recent transactions, you\'ve spent ₹15,000 on food and dining this month. This is 25% higher than your average. Consider meal planning to optimize costs.';
    } else if (input.includes('savings') || input.includes('save')) {
      return 'Your current savings rate is 38.2%, which is excellent! You\'re saving ₹32,500 per month. You could potentially save an additional ₹5,000 by optimizing your subscription expenses.';
    } else if (input.includes('budget')) {
      return 'I can help you create a budget plan! Based on your income of ₹85,000, I recommend: 50% for needs (₹42,500), 30% for wants (₹25,500), and 20% for savings (₹17,000). Would you like me to break this down by categories?';
    } else if (input.includes('trend') || input.includes('analysis')) {
      return 'Your expense trends show: Transportation costs have increased by 15% this month, while utility expenses have decreased by 8%. Your income has grown consistently by 12.5% compared to last month.';
    } else {
      return 'I understand you\'re asking about your finances. Could you be more specific? I can help with expense analysis, budget planning, savings goals, or explain any financial concepts.';
    }
  };

  const handleQuickQuestion = (question: string) => {
    setInputMessage(question);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl h-[600px] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-black flex items-center">
            <MessageSquare className="w-5 h-5 mr-2" />
            AI Financial Assistant
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex-1 flex flex-col space-y-4">
          {/* Chat Messages */}
          <ScrollArea className="flex-1 pr-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex items-start space-x-2 max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <div className={`p-2 rounded-full ${message.type === 'user' ? 'bg-black' : 'bg-gray-200'}`}>
                      {message.type === 'user' ? (
                        <User className="w-4 h-4 text-white" />
                      ) : (
                        <Bot className="w-4 h-4 text-gray-600" />
                      )}
                    </div>
                    <div className={`p-3 rounded-lg ${
                      message.type === 'user' 
                        ? 'bg-black text-white' 
                        : 'bg-gray-100 text-black'
                    }`}>
                      <p className="text-sm">{message.content}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* Quick Questions */}
          <div className="space-y-2">
            <p className="text-sm text-gray-600">Quick questions:</p>
            <div className="grid grid-cols-2 gap-2">
              {predefinedQuestions.map((question, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="text-xs text-left justify-start h-auto p-2"
                  onClick={() => handleQuickQuestion(question)}
                >
                  {question}
                </Button>
              ))}
            </div>
          </div>

          {/* Message Input */}
          <div className="flex space-x-2">
            <Input
              placeholder="Ask me anything about your finances..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1"
            />
            <Button onClick={handleSendMessage} className="bg-black text-white hover:bg-gray-800">
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
