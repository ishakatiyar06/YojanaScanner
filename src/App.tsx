import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Header from './components/Header';
import Hero from './components/Hero';
import DocumentUpload from './components/DocumentUpload';
import ChatInterface from './components/ChatInterface';
import SchemeResults from './components/SchemeResults';
import FormGenerator from './components/FormGenerator';
import Footer from './components/Footer';
import LoadingSpinner from './components/LoadingSpinner';
import './i18n/config';

type Step = 'home' | 'upload' | 'chat' | 'results' | 'forms';

interface UserData {
  name?: string;
  age?: number;
  gender?: string;
  income?: number;
  caste?: string;
  state?: string;
  maritalStatus?: string;
}

interface Scheme {
  id: string;
  name: string;
  nameHi: string;
  description: string;
  eligibility: string[];
  benefits: string;
  formUrl?: string;
}

function App() {
  const { t } = useTranslation();
  const [currentStep, setCurrentStep] = useState<Step>('home');
  const [userData, setUserData] = useState<UserData>({});
  const [eligibleSchemes, setEligibleSchemes] = useState<Scheme[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedScheme, setSelectedScheme] = useState<Scheme | null>(null);

  const handleDocumentProcessed = (extractedData: UserData) => {
    setUserData(extractedData);
    setCurrentStep('chat');
  };

  const handleChatComplete = (schemes: Scheme[]) => {
    setEligibleSchemes(schemes);
    setCurrentStep('results');
  };

  const handleSchemeSelect = (scheme: Scheme) => {
    setSelectedScheme(scheme);
    setCurrentStep('forms');
  };

  const handleBackToHome = () => {
    setCurrentStep('home');
    setUserData({});
    setEligibleSchemes([]);
    setSelectedScheme(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50">
      <Header onBackToHome={handleBackToHome} />
      
      <main className="relative">
        <AnimatePresence mode="wait" initial={false}>
          {currentStep === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <Hero onGetStarted={() => setCurrentStep('upload')} />
            </motion.div>
          )}

          {currentStep === 'upload' && (
            <motion.div
              key="upload"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.4 }}
            >
              <DocumentUpload
                onDocumentProcessed={handleDocumentProcessed}
                onBack={() => setCurrentStep('home')}
              />
            </motion.div>
          )}

          {currentStep === 'chat' && (
            <motion.div
              key="chat"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.4 }}
            >
              <ChatInterface
                userData={userData}
                onChatComplete={handleChatComplete}
                onBack={() => setCurrentStep('upload')}
              />
            </motion.div>
          )}

          {currentStep === 'results' && (
            <motion.div
              key="results"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.4 }}
            >
              <SchemeResults
                schemes={eligibleSchemes}
                userData={userData}
                onSchemeSelect={handleSchemeSelect}
                onBack={() => setCurrentStep('chat')}
              />
            </motion.div>
          )}

          {currentStep === 'forms' && selectedScheme && (
            <motion.div
              key="forms"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.4 }}
            >
              <FormGenerator
                scheme={selectedScheme}
                userData={userData}
                onBack={() => setCurrentStep('results')}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {isLoading && <LoadingSpinner />}
      </main>

      <Footer />
    </div>
  );
}

export default App;