import React, { useState } from 'react';

// ... (نفس الستايلات اللي فوق)

const AtharFinalSystem = () => {
  const [activePage, setActivePage] = useState('home');
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [showExitMenu, setShowExitMenu] = useState(false); // حالة القائمة المنبثقة للزرار

  const ADMIN_PIN = "1234";

  const handleLogout = () => {
    setIsAdmin(false);
    setShowExitMenu(false);
    alert("تم تسجيل الخروج بنجاح");
  };

  return (
    <div className="min-h-screen dark-mode" dir="rtl">
      {/* القائمة العلوية */}
      <nav className="flex justify-between items-center px-10 py-6 border-b border-white/5 sticky top-0 z-50 bg-[#0A0A0A]">
        <div className="flex gap-10 items-center">
          <div className="text-[#8BA421] font-black text-2xl">ATHAR |</div>
          <div className="flex gap-6">
            <button onClick={() => setActivePage('home')} className={`font-bold ${activePage === 'home' ? 'text-[#8BA421]' : 'text-gray-400'}`}>الرئيسية</button>
            <button onClick={() => setActivePage('stories')} className={`font-bold ${activePage === 'stories' ? 'text-[#8BA421]' : 'text-gray-400'}`}>الأدعية والقصص</button>
          </div>
        </div>
        
        {/* زر M للدخول كأدمن */}
        {!isAdmin && (
          <button onClick={() => setShowLoginModal(true)} className="w-12 h-12 bg-[#8BA421] rounded-2xl font-black text-black flex items-center justify-center">M</button>
        )}
      </nav>

      <main className="max-w-7xl mx-auto p-6 mt-4">
        {activePage === 'home' && (
          <div className="space-y-8">
            {/* الجزء العلوي (الاسم والصورة) */}
            <div className="bg-[#161616] rounded-[3.5rem] p-10 border border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
               <div className="flex-1">
                  <h1 className="text-4xl font-bold mb-4">الشيخ / محمد علي محمد سعيد</h1>
                  <p className="text-xl text-[#8BA421] font-bold">اللهم ارحمه واغفر له</p>
               </div>
               <div className="w-40 h-40 bg-white/5 rounded-[2.5rem] border border-white/5"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
              {/* صندوق كتابة الذكرى */}
              <div className="md:col-span-7 bg-[#161616] p-10 rounded-[3.5rem] border border-white/5 min-h-[400px] flex flex-col">
                <textarea className="bg-transparent border-none text-2xl font-bold flex-1 outline-none text-white resize-none" placeholder="اكتب دعاءً طيباً..."/>
                <button className="w-full bg-[#4A5D4E] text-white py-5 rounded-[2.2rem] font-bold mt-4">إرسال</button>
              </div>

              {/* الزرار اللي كان مش شغال - "بِسمِ اللَّهِ" */}
              <div className="md:col-span-5 relative">
                <button 
                  onClick={() => setShowExitMenu(!showExitMenu)}
                  className="w-full h-full bg-[#161616] p-12 rounded-[3.5rem] border border-white/5 text-center flex flex-col items-center justify-center text-white hover:bg-white/5 transition-all cursor-pointer"
                >
                    <h2 className="text-3xl font-bold mb-4">بِسمِ اللَّهِ</h2>
                    <p className="opacity-40 font-bold">أهلاً بكم في موقع تخليد الذكرى</p>
                    <span className="text-[10px] mt-4 text-[#8BA421]">انقر للمزيد</span>
                </button>

                {/* قائمة تسجيل الخروج (تظهر لما تدوس على بسم الله) */}
                {showExitMenu && isAdmin && (
                  <div className="absolute top-full left-0 right-0 mt-4 bg-[#161616] border border-white/10 rounded-3xl p-4 z-50 shadow-2xl animate-fade-in">
                    <button 
                      onClick={handleLogout}
                      className="w-full bg-red-500/10 text-red-500 py-4 rounded-2xl font-bold hover:bg-red-500 hover:text-white transition-all"
                    >
                      تسجيل الخروج من الإدارة
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* مودال تسجيل الدخول */}
      {showLoginModal && (
        <div className="modal-overlay">
          <div className="modal-content text-center">
            <h2 className="text-xl font-bold mb-6">دخول الإدارة</h2>
            <input type="password" placeholder="أدخل الرمز السري" className="input-style" value={pinInput} onChange={(e) => setPinInput(e.target.value)} />
            <button onClick={() => { if(pinInput === ADMIN_PIN) { setIsAdmin(true); setShowLoginModal(false); } else { alert("خطأ"); } }} className="w-full bg-[#8BA421] text-black py-4 rounded-xl font-bold">دخول</button>
            <button onClick={() => setShowLoginModal(false)} className="mt-4 text-white/40">إلغاء</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AtharFinalSystem;