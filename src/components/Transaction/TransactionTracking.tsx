import React, { useState } from 'react';
import { 
  CheckCircle, 
  Clock, 
  Truck, 
  CreditCard, 
  Package,
  MapPin,
  Phone,
  ArrowLeft,
  AlertCircle,
  Shield,
  Download,
  Share2,
  Star,
  User,
  Calendar,
  IndianRupee as Rupee
} from 'lucide-react';
import { Transaction } from '../../types';

interface TransactionTrackingProps {
  transaction: Transaction;
  onBack: () => void;
  onContactSupport: () => void;
}

const TransactionTracking: React.FC<TransactionTrackingProps> = ({
  transaction,
  onBack,
  onContactSupport
}) => {
  const [showPaymentDetails, setShowPaymentDetails] = useState(false);
  const [showDeliveryDetails, setShowDeliveryDetails] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100 border-green-200';
      case 'confirmed': return 'text-blue-600 bg-blue-100 border-blue-200';
      case 'in_transit': return 'text-orange-600 bg-orange-100 border-orange-200';
      case 'pending': return 'text-yellow-600 bg-yellow-100 border-yellow-200';
      default: return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'लंबित / Pending';
      case 'confirmed': return 'पुष्ट / Confirmed';
      case 'in_transit': return 'ट्रांजिट में / In Transit';
      case 'delivered': return 'डिलीवर / Delivered';
      case 'completed': return 'पूर्ण / Completed';
      default: return status;
    }
  };

  const timelineSteps = [
    {
      id: 'deal_accepted',
      title: 'बोली स्वीकार',
      titleEn: 'Deal Accepted',
      description: 'किसान ने आपकी बोली स्वीकार की',
      descriptionEn: 'Farmer accepted your bid',
      icon: CheckCircle,
      completed: true,
      timestamp: '2024-01-15 10:30 AM',
      details: 'Deal confirmed at ₹2,300 per quintal for 50 quintals'
    },
    {
      id: 'produce_collected',
      title: 'फसल एकत्रित',
      titleEn: 'Produce Collected',
      description: 'फसल की गुणवत्ता जांच और संग्रह',
      descriptionEn: 'Quality check and produce collection',
      icon: Package,
      completed: transaction.status !== 'pending',
      timestamp: transaction.status !== 'pending' ? '2024-01-15 02:00 PM' : '',
      details: 'Quality verified, 50 quintals collected from farm'
    },
    {
      id: 'payment_initiated',
      title: 'भुगतान शुरू',
      titleEn: 'Payment Initiated',
      description: 'भुगतान प्रक्रिया शुरू की गई',
      descriptionEn: 'Payment process started',
      icon: CreditCard,
      completed: ['confirmed', 'in_transit', 'delivered', 'completed'].includes(transaction.status),
      timestamp: ['confirmed', 'in_transit', 'delivered', 'completed'].includes(transaction.status) ? '2024-01-15 02:30 PM' : '',
      details: 'Bank transfer initiated to farmer account'
    },
    {
      id: 'in_transit',
      title: 'ट्रांसपोर्ट',
      titleEn: 'In Transit',
      description: 'फसल ट्रांसपोर्ट में है',
      descriptionEn: 'Produce is being transported',
      icon: Truck,
      completed: ['in_transit', 'delivered', 'completed'].includes(transaction.status),
      timestamp: ['in_transit', 'delivered', 'completed'].includes(transaction.status) ? '2024-01-15 04:00 PM' : '',
      details: 'Vehicle: MH 12 AB 1234, Driver: Ramesh Kumar'
    },
    {
      id: 'payment_completed',
      title: 'भुगतान पूर्ण',
      titleEn: 'Payment Completed',
      description: 'किसान को भुगतान पूरा',
      descriptionEn: 'Payment completed to farmer',
      icon: CheckCircle,
      completed: ['delivered', 'completed'].includes(transaction.status),
      timestamp: ['delivered', 'completed'].includes(transaction.status) ? '2024-01-15 06:00 PM' : '',
      details: 'Full payment of ₹1,15,000 transferred successfully'
    }
  ];

  const paymentBreakdown = {
    produceValue: transaction.amount * 0.95,
    platformFee: transaction.amount * 0.03,
    transportCost: transaction.amount * 0.02,
    total: transaction.amount
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
            <h1 className="text-lg font-semibold text-gray-800">लेन-देन ट्रैकिंग</h1>
            <p className="text-sm text-gray-600">Transaction Tracking</p>
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-2 bg-blue-100 rounded-full hover:bg-blue-200 transition-colors">
              <Share2 size={20} className="text-blue-600" />
            </button>
            <button
              onClick={onContactSupport}
              className="p-2 bg-green-100 rounded-full hover:bg-green-200 transition-colors"
            >
              <Phone size={20} className="text-green-600" />
            </button>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Transaction Summary Card */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-xl font-bold">Transaction #{transaction.id.slice(0, 8)}</h3>
              <p className="text-blue-100 text-sm">Order ID: {transaction.id}</p>
            </div>
            <div className={`px-4 py-2 rounded-full text-sm font-medium border ${getStatusColor(transaction.status)} bg-white`}>
              {getStatusText(transaction.status)}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-500 bg-opacity-50 p-4 rounded-xl">
              <div className="flex items-center space-x-2 mb-2">
                <Rupee size={20} />
                <p className="text-sm text-blue-100">कुल राशि / Total Amount</p>
              </div>
              <p className="text-2xl font-bold">₹{transaction.amount.toLocaleString()}</p>
            </div>
            <div className="bg-blue-500 bg-opacity-50 p-4 rounded-xl">
              <div className="flex items-center space-x-2 mb-2">
                <Package size={20} />
                <p className="text-sm text-blue-100">मात्रा / Quantity</p>
              </div>
              <p className="text-2xl font-bold">{transaction.quantity} kg</p>
            </div>
          </div>
        </div>

        {/* Deal Confirmation Details */}
        <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle size={20} className="text-green-600" />
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-800">डील कन्फर्मेशन</h4>
              <p className="text-sm text-gray-600">Deal Confirmation Details</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">फसल / Produce</p>
                <p className="font-semibold text-gray-800">Wheat (HD-2967)</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">दर / Rate</p>
                <p className="font-semibold text-gray-800">₹2,300 per quintal</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">किसान / Farmer</p>
                <p className="font-semibold text-gray-800">Ram Kumar</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">स्थान / Location</p>
                <p className="font-semibold text-gray-800">Khadakwasla, Pune</p>
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Shield size={16} className="text-green-600" />
                <span className="text-sm font-medium text-green-800">गुणवत्ता गारंटी / Quality Guarantee</span>
              </div>
              <p className="text-sm text-green-700">
                फसल की गुणवत्ता प्लेटफॉर्म द्वारा सत्यापित है। यदि गुणवत्ता अपेक्षा के अनुसार नहीं है तो पूर्ण धनवापसी।
              </p>
            </div>
          </div>
        </div>

        {/* Payment Status Timeline */}
        <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h4 className="text-lg font-semibold text-gray-800">भुगतान स्थिति / Payment Status</h4>
              <p className="text-sm text-gray-600">Track your transaction progress</p>
            </div>
            <button
              onClick={() => setShowPaymentDetails(!showPaymentDetails)}
              className="text-blue-600 text-sm font-medium hover:text-blue-700"
            >
              {showPaymentDetails ? 'छुपाएं' : 'विवरण देखें'}
            </button>
          </div>
          
          <div className="space-y-6">
            {timelineSteps.map((step, index) => {
              const Icon = step.icon;
              const isLast = index === timelineSteps.length - 1;
              
              return (
                <div key={step.id} className="flex items-start space-x-4">
                  <div className="flex flex-col items-center">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 ${
                      step.completed 
                        ? 'bg-green-600 text-white border-green-600' 
                        : 'bg-gray-100 text-gray-400 border-gray-300'
                    }`}>
                      <Icon size={20} />
                    </div>
                    {!isLast && (
                      <div className={`w-0.5 h-12 mt-2 ${
                        step.completed ? 'bg-green-600' : 'bg-gray-200'
                      }`} />
                    )}
                  </div>
                  
                  <div className="flex-1 pb-8">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h5 className={`font-semibold ${
                          step.completed ? 'text-gray-800' : 'text-gray-500'
                        }`}>
                          {step.title}
                        </h5>
                        <p className={`text-sm ${
                          step.completed ? 'text-gray-600' : 'text-gray-400'
                        }`}>
                          {step.titleEn}
                        </p>
                      </div>
                      {step.timestamp && (
                        <div className="text-right">
                          <span className="text-xs text-gray-500">{step.timestamp}</span>
                          {step.completed && (
                            <div className="flex items-center space-x-1 mt-1">
                              <CheckCircle size={12} className="text-green-600" />
                              <span className="text-xs text-green-600 font-medium">पूर्ण</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                    
                    <p className={`text-sm mb-2 ${
                      step.completed ? 'text-gray-600' : 'text-gray-400'
                    }`}>
                      {step.description}
                    </p>
                    
                    {step.details && step.completed && (
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-sm text-gray-700">{step.details}</p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Payment Breakdown */}
        {showPaymentDetails && (
          <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
            <h4 className="text-lg font-semibold text-gray-800 mb-4">भुगतान विवरण / Payment Breakdown</h4>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-600">फसल मूल्य / Produce Value:</span>
                <span className="font-medium">₹{paymentBreakdown.produceValue.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-600">प्लेटफॉर्म शुल्क / Platform Fee (3%):</span>
                <span className="font-medium">₹{paymentBreakdown.platformFee.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-600">परिवहन लागत / Transport Cost (2%):</span>
                <span className="font-medium">₹{paymentBreakdown.transportCost.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center py-3 font-semibold text-lg border-t-2 border-gray-200">
                <span className="text-gray-800">कुल राशि / Total Amount:</span>
                <span className="text-green-600">₹{paymentBreakdown.total.toLocaleString()}</span>
              </div>
            </div>
            
            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Shield size={16} className="text-blue-600" />
                <span className="text-sm font-medium text-blue-800">
                  सुरक्षित भुगतान / Secure Payment
                </span>
              </div>
              <p className="text-xs text-blue-700">
                आपका भुगतान एस्क्रो में सुरक्षित है। फसल की डिलीवरी और गुणवत्ता सत्यापन के बाद ही किसान को भुगतान किया जाएगा।
              </p>
            </div>
          </div>
        )}

        {/* Delivery Information */}
        {['in_transit', 'delivered', 'completed'].includes(transaction.status) && (
          <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold text-gray-800">डिलीवरी जानकारी / Delivery Information</h4>
              <button
                onClick={() => setShowDeliveryDetails(!showDeliveryDetails)}
                className="text-blue-600 text-sm font-medium hover:text-blue-700"
              >
                {showDeliveryDetails ? 'छुपाएं' : 'ट्रैक करें'}
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                <MapPin size={20} className="text-blue-600" />
                <div>
                  <p className="font-medium text-blue-800">पिकअप स्थान / Pickup Location</p>
                  <p className="text-sm text-blue-700">Khadakwasla, Pune, Maharashtra</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                <Truck size={20} className="text-green-600" />
                <div>
                  <p className="font-medium text-green-800">वाहन जानकारी / Vehicle Details</p>
                  <p className="text-sm text-green-700">MH 12 AB 1234 - Tata 407</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-3 bg-orange-50 rounded-lg">
                <User size={20} className="text-orange-600" />
                <div>
                  <p className="font-medium text-orange-800">ड्राइवर संपर्क / Driver Contact</p>
                  <p className="text-sm text-orange-700">Ramesh Kumar - +91 98765 43210</p>
                </div>
              </div>

              {showDeliveryDetails && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h5 className="font-medium text-gray-800 mb-3">लाइव ट्रैकिंग / Live Tracking</h5>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">वर्तमान स्थान:</span>
                      <span className="text-sm font-medium">Pune-Mumbai Highway, KM 45</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">अनुमानित पहुंच:</span>
                      <span className="text-sm font-medium">2 घंटे / 2 hours</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: '65%' }}></div>
                    </div>
                    <p className="text-xs text-gray-500 text-center">65% यात्रा पूर्ण</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Transaction Documents */}
        <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
          <h4 className="text-lg font-semibold text-gray-800 mb-4">दस्तावेज़ / Documents</h4>
          
          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <Download size={20} className="text-blue-600" />
              <div className="text-left">
                <p className="font-medium text-gray-800">Invoice</p>
                <p className="text-xs text-gray-500">PDF - 245 KB</p>
              </div>
            </button>
            
            <button className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <Download size={20} className="text-green-600" />
              <div className="text-left">
                <p className="font-medium text-gray-800">Quality Certificate</p>
                <p className="text-xs text-gray-500">PDF - 180 KB</p>
              </div>
            </button>
          </div>
        </div>

        {/* Rate Transaction */}
        {transaction.status === 'completed' && (
          <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
            <h4 className="text-lg font-semibold text-gray-800 mb-4">लेन-देन का मूल्यांकन करें</h4>
            
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600 mb-2">किसान को रेटिंग दें:</p>
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button key={star} className="p-1">
                      <Star size={24} className="text-yellow-400 fill-current" />
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm text-gray-600 mb-2">फीडबैक (वैकल्पिक):</label>
                <textarea
                  placeholder="अपना अनुभव साझा करें..."
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent h-20 resize-none"
                />
              </div>
              
              <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                रेटिंग सबमिट करें / Submit Rating
              </button>
            </div>
          </div>
        )}

        {/* Support Section */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
              <Phone size={20} className="text-yellow-600" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-yellow-800">सहायता चाहिए? / Need Help?</p>
              <p className="text-sm text-yellow-700">24/7 ग्राहक सहायता उपलब्ध</p>
            </div>
            <button
              onClick={onContactSupport}
              className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
            >
              संपर्क करें
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionTracking;