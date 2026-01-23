import React, { useState, useRef } from 'react';
import type { Testimony } from '../types';

interface SubmissionFormProps {
  onAdd: (testimony: Omit<Testimony, 'id' | 'status'>) => void;
}

const SubmissionForm: React.FC<SubmissionFormProps> = ({ onAdd }) => {
  const [formData, setFormData] = useState({
    title: '',
    event: '',
    date: '',
    location: '',
    writtenText: '',
    author: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [consent, setConsent] = useState(false);
  const [isAnonymous, setIsAnonymous] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent) {
      alert('يرجى الموافقة على المراجعة والنشر');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    onAdd({
      ...formData,
      author: isAnonymous ? 'Anonymous' : formData.author || 'Anonymous',
    });
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        title: '',
        event: '',
        date: '',
        location: '',
        writtenText: '',
        author: '',
      });
      setConsent(false);
      setIsAnonymous(false);
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto text-center py-16">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-3xl font-bold text-slate-800 mb-4">تم الإرسال بنجاح</h2>
        <p className="text-slate-600 text-lg">
          تم الإرسال بأمان لفريقنا. شكراً لمشاركتك.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-slate-800 mb-4">وثّق تجربتك</h2>
        <p className="text-slate-600">جميع الشهادات مشفرة وتُرسل بأمان.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-lg space-y-6">
        {/* Title */}
        <div>
          <label className="block text-slate-700 font-bold mb-2">
            ١. العنوان (اختياري)
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500"
            placeholder="أدخل عنواناً لشهادتك"
          />
        </div>

        {/* Event */}
        <div>
          <label className="block text-slate-700 font-bold mb-2">
            ٢. الحدث المحدد <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="event"
            value={formData.event}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500"
            placeholder="مثال: معركة أم درمان، حصار الفاشر..."
          />
        </div>

        {/* Date */}
        <div>
          <label className="block text-slate-700 font-bold mb-2">
            ٣. التاريخ <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>

        {/* Location */}
        <div>
          <label className="block text-slate-700 font-bold mb-2">
            ٤. الموقع <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500"
            placeholder="مثال: الخرطوم، أم درمان، الفاشر..."
          />
        </div>

        {/* Written Testimony */}
        <div>
          <label className="block text-slate-700 font-bold mb-2">
            ٥. شهادتك المكتوبة <span className="text-red-500">*</span>
          </label>
          <textarea
            name="writtenText"
            value={formData.writtenText}
            onChange={handleChange}
            required
            rows={6}
            className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500 resize-none"
            placeholder="اكتب شهادتك بالتفصيل..."
          />
        </div>

        {/* Author */}
        {!isAnonymous && (
          <div>
            <label className="block text-slate-700 font-bold mb-2">
              اسمك (اختياري)
            </label>
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500"
              placeholder="أدخل اسمك أو لقبك"
            />
          </div>
        )}

        {/* Anonymous Checkbox */}
        <div className="flex items-center">
          <input
            type="checkbox"
            id="anonymous"
            checked={isAnonymous}
            onChange={(e) => setIsAnonymous(e.target.checked)}
            className="w-5 h-5 text-sky-600 rounded focus:ring-sky-500"
          />
          <label htmlFor="anonymous" className="mr-3 text-slate-700">
            النشر بهوية مجهولة
          </label>
        </div>

        {/* Consent */}
        <div className="border-t pt-6">
          <div className="flex items-start">
            <input
              type="checkbox"
              id="consent"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="w-5 h-5 text-sky-600 rounded focus:ring-sky-500 mt-1"
              required
            />
            <label htmlFor="consent" className="mr-3 text-slate-700 text-sm">
              أوافق على المراجعة والنشر.
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full btn-primary py-4 rounded-xl text-white font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              جاري الإرسال...
            </span>
          ) : (
            'إرسال الشهادة'
          )}
        </button>
      </form>
    </div>
  );
};

export default SubmissionForm;
