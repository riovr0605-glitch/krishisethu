import React, { useState } from 'react';
import { Camera, MapPin, Calendar, Package, ArrowLeft, Check } from 'lucide-react';

interface EnhancedAddProduceProps {
  onSubmit: (produceData: any) => void;
  onBack: () => void;
}

const EnhancedAddProduce: React.FC<EnhancedAddProduceProps> = ({ onSubmit, onBack }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    variety: '',
    quantity: '',
    unit: 'quintal',
    basePrice: '',
    description: '',
    harvestDate: '',
    location: '',
    images: [] as string[]
  });

  const [imagePreview, setImagePreview] = useState<string[]>([]);

  const crops = [
    { value: 'गेहूं (Wheat)', label: '🌾 गेहूं (Wheat)', category: 'grain' },
    { value: 'धान (Rice)', label: '🌾 धान (Rice)', category: 'grain' },
    { value: 'मक्का (Maize)', label: '🌽 मक्का (Maize)', category: 'grain' },
    { value: 'बाजरा (Pearl Millet)', label: '🌾 बाजरा (Pearl Millet)', category: 'grain' },
    { value: 'सरसों (Mustard)', label: '🌻 सरसों (Mustard)', category: 'oilseed' },
    { value: 'चना (Chickpea)', label: '🫘 चना (Chickpea)', category: 'pulse' },
    { value: 'अरहर (Pigeon Pea)', label: '🫘 अरहर (Pigeon Pea)', category: 'pulse' },
    { value: 'आलू (Potato)', label: '🥔 आलू (Potato)', category: 'vegetable' },
    { value: 'प्याज (Onion)', label: '🧅 प्याज (Onion)', category: 'vegetable' },
    { value: 'टमाटर (Tomato)', label: '🍅 टमाटर (Tomato)', category: 'vegetable' },
  ];

  const units = [
    { value: 'kg', label: 'किलोग्राम (Kg)', icon: '⚖️' },
    { value: 'quintal', label: 'क्विंटल (Quintal)', icon: '📦' },
    { value: 'ton', label: 'टन (Ton)', icon: '🚛' }
  ];

  const handleImageCapture = () => {
    const dummyImages = [
      'https://images.pexels.com/photos/1656663/pexels-photo-1656663.jpeg',
      'https://images.pexels.com/photos/1300972/pexels-photo-1300972.jpeg'
    ];
    setImagePreview(dummyImages);
    setFormData({ ...formData, images: dummyImages });
  };

  const detectLocation = () => {
    setFormData({ ...formData, location: 'Khadakwasla, Pune, Maharashtra' });
  };

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };

  const handlePrevious = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = () => {
    onSubmit({
      ...formData,
      quantity: parseFloat(formData.quantity),
      basePrice: parseFloat(formData.basePrice),
      status: 'active',
      bids: []
    });
  };

  const isStepValid = () => {
    switch (step) {
      case 1: return formData.name && formData.quantity && formData.unit;
      case 2: return formData.basePrice;
      case 3: return formData.location;
      case 4: return true;
      default: return false;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center space-x-4">
          <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full">
            <ArrowLeft size={20} className="text-gray-600" />
          </button>
          <div className="flex-1">
            <h1 className="text-lg font-semibold text-gray-800">फसल बेचें</h1>
            <p className="text-sm text-gray-600">Add Produce to Sell</p>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="flex items-center mt-4 space-x-2">
          {[1, 2, 3, 4].map((stepNum) => (
            <div key={stepNum} className="flex items-center flex-1">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                stepNum <= step 
                  ? 'bg-green-600 text-white' 
                  : 'bg-gray-200 text-gray-500'
              }`}>
                {stepNum < step ? <Check size={16} /> : stepNum}
              </div>
              {stepNum < 4 && (
                <div className={`flex-1 h-1 mx-2 ${
                  stepNum < step ? 'bg-green-600' : 'bg-gray-200'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Step 1: Crop Details */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package size={32} className="text-green-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-800">फसल का विवरण</h2>
              <p className="text-gray-600">Crop Details</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  फसल का नाम / Crop Name *
                </label>
                <div className="grid grid-cols-1 gap-2 max-h-48 overflow-y-auto">
                  {crops.map((crop) => (
                    <button
                      key={crop.value}
                      type="button"
                      onClick={() => setFormData({ ...formData, name: crop.value })}
                      className={`p-3 text-left rounded-lg border transition-colors ${
                        formData.name === crop.value
                          ? 'border-green-500 bg-green-50 text-green-800'
                          : 'border-gray-200 hover:border-green-300'
                      }`}
                    >
                      {crop.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  मात्रा / Quantity *
                </label>
                <div className="flex space-x-3">
                  <input
                    type="number"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    placeholder="0"
                    className="flex-1 p-4 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                  <select
                    value={formData.unit}
                    onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                    className="p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    {units.map((unit) => (
                      <option key={unit.value} value={unit.value}>
                        {unit.icon} {unit.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  किस्म / Variety (Optional)
                </label>
                <input
                  type="text"
                  value={formData.variety}
                  onChange={(e) => setFormData({ ...formData, variety: e.target.value })}
                  placeholder="जैसे: HD-2967, PB-1509"
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Pricing */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💰</span>
              </div>
              <h2 className="text-xl font-bold text-gray-800">कीमत निर्धारण</h2>
              <p className="text-gray-600">Set Your Price</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  न्यूनतम कीमत / Minimum Price *
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-4 text-gray-500 text-lg">₹</span>
                  <input
                    type="number"
                    value={formData.basePrice}
                    onChange={(e) => setFormData({ ...formData, basePrice: e.target.value })}
                    placeholder="0"
                    className="w-full pl-12 pr-4 py-4 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                </div>
                <p className="text-sm text-gray-500 mt-2">प्रति {formData.unit} की कीमत</p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-800 mb-2">💡 मूल्य निर्धारण सुझाव</h4>
                <p className="text-sm text-blue-700">
                  बाज़ार भाव देखकर प्रतिस्पर्धी कीमत रखें। अच्छी गुणवत्ता के लिए 5-10% अधिक कीमत रख सकते हैं।
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Location & Images */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin size={32} className="text-green-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-800">स्थान और तस्वीरें</h2>
              <p className="text-gray-600">Location & Images</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  स्थान / Location *
                </label>
                <div className="flex space-x-3">
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="गांव, तहसील, जिला"
                    className="flex-1 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                  <button
                    type="button"
                    onClick={detectLocation}
                    className="px-4 py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <MapPin size={20} />
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  फसल की तस्वीर / Crop Images
                </label>
                
                <button
                  type="button"
                  onClick={handleImageCapture}
                  className="w-full p-6 border-2 border-dashed border-gray-300 rounded-lg text-center hover:border-green-500 transition-colors"
                >
                  <Camera size={32} className="mx-auto text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600 font-medium">तस्वीर लें / Take Photo</p>
                  <p className="text-xs text-gray-500 mt-1">अच्छी गुणवत्ता की तस्वीर लें</p>
                </button>
                
                {imagePreview.length > 0 && (
                  <div className="grid grid-cols-2 gap-3 mt-4">
                    {imagePreview.map((img, index) => (
                      <img
                        key={index}
                        src={img}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg border border-gray-200"
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Review & Submit */}
        {step === 4 && (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check size={32} className="text-green-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-800">समीक्षा करें</h2>
              <p className="text-gray-600">Review & Submit</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-600">फसल:</span>
                <span className="font-medium">{formData.name}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-600">मात्रा:</span>
                <span className="font-medium">{formData.quantity} {formData.unit}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-600">कीमत:</span>
                <span className="font-medium text-green-600">₹{formData.basePrice}/{formData.unit}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-600">स्थान:</span>
                <span className="font-medium">{formData.location}</span>
              </div>
              {formData.variety && (
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">किस्म:</span>
                  <span className="font-medium">{formData.variety}</span>
                </div>
              )}
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-medium text-green-800 mb-2">✅ सब कुछ तैयार है!</h4>
              <p className="text-sm text-green-700">
                आपकी फसल सूची में जोड़ दी जाएगी और व्यापारी इसे देख सकेंगे।
              </p>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex space-x-4 pt-4">
          {step > 1 && (
            <button
              onClick={handlePrevious}
              className="flex-1 py-4 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
            >
              पिछला / Previous
            </button>
          )}
          
          {step < 4 ? (
            <button
              onClick={handleNext}
              disabled={!isStepValid()}
              className={`flex-1 py-4 rounded-xl font-medium transition-colors ${
                isStepValid()
                  ? 'bg-green-600 text-white hover:bg-green-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              अगला / Next
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="flex-1 py-4 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition-colors"
            >
              सूची में जोड़ें / Add to Listing
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EnhancedAddProduce;