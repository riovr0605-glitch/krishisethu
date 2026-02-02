import React, { useState } from 'react';
import { 
  Users, 
  AlertTriangle, 
  TrendingUp, 
  FileText,
  CheckCircle,
  Clock,
  Shield,
  Upload,
  Eye,
  UserCheck,
  AlertCircle
} from 'lucide-react';

interface AdminDashboardProps {
  onNavigate: (section: string) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onNavigate }) => {
  const [stats] = useState({
    pendingVerifications: 12,
    activeDisputes: 5,
    totalUsers: 1247,
    totalTransactions: 856,
    pendingSchemes: 3,
    priceUpdates: 24
  });

  const quickActions = [
    {
      id: 'verify-traders',
      title: 'Verify Traders',
      description: 'Review and approve trader applications',
      icon: UserCheck,
      color: 'bg-blue-600 hover:bg-blue-700',
      count: stats.pendingVerifications,
      section: 'verification'
    },
    {
      id: 'disputes',
      title: 'Resolve Disputes',
      description: 'Handle transaction disputes',
      icon: AlertTriangle,
      color: 'bg-red-600 hover:bg-red-700',
      count: stats.activeDisputes,
      section: 'disputes'
    },
    {
      id: 'price-data',
      title: 'Update Prices',
      description: 'Upload market price data',
      icon: TrendingUp,
      color: 'bg-green-600 hover:bg-green-700',
      count: stats.priceUpdates,
      section: 'prices'
    },
    {
      id: 'schemes',
      title: 'Manage Schemes',
      description: 'Add government schemes',
      icon: FileText,
      color: 'bg-purple-600 hover:bg-purple-700',
      count: stats.pendingSchemes,
      section: 'schemes'
    }
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'verification',
      message: 'New trader verification request from Mumbai APMC',
      timestamp: '2 hours ago',
      status: 'pending'
    },
    {
      id: 2,
      type: 'dispute',
      message: 'Dispute raised for transaction #TX123456',
      timestamp: '4 hours ago',
      status: 'active'
    },
    {
      id: 3,
      type: 'price',
      message: 'Price data updated for Pune APMC',
      timestamp: '6 hours ago',
      status: 'completed'
    },
    {
      id: 4,
      type: 'scheme',
      message: 'New PM-KISAN scheme details uploaded',
      timestamp: '1 day ago',
      status: 'completed'
    }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'verification': return UserCheck;
      case 'dispute': return AlertTriangle;
      case 'price': return TrendingUp;
      case 'scheme': return FileText;
      default: return AlertCircle;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'active': return 'text-red-600 bg-red-100';
      case 'completed': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="p-4 space-y-6 pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold mb-1">Admin Dashboard</h2>
            <p className="text-indigo-100 text-sm">Manage platform operations</p>
            <p className="text-indigo-200 text-xs mt-1">Welcome back, Administrator</p>
          </div>
          <div className="w-12 h-12 bg-indigo-500 rounded-full flex items-center justify-center">
            <Shield size={24} />
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-xl shadow-md border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-blue-600">{stats.totalUsers}</p>
              <p className="text-sm text-gray-600 font-medium">Total Users</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Users className="text-blue-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-md border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-green-600">{stats.totalTransactions}</p>
              <p className="text-sm text-gray-600 font-medium">Transactions</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="text-green-600" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-gray-800">Quick Actions</h3>
        
        <div className="grid grid-cols-1 gap-3">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.id}
                onClick={() => onNavigate(action.section)}
                className={`${action.color} text-white p-4 rounded-xl shadow-lg transition-colors`}
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                    <Icon size={24} />
                  </div>
                  <div className="text-left flex-1">
                    <div className="flex items-center space-x-2">
                      <p className="font-semibold text-lg">{action.title}</p>
                      {action.count > 0 && (
                        <span className="bg-white bg-opacity-30 text-white text-xs px-2 py-1 rounded-full font-bold">
                          {action.count}
                        </span>
                      )}
                    </div>
                    <p className="text-white text-opacity-90 text-sm">{action.description}</p>
                  </div>
                  <Eye size={20} className="text-white text-opacity-70" />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-white rounded-xl shadow-md border border-gray-100">
        <div className="p-4 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800">Recent Activities</h3>
          <p className="text-sm text-gray-600">Latest platform activities</p>
        </div>
        
        <div className="p-4 space-y-3">
          {recentActivities.map((activity) => {
            const Icon = getActivityIcon(activity.type);
            return (
              <div key={activity.id} className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  <Icon size={16} className="text-gray-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800">{activity.message}</p>
                  <p className="text-xs text-gray-500">{activity.timestamp}</p>
                </div>
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(activity.status)}`}>
                  {activity.status}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* System Health */}
      <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">System Health</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Database Status</span>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm font-medium text-green-600">Healthy</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">API Response Time</span>
            <span className="text-sm font-medium text-gray-800">125ms</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Active Sessions</span>
            <span className="text-sm font-medium text-gray-800">342</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Storage Usage</span>
            <div className="flex items-center space-x-2">
              <div className="w-20 h-2 bg-gray-200 rounded-full">
                <div className="w-3/4 h-2 bg-blue-500 rounded-full"></div>
              </div>
              <span className="text-sm font-medium text-gray-800">75%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;