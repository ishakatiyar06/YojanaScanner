import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Heart, Shield, Zap } from 'lucide-react';

const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1 }}
      className="bg-gray-900 text-white py-12 mt-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold mb-4">{t('aboutYojanaScanner', 'About YojanaScanner')}</h3>
            <p className="text-gray-300 leading-relaxed">
              {t('footerAbout', 'AI-powered platform to help Indian citizens discover and apply for government schemes with ease. Built for PRARAMBH 2025.')}
            </p>
          </div>

          {/* Features */}
          <div>
            <h3 className="text-xl font-bold mb-4">{t('features', 'Features')}</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Shield className="text-green-400" size={16} />
                <span className="text-gray-300">{t('securePrivate', 'Secure & Private')}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Zap className="text-yellow-400" size={16} />
                <span className="text-gray-300">{t('aiPowered', 'AI-Powered Matching')}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Heart className="text-red-400" size={16} />
                <span className="text-gray-300">{t('madeForIndia', 'Made for India')}</span>
              </div>
            </div>
          </div>

          {/* Technology */}
          <div>
            <h3 className="text-xl font-bold mb-4">{t('poweredBy', 'Powered By')}</h3>
            <div className="space-y-2 text-gray-300">
              <p>IBM Watson AI</p>
              <p>React & TypeScript</p>
              <p>Tailwind CSS</p>
              <p>Progressive Web App</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2025 YojanaScanner. {t('builtFor', 'Built for')} PRARAMBH 2025 - {t('empowering', 'Empowering Citizens with Technology')}
          </p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;