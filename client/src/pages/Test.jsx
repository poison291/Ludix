import React, { useState, useEffect } from "react";
import { ChevronDown, Play, Star, Users, Shield, Zap } from "lucide-react";

const Landing = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    
    // Trigger entrance animation
    setTimeout(() => setIsVisible(true), 300);
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    { icon: <Zap className="w-6 h-6" />, title: "Instant Access", desc: "Play immediately after purchase" },
    { icon: <Shield className="w-6 h-6" />, title: "Secure & Safe", desc: "Guaranteed account safety" },
    { icon: <Users className="w-6 h-6" />, title: "Community", desc: "Join thousands of gamers" }
  ];

  return (
    <div className="min-h-screen bg-gray-900 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-cyan-900/20"></div>
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white/10 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 4 + 1}px`,
              height: `${Math.random() * 4 + 1}px`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${Math.random() * 3 + 2}s`
            }}
          />
        ))}
      </div>

      {/* Navbar */}
      <nav className="relative z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              PlayPort
            </div>
            <div className="hidden md:flex space-x-8 text-white/80">
              <a href="#" className="hover:text-purple-400 transition-colors">Games</a>
              <a href="#" className="hover:text-purple-400 transition-colors">Bundles</a>
              <a href="#" className="hover:text-purple-400 transition-colors">Support</a>
            </div>
            <button className="bg-gradient-to-r from-purple-600 to-cyan-600 px-6 py-2 rounded-full text-white font-semibold hover:scale-105 transition-transform">
              Sign In
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-6">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content */}
          <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'}`}>
            <div className="mb-6">
              <span className="inline-flex items-center px-4 py-2 bg-purple-600/20 border border-purple-400/30 rounded-full text-purple-300 text-sm font-medium backdrop-blur-sm">
                <Star className="w-4 h-4 mr-2" />
                Premium Gaming Experience
              </span>
            </div>
            
            <h1 className="text-6xl lg:text-7xl font-black mb-6 leading-tight">
              <span className="bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent">
                Premium
              </span>
              <br />
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                Steam Games
              </span>
              <br />
              <span className="text-white/90 text-4xl lg:text-5xl font-semibold">
                For Everyone
              </span>
            </h1>
            
            <p className="text-xl text-white/70 mb-8 leading-relaxed max-w-lg">
              Unlock affordable access to premium Steam games. Play offline instantly, 
              explore amazing bundles, and enjoy your favorite titles without breaking the bank.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <button className="group bg-gradient-to-r from-purple-600 to-cyan-600 px-8 py-4 rounded-xl text-white font-bold text-lg hover:scale-105 transition-all duration-300 shadow-2xl shadow-purple-500/25">
                <span className="flex items-center justify-center">
                  <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                  Browse Games
                </span>
              </button>
              
              <button className="group bg-white/10 backdrop-blur-sm border border-white/20 px-8 py-4 rounded-xl text-white font-semibold text-lg hover:bg-white/20 transition-all duration-300">
                <span className="flex items-center justify-center">
                  View Bundles
                  <ChevronDown className="w-5 h-5 ml-2 group-hover:translate-y-1 transition-transform" />
                </span>
              </button>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">10K+</div>
                <div className="text-white/60 text-sm">Happy Gamers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">500+</div>
                <div className="text-white/60 text-sm">Premium Games</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">24/7</div>
                <div className="text-white/60 text-sm">Support</div>
              </div>
            </div>
          </div>
          
          {/* Right Content - Game Showcase */}
          <div className={`transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'}`}>
            <div className="relative">
              {/* Main Game Card */}
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl hover:scale-105 transition-all duration-500">
                <div className="aspect-video bg-gradient-to-br from-purple-600/50 to-cyan-600/50 rounded-2xl mb-6 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <Play className="w-16 h-16 text-white/80 relative z-10" />
                  <div className="absolute bottom-4 left-4 text-white font-semibold">Featured Game</div>
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-2">Premium Bundle</h3>
                <p className="text-white/70 mb-4">Access to 10+ AAA titles</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-white">$19.99</span>
                    <span className="text-lg text-white/50 line-through">$199.99</span>
                  </div>
                  <span className="bg-green-500 px-3 py-1 rounded-full text-sm font-semibold text-white">90% OFF</span>
                </div>
              </div>
              
              {/* Floating Feature Cards */}
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="absolute bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20 hover:scale-110 transition-all duration-300"
                  style={{
                    top: `${20 + index * 25}%`,
                    right: index % 2 === 0 ? '-10%' : '-15%',
                    transform: `rotate(${index * 5 - 5}deg)`,
                    animationDelay: `${index * 0.2}s`
                  }}
                >
                  <div className="flex items-center space-x-3">
                    <div className="text-purple-400">{feature.icon}</div>
                    <div>
                      <div className="text-white font-semibold text-sm">{feature.title}</div>
                      <div className="text-white/60 text-xs">{feature.desc}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/50 animate-bounce">
        <ChevronDown className="w-6 h-6" />
      </div>
    </div>
  );
};

export default Landing;