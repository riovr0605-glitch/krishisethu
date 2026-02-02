import React, { useState } from 'react';
import { 
  ArrowLeft, 
  AlertTriangle, 
  CheckCircle, 
  XCircle,
  MessageCircle,
  User,
  Package,
  Calendar,
  IndianRupee as Rupee,
  Phone,
  Eye,
  FileText,
  Clock
} from 'lucide-react';

interface DisputeResolutionProps {
  onBack: () => void;
}

interface Dispute {
  id: string;
  transactionId: string;
  raisedBy: 'farmer' | 'trader';
  raisedByName: string;
  raisedByPhone: string;
  againstName: string;
  againstPhone: string;
  type: 'quality' | 'payment' | 'delivery' | 'quantity' | 'other';
  status: 'open' | 'investigating' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  subject: string;
  description: string;
  amount: number;
  produceName: string;
  quantity: number;
  raisedDate: string;
  lastUpdated: string;
  evidence: string[];
  adminNotes: string;
  resolution?: string;
}

const DisputeResolution: React.FC<DisputeResolutionProps> = ({ onBack }) => {
  const [selectedDispute, setSelectedDispute] = useState<Dispute | null>(null);
  const [filter, setFilter] = useState<'all' | 'open' | 'investigating'>('open');
  const [resolutionNote, setResolutionNote] = useState('');

  const [disputes] = useState<Dispute[]>([
    {
      id: 'D001',
      transactionId: 'TX123456',
      raisedBy: 'trader',
      raisedByName: 'Shyam Trader',
      raisedByPhone: '+91-9876543211',
      againstName: 'Ram Kumar',
      againstPhone: '+91-9876543210',
      type: 'quality',
      status: 'open',
      priority: 'high',
      subject: 'Poor Quality Wheat Delivered',
      description: 'The wheat delivered does not match the quality shown in photos. Contains too much moisture and foreign particles.',
      amount: 115000,
      produceName: 'Wheat',
      quantity: 50,
      raisedDate: '2024-01-20',
      lastUpdated: '2024-01-20',
      evidence: ['quality_photos.jpg', 'moisture_test_report.pdf'],
      adminNotes: ''
    },
    {
      id: 'D002',
      transactionId: 'TX123457',
      raisedBy: 'farmer',
      raisedByName: 'Priya Sharma',
      raisedByPhone: '+91-9876543212',
      againstName: 'Ali Brothers Trading',
      againstPhone: '+91-9876543213',
      type: 'payment',
      status: 'investigating',
      priority: 'urgent',
      subject: 'Payment Not Received',
      description: 'Payment for rice delivery was supposed to be made 3 days ago but still not received in bank account.',
      amount: 85000,
      produceName: 'Rice',
      quantity: 40,
      raisedDate: '2024-01-18',
      lastUpdated: '2024-01-19',
      evidence: ['bank_statement.pdf', 'delivery_receipt.jpg'],
      adminNotes: 'Contacted trader - investigating payment gateway issue'
    },
    {
      id: 'D003',
      transactionId: 'TX123458',
      raisedBy: 'trader',
      raisedByName: 'Kumar Trading',
      raisedByPhone: '+91-9876543214',
      againstName: 'Rajesh Patel',
      againstPhone: '+91-9876543215',
      type: 'quantity',
      status: 'open',
      priority: 'medium',
      subject: 'Quantity Shortage',
      description: 'Ordered 100 quintals of maize but received only 85 quintals. Farmer claims rest was damaged.',
      amount: 170000,
      produceName: 'Maize',
      quantity: 100,
      raisedDate: '2024-01-22',
      lastUpdated: '2024-01-22',
      evidence: ['weighing_receipt.jpg', 'truck_photos.jpg'],
      adminNotes: ''
    }
  ];

  const filteredDisputes = disputes.filter(dispute => 
    filter === 'all' || dispute.status === filter
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-red-100 text-red-800';
      case 'investigating': return 'bg-yellow-100 text-yellow-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'quality': return Package;
      case 'payment': return Rupee;
      case 'delivery': return Clock;
      case 'quantity': return Package;
      default: return AlertTriangle;
    }
  };

  const handleResolveDispute = (disputeId: string, resolution: 'favor_farmer' | 'favor_trader' | 'partial') => {
    console.log('Resolving dispute:', disputeId, resolution);
    alert(`Dispute ${disputeId} resolved in favor of ${resolution.replace('favor_', '').replace('_', ' ')}`);
  };

  const handleContactParty = (phone: string, name: string) => {
    console.log('Contacting:', name, phone);
    alert(`Calling ${name} at ${phone}`);
  };

  if (selectedDispute) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 p-4">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setSelectedDispute(null)} 
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <ArrowLeft size={20} className="text-gray-600" />
            </button>
            <div className="flex-1">
              <h1 className="text-lg font-semibold text-gray-800">Dispute Resolution</h1>
              <p className="text-sm text-gray-600">Dispute #{selectedDispute.id}</p>
            </div>
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedDispute.status)}`}>
              {selectedDispute.status.toUpperCase()}
            </div>
          </div>
        </div>

        <div className="p-4 space-y-6">
          {/* Dispute Overview */}
          <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-xl font-bold text-gray-800">{selectedDispute.subject}</h3>
                  <div className={`w-3 h-3 rounded-full ${getPriorityColor(selectedDispute.priority)}`}></div>
                  <span className="text-sm font-medium text-gray-600 capitalize">{selectedDispute.priority} Priority</span>
                </div>
                <p className="text-gray-600 mb-4">{selectedDispute.description}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Transaction ID</p>
                <p className="font-semibold text-gray-800">{selectedDispute.transactionId}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Dispute Type</p>
                <p className="font-semibold text-gray-800 capitalize">{selectedDispute.type}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Amount Involved</p>
                <p className="font-semibold text-gray-800">₹{selectedDispute.amount.toLocaleString()}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Produce</p>
                <p className="font-semibold text-gray-800">{selectedDispute.produceName} ({selectedDispute.quantity} quintals)</p>
              </div>
            </div>
          </div>

          {/* Parties Involved */}
          <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Parties Involved</h4>
            
            <div className="grid grid-cols-1 gap-4">
              {/* Complainant */}
              <div className="border border-red-200 bg-red-50 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center">
                      <User size={16} className="text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-red-800">{selectedDispute.raisedByName}</p>
                      <p className="text-sm text-red-600">Complainant ({selectedDispute.raisedBy})</p>
                      <p className="text-xs text-red-600">{selectedDispute.raisedByPhone}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleContactParty(selectedDispute.raisedByPhone, selectedDispute.raisedByName)}
                    className="p-2 bg-red-100 rounded-full hover:bg-red-200 transition-colors"
                  >
                    <Phone size={16} className="text-red-600" />
                  </button>
                </div>
              </div>

              {/* Respondent */}
              <div className="border border-blue-200 bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                      <User size={16} className="text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-blue-800">{selectedDispute.againstName}</p>
                      <p className="text-sm text-blue-600">Respondent ({selectedDispute.raisedBy === 'farmer' ? 'trader' : 'farmer'})</p>
                      <p className="text-xs text-blue-600">{selectedDispute.againstPhone}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleContactParty(selectedDispute.againstPhone, selectedDispute.againstName)}
                    className="p-2 bg-blue-100 rounded-full hover:bg-blue-200 transition-colors"
                  >
                    <Phone size={16} className="text-blue-600" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Evidence */}
          <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Evidence Submitted</h4>
            
            <div className="space-y-3">
              {selectedDispute.evidence.map((evidence, index) => (
                <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <FileText size={20} className="text-blue-600" />
                    <span className="font-medium text-gray-800">{evidence}</span>
                  </div>
                  <button className="p-2 bg-blue-100 rounded-full hover:bg-blue-200 transition-colors">
                    <Eye size={16} className="text-blue-600" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Admin Notes */}
          <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Admin Investigation Notes</h4>
            
            <textarea
              value={selectedDispute.adminNotes}
              placeholder="Add investigation notes, findings, and communication logs..."
              className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent h-24 resize-none"
              readOnly={selectedDispute.status === 'resolved'}
            />
          </div>

          {/* Resolution Actions */}
          {selectedDispute.status !== 'resolved' && (
            <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-4">Resolution Decision</h4>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Resolution Notes</label>
                  <textarea
                    value={resolutionNote}
                    onChange={(e) => setResolutionNote(e.target.value)}
                    placeholder="Explain the resolution decision and any actions to be taken..."
                    className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent h-20 resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 gap-3">
                  <button
                    onClick={() => handleResolveDispute(selectedDispute.id, 'favor_farmer')}
                    className="flex items-center justify-center space-x-2 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
                  >
                    <CheckCircle size={20} />
                    <span>Resolve in Favor of Farmer</span>
                  </button>
                  
                  <button
                    onClick={() => handleResolveDispute(selectedDispute.id, 'favor_trader')}
                    className="flex items-center justify-center space-x-2 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                  >
                    <CheckCircle size={20} />
                    <span>Resolve in Favor of Trader</span>
                  </button>
                  
                  <button
                    onClick={() => handleResolveDispute(selectedDispute.id, 'partial')}
                    className="flex items-center justify-center space-x-2 py-3 bg-yellow-600 text-white rounded-lg font-medium hover:bg-yellow-700 transition-colors"
                  >
                    <CheckCircle size={20} />
                    <span>Partial Resolution</span>
                  </button>
                  
                  <button className="flex items-center justify-center space-x-2 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                    <XCircle size={20} />
                    <span>Close Without Resolution</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4 pb-24">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full">
          <ArrowLeft size={20} className="text-gray-600" />
        </button>
        <div className="flex-1">
          <h1 className="text-lg font-semibold text-gray-800">Dispute Resolution</h1>
          <p className="text-sm text-gray-600">Manage and resolve transaction disputes</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-3">
        <div className="bg-white p-3 rounded-xl shadow-md text-center">
          <p className="text-lg font-bold text-red-600">{disputes.filter(d => d.status === 'open').length}</p>
          <p className="text-xs text-gray-600">Open</p>
        </div>
        <div className="bg-white p-3 rounded-xl shadow-md text-center">
          <p className="text-lg font-bold text-yellow-600">{disputes.filter(d => d.status === 'investigating').length}</p>
          <p className="text-xs text-gray-600">Investigating</p>
        </div>
        <div className="bg-white p-3 rounded-xl shadow-md text-center">
          <p className="text-lg font-bold text-green-600">15</p>
          <p className="text-xs text-gray-600">Resolved</p>
        </div>
        <div className="bg-white p-3 rounded-xl shadow-md text-center">
          <p className="text-lg font-bold text-gray-600">3</p>
          <p className="text-xs text-gray-600">Closed</p>
        </div>
      </div>

      {/* Filter */}
      <div className="flex space-x-2">
        {[
          { key: 'all', label: 'All' },
          { key: 'open', label: 'Open' },
          { key: 'investigating', label: 'Investigating' }
        ].map((filterOption) => (
          <button
            key={filterOption.key}
            onClick={() => setFilter(filterOption.key as any)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === filterOption.key
                ? 'bg-red-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {filterOption.label}
          </button>
        ))}
      </div>

      {/* Disputes List */}
      <div className="space-y-4">
        {filteredDisputes.map((dispute) => {
          const TypeIcon = getTypeIcon(dispute.type);
          return (
            <div 
              key={dispute.id} 
              className="bg-white rounded-xl shadow-md border border-gray-100 p-4 hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => setSelectedDispute(dispute)}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4 flex-1">
                  <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
                    <TypeIcon size={20} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-semibold text-gray-800">{dispute.subject}</h3>
                      <div className={`w-2 h-2 rounded-full ${getPriorityColor(dispute.priority)}`}></div>
                    </div>
                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">{dispute.description}</p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span>#{dispute.id}</span>
                      <span>₹{dispute.amount.toLocaleString()}</span>
                      <span>{dispute.produceName}</span>
                      <span>{new Date(dispute.raisedDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(dispute.status)}`}>
                    {dispute.status}
                  </div>
                  <Eye size={16} className="text-gray-400" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredDisputes.length === 0 && (
        <div className="text-center py-12">
          <AlertTriangle size={48} className="mx-auto text-gray-400 mb-3" />
          <p className="text-gray-500 font-medium">No disputes found</p>
          <p className="text-sm text-gray-400">No disputes matching the selected filter</p>
        </div>
      )}
    </div>
  );
};

export default DisputeResolution;