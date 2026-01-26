import React from 'react';
import { Volume2, Check } from 'lucide-react';

interface LanguageSelectionProps {
  selectedLanguage: string;
  onLanguageSelect: (language: string) => void;
  onContinue: () => void;
}

const LanguageSelection: React.FC<LanguageSelectionProps> = ({
  selectedLanguage,
  onLanguageSelect,
  onContinue
}) => {
  const languages = [
    {
      code: 'en',
      name: 'English',
      nativeName: 'English',
      flag: '🇬🇧'
    },
    {
      code: 'hi',
      name: 'Hindi',
      nativeName: 'हिंदी',
      flag: '🇮🇳'
    },
    {
      code: 'kn',
      name: 'Kannada',
      nativeName: 'ಕನ್ನಡ',
      flag: '🇮🇳'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8 pt-12">
          <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mb-4 mx-auto">
            <span className="text-2xl text-white">🌐</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Choose Your Language</h2>
          <p className="text-gray-600">अपनी भाषा चुनें / ನಿಮ್ಮ ಭಾಷೆಯನ್ನು ಆರಿಸಿ</p>
        </div>

        {/* Language Options */}
        <div className="space-y-4 mb-8">
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => onLanguageSelect(language.code)}
              className={`w-full p-4 rounded-xl border-2 transition-all duration-200 ${
                selectedLanguage === language.code
                  ? 'border-green-500 bg-green-50 shadow-md'
                  : 'border-gray-200 bg-white hover:border-green-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <span className="text-3xl">{language.flag}</span>
                  <div className="text-left">
                    <p className="text-lg font-semibold text-gray-800">{language.name}</p>
                    <p className="text-sm text-gray-600">{language.nativeName}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      // Voice assistance functionality would go here
                    }}
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    <Volume2 size={20} className="text-gray-500" />
                  </button>
                  
                  {selectedLanguage === language.code && (
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <Check size={16} className="text-white" />
                    </div>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Voice Assistance Option */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-8">
          <div className="flex items-center space-x-3">
            <Volume2 size={24} className="text-blue-600" />
            <div>
              <p className="font-medium text-blue-800">Voice Assistance Available</p>
              <p className="text-sm text-blue-600">Tap the speaker icon for audio help</p>
            </div>
          </div>
        </div>

        {/* Continue Button */}
        <button
          onClick={onContinue}
          disabled={!selectedLanguage}
          className={`w-full py-4 rounded-xl text-lg font-semibold transition-colors ${
            selectedLanguage
              ? 'bg-green-600 text-white hover:bg-green-700 shadow-lg'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Continue / जारी रखें / ಮುಂದುವರಿಸಿ
        </button>
      </div>
    </div>
  );
};

export default LanguageSelection;