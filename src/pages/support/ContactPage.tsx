import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Mail, MessageSquare, Send } from 'lucide-react';
import { Button } from '../../components/ui/Button';

export const ContactPage = () => {
  const [submitted, setSubmitted] = useState(false);
  const location = useLocation();
  const [subject, setSubject] = useState('General Support');

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const subjectParam = searchParams.get('subject');
    if (subjectParam) {
      setSubject(subjectParam);
    }
  }, [location]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen pt-32 pb-20 bg-brand-dark">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-gray-400">Have a question, partnership proposal, or bug report? We'd love to hear from you.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <div className="bg-brand-surface border border-white/5 rounded-xl p-8 mb-8">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Mail className="text-brand-gold" /> General Inquiries
              </h3>
              <p className="text-gray-400 mb-4">For general questions about the platform, account issues, or feedback.</p>
              <a href="mailto:support@gamersology.com" className="text-brand-gold hover:underline">support@gamersology.com</a>
            </div>

            <div className="bg-brand-surface border border-white/5 rounded-xl p-8">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <MessageSquare className="text-brand-purple-light" /> Business & Ads
              </h3>
              <p className="text-gray-400 mb-4">For advertising opportunities, sponsorships, and affiliate partnerships.</p>
              <a href="mailto:business@gamersology.com" className="text-brand-gold hover:underline">business@gamersology.com</a>
            </div>
          </div>

          <div className="bg-brand-surface/50 backdrop-blur border border-white/10 rounded-xl p-8">
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mb-4">
                  <Send className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                <p className="text-gray-400">Thank you for reaching out. Our team will get back to you within 24 hours.</p>
                <Button className="mt-6" onClick={() => setSubmitted(false)}>Send Another</Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Name</label>
                  <input type="text" required className="w-full bg-brand-darker border border-white/10 rounded-lg px-4 py-3 text-white focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none transition-all" placeholder="Your name" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                  <input type="email" required className="w-full bg-brand-darker border border-white/10 rounded-lg px-4 py-3 text-white focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none transition-all" placeholder="you@example.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Subject</label>
                  <select 
                    className="w-full bg-brand-darker border border-white/10 rounded-lg px-4 py-3 text-white focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none transition-all"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                  >
                    <option value="General Support">General Support</option>
                    <option value="Bug Report">Bug Report</option>
                    <option value="Feature Request">Feature Request</option>
                    <option value="Partnership">Partnership / Sales</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Message</label>
                  <textarea required rows={4} className="w-full bg-brand-darker border border-white/10 rounded-lg px-4 py-3 text-white focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none transition-all" placeholder="How can we help?"></textarea>
                </div>
                <Button type="submit" className="w-full" icon={<Send className="w-4 h-4" />}>Send Message</Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
