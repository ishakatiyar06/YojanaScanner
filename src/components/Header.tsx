import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Home, Languages, Menu, X } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';

interface HeaderProps {
  onBackToHome: () => void;
}

const Header: React.FC<HeaderProps> = ({ onBackToHome }) => {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      className="bg-white shadow-lg border-b-4 border-orange-500 sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Title */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-3 cursor-pointer"
            onClick={onBackToHome}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">YS</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                {t('appName', 'YojanaScanner')}
              </h1>
              <p className="text-xs text-gray-600 hidden sm:block">
                {t('tagline', 'Discover Government Schemes with AI')}
              </p>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onBackToHome}
              className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:text-orange-600 transition-colors"
            >
              <Home size={18} />
              <span>{t('home', 'Home')}</span>
            </motion.button>
            
            <LanguageSwitcher />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg text-gray-700 hover:bg-gray-100"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-gray-200 py-4"
          >
            <div className="flex flex-col space-y-4">
              <button
                onClick={() => {
                  onBackToHome();
                  setIsMenuOpen(false);
                }}
                className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:text-orange-600"
              >
                <Home size={18} />
                <span>{t('home', 'Home')}</span>
              </button>
              <div className="px-4">
                <LanguageSwitcher />
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
};

export default Header;