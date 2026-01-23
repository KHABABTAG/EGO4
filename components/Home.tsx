import React from 'react';
import type { View } from '../App';

interface HomeProps {
  onNavigate: (view: View) => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center py-16 hero-gradient rounded-3xl">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-slate-800 mb-6 leading-tight">
            صدى 249: حين يتحدث الإنسان من قلب الحرب
          </h1>
          <p className="text-lg md:text-xl text-slate-600 mb-8 leading-relaxed">
            خلف دخان المعارك وأرقام الضحايا، توجد ملايين القصص الإنسانية التي لم تُروَ. 
            "صدى 249" هو نافذتكم لسماع نبض السودان الحقيقي.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onNavigate('form')}
              className="btn-primary px-8 py-4 rounded-xl text-white font-bold text-lg shadow-lg"
            >
              وثّق قصتك الآن
            </button>
            <button
              onClick={() => onNavigate('archive')}
              className="px-8 py-4 rounded-xl border-2 border-slate-300 text-slate-700 font-bold text-lg hover:bg-slate-50 transition-colors"
            >
              تصفح الأرشيف
            </button>
          </div>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-800 mb-8 text-center">من نحن؟</h2>
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <p className="text-slate-600 leading-relaxed mb-6">
              صدى 249 ليس مجرد موقع إخباري، بل هو "صدى" التجربة الإنسانية السودانية.
            </p>
            <p className="text-slate-600 leading-relaxed mb-6">
              نحن منصة مستقلة وُلدت من رحم المعاناة، نؤمن بأن أقوى سلاح ضد النسيان هو "القصة". 
              اسمنا يجمع بين "الصدى" الذي نسعى لإيصاله للعالم، و "249" مفتاح الاتصال الدولي للسودان، 
              لنؤكد أننا ما زلنا هنا، وما زال صوتنا حياً.
            </p>
            <p className="text-slate-600 leading-relaxed">
              نحن نوثق الحياة وسط الموت، والأمل وسط اليأس، والصمود الاستثنائي لشعب يُصر على البقاء.
            </p>
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-12 bg-sky-50 rounded-3xl">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-800 mb-8 text-center">رسالتنا: أن نُسمِع العالم</h2>
          <p className="text-center text-slate-600 mb-12 text-lg">
            مهمتنا واضحة: كسر جدار الصمت والعزلة المفروضة حول التجربة الإنسانية في السودان.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h3 className="text-xl font-bold text-sky-700 mb-3">التوثيق الإنساني</h3>
              <p className="text-slate-600">تسجيل روايات النزوح، الفقد، الخوف، والشجاعة اليومية.</p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h3 className="text-xl font-bold text-sky-700 mb-3">بناء الجسور</h3>
              <p className="text-slate-600">ترجمة هذه القصص للعالم، لتجاوز حواجز اللغة والثقافة وبناء تعاطف عالمي حقيقي.</p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h3 className="text-xl font-bold text-sky-700 mb-3">أنسنة الأرقام</h3>
              <p className="text-slate-600">تحويل الإحصائيات الباردة إلى وجوه وأحلام ومصائر.</p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h3 className="text-xl font-bold text-sky-700 mb-3">منصة للجميع</h3>
              <p className="text-slate-600">إعطاء الميكروفون للأم في مخيم النزوح، وللطبيب في المستشفى الميداني.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Voices from Within */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-800 mb-8 text-center">أصوات من الداخل: التجربة كما هي</h2>
          
          <p className="text-center text-slate-600 mb-8 text-lg">
            الحرب في السودان ليست مجرد صراع سياسي أو عسكري؛ إنها حدث يغير شكل الروح.
          </p>
          
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <p className="text-slate-600 leading-relaxed mb-6">
              في "صدى 249"، نركز على:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border-l-4 border-sky-500 pl-4">
                <h4 className="font-bold text-slate-800 mb-2">الصمود</h4>
                <p className="text-slate-600 text-sm">كيف يبتكر الناس طرقاً للنجاة، والتعليم، ومساعدة بعضهم البعض.</p>
              </div>
              
              <div className="border-l-4 border-sky-500 pl-4">
                <h4 className="font-bold text-slate-800 mb-2">الأمل</h4>
                <p className="text-slate-600 text-sm">قصص التكافل الاجتماعي والمبادرات الفردية التي تُبقي شعلة الإنسانية متقدة.</p>
              </div>
              
              <div className="border-l-4 border-sky-500 pl-4">
                <h4 className="font-bold text-slate-800 mb-2">الألم والفقدان</h4>
                <p className="text-slate-600 text-sm">الروايات الصادقة عن لحظات الوداع، وتدمير الذكريات، والبحث عن الأمان.</p>
              </div>
              
              <div className="border-l-4 border-sky-500 pl-4">
                <h4 className="font-bold text-slate-800 mb-2">الذاكرة</h4>
                <p className="text-slate-600 text-sm">كيف يحاول السودانيون الحفاظ على هويتهم وتاريخهم وثقافتهم من الضياع.</p>
              </div>
            </div>
            
            <div className="mt-8 p-6 bg-slate-100 rounded-xl">
              <div className="quote-mark">"</div>
              <p className="text-slate-700 text-lg font-medium italic leading-relaxed">
                نحن نؤمن بأن كل قصة نرويها هي خطوة نحو إنهاء اللامبالاة الدولية.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 bg-gradient-to-r from-sky-600 to-sky-700 rounded-3xl text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">كن الصدى</h2>
          <p className="text-sky-100 mb-8 text-lg">
            العالم يحتاج أن يسمع، وأنت يمكنك المساعدة في إيصال هذا الصوت.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <h3 className="text-xl font-bold mb-3">انشر الخبر</h3>
              <p className="text-sky-100 mb-4">شارك هذه المنصة مع العالم لإيصال الصوت.</p>
              <button className="bg-white text-sky-700 px-6 py-2 rounded-lg font-bold hover:bg-sky-50 transition-colors">
                مشاركة
              </button>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <h3 className="text-xl font-bold mb-3">وثق قصتك</h3>
              <p className="text-sky-100 mb-4">قصتك هي جزء من التاريخ. لا تدعها تتلاشى في النسيان.</p>
              <button
                onClick={() => onNavigate('form')}
                className="bg-white text-sky-700 px-6 py-2 rounded-lg font-bold hover:bg-sky-50 transition-colors"
              >
                ابدأ الآن
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
