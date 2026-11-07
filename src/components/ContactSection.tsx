import React, { useState } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

interface ContactSectionProps {
  defaultPropertyInterest?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  defaultPropertyInterest = '',
}) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    interestedIn: defaultPropertyInterest || 'The Azure Villa',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <section id="contact" className="bg-[#fcfbf9] py-16 lg:py-20 border-t border-stone-200/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-stone-200/70">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Left Column: Vertical Image (cols 1-3 or 1-4) */}
            <div className="lg:col-span-3 relative min-h-[260px] lg:min-h-full">
              <img
                src="/frames/frame_0062.webp"
                alt="Luxury Oceanfront Villa Terrace"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent lg:hidden" />
            </div>

            {/* Right Column: Contact Form (cols 4-12) */}
            <div className="lg:col-span-9 p-6 sm:p-10 lg:p-12">
              <span className="text-[11px] font-semibold tracking-[0.22em] text-stone-400 uppercase block mb-2">
                GET IN TOUCH
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-normal text-stone-900 leading-tight mb-2">
                Let&apos;s Find Your Perfect Property
              </h2>
              <p className="text-stone-500 text-sm leading-relaxed mb-8 max-w-xl">
                Have questions or need assistance? Our team is here to help you find the right property.
              </p>

              {submitted ? (
                <div className="bg-stone-50 border border-[#be9870]/40 rounded-xl p-8 text-center animate-in fade-in duration-300">
                  <div className="w-12 h-12 rounded-full bg-[#be9870]/20 text-[#be9870] flex items-center justify-center mx-auto mb-3">
                    <CheckCircle2 className="w-6 h-6 text-[#be9870]" />
                  </div>
                  <h3 className="font-serif text-2xl text-stone-900 mb-2">
                    Enquiry Received
                  </h3>
                  <p className="text-sm text-stone-600 max-w-md mx-auto mb-6">
                    Thank you, <strong className="text-stone-900">{formData.fullName}</strong>. A dedicated private client advisor will reach out to you within 24 hours.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        fullName: '',
                        email: '',
                        phone: '',
                        interestedIn: 'The Azure Villa',
                        message: '',
                      });
                    }}
                    className="text-xs uppercase tracking-wider text-stone-700 underline font-semibold hover:text-stone-900"
                  >
                    Send another inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                  {/* Row 1: Full Name & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    <div>
                      <label
                        htmlFor="fullName"
                        className="block text-[11.5px] font-medium text-stone-600 mb-1"
                      >
                        Full Name <span className="text-stone-400">*</span>
                      </label>
                      <input
                        id="fullName"
                        name="fullName"
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="Your name"
                        className="w-full bg-[#f4f4f4] hover:bg-[#ededed] focus:bg-white border border-stone-200/90 focus:border-[#be9870] rounded-lg px-3.5 py-2.5 text-xs sm:text-sm text-stone-800 placeholder-stone-400 outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-[11.5px] font-medium text-stone-600 mb-1"
                      >
                        Email Address <span className="text-stone-400">*</span>
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        className="w-full bg-[#f4f4f4] hover:bg-[#ededed] focus:bg-white border border-stone-200/90 focus:border-[#be9870] rounded-lg px-3.5 py-2.5 text-xs sm:text-sm text-stone-800 placeholder-stone-400 outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* Row 2: Phone Number & Interested In */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-[11.5px] font-medium text-stone-600 mb-1"
                      >
                        Phone Number <span className="text-stone-400">*</span>
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 98765 43210"
                        className="w-full bg-[#f4f4f4] hover:bg-[#ededed] focus:bg-white border border-stone-200/90 focus:border-[#be9870] rounded-lg px-3.5 py-2.5 text-xs sm:text-sm text-stone-800 placeholder-stone-400 outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="interestedIn"
                        className="block text-[11.5px] font-medium text-stone-600 mb-1"
                      >
                        Interested In
                      </label>
                      <select
                        id="interestedIn"
                        name="interestedIn"
                        value={formData.interestedIn}
                        onChange={handleChange}
                        className="w-full bg-[#f4f4f4] hover:bg-[#ededed] focus:bg-white border border-stone-200/90 focus:border-[#be9870] rounded-lg px-3.5 py-2.5 text-xs sm:text-sm text-stone-800 outline-none transition-all cursor-pointer"
                      >
                        <option value="Select property type">Select property type</option>
                        <option value="The Azure Villa (Malibu, CA)">The Azure Villa (Malibu, CA)</option>
                        <option value="The Ridge Estate (Los Angeles, CA)">The Ridge Estate (Los Angeles, CA)</option>
                        <option value="Skyline Penthouse (Dubai, UAE)">Skyline Penthouse (Dubai, UAE)</option>
                        <option value="The Palm Residence (Goa, India)">The Palm Residence (Goa, India)</option>
                        <option value="General Luxury Portfolio Inquiry">General Luxury Portfolio Inquiry</option>
                      </select>
                    </div>
                  </div>

                  {/* Row 3: Message */}
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-[11.5px] font-medium text-stone-600 mb-1"
                    >
                      Message <span className="text-stone-400">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={3}
                      required
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us what you're looking for..."
                      className="w-full bg-[#f4f4f4] hover:bg-[#ededed] focus:bg-white border border-stone-200/90 focus:border-[#be9870] rounded-lg px-3.5 py-2.5 text-xs sm:text-sm text-stone-800 placeholder-stone-400 outline-none transition-all resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-end pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto bg-[#be9870] hover:bg-[#ad845b] text-[#1c1917] font-medium text-sm px-8 py-3 rounded-lg inline-flex items-center justify-center space-x-2 transition-all shadow-md hover:shadow-lg active:scale-95 cursor-pointer disabled:opacity-60"
                    >
                      <span>{isSubmitting ? 'Sending...' : 'Send Enquiry'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
