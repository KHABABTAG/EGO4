import React, { useState } from 'react';
import type { Testimony } from '../types';

interface AdminDashboardProps {
  testimonies: Testimony[];
  onUpdateStatus: (id: number, status: Testimony['status']) => void;
  onDelete: (id: number) => void;
}

type StatusFilter = 'all' | 'approved' | 'pending' | 'rejected';

const AdminDashboard: React.FC<AdminDashboardProps> = ({ 
  testimonies, 
  onUpdateStatus, 
  onDelete 
}) => {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [selectedTestimony, setSelectedTestimony] = useState<Testimony | null>(null);

  const filteredTestimonies = testimonies.filter(testimony => {
    if (statusFilter === 'all') return true;
    return testimony.status === statusFilter;
  });

  const stats = {
    total: testimonies.length,
    pending: testimonies.filter(t => t.status === 'pending').length,
    approved: testimonies.filter(t => t.status === 'approved').length,
    rejected: testimonies.filter(t => t.status === 'rejected').length,
  };

  const handleDelete = (id: number) => {
    if (window.confirm('هل أنت متأكد من الحذف؟')) {
      onDelete(id);
    }
  };

  const getStatusClass = (status: Testimony['status']) => {
    switch (status) {
      case 'approved': return 'status-approved';
      case 'pending': return 'status-pending';
      case 'rejected': return 'status-rejected';
      default: return '';
    }
  };

  const getStatusText = (status: Testimony['status']) => {
    switch (status) {
      case 'approved': return 'مقبول';
      case 'pending': return 'قيد المراجعة';
      case 'rejected': return 'مرفوض';
      default: return '';
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-800 mb-2">لوحة الإشراف</h2>
        <p className="text-slate-600">إدارة شهادات المستخدمين</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-lg text-center">
          <p className="text-3xl font-bold text-slate-800">{stats.total}</p>
          <p className="text-slate-600">إجمالي القصص</p>
        </div>
        <div className="bg-yellow-50 rounded-xl p-6 shadow-lg text-center">
          <p className="text-3xl font-bold text-yellow-700">{stats.pending}</p>
          <p className="text-yellow-600">قيد المراجعة</p>
        </div>
        <div className="bg-green-50 rounded-xl p-6 shadow-lg text-center">
          <p className="text-3xl font-bold text-green-700">{stats.approved}</p>
          <p className="text-green-600">منشور</p>
        </div>
        <div className="bg-red-50 rounded-xl p-6 shadow-lg text-center">
          <p className="text-3xl font-bold text-red-700">{stats.rejected}</p>
          <p className="text-red-600">مرفوض</p>
        </div>
      </div>

      {/* Filter */}
      <div className="bg-white rounded-xl p-4 shadow-lg mb-6">
        <div className="flex gap-2 flex-wrap">
          {(['all', 'pending', 'approved', 'rejected'] as StatusFilter[]).map(filter => (
            <button
              key={filter}
              onClick={() => setStatusFilter(filter)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                statusFilter === filter
                  ? 'bg-sky-100 text-sky-700'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {filter === 'all' && 'الكل'}
              {filter === 'pending' && 'قيد المراجعة'}
              {filter === 'approved' && 'مقبول'}
              {filter === 'rejected' && 'مرفوض'}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-4 text-right text-slate-700 font-bold">التاريخ</th>
                <th className="px-6 py-4 text-right text-slate-700 font-bold">العنوان</th>
                <th className="px-6 py-4 text-right text-slate-700 font-bold">الموقع</th>
                <th className="px-6 py-4 text-right text-slate-700 font-bold">الحدث</th>
                <th className="px-6 py-4 text-right text-slate-700 font-bold">الحالة</th>
                <th className="px-6 py-4 text-right text-slate-700 font-bold">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredTestimonies.map(testimony => (
                <tr key={testimony.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 text-slate-600">
                    {new Date(testimony.date).toLocaleDateString('ar-SA')}
                  </td>
                  <td className="px-6 py-4 text-slate-800 font-medium max-w-xs truncate">
                    {testimony.title || 'بدون عنوان'}
                  </td>
                  <td className="px-6 py-4 text-slate-600">{testimony.location}</td>
                  <td className="px-6 py-4 text-slate-600 max-w-xs truncate">{testimony.event}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusClass(testimony.status)}`}>
                      {getStatusText(testimony.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => setSelectedTestimony(testimony)}
                        className="text-sky-600 hover:text-sky-700 font-medium text-sm"
                      >
                        عرض
                      </button>
                      {testimony.status === 'pending' && (
                        <>
                          <button
                            onClick={() => onUpdateStatus(testimony.id, 'approved')}
                            className="text-green-600 hover:text-green-700 font-medium text-sm"
                          >
                            موافقة
                          </button>
                          <button
                            onClick={() => onUpdateStatus(testimony.id, 'rejected')}
                            className="text-red-600 hover:text-red-700 font-medium text-sm"
                          >
                            رفض
                          </button>
                        </>
                      )}
                      <button
                        onClick={() => handleDelete(testimony.id)}
                        className="text-red-600 hover:text-red-700 font-medium text-sm"
                      >
                        حذف
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* No results */}
      {filteredTestimonies.length === 0 && (
        <div className="text-center py-16">
          <p className="text-slate-600">لا توجد شهادات بهذه الحالة.</p>
        </div>
      )}

      {/* Detail Modal */}
      {selectedTestimony && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-2xl font-bold text-slate-800">
                  {selectedTestimony.title || 'بدون عنوان'}
                </h3>
                <button
                  onClick={() => setSelectedTestimony(null)}
                  className="text-slate-400 hover:text-slate-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <span className="text-slate-500 font-medium">الحدث:</span>
                  <span className="text-slate-800 mr-2">{selectedTestimony.event}</span>
                </div>
                <div>
                  <span className="text-slate-500 font-medium">الموقع:</span>
                  <span className="text-slate-800 mr-2">{selectedTestimony.location}</span>
                </div>
                <div>
                  <span className="text-slate-500 font-medium">التاريخ:</span>
                  <span className="text-slate-800 mr-2">
                    {new Date(selectedTestimony.date).toLocaleDateString('ar-SA')}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 font-medium">الناشر:</span>
                  <span className="text-slate-800 mr-2">{selectedTestimony.author}</span>
                </div>
                <div>
                  <span className="text-slate-500 font-medium">الحالة:</span>
                  <span className={`mr-2 px-3 py-1 rounded-full text-xs font-medium ${getStatusClass(selectedTestimony.status)}`}>
                    {getStatusText(selectedTestimony.status)}
                  </span>
                </div>

                <div className="border-t pt-4">
                  <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">
                    {selectedTestimony.writtenText}
                  </p>
                </div>

                {selectedTestimony.audioUrl && (
                  <div className="border-t pt-4">
                    <p className="text-slate-500 font-medium mb-2">تسجيل صوتي:</p>
                    <audio controls className="w-full">
                      <source src={selectedTestimony.audioUrl} type="audio/mpeg" />
                    </audio>
                  </div>
                )}

                {selectedTestimony.imageUrl && (
                  <div className="border-t pt-4">
                    <p className="text-slate-500 font-medium mb-2">صورة:</p>
                    <img
                      src={selectedTestimony.imageUrl}
                      alt={selectedTestimony.title}
                      className="w-full rounded-lg"
                    />
                  </div>
                )}
              </div>

              <div className="flex gap-2 mt-6 pt-6 border-t">
                {selectedTestimony.status === 'pending' && (
                  <>
                    <button
                      onClick={() => {
                        onUpdateStatus(selectedTestimony.id, 'approved');
                        setSelectedTestimony(null);
                      }}
                      className="flex-1 bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition-colors"
                    >
                      موافقة
                    </button>
                    <button
                      onClick={() => {
                        onUpdateStatus(selectedTestimony.id, 'rejected');
                        setSelectedTestimony(null);
                      }}
                      className="flex-1 bg-red-600 text-white py-3 rounded-lg font-bold hover:bg-red-700 transition-colors"
                    >
                      رفض
                    </button>
                  </>
                )}
                <button
                  onClick={() => setSelectedTestimony(null)}
                  className="flex-1 bg-slate-200 text-slate-700 py-3 rounded-lg font-bold hover:bg-slate-300 transition-colors"
                >
                  إغلاق
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
