import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { 
  FileText, 
  MessageSquare, 
  Award, 
  Download,
  ArrowRight,
  Users,
  Shield,
  Zap
} from 'lucide-react';

interface HeroProps {
  onGetStarted: () => void;
}

const Hero: React.FC<HeroProps> = ({ onGetStarted }) => {
  const { t } = useTranslation();

  const features = [
    {
      icon: FileText,
      title: t('feature1Title', 'Document Processing'),
      description: t('feature1Desc', 'Upload Aadhaar, income certificates - AI extracts your details'),
    },
    {
      icon: MessageSquare,
      title: t('feature2Title', 'AI Chatbot'),
      description: t('feature2Desc', 'Watson AI helps you discover eligible government schemes'),
    },
    {
      icon: Award,
      title: t('feature3Title', 'Scheme Matching'),
      description: t('feature3Desc', 'Get personalized recommendations based on your profile'),
    },
    {
      icon: Download,
      title: t('feature4Title', 'Pre-filled Forms'),
      description: t('feature4Desc', 'Download ready-to-submit application forms instantly'),
    },
  ];

  const stats = [
    { number: '500+', label: t('schemesAvailable', 'Government Schemes') },
    { number: '28', label: t('statesCovered', 'States Covered') },
    { number: '99%', label: t('accuracy', 'Accuracy Rate') },
  ];

  return (
    <div className="relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-100 via-white to-green-100 opacity-60" />
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        {/* Main Hero Section */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              <span className="text-orange-600">AI-Powered</span>{' '}
              <br className="hidden sm:block" />
              {t('heroTitle', 'Government Schemes Discovery')}
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {t('heroSubtitle', 'Upload your documents, chat with our AI, and discover government schemes you\'re eligible for - all in Hindi and English')}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 10px 25px rgba(249, 115, 22, 0.3)' }}
              whileTap={{ scale: 0.95 }}
              onClick={onGetStarted}
              className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-xl font-semibold text-lg flex items-center space-x-2 shadow-lg hover:shadow-xl transition-all"
            >
              <span>{t('getStarted', 'Get Started')}</span>
              <ArrowRight size={20} />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl font-semibold text-lg hover:border-orange-500 hover:text-orange-600 transition-all"
            >
              {t('learnMore', 'Learn More')}
            </motion.button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
          >
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-orange-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            {t('howItWorks', 'How It Works')}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                whileHover={{ 
                  y: -8,
                  boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
                }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all cursor-pointer border border-gray-100"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mb-4">
                  <feature.icon className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="flex flex-wrap justify-center items-center gap-8 text-gray-500">
            <div className="flex items-center space-x-2">
              <Shield size={20} />
              <span className="font-medium">{t('secure', 'Secure & Private')}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users size={20} />
              <span className="font-medium">{t('trusted', 'Trusted by Citizens')}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Zap size={20} />
              <span className="font-medium">{t('fast', 'Lightning Fast')}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;