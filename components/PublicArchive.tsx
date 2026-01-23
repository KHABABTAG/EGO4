import React, { useState, useMemo } from 'react';
import type { Testimony } from '../types';

interface PublicArchiveProps {
  testimonies: Testimony[];
}

type ViewMode = 'grid' | 'table';

const PublicArchive: React.FC<PublicArchiveProps> = ({ testimonies }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');

  // Get unique locations
  const locations = useMemo(() => {
    const uniqueLocations = new Set(testimonies.map(t => t.location));
    return Array.from(uniqueLocations).sort();
  }, [testimonies]);

  // Filter testimonies
  const filteredTestimonies = useMemo(() => {
    return testimonies.filter(testimony => {
      const matchesSearch = 
        testimony.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        testimony.event.toLowerCase().includes(searchTerm.toLowerCase()) ||
        testimony.writtenText.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesLocation = !locationFilter || testimony.location === locationFilter;
      
      return matchesSearch && matchesLocation;
    });
  }, [testimonies, searchTerm, locationFilter]);

  return (
    <div>
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-slate-800 mb-4">الأرشيف العام</h2>
        <p className="text-slate-600">تجارب مجهولة من السودان.</p>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-xl p-6 shadow-lg mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <input
              type="text"
              placeholder="ابحث..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>

          {/* Location Filter */}
          <select
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
            className="px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500"
          >
            <option value="">كل المواقع</option>
            {locations.map(location => (
              <option key={location} value={location}>{location}</option>
            ))}
          </select>

          {/* View Mode */}
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-4 py-3 rounded-lg font-medium transition-colors ${
                viewMode === 'grid'
                  ? 'bg-sky-100 text-sky-700'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              عرض الشبكة
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`px-4 py-3 rounded-lg font-medium transition-colors ${
                viewMode === 'table'
                  ? 'bg-sky-100 text-sky-700'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              عرض الجدول
            </button>
          </div>
        </div>
      </div>

      {/* Results count */}
      <p className="text-slate-600 mb-4">
        {filteredTestimonies.length} قصة{filteredTestimonies.length !== 1 ? 'ص' : ''} موجودة
      </p>

      {/* Grid View */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTestimonies.map(testimony => (
            <div key={testimony.id} className="bg-white rounded-xl p-6 shadow-lg card-hover">
              {testimony.imageUrl && (
                <img
                  src={testimony.imageUrl}
                  alt={testimony.title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
              )}
              <h3 className="text-xl font-bold text-slate-800 mb-2">{testimony.title || 'بدون عنوان'}</h3>
              <p className="text-slate-600 mb-4 line-clamp-3">{testimony.writtenText}</p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-500">الحدث:</span>
                  <span className="text-slate-700 font-medium">{testimony.event}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">الموقع:</span>
                  <span className="text-slate-700 font-medium">{testimony.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">التاريخ:</span>
                  <span className="text-slate-700 font-medium">
                    {new Date(testimony.date).toLocaleDateString('ar-SA')}
                  </span>
                </div>
              </div>
              {testimony.audioUrl && (
                <audio controls className="w-full mt-4">
                  <source src={testimony.audioUrl} type="audio/mpeg" />
                  متصفحك لا يدعم تشغيل الصوت.
                </audio>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Table View */}
      {viewMode === 'table' && (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-4 text-right text-slate-700 font-bold">التاريخ</th>
                  <th className="px-6 py-4 text-right text-slate-700 font-bold">العنوان</th>
                  <th className="px-6 py-4 text-right text-slate-700 font-bold">الموقع</th>
                  <th className="px-6 py-4 text-right text-slate-700 font-bold">الحدث</th>
                  <th className="px-6 py-4 text-right text-slate-700 font-bold">الناشر</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredTestimonies.map(testimony => (
                  <tr key={testimony.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 text-slate-600">
                      {new Date(testimony.date).toLocaleDateString('ar-SA')}
                    </td>
                    <td className="px-6 py-4 text-slate-800 font-medium">
                      {testimony.title || 'بدون عنوان'}
                    </td>
                    <td className="px-6 py-4 text-slate-600">{testimony.location}</td>
                    <td className="px-6 py-4 text-slate-600">{testimony.event}</td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600">
                        {testimony.author}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* No results */}
      {filteredTestimonies.length === 0 && (
        <div className="text-center py-16">
          <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">لم يتم العثور على قصص</h3>
          <p className="text-slate-600">حاول تغيير معايير البحث أو تصفح كل القصص.</p>
        </div>
      )}
    </div>
  );
};

export default PublicArchive;
