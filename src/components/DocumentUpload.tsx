import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { 
  Upload, 
  FileText, 
  CheckCircle, 
  AlertCircle,
  ArrowLeft,
  Camera,
  Scan,
  User,
  Calendar,
  MapPin
} from 'lucide-react';

interface DocumentUploadProps {
  onDocumentProcessed: (data: any) => void;
  onBack: () => void;
}

const DocumentUpload: React.FC<DocumentUploadProps> = ({ onDocumentProcessed, onBack }) => {
  const { t } = useTranslation();
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'processing' | 'success' | 'error'>('idle');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [extractedData, setExtractedData] = useState<any>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  }, []);

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    processDocument(file);
  };

  const processDocument = async (file: File) => {
    setUploadStatus('uploading');
    
    // Simulate file upload
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setUploadStatus('processing');
    
    // Simulate OCR processing
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    // Mock extracted data - in real implementation, this would come from OCR service
    const mockData = {
      name: 'Sita Devi',
      age: 45,
      gender: 'Female',
      income: 240000,
      caste: 'OBC',
      state: 'Uttar Pradesh',
      maritalStatus: 'Widow',
      address: 'Village Rampur, District Sitapur'
    };
    
    setExtractedData(mockData);
    setUploadStatus('success');
  };

  const handleConfirm = () => {
    if (extractedData) {
      onDocumentProcessed(extractedData);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
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
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {t('uploadDocument', 'Upload Your Document')}
          </h1>
          <p className="text-gray-600">
            {t('uploadInstructions', 'Upload your Aadhaar card, income certificate, or any government ID to extract your details automatically')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h2 className="text-xl font-semibold mb-6 flex items-center space-x-2">
                <Upload className="text-blue-600" size={24} />
                <span>{t('selectDocument', 'Select Document')}</span>
              </h2>

              {/* Upload Area */}
              <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer
                  ${dragActive 
                    ? 'border-blue-500 bg-blue-50' 
                    : uploadStatus === 'idle' 
                      ? 'border-gray-300 hover:border-blue-400 hover:bg-blue-50' 
                      : 'border-green-400 bg-green-50'
                  }`}
              >
                <AnimatePresence mode="wait">
                  {uploadStatus === 'idle' && (
                    <motion.div
                      key="idle"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <Camera className="mx-auto mb-4 text-gray-400" size={48} />
                      <p className="text-lg font-medium text-gray-700 mb-2">
                        {t('dropFiles', 'Drop your document here')}
                      </p>
                      <p className="text-gray-500 mb-4">
                        {t('orClick', 'or click to browse files')}
                      </p>
                      <input
                        type="file"
                        accept="image/*,.pdf"
                        onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
                        className="hidden"
                        id="file-upload"
                      />
                      <label
                        htmlFor="file-upload"
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors cursor-pointer inline-block"
                      >
                        {t('browseFiles', 'Browse Files')}
                      </label>
                    </motion.div>
                  )}

                  {uploadStatus === 'uploading' && (
                    <motion.div
                      key="uploading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <div className="animate-spin mx-auto mb-4 text-blue-600">
                        <Upload size={48} />
                      </div>
                      <p className="text-lg font-medium text-blue-700">
                        {t('uploading', 'Uploading document...')}
                      </p>
                    </motion.div>
                  )}

                  {uploadStatus === 'processing' && (
                    <motion.div
                      key="processing"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <div className="animate-pulse mx-auto mb-4 text-yellow-600">
                        <Scan size={48} />
                      </div>
                      <p className="text-lg font-medium text-yellow-700">
                        {t('processing', 'Processing with AI...')}
                      </p>
                      <p className="text-yellow-600 text-sm">
                        {t('extracting', 'Extracting your details from the document')}
                      </p>
                    </motion.div>
                  )}

                  {uploadStatus === 'success' && (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <CheckCircle className="mx-auto mb-4 text-green-600" size={48} />
                      <p className="text-lg font-medium text-green-700">
                        {t('processingComplete', 'Processing Complete!')}
                      </p>
                      <p className="text-green-600 text-sm">
                        {t('detailsExtracted', 'Your details have been extracted successfully')}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {selectedFile && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 bg-gray-50 rounded-lg p-4"
                >
                  <div className="flex items-center space-x-3">
                    <FileText className="text-blue-600" size={24} />
                    <div>
                      <p className="font-medium text-gray-900">{selectedFile.name}</p>
                      <p className="text-sm text-gray-500">
                        {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Extracted Data Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h2 className="text-xl font-semibold mb-6 flex items-center space-x-2">
                <User className="text-green-600" size={24} />
                <span>{t('extractedDetails', 'Extracted Details')}</span>
              </h2>

              {!extractedData ? (
                <div className="text-center py-12 text-gray-500">
                  <FileText size={64} className="mx-auto mb-4 opacity-50" />
                  <p>{t('uploadToSeeDetails', 'Upload a document to see extracted details here')}</p>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  {Object.entries(extractedData).map(([key, value], index) => (
                    <motion.div
                      key={key}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                    >
                      <span className="font-medium text-gray-700 capitalize">
                        {t(`field_${key}`, key.replace(/([A-Z])/g, ' $1').trim())}:
                      </span>
                      <span className="text-gray-900 font-semibold">{value}</span>
                    </motion.div>
                  ))}

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleConfirm}
                    className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-lg font-semibold mt-6 hover:shadow-lg transition-all"
                  >
                    {t('confirmAndContinue', 'Confirm & Continue')}
                  </motion.button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default DocumentUpload;