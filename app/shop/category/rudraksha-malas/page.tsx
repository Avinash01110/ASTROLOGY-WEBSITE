"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronDown, X, ShoppingCart } from 'lucide-react';
import NakshatraGyaanBanner from '../../../components/NakshatraGyaanBanner';
import SpiritualJourneyBanner from '../../../components/SpiritualJourneyBanner';
import SpiritualTicker from '../../../components/Hero/SpiritualTicker';
import { AnimatePresence } from 'framer-motion';

// Product Banner Component with Images
const ProductBanner = () => (
  <div className="w-full bg-gradient-to-r from-amber-50 via-orange-50 to-red-50 py-8 md:py-12 relative overflow-hidden">
    <div className="max-w-6xl mx-auto px-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        
        {/* Left Section - Full Height Image */}
        <div className="relative h-48 md:h-64 lg:h-80">
          <Image
            src="/images/products/rudraksha-banner.jpg"
            alt="Sacred Rudraksha & Malas Collection"
            fill
            className="object-cover rounded-2xl shadow-2xl"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent rounded-2xl"></div>
        </div>
        
        {/* Right Section - Text Content */}
        <div className="text-center lg:text-left">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-gray-800 mb-3 leading-tight">
            Rudraksha & Malas
          </h1>
          <p className="text-base md:text-lg text-gray-600 font-light leading-relaxed max-w-lg mx-auto lg:mx-0 mb-4">
            Sacred beads of divine energy for spiritual transformation
          </p>
          <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
            <span className="px-3 py-1 bg-amber-100/50 text-amber-800 rounded-full text-xs font-medium border border-amber-200/50">
              Sacred Energy
            </span>
            <span className="px-3 py-1 bg-orange-100/50 text-orange-800 rounded-full text-xs font-medium border border-orange-200/50">
              Spiritual Protection
            </span>
            <span className="px-3 py-1 bg-red-100/50 text-red-800 rounded-full text-xs font-medium border border-red-200/50">
              Divine Blessings
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Product Data with navigation paths
const products = [
  {
    id: 1,
    name: "5 Mukhi Rudraksha Mala",
    type: "Rudraksha Mala",
    mukhi: "5 Mukhi",
    beadCount: "108 Beads",
    purpose: ["For Meditation", "For Daily Wear"],
    price: "₹2,500",
    oldPrice: "₹4,000",
    image: "/images/products/5-mukhi-rudraksha.jpg",
    description: "Most common and powerful rudraksha for health and spiritual growth",
    path: "/shop/5-mukhi-rudraksha-mala"
  },
  {
    id: 2,
    name: "1 Mukhi Rudraksha",
    type: "Rudraksha",
    mukhi: "1 Mukhi",
    beadCount: "1 Bead",
    purpose: ["For Meditation", "Astrological Remedies"],
    price: "₹15,000",
    oldPrice: "₹25,000",
    image: "/images/products/1-mukhi-rudraksha.jpg",
    description: "Rarest rudraksha for enlightenment and ultimate peace",
    path: "/shop/1-mukhi-rudraksha"
  },
  {
    id: 3,
    name: "7 Mukhi Rudraksha Mala",
    type: "Rudraksha Mala",
    mukhi: "7 Mukhi",
    beadCount: "108 Beads",
    purpose: ["For Japa (Chanting)", "For Healing / Protection"],
    price: "₹3,500",
    oldPrice: "₹5,500",
    image: "/images/products/7-mukhi-rudraksha.jpg",
    description: "Attracts wealth and prosperity while providing protection",
    path: "/shop/7-mukhi-rudraksha-mala"
  },
  {
    id: 4,
    name: "Tulsi Mala",
    type: "Tulsi Mala",
    mukhi: "N/A",
    beadCount: "108 Beads",
    purpose: ["For Daily Wear", "For Japa (Chanting)"],
    price: "₹800",
    oldPrice: "₹1,500",
    image: "/images/products/tulsi-mala.jpg",
    description: "Sacred tulsi beads for daily spiritual practice",
    path: "/shop/tulsi-mala"
  },
  {
    id: 5,
    name: "Sphatik Crystal Mala",
    type: "Sphatik (Crystal) Mala",
    mukhi: "N/A",
    beadCount: "108 Beads",
    purpose: ["For Meditation", "For Healing / Protection"],
    price: "₹1,200",
    oldPrice: "₹2,000",
    image: "/images/products/sphatik-mala.jpg",
    description: "Pure crystal mala for meditation and healing",
    path: "/shop/sphatik-crystal-mala"
  },
  {
    id: 6,
    name: "9 Mukhi Rudraksha",
    type: "Rudraksha",
    mukhi: "9 Mukhi",
    beadCount: "1 Bead",
    purpose: ["For Healing / Protection", "Astrological Remedies"],
    price: "₹8,000",
    oldPrice: "₹12,000",
    image: "/images/products/9-mukhi-rudraksha.jpg",
    description: "Powerful protection and authority enhancement",
    path: "/shop/9-mukhi-rudraksha"
  },
  {
    id: 7,
    name: "Sandalwood Mala",
    type: "Sandalwood (Chandan) Mala",
    mukhi: "N/A",
    beadCount: "108 Beads",
    purpose: ["For Daily Wear", "For Meditation"],
    price: "₹600",
    oldPrice: "₹1,200",
    image: "/images/products/sandalwood-mala.jpg",
    description: "Pure sandalwood mala for cooling and calming effects",
    path: "/shop/sandalwood-mala"
  },
  {
    id: 8,
    name: "11 Mukhi Rudraksha Mala",
    type: "Rudraksha Mala",
    mukhi: "11 Mukhi",
    beadCount: "108 Beads",
    purpose: ["For Meditation", "For Japa (Chanting)"],
    price: "₹5,500",
    oldPrice: "₹8,500",
    image: "/images/products/11-mukhi-rudraksha.jpg",
    description: "Enhances meditation and spiritual focus",
    path: "/shop/11-mukhi-rudraksha-mala"
  },
  {
    id: 9,
    name: "Lotus Seed Mala",
    type: "Lotus Seed Mala (Kamal Gatta)",
    mukhi: "N/A",
    beadCount: "108 Beads",
    purpose: ["For Daily Wear", "For Healing / Protection"],
    price: "₹900",
    oldPrice: "₹1,800",
    image: "/images/products/lotus-seed-mala.jpg",
    description: "Sacred lotus seeds for spiritual purity",
    path: "/shop/lotus-seed-mala"
  },
  {
    id: 10,
    name: "Navratna Mala",
    type: "Navratna Mala (9 stones)",
    mukhi: "N/A",
    beadCount: "108 Beads",
    purpose: ["Astrological Remedies", "For Healing / Protection"],
    price: "₹2,800",
    oldPrice: "₹4,500",
    image: "/images/products/navratna-mala.jpg",
    description: "Nine precious stones for planetary balance",
    path: "/shop/navratna-mala"
  },
  {
    id: 11,
    name: "27 Bead Rudraksha Mala",
    type: "Rudraksha Mala",
    mukhi: "5 Mukhi",
    beadCount: "27 Beads",
    purpose: ["For Daily Wear", "For Japa (Chanting)"],
    price: "₹1,500",
    oldPrice: "₹2,500",
    image: "/images/products/27-bead-rudraksha.jpg",
    description: "Compact mala for daily spiritual practice",
    path: "/shop/27-bead-rudraksha-mala"
  },
  {
    id: 12,
    name: "Parad Mala",
    type: "Parad Mala (Mercury)",
    mukhi: "N/A",
    beadCount: "108 Beads",
    purpose: ["Astrological Remedies", "For Healing / Protection"],
    price: "₹4,500",
    oldPrice: "₹7,000",
    image: "/images/products/parad-mala.jpg",
    description: "Mercury beads for powerful astrological remedies",
    path: "/shop/parad-mala"
  }
];

// Filter Options
const filterOptions = {
  type: ["Rudraksha Mala", "Rudraksha", "Tulsi Mala", "Sphatik (Crystal) Mala", "Sandalwood (Chandan) Mala", "Lotus Seed Mala (Kamal Gatta)", "Parad Mala (Mercury)", "Navratna Mala (9 stones)"],
  mukhi: ["1 Mukhi", "2 Mukhi", "3 Mukhi", "4 Mukhi", "5 Mukhi", "6 Mukhi", "7 Mukhi", "8 Mukhi", "9 Mukhi", "10 Mukhi", "11 Mukhi", "12 Mukhi", "13 Mukhi", "14 Mukhi", "N/A"],
  beadCount: ["108 Beads", "54 Beads", "27 Beads", "1 Bead"],
  purpose: ["For Meditation", "For Daily Wear", "For Japa (Chanting)", "For Healing / Protection", "Astrological Remedies"]
};

export default function RudrakshaMalasPage() {
  const [filters, setFilters] = useState({
    type: [],
    mukhi: [],
    beadCount: [],
    purpose: []
  });
  const [activeDropdown, setActiveDropdown] = useState(null);

  // Filter products based on selected criteria
  const filteredProducts = products.filter(product => {
    const typeMatch = filters.type.length === 0 || filters.type.includes(product.type);
    const mukhiMatch = filters.mukhi.length === 0 || filters.mukhi.includes(product.mukhi);
    const beadCountMatch = filters.beadCount.length === 0 || filters.beadCount.includes(product.beadCount);
    const purposeMatch = filters.purpose.length === 0 || product.purpose.some(p => filters.purpose.includes(p));

    return typeMatch && mukhiMatch && beadCountMatch && purposeMatch;
  });

  const toggleFilter = (category, value) => {
    setFilters(prev => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter(item => item !== value)
        : [...prev[category], value]
    }));
  };

  const clearAllFilters = () => {
    setFilters({
      type: [],
      mukhi: [],
      beadCount: [],
      purpose: []
    });
  };

  const getActiveFiltersCount = () => {
    return Object.values(filters).reduce((sum, arr) => sum + arr.length, 0);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Product Banner */}
      <ProductBanner />
      
      {/* Spiritual Ticker */}
      <SpiritualTicker />
      
      {/* Category Description */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-center mb-6 text-gray-800">
          Sacred beads of divine energy
        </h2>
        <p className="text-lg text-gray-600 text-center max-w-4xl mx-auto mb-12">
          Discover authentic Rudraksha beads and sacred malas that connect you to divine energy. 
          Each bead carries unique spiritual properties to enhance your meditation, protection, and spiritual growth.
        </p>

        {/* Filters Section */}
        <div className="bg-gray-50 rounded-2xl shadow-sm p-6 mb-12 border border-gray-100">
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <span className="text-gray-700 font-medium">Filter by:</span>
            
            {/* Type Filter */}
            <div className="relative">
              <button
                onClick={() => setActiveDropdown(activeDropdown === 'type' ? null : 'type')}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
              >
                Type
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === 'type' ? 'rotate-180' : ''}`} />
              </button>
              <div className={`absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-xl shadow-lg z-10 max-h-60 overflow-y-auto transition-all duration-200 ease-out ${activeDropdown === 'type' ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform -translate-y-2 pointer-events-none'}`}>
                {filterOptions.type.map(type => (
                  <label key={type} className="flex items-center px-4 py-2 hover:bg-gray-50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.type.includes(type)}
                      onChange={() => toggleFilter('type', type)}
                      className="mr-2"
                    />
                    {type}
                  </label>
                ))}
              </div>
            </div>

            {/* Mukhi Filter */}
            <div className="relative">
              <button
                onClick={() => setActiveDropdown(activeDropdown === 'mukhi' ? null : 'mukhi')}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
              >
                Mukhi
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === 'mukhi' ? 'rotate-180' : ''}`} />
              </button>
              <div className={`absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-xl shadow-lg z-10 max-h-60 overflow-y-auto transition-all duration-200 ease-out ${activeDropdown === 'mukhi' ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform -translate-y-2 pointer-events-none'}`}>
                {filterOptions.mukhi.map(mukhi => (
                  <label key={mukhi} className="flex items-center px-4 py-2 hover:bg-gray-50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.mukhi.includes(mukhi)}
                      onChange={() => toggleFilter('mukhi', mukhi)}
                      className="mr-2"
                    />
                    {mukhi}
                  </label>
                ))}
              </div>
            </div>

            {/* Bead Count Filter */}
            <div className="relative">
              <button
                onClick={() => setActiveDropdown(activeDropdown === 'beadCount' ? null : 'beadCount')}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
              >
                Bead Count
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === 'beadCount' ? 'rotate-180' : ''}`} />
              </button>
              <div className={`absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-xl shadow-lg z-10 max-h-60 overflow-y-auto transition-all duration-200 ease-out ${activeDropdown === 'beadCount' ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform -translate-y-2 pointer-events-none'}`}>
                {filterOptions.beadCount.map(count => (
                  <label key={count} className="flex items-center px-4 py-2 hover:bg-gray-50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.beadCount.includes(count)}
                      onChange={() => toggleFilter('beadCount', count)}
                      className="mr-2"
                    />
                    {count}
                  </label>
                ))}
              </div>
            </div>

            {/* Purpose Filter */}
            <div className="relative">
              <button
                onClick={() => setActiveDropdown(activeDropdown === 'purpose' ? null : 'purpose')}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
              >
                Purpose
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === 'purpose' ? 'rotate-180' : ''}`} />
              </button>
              <div className={`absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-xl shadow-lg z-10 max-h-60 overflow-y-auto transition-all duration-200 ease-out ${activeDropdown === 'purpose' ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform -translate-y-2 pointer-events-none'}`}>
                {filterOptions.purpose.map(purpose => (
                  <label key={purpose} className="flex items-center px-4 py-2 hover:bg-gray-50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.purpose.includes(purpose)}
                      onChange={() => toggleFilter('purpose', purpose)}
                      className="mr-2"
                    />
                    {purpose}
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Active Filters Display */}
          {getActiveFiltersCount() > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm text-gray-600">Active filters:</span>
              {Object.entries(filters).map(([category, values]) =>
                values.map(value => (
                  <span
                    key={`${category}-${value}`}
                    className="flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm"
                  >
                    {value}
                    <button
                      onClick={() => toggleFilter(category, value)}
                      className="ml-1 hover:text-gray-600"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))
              )}
              <button
                onClick={clearAllFilters}
                className="text-sm text-gray-600 hover:text-gray-800 underline"
              >
                Clear all
              </button>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-8">
          <p className="text-gray-600">
            Showing {filteredProducts.length} of {products.length} products
          </p>
        </div>

        {/* Products Grid */}
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center">
            {filteredProducts.map((product, idx) => (
              <Link href={product.path} key={product.id} className="w-full max-w-sm">
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.08 }}
                  whileHover={{ y: -8, boxShadow: '0 8px 32px 0 rgba(80,80,120,0.10)' }}
                  className="bg-white rounded-2xl shadow-sm overflow-hidden flex flex-col h-full transition-all duration-300 cursor-pointer border border-gray-100"
                >
                  <div className="relative w-full flex items-center justify-center p-3" style={{ background: 'transparent', transition: 'background 0.3s' }}>
                    <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }} className="w-full h-36 relative">
                      <Image 
                        src={product.image} 
                        alt={product.name} 
                        fill 
                        className="object-cover rounded-xl" 
                        style={{ objectFit: 'cover', position: 'absolute' }} 
                      />
                    </motion.div>
                  </div>
                  <div className="flex flex-col flex-1 p-4">
                    <h3 className="text-lg font-serif font-bold mb-2 leading-snug text-gray-900">{product.name}</h3>
                    <div className="flex items-center text-gray-500 text-sm mb-2 gap-3">
                      <span className="font-medium">{product.type}</span>
                      <span className="font-medium">{product.beadCount}</span>
                    </div>
                    <p className="text-gray-600 mb-3 text-sm line-clamp-2 font-light">{product.description}</p>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {product.purpose.slice(0, 1).map(purpose => (
                        <span key={purpose} className="px-2 py-1 bg-gray-50 text-gray-700 text-xs rounded-lg font-medium">
                          {purpose}
                        </span>
                      ))}
                    </div>
                    <div className="flex justify-between items-center mb-3">
                      <div>
                        <span className="font-bold text-lg text-gray-900">{product.price}</span>
                        <span className="text-gray-400 line-through ml-2 text-sm">{product.oldPrice}</span>
                      </div>
                    </div>
                    <motion.div whileHover={{ x: 5 }} className="mt-auto w-max">
                      <button 
                        onClick={(e) => {
                          e.preventDefault();
                          // Add to cart logic here
                        }}
                        className="inline-flex items-center px-4 py-2 rounded-lg bg-gray-900 text-white font-medium hover:bg-gray-800 transition"
                      >
                        Add to Cart
                        <span className="ml-2">→</span>
                      </button>
                    </motion.div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>

          {/* No Results */}
          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No products match your current filters.</p>
              <button
                onClick={clearAllFilters}
                className="mt-4 inline-flex items-center px-4 py-2 rounded-lg bg-gray-900 text-white font-medium hover:bg-gray-800 transition"
              >
                Clear Filters
                <span className="ml-2">→</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* NakshatraGyaanBanner */}
      <NakshatraGyaanBanner />
      <SpiritualJourneyBanner />
    </div>
  );
} 