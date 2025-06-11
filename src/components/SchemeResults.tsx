import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { 
  Award, 
  CheckCircle, 
  ArrowRight,
  ArrowLeft,
  IndianRupee,
  Users,
  FileText,
  Calendar
} from 'lucide-react';

interface Scheme {
  id: string;
  name: string;
  nameHi: string;
  description: string;
  eligibility: string[];
  benefits: string;
  formUrl?: string;
}

interface SchemeResultsProps {
  schemes: Scheme[];
  userData: any;
  onSchemeSelect: (scheme: Scheme) => void;
  onBack: () => void;
}

const SchemeResults: React.FC<SchemeResultsProps> = ({ schemes, userData, onSchemeSelect, onBack }) => {
  const { t, i18n } = useTranslation();
  const isHindi = i18n.language === 'hi';

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6"
          >
            <ArrowLeft size={20} />
            <span>{t('back', 'Back')}</span>
          </button>
          
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <Award className="text-white" size={32} />
            </motion.div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              {t('eligibleSchemes', 'Your Eligible Schemes')}
            </h1>
            <p className="text-lg text-gray-600">
              {t('foundSchemes', `We found ${schemes.length} government schemes you're eligible for`)}
            </p>
          </div>

          {/* User Summary Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl shadow-lg p-6 mb-8"
          >
            <h2 className="text-xl font-semibold mb-4 flex items-center space-x-2">
              <Users className="text-blue-600" size={24} />
              <span>{t('yourProfile', 'Your Profile')}</span>
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-gray-600">{t('name', 'Name')}</p>
                <p className="font-semibold text-blue-900">{userData.name}</p>
              </div>
              <div className="text-center p-3 bg-purple-50 rounded-lg">
                <p className="text-sm text-gray-600">{t('age', 'Age')}</p>
                <p className="font-semibold text-purple-900">{userData.age} {t('years', 'years')}</p>
              </div>
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <p className="text-sm text-gray-600">{t('state', 'State')}</p>
                <p className="font-semibold text-green-900">{userData.state}</p>
              </div>
              <div className="text-center p-3 bg-orange-50 rounded-lg">
                <p className="text-sm text-gray-600">{t('income', 'Income')}</p>
                <p className="font-semibold text-orange-900">₹{userData.income?.toLocaleString()}</p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Schemes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {schemes.map((scheme, index) => (
            <motion.div
              key={scheme.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(0,0,0,0.15)' }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer group"
              onClick={() => onSchemeSelect(scheme)}
            >
              {/* Card Header */}
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-6 text-white">
                <div className="flex items-center justify-between mb-4">
                  <Award size={24} />
                  <CheckCircle size={20} className="text-green-200" />
                </div>
                <h3 className="text-xl font-bold mb-2">
                  {isHindi ? scheme.nameHi : scheme.name}
                </h3>
                <p className="text-green-100 text-sm leading-relaxed">
                  {scheme.description}
                </p>
              </div>

              {/* Card Body */}
              <div className="p-6">
                {/* Benefits */}
                <div className="mb-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <IndianRupee className="text-green-600" size={18} />
                    <span className="font-semibold text-gray-900">{t('benefits', 'Benefits')}</span>
                  </div>
                  <p className="text-gray-700 bg-green-50 p-3 rounded-lg">
                    {scheme.benefits}
                  </p>
                </div>

                {/* Eligibility */}
                <div className="mb-6">
                  <div className="flex items-center space-x-2 mb-2">
                    <CheckCircle className="text-blue-600" size={18} />
                    <span className="font-semibold text-gray-900">{t('eligibility', 'Eligibility')}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {scheme.eligibility.map((criteria, idx) => (
                      <span
                        key={idx}
                        className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {criteria}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-xl font-semibold flex items-center justify-center space-x-2 group-hover:shadow-lg transition-all"
                >
                  <FileText size={18} />
                  <span>{t('applyNow', 'Apply Now')}</span>
                  <ArrowRight size={18} />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-12 bg-white rounded-2xl shadow-lg p-6"
        >
          <div className="text-center">
            <Calendar className="mx-auto mb-4 text-blue-600" size={48} />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {t('nextSteps', 'Next Steps')}
            </h3>
            <p className="text-gray-600 mb-4">
              {t('nextStepsDesc', 'Click on any scheme above to download pre-filled application forms and learn about the application process.')}
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="flex items-center space-x-2 text-green-600">
                <CheckCircle size={16} />
                <span>{t('formsPreFilled', 'Forms are pre-filled with your details')}</span>
              </div>
              <div className="flex items-center space-x-2 text-blue-600">
                <CheckCircle size={16} />
                <span>{t('submitOnline', 'Submit online or at nearest office')}</span>
              </div>
              <div className="flex items-center space-x-2 text-purple-600">
                <CheckCircle size={16} />
                <span>{t('trackStatus', 'Track application status')}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SchemeResults;