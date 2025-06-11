import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { 
  Send, 
  MessageCircle, 
  Bot, 
  User,
  ArrowLeft,
  Loader,
  CheckCircle
} from 'lucide-react';

interface ChatInterfaceProps {
  userData: any;
  onChatComplete: (schemes: any[]) => void;
  onBack: () => void;
}

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  isTyping?: boolean;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ userData, onChatComplete, onBack }) => {
  const { t } = useTranslation();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const conversationFlow = [
    {
      botMessage: t('chatWelcome', `Hello ${userData.name}! I'm your AI assistant. I can see you're a ${userData.age}-year-old ${userData.gender} from ${userData.state}. Let me help you find eligible government schemes.`),
      question: t('incomeQuestion', 'What is your monthly family income?'),
      field: 'income'
    },
    {
      botMessage: t('incomeConfirm', 'Thank you for sharing your income details.'),
      question: t('familyQuestion', 'How many family members do you have?'),
      field: 'familySize'
    },
    {
      botMessage: t('processingInfo', 'Perfect! I have all the information I need. Let me analyze your profile and find the best government schemes for you.'),
      question: null,
      field: null
    }
  ];

  useEffect(() => {
    // Start conversation
    setTimeout(() => {
      addBotMessage(conversationFlow[0].botMessage);
      setTimeout(() => {
        addBotMessage(conversationFlow[0].question!);
      }, 1500);
    }, 1000);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const addBotMessage = (content: string) => {
    setIsTyping(true);
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        type: 'bot',
        content,
        timestamp: new Date()
      }]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const addUserMessage = (content: string) => {
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      type: 'user',
      content,
      timestamp: new Date()
    }]);
  };

  const handleSend = () => {
    if (!input.trim()) return;

    addUserMessage(input);
    const userInput = input;
    setInput('');

    // Process user response
    setTimeout(() => {
      if (currentStep < conversationFlow.length - 1) {
        const nextStep = currentStep + 1;
        setCurrentStep(nextStep);
        
        addBotMessage(conversationFlow[nextStep].botMessage);
        
        if (conversationFlow[nextStep].question) {
          setTimeout(() => {
            addBotMessage(conversationFlow[nextStep].question!);
          }, 1500);
        } else {
          // End of conversation - analyze and show schemes
          setTimeout(() => {
            analyzeAndShowSchemes();
          }, 2000);
        }
      }
    }, 1000);
  };

  const analyzeAndShowSchemes = () => {
    // Mock scheme matching based on user data
    const eligibleSchemes = [
      {
        id: '1',
        name: 'Widow Pension Scheme',
        nameHi: 'विधवा पेंशन योजना',
        description: 'Monthly pension for widowed women below poverty line',
        eligibility: ['Female', 'Widow', 'Age 40+', 'Low Income'],
        benefits: '₹1,000 per month',
        formUrl: '/forms/widow-pension.pdf'
      },
      {
        id: '2',
        name: 'PM Ujjwala Yojana',
        nameHi: 'प्रधानमंत्री उज्ज्वला योजना',
        description: 'Free LPG connection for women from BPL families',
        eligibility: ['Female', 'BPL Family', 'No existing LPG connection'],
        benefits: 'Free LPG connection + ₹1,600 support',
        formUrl: '/forms/ujjwala.pdf'
      },
      {
        id: '3',
        name: 'Indira Gandhi National Old Age Pension',
        nameHi: 'इंदिरा गांधी राष्ट्रीय वृद्धावस्था पेंशन',
        description: 'Pension scheme for senior citizens',
        eligibility: ['Age 60+', 'BPL Family'],
        benefits: '₹800 per month (60-79 years), ₹1,000 per month (80+ years)',
        formUrl: '/forms/old-age-pension.pdf'
      }
    ];

    addBotMessage(t('analysisComplete', `Great! Based on your profile, I found ${eligibleSchemes.length} government schemes you're eligible for. Let me show you the details.`));
    
    setTimeout(() => {
      onChatComplete(eligibleSchemes);
    }, 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft size={20} />
            <span>{t('back', 'Back')}</span>
          </button>
          
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
              <Bot className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {t('aiAssistant', 'AI Assistant')}
              </h1>
              <p className="text-gray-600">
                {t('chatSubtitle', 'Powered by IBM Watson')}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Chat Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          {/* Chat Messages */}
          <div className="h-96 overflow-y-auto p-6 space-y-4 bg-gray-50">
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start space-x-3 max-w-xs lg:max-w-md ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    {/* Avatar */}
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.type === 'user' 
                        ? 'bg-blue-500' 
                        : 'bg-gradient-to-br from-purple-500 to-pink-600'
                    }`}>
                      {message.type === 'user' ? (
                        <User className="text-white" size={16} />
                      ) : (
                        <Bot className="text-white" size={16} />
                      )}
                    </div>
                    
                    {/* Message Bubble */}
                    <div className={`px-4 py-3 rounded-2xl shadow-sm ${
                      message.type === 'user'
                        ? 'bg-blue-500 text-white rounded-br-md'
                        : 'bg-white text-gray-800 rounded-bl-md border'
                    }`}>
                      <p className="text-sm leading-relaxed">{message.content}</p>
                      <p className={`text-xs mt-1 ${
                        message.type === 'user' ? 'text-blue-100' : 'text-gray-500'
                      }`}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Typing Indicator */}
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-start"
              >
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
                    <Bot className="text-white" size={16} />
                  </div>
                  <div className="bg-white px-4 py-3 rounded-2xl rounded-bl-md border shadow-sm">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-6 bg-white border-t">
            <div className="flex space-x-4">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={t('typeMessage', 'Type your message...')}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSend}
                disabled={!input.trim()}
                className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send size={20} />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ChatInterface;