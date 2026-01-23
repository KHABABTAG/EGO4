import React from 'react';
import type { View } from '../App';

interface FooterProps {
  navigateTo: (view: View) => void;
}

const Footer: React.FC<FooterProps> = ({ navigateTo }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 py-12 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Sada 249 | صدى 249</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              منصة مستقلة لتوثيق التجارب الإنسانية وشهادات الناجين من الحرب في السودان.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">روابط سريعة</h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => navigateTo('home')}
                  className="text-slate-400 hover:text-white transition-colors text-sm"
                >
                  الرئيسية
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('form')}
                  className="text-slate-400 hover:text-white transition-colors text-sm"
                >
                  أرسل شهادتك
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('archive')}
                  className="text-slate-400 hover:text-white transition-colors text-sm"
                >
                  الأرشيف العام
                </button>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">اتصل بنا</h3>
            <p className="text-slate-400 text-sm mb-4">
              تتم إدارة أرشيف صدى 249 من قبل فريق مستقل من المشرفين.
            </p>
            <button className="text-sky-400 hover:text-sky-300 transition-colors text-sm font-medium">
              اتصل بفريق الإدارة
            </button>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-slate-800 mt-8 pt-8 text-center">
          <p className="text-slate-500 text-sm">
            © 2024 Sada 249. جميع الحقوق محفوظة.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
