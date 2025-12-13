import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Hero } from './components/home/Hero';
import { TrendingSection } from './components/home/TrendingSection';
import { AIInsight } from './components/home/AIInsight';
import { ShopStrip } from './components/home/ShopStrip';
import { Footer } from './components/layout/Footer';
import { CyberBackground } from './components/layout/CyberBackground';
import ScrollToTop from './components/utils/ScrollToTop';

// Pages
import { TrackPage } from './pages/TrackPage';
import { PlayerProfile } from './pages/PlayerProfile';
import { PlayerAnalysis } from './pages/PlayerAnalysis';
import { BlogPage } from './pages/BlogPage';
import { BlogPostPage } from './pages/BlogPostPage';
import { ShopPage } from './pages/ShopPage';
import { ServicesPage } from './pages/ServicesPage';
import { ProPage } from './pages/ProPage';
import { ToolsPage } from './pages/ToolsPage'; // Import ToolsPage
import { CheckoutPage } from './pages/checkout/CheckoutPage';
import { DeveloperPage } from './pages/developer/DeveloperPage';

// Auth
import { LoginPage } from './pages/auth/LoginPage';
import { SignupPage } from './pages/auth/SignupPage';

// Legal & Support
import { PrivacyPolicy } from './pages/legal/PrivacyPolicy';
import { TermsOfService } from './pages/legal/TermsOfService';
import { ContactPage } from './pages/support/ContactPage';
import { HelpCenter } from './pages/support/HelpCenter';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-brand-dark text-white font-sans selection:bg-brand-gold selection:text-brand-dark flex flex-col relative">
        <CyberBackground />
        <Navbar />
        
        <main className="flex-grow relative z-10">
          <Routes>
            <Route path="/" element={
              <>
                <Hero />
                <TrendingSection />
                <AIInsight />
                <ShopStrip />
              </>
            } />
            <Route path="/track" element={<TrackPage />} />
            <Route path="/track/:game/:player" element={<PlayerProfile />} />
            <Route path="/track/:game/:player/analysis" element={<PlayerAnalysis />} />
            
            {/* Blog Routes */}
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogPostPage />} />
            
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/pro" element={<ProPage />} />
            <Route path="/tools" element={<ToolsPage />} /> {/* Add Route */}
            
            {/* New Functional Routes */}
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/developer" element={<DeveloperPage />} />
            
            {/* Auth Routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            
            {/* Legal & Support Routes */}
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/help" element={<HelpCenter />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
