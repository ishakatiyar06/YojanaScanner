import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { 
  Download, 
  FileText, 
  ArrowLeft,
  CheckCircle,
  ExternalLink,
  MapPin,
  Phone,
  Calendar,
  User,
  IndianRupee,
  Send
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

interface FormGeneratorProps {
  scheme: Scheme;
  userData: any;
  onBack: () => void;
}

const FormGenerator: React.FC<FormGeneratorProps> = ({ scheme, userData, onBack }) => {
  const { t, i18n } = useTranslation();
  const [isGenerating, setIsGenerating] = useState(false);
  const [formGenerated, setFormGenerated] = useState(false);
  const [submissionMethod, setSubmissionMethod] = useState<'online' | 'offline'>('online');
  const isHindi = i18n.language === 'hi';

  const handleGenerateForm = async () => {
    setIsGenerating(true);
    
    // Simulate form generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsGenerating(false);
    setFormGenerated(true);
  };

  const handleDownload = () => {
    // In a real implementation, this would generate and download the actual PDF
    const link = document.createElement('a');
    link.href = '#';
    link.download = `${scheme.name.replace(/\s+/g, '_')}.pdf`;
    link.click();
  };

  const formFields = [
    { label: t('fullName', 'Full Name'), value: userData.name, icon: User },
    { label: t('age', 'Age'), value: userData.age, icon: Calendar },
    { label: t('gender', 'Gender'), value: userData.gender, icon: User },
    { label: t('income', 'Monthly Income'), value: `₹${userData.income?.toLocaleString()}`, icon: IndianRupee },
    { label: t('caste', 'Caste'), value: userData.caste, icon: User },
    { label: t('state', 'State'), value: userData.state, icon: MapPin },
    { label: t('maritalStatus', 'Marital Status'), value: userData.maritalStatus, icon: User },
    { label: t('address', 'Address'), value: userData.address, icon: MapPin },
  ];

  const nearbyOffices = [
    {
      name: 'Block Development Office',
      nameHi: 'खंड विकास कार्यालय',
      address: 'Main Road, Sitapur, UP 261001',
      phone: '+91-5862-222333',
      distance: '2.5 km'
    },
    {
      name: 'District Collectorate',
      nameHi: 'जिला कलेक्टोरेट',
      address: 'Collectorate Complex, Sitapur, UP 261001',
      phone: '+91-5862-222444',
      distance: '5.1 km'
    },
    {
      name: 'Jan Seva Kendra',
      nameHi: 'जन सेवा केंद्र',
      address: 'Village Rampur, Sitapur, UP 261132',
      phone: '+91-5862-222555',
      distance: '1.2 km'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 py-8">
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
              className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <FileText className="text-white" size={32} />
            </motion.div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              {t('applicationForm', 'Application Form')}
            </h1>
            <p className="text-lg text-gray-600">
              {isHindi ? scheme.nameHi : scheme.name}
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Preview */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl shadow-xl overflow-hidden"
            >
              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 text-white">
                <h2 className="text-2xl font-bold mb-2">
                  {t('formPreview', 'Form Preview')}
                </h2>
                <p className="text-indigo-100">
                  {t('preFilledNotice', 'Pre-filled with your extracted details')}
                </p>
              </div>

              <div className="p-8">
                {/* Form Fields */}
                <div className="space-y-6 mb-8">
                  {formFields.map((field, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + index * 0.05 }}
                      className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg"
                    >
                      <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                        <field.icon className="text-indigo-600" size={20} />
                      </div>
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {field.label}
                        </label>
                        <div className="text-gray-900 font-semibold">
                          {field.value || t('notProvided', 'Not provided')}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Generate Form Button */}
                {!formGenerated && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleGenerateForm}
                    disabled={isGenerating}
                    className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-4 rounded-xl font-semibold text-lg flex items-center justify-center space-x-2 disabled:opacity-50"
                  >
                    {isGenerating ? (
                      <>
                        <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
                        <span>{t('generating', 'Generating Form...')}</span>
                      </>
                    ) : (
                      <>
                        <FileText size={20} />
                        <span>{t('generateForm', 'Generate Pre-filled Form')}</span>
                      </>
                    )}
                  </motion.button>
                )}

                {/* Form Generated */}
                {formGenerated && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                  >
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center space-x-3">
                      <CheckCircle className="text-green-600" size={24} />
                      <div>
                        <p className="font-semibold text-green-800">
                          {t('formGenerated', 'Form Generated Successfully!')}
                        </p>
                        <p className="text-green-600 text-sm">
                          {t('formReady', 'Your pre-filled application form is ready for download')}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleDownload}
                        className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-lg font-semibold flex items-center justify-center space-x-2"
                      >
                        <Download size={18} />
                        <span>{t('downloadPdf', 'Download PDF')}</span>
                      </motion.button>
                      
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex-1 border-2 border-indigo-500 text-indigo-600 py-3 rounded-lg font-semibold flex items-center justify-center space-x-2 hover:bg-indigo-50"
                      >
                        <ExternalLink size={18} />
                        <span>{t('previewForm', 'Preview Form')}</span>
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Submission Options */}
          <div className="space-y-6">
            {/* Submission Method */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-2xl shadow-xl p-6"
            >
              <h3 className="text-xl font-semibold mb-4 flex items-center space-x-2">
                <Send className="text-blue-600" size={24} />
                <span>{t('submissionMethod', 'Submission Method')}</span>
              </h3>

              <div className="space-y-3">
                <label className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-blue-50">
                  <input
                    type="radio"
                    name="submission"
                    value="online"
                    checked={submissionMethod === 'online'}
                    onChange={(e) => setSubmissionMethod(e.target.value as 'online')}
                    className="text-blue-600"
                  />
                  <div>
                    <p className="font-semibold text-gray-900">{t('submitOnline', 'Submit Online')}</p>
                    <p className="text-sm text-gray-600">{t('onlineSubmissionDesc', 'Upload documents and submit digitally')}</p>
                  </div>
                </label>

                <label className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-blue-50">
                  <input
                    type="radio"
                    name="submission"
                    value="offline"
                    checked={submissionMethod === 'offline'}
                    onChange={(e) => setSubmissionMethod(e.target.value as 'offline')}
                    className="text-blue-600"
                  />
                  <div>
                    <p className="font-semibold text-gray-900">{t('submitOffline', 'Submit at Office')}</p>
                    <p className="text-sm text-gray-600">{t('offlineSubmissionDesc', 'Print form and visit nearest office')}</p>
                  </div>
                </label>
              </div>
            </motion.div>

            {/* Nearby Offices */}
            {submissionMethod === 'offline' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl shadow-xl p-6"
              >
                <h3 className="text-xl font-semibold mb-4 flex items-center space-x-2">
                  <MapPin className="text-green-600" size={24} />
                  <span>{t('nearbyOffices', 'Nearby Offices')}</span>
                </h3>

                <div className="space-y-4">
                  {nearbyOffices.map((office, index) => (
                    <div key={index} className="border rounded-lg p-4 hover:bg-gray-50">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-gray-900">
                          {isHindi ? office.nameHi : office.name}
                        </h4>
                        <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded-full">
                          {office.distance}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm mb-2">{office.address}</p>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <Phone size={14} />
                        <span>{office.phone}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Scheme Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-white rounded-2xl shadow-xl p-6"
            >
              <h3 className="text-xl font-semibold mb-4 flex items-center space-x-2">
                <FileText className="text-purple-600" size={24} />
                <span>{t('schemeDetails', 'Scheme Details')}</span>
              </h3>

              <div className="space-y-4">
                <div>
                  <p className="font-semibold text-gray-900 mb-1">{t('benefits', 'Benefits')}</p>
                  <p className="text-gray-600 text-sm">{scheme.benefits}</p>
                </div>
                
                <div>
                  <p className="font-semibold text-gray-900 mb-2">{t('eligibility', 'Eligibility')}</p>
                  <div className="flex flex-wrap gap-2">
                    {scheme.eligibility.map((criteria, idx) => (
                      <span
                        key={idx}
                        className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs"
                      >
                        {criteria}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormGenerator;