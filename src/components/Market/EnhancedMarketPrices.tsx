import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  ArrowUp, 
  ArrowDown, 
  Minus, 
  MapPin, 
  TrendingUp,
  BarChart3,
  RefreshCw
} from 'lucide-react';
import { MarketPrice } from '../../types';

interface EnhancedMarketPricesProps {
  prices: MarketPrice[];
}

const EnhancedMarketPrices: React.FC<EnhancedMarketPricesProps> = ({ prices }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'list' | 'comparison'>('list');

  const filteredPrices = prices.filter(price => {
    const matchesSearch = price.produce.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         price.mandi.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || 
                         (selectedFilter === 'trending' && price.trend === 'up') ||
                         (selectedFilter === 'falling' && price.trend === 'down') ||
                         (selectedFilter === 'stable' && price.trend === 'stable');
    
    return matchesSearch && matchesFilter;
  });

  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up': return <ArrowUp size={20} className="text-green-600" />;
      case 'down': return <ArrowDown size={20} className="text-red-600" />;
      default: return <Minus size={20} className="text-gray-600" />;
    }
  };

  const getTrendColor = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up': return 'text-green-600 bg-green-50 border-green-200';
      case 'down': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getHighestLowestPrices = (produceName: string) => {
    const produceData = prices.filter(p => p.produce === produceName);
    if (produceData.length === 0) return { highest: 0, lowest: 0, average: 0 };
    
    const priceValues = produceData.map(p => p.price);
    const highest = Math.max(...priceValues);
    const lowest = Math.min(...priceValues);
    const average = Math.round(priceValues.reduce((sum, price) => sum + price, 0) / priceValues.length);
    
    return { highest, lowest, average };
  };

  const uniqueProduces = [...new Set(prices.map(p => p.produce))];

  return (
    <div className="p-4 space-y-4 pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold mb-1">मंडी भाव</h2>
            <p className="text-blue-100 text-sm">Live Market Prices</p>
            <p className="text-blue-200 text-xs mt-1">रियल टाइम कीमतें</p>
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-2 bg-blue-500 rounded-full hover:bg-blue-400 transition-colors">
              <RefreshCw size={20} />
            </button>
            <div className="text-right">
              <p className="text-sm">अपडेट</p>
              <p className="text-xs">2 min ago</p>
            </div>
          </div>
        </div>
      </div>

      {/* View Mode Toggle */}
      <div className="flex bg-gray-100 rounded-xl p-1">
        <button
          onClick={() => setViewMode('list')}
          className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
            viewMode === 'list'
              ? 'bg-white text-gray-800 shadow-sm'
              : 'text-gray-600'
          }`}
        >
          📋 सूची / List
        </button>
        <button
          onClick={() => setViewMode('comparison')}
          className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
            viewMode === 'comparison'
              ? 'bg-white text-gray-800 shadow-sm'
              : 'text-gray-600'
          }`}
        >
          📊 तुलना / Compare
        </button>
      </div>

      {/* Search and Filter */}
      <div className="space-y-3">
        <div className="relative">
          <Search size={20} className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="फसल या मंडी खोजें / Search crops or mandi"
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex space-x-2 overflow-x-auto pb-2">
          {[
            { key: 'all', label: 'सभी', labelEn: 'All', icon: '📊' },
            { key: 'trending', label: 'बढ़ते', labelEn: 'Rising', icon: '📈' },
            { key: 'falling', label: 'गिरते', labelEn: 'Falling', icon: '📉' },
            { key: 'stable', label: 'स्थिर', labelEn: 'Stable', icon: '➖' }
          ].map((filter) => (
            <button
              key={filter.key}
              onClick={() => setSelectedFilter(filter.key)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                selectedFilter === filter.key
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <span>{filter.icon}</span>
              <span>{filter.labelEn}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content based on view mode */}
      {viewMode === 'list' ? (
        /* List View */
        <div className="space-y-3">
          {filteredPrices.map((price) => (
            <div 
              key={price.id} 
              className={`bg-white border rounded-xl shadow-sm p-4 ${getTrendColor(price.trend)}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="text-lg font-semibold text-gray-800">{price.produce}</h3>
                    {getTrendIcon(price.trend)}
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600 mb-2">
                    <MapPin size={14} className="mr-1" />
                    <span>{price.mandi}</span>
                  </div>
                  
                  <p className="text-xs text-gray-500">
                    अपडेट: {new Date(price.lastUpdated).toLocaleString('hi-IN')}
                  </p>
                </div>
                
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-800">₹{price.price}</p>
                  <p className="text-sm text-gray-600">प्रति क्विंटल</p>
                  
                  <div className="flex items-center justify-end mt-2">
                    <span className={`text-sm font-semibold ${
                      price.change > 0 ? 'text-green-600' : 
                      price.change < 0 ? 'text-red-600' : 'text-gray-600'
                    }`}>
                      {price.change > 0 ? '+' : ''}{price.change}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Comparison View */
        <div className="space-y-4">
          {uniqueProduces.map((produce) => {
            const { highest, lowest, average } = getHighestLowestPrices(produce);
            const produceData = prices.filter(p => p.produce === produce);
            
            return (
              <div key={produce} className="bg-white rounded-xl shadow-md border border-gray-100 p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">{produce}</h3>
                  <BarChart3 size={20} className="text-blue-600" />
                </div>
                
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <p className="text-xs text-green-600 font-medium">सर्वोच्च</p>
                    <p className="text-lg font-bold text-green-700">₹{highest}</p>
                  </div>
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <p className="text-xs text-blue-600 font-medium">औसत</p>
                    <p className="text-lg font-bold text-blue-700">₹{average}</p>
                  </div>
                  <div className="text-center p-3 bg-red-50 rounded-lg">
                    <p className="text-xs text-red-600 font-medium">न्यूनतम</p>
                    <p className="text-lg font-bold text-red-700">₹{lowest}</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-700">मंडी-वार कीमतें:</p>
                  {produceData.map((price) => (
                    <div key={price.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <MapPin size={14} className="text-gray-500" />
                        <span className="text-sm text-gray-700">{price.mandi}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">₹{price.price}</span>
                        {getTrendIcon(price.trend)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {filteredPrices.length === 0 && (
        <div className="text-center py-12">
          <TrendingUp size={48} className="mx-auto text-gray-400 mb-3" />
          <p className="text-gray-500 font-medium">कोई मंडी भाव नहीं मिला</p>
          <p className="text-sm text-gray-400">No market prices found</p>
        </div>
      )}
    </div>
  );
};

export default EnhancedMarketPrices;