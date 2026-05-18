import React, { useState } from 'react';

const AtharSystem = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [pin, setPin] = useState('');

  // بيانات الموقع
  const [name, setName] = useState("الشيخ / محمد علي محمد سعيد");
  const [desc, setDesc] = useState("اللهم ارحمه واغفر له واجعل قبره روضة من رياض الجنة");

  const handleLogin = (type) => {
    if (type === 'admin') {
      if (pin === "1234") { setIsAdmin(true); setIsLoggedIn(true); setShowAdminPanel(false); }
      else { alert("الرمز السري خطأ"); }
    } else {
      setIsLoggedIn(true); setIsAdmin(false);
    }
  };

  // شاشة تسجيل الدخول (أول ما يفتح الموقع)
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center p-6" dir="rtl" style={{fontFamily: 'sans-serif'}}>
        <div className="bg-[#161616] w-full max-w-md p-10 rounded-[3rem] border border-white/5 text-center shadow-2xl">
          <h2 className="text-[#8BA421] text-3xl font-black mb-8 italic">ATHAR | أثر</h2>
          <p className="text-white/60 mb-10">مرحباً بك، اختر طريقة الدخول للمشاركة في الثواب</p>
          
          <div className="space-y-4">
            <button onClick={() => handleLogin('user')} className="w-full bg-white/5 text-white py-5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all font-bold flex items-center justify-center gap-3">
               <img src="https://www.google.com/favicon.ico" className="w-5" alt=""/> الدخول بحساب جوجل
            </button>
            
            <div className="py-4 flex items-center gap-4 opacity-20"><div className="flex-1 h-[1px] bg-white"></div><span>أو</span><div className="flex-1 h-[1px] bg-white"></div></div>

            <button onClick={() => setShowAdminPanel(true)} className="text-[#8BA421] font-bold text-sm underline opacity-70">دخول الإدارة (خاص بالمسؤول)</button>
            
            {showAdminPanel && (
              <div className="mt-4 animate-in fade-in zoom-in duration-300">
                <input type="password" placeholder="أدخل الرمز السري" className="w-full bg-black border border-[#8BA421]/30 p-4 rounded-xl text-white text-center mb-2 outline-none" onChange={(e)=>setPin(e.target.value)} />
                <button onClick={() => handleLogin('admin')} className="w-full bg-[#8BA421] text-black font-bold py-3 rounded-xl">تأكيد الدخول</button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white" dir="rtl">
      {/* الهيدر مع زرار الخروج الشيك */}
      <nav className="flex justify-between items-center px-8 py-6 border-b border-white/5 bg-[#0A0A0A]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="text-[#8BA421] font-black text-2xl">ATHAR</div>
        <button onClick={() => setIsLoggedIn(false)} className="flex items-center gap-2 bg-red-500/10 text-red-500 px-5 py-2 rounded-full border border-red-500/20 hover:bg-red-500 hover:text-white transition-all font-bold text-sm">
          تسجيل الخروج ✕
        </button>
      </nav>

      <main className="max-w-5xl mx-auto p-6 space-y-8">
        <div className="bg-[#161616] p-10 rounded-[3.5rem] border border-white/5 relative group">
          <h1 className="text-4xl font-bold mb-4">{name}</h1>
          <p className="text-[#8BA421] text-xl font-medium">{desc}</p>
          
          {/* زرار الزائد (+) للتعديل - يظهر فقط للأدمن */}
          {isAdmin && (
            <button onClick={() => {
              const newName = prompt("تعديل الاسم:", name);
              const newDesc = prompt("تعديل الدعاء:", desc);
              if(newName) setName(newName);
              if(newDesc) setDesc(newDesc);
            }} className="absolute -bottom-4 -left-4 w-12 h-12 bg-[#8BA421] text-black rounded-2xl flex items-center justify-center text-2xl font-bold shadow-xl hover:scale-110 transition-transform">
              +
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#161616] p-8 rounded-[3rem] border border-white/5 min-h-[300px]">
             <h3 className="text-white/40 mb-4 font-bold">بِسمِ اللَّهِ</h3>
             <textarea className="w-full bg-transparent border-none outline-none text-xl font-bold resize-none h-40" placeholder="اكتب دعاءك هنا..."></textarea>
             <button className="w-full bg-[#4A5D4E] py-4 rounded-2xl font-bold mt-4">إرسال</button>
          </div>
          <div className="bg-[#8BA421] p-8 rounded-[3rem] text-black flex flex-col justify-center items-center text-center">
             <h2 className="text-3xl font-black mb-2">أثر</h2>
             <p className="font-bold opacity-70">تخليداً لذكرى طيبة لا تنقطع</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AtharSystem;