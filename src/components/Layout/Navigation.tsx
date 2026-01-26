import React from 'react';
import { Home, TrendingUp, Plus, MessageCircle, User, Settings } from 'lucide-react';

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  userType: 'farmer' | 'trader' | 'admin';
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange, userType }) => {
  const farmerTabs = [
    { id: 'dashboard', icon: Home, label: 'होम', labelEn: 'Home', labelKn: 'ಮನೆ' },
    { id: 'market', icon: TrendingUp, label: 'बाज़ार', labelEn: 'Market', labelKn: 'ಮಾರುಕಟ್ಟೆ' },
    { id: 'add', icon: Plus, label: 'बेचें', labelEn: 'Sell', labelKn: 'ಮಾರಾಟ' },
    { id: 'chat', icon: MessageCircle, label: 'चैट', labelEn: 'Chat', labelKn: 'ಚಾಟ್' },
    { id: 'profile', icon: User, label: 'प्रोफ़ाइल', labelEn: 'Profile', labelKn: 'ಪ್ರೊಫೈಲ್' },
  ];

  const traderTabs = [
    { id: 'dashboard', icon: Home, label: 'होम', labelEn: 'Home', labelKn: 'ಮನೆ' },
    { id: 'browse', icon: TrendingUp, label: 'खरीदें', labelEn: 'Buy', labelKn: 'ಖರೀದಿ' },
    { id: 'chat', icon: MessageCircle, label: 'चैट', labelEn: 'Chat', labelKn: 'ಚಾಟ್' },
    { id: 'profile', icon: User, label: 'प्रोफ़ाइल', labelEn: 'Profile', labelKn: 'ಪ್ರೊಫೈಲ್' },
  ];

  const adminTabs = [
    { id: 'dashboard', icon: Home, label: 'Dashboard', labelEn: 'Dashboard', labelKn: 'Dashboard' },
    { id: 'verification', icon: Settings, label: 'Verify', labelEn: 'Verify', labelKn: 'Verify' },
  ];

  const tabs = userType === 'farmer' ? farmerTabs : userType === 'trader' ? traderTabs : adminTabs;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="flex justify-around items-center py-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center py-2 px-4 rounded-lg transition-colors ${
                isActive 
                  ? 'text-green-600 bg-green-50' 
                  : 'text-gray-600 hover:text-green-600'
              }`}
            >
              <Icon size={24} />
              <span className="text-xs mt-1 font-medium">{tab.labelEn}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default Navigation;