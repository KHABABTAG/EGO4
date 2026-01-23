import React from 'react';
import type { View } from '../App';

interface HeaderProps {
  currentView: View;
  navigateTo: (view: View) => void;
}

const Header: React.FC<HeaderProps> = ({ currentView, navigateTo }) => {
  return (
    <header className="sticky top-0 z-50 glass border-b border-slate-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sky-500 to-sky-700 flex items-center justify-center">
              <span className="text-white font-bold text-lg">ص</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-800">Sada 249</h1>
              <p className="text-xs text-slate-500">صدى 249</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2">
            <button
              onClick={() => navigateTo('home')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                currentView === 'home'
                  ? 'bg-sky-100 text-sky-700'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              الرئيسية
            </button>
            <button
              onClick={() => navigateTo('form')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                currentView === 'form'
                  ? 'bg-sky-100 text-sky-700'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              أرسل شهادتك
            </button>
            <button
              onClick={() => navigateTo('archive')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                currentView === 'archive'
                  ? 'bg-sky-100 text-sky-700'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              الأرشيف
            </button>
            <button
              onClick={() => navigateTo('admin')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                currentView === 'admin'
                  ? 'bg-sky-100 text-sky-700'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              الإدارة
            </button>
          </nav>

          {/* Mobile Menu Button (placeholder for future implementation) */}
          <div className="md:hidden">
            <button className="p-2 rounded-lg text-slate-600 hover:bg-slate-100">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
