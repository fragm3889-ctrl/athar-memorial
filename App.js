import React, { useState } from 'react';

const FontStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@700&family=Plus+Jakarta+Sans:wght@800&display=swap');
    :root { --font-arabic: 'IBM Plex Sans Arabic', sans-serif; }
    body { font-family: var(--font-arabic); transition: 0.3s; margin: 0; overflow-x: hidden; }
    .dark-mode { background-color: #0A0A0A; color: white; }
    
    .modal-overlay { background: rgba(0,0,0,0.85); backdrop-filter: blur(12px); position: fixed; inset: 0; z-index: 1000; display: flex; align-items: center; justify-content: center; padding: 20px; }
    .modal-content { 
      background: #161616; width: 100%; max-width: 480px; padding: 35px; border-radius: 3.5rem; 
      border: 1px solid rgba(255,255,255,0.05); height: fit-content; color: white; position: relative;
    }
    .close-x { position: absolute; left: 25px; top: 25px; cursor: pointer; opacity: 0.5; }
    .input-style { width: 100%; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); padding: 15px; color: white; outline: none; border-radius: 1rem; margin-bottom: 15px; }
  `}</style>
);

const AtharFinalSystem = () => {
  const [activePage, setActivePage] = useState('home'); 
  const [deceasedName, setDeceasedName] = useState('الشيخ / محمد علي محمد سعيد');
  const [statusText, setStatusText] = useState('اللهم ارحمه واغفر له');
  const [deceasedImage, setDeceasedImage] = useState(null);
  const [welcomeHeader, setWelcomeHeader] = useState('بِسمِ اللَّهِ'); 
  const [headerSize, setHeaderSize] = useState(35);
  const [welcomeSubText, setWelcomeSubText] = useState('أهلاً بكم في موقع تخليد الذكرى'); 
  const [subTextSize, setSubTextSize] = useState(18);
  const [stories, setStories] = useState([]);
  const [messageInput, setMessageInput] = useState('');

  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const [editTarget, setEditTarget] = useState({ show: false, title: '', value: '', field: '', id: null });

  const handleLike = (id) => {
    setStories(stories.map(s => s.id === id ? { ...s, likes: s.likes + 1 } : s));
  };

  const handleDelete = (id) => {
    setStories(stories.filter(s => s.id !== id));
  };

  return (
    <div className="min-h-screen dark-mode" dir="rtl">
      <FontStyles />
      
      <nav className="flex justify-between items-center px-10 py-6 border-b border-white/5 sticky top-0 z-50 bg-inherit">
        <div className="flex gap-10 items-center">
          <div className="text-[#8BA421] font-black text-2xl">ATHAR |</div>
          <div className="flex gap-6">
            <button onClick={() => setActivePage('home')} className={`font-bold ${activePage === 'home' ? 'text-[#8BA421]' : 'text-gray-500'}`}>الرئيسية</button>
            <button onClick={() => setActivePage('stories')} className={`font-bold ${activePage === 'stories' ? 'text-[#8BA421]' : 'text-gray-500'}`}>الأدعية والقصص</button>
          </div>
        </div>
        <button onClick={() => setActivePage('admin')} className="w-12 h-12 rounded-2xl bg-[#8BA421] text-black font-black flex items-center justify-center shadow-lg shadow-[#8BA421]/20">M</button>
      </nav>

      <main className="max-w-7xl mx-auto p-6 mt-4">
        {activePage === 'home' && (
          <div className="space-y-8">
            <div className="bg-[#161616] rounded-[3.5rem] p-10 border border-white/5 flex justify-between items-center text-white">
               <div className="flex-1 space-y-4">
                  <div className="flex items-center gap-4">
                    <h1 className="text-4xl font-bold">{deceasedName}</h1>
                    <button onClick={() => setEditTarget({show: true, title: 'تعديل الاسم', value: deceasedName, field: 'name'})} className="w-10 h-10 bg-[#4A5D4E] rounded-xl text-white">✎</button>
                  </div>
                  <div className="flex items-center gap-4">
                    <p className="text-xl text-[#8BA421] font-bold">{statusText}</p>
                    <button onClick={() => setEditTarget({show: true, title: 'تعديل الدعاء', value: statusText, field: 'status'})} className="w-8 h-8 bg-[#4A5D4E]/30 rounded-lg text-[#8BA421] text-[10px]">✎</button>
                  </div>
               </div>
               <div className="w-40 h-40 bg-white/5 rounded-[2.5rem] border border-white/5 relative overflow-hidden group">
                  {/* أضفنا alt="profile" هنا عشان Vercel ما يرفض الكود */}
                  {deceasedImage && <img src={deceasedImage} alt="profile" className="w-full h-full object-cover" />}
                  <label className="absolute inset-0 cursor-pointer flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-all">
                    <input type="file" className="hidden" onChange={(e) => {
                      const reader = new FileReader(); reader.onloadend = () => setDeceasedImage(reader.result); reader.readAsDataURL(e.target.files[0]);
                    }} />
                    <span className="text-[10px] font-bold text-white">إضافة صورة</span>
                  </label>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
              <div className="md:col-span-7 bg-[#161616] p-10 rounded-[3.5rem] border border-white/5 flex flex-col justify-between min-h-[450px]">
                <textarea className="bg-transparent border-none text-2xl font-bold h-64 outline-none text-white resize-none" placeholder="اكتب قصتك أو ادعُ بدعائك..." value={messageInput} onChange={(e) => setMessageInput(e.target.value)}/>
                <button onClick={() => { if(messageInput) { setStories([{id: Date.now(), text: messageInput, likes: 0, date: "الآن"}, ...stories]); setMessageInput(''); setActivePage('stories'); } }} className="w-full bg-[#4A5D4E] text-white py-5 rounded-[2.2rem] font-bold shadow-xl">إرسال الآن</button>
              </div>
              <div className="md:col-span-5 bg-[#161616] p-12 rounded-[3.5rem] border border-white/5 text-center flex flex-col items-center justify-center text-white">
                  <h2 style={{ fontSize: `${headerSize}px` }} className="font-bold mb-4">{welcomeHeader}</h2>
                  <p style={{ fontSize: `${subTextSize}px` }} className="opacity-40 font-bold">{welcomeSubText}</p>
                  <button onClick={() => setShowWelcomeModal(true)} className="w-20 h-20 bg-[#4A5D4E] rounded-[2.5rem] text-white text-4xl mt-12 shadow-2xl transition-all active:scale-95">+</button>
              </div>
            </div>
          </div>
        )}

        {activePage === 'stories' && (
          <div className="space-y-8">
            <h2 className="text-4xl font-bold text-[#8BA421]">الأدعية والقصص |</h2>
            {stories.map(s => (
              <div key={s.id} className="bg-[#161616] p-10 rounded-[3.5rem] border border-white/5 text-white relative">
                <p className="text-2xl font-bold mb-8">"{s.text}"</p>
                <div className="flex gap-4 border-t border-white/5 pt-6">
                   <button onClick={() => handleLike(s.id)} className="bg-[#8BA421]/10 px-6 py-2 rounded-full text-[#8BA421] font-bold">❤️ {s.likes}</button>
                   <button onClick={() => handleDelete(s.id)} className="p-3 bg-red-500/10 rounded-full text-red-500">🗑️</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {showWelcomeModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <span className="close-x" onClick={() => setShowWelcomeModal(false)}>✕</span>
            <h2 className="text-[#8BA421] font-bold mb-8">إعدادات الترحيب</h2>
            <div className="space-y-6">
               <div className="flex gap-4">
                  <input className="input-style mb-0" value={welcomeHeader} onChange={(e)=>setWelcomeHeader(e.target.value)} />
                  <div className="flex items-center bg-[#4A5D4E] rounded-xl px-3 gap-2">
                    <button onClick={()=>setHeaderSize(headerSize-2)} className="text-xl">-</button>
                    <span className="font-bold">{headerSize}</span>
                    <button onClick={()=>setHeaderSize(headerSize+2)} className="text-xl">+</button>
                  </div>
               </div>
               <div className="flex gap-4">
                  <input className="input-style mb-0" value={welcomeSubText} onChange={(e)=>setWelcomeSubText(e.target.value)} />
                  <div className="flex items-center bg-[#4A5D4E] rounded-xl px-3 gap-2">
                    <button onClick={()=>setSubTextSize(subTextSize-2)} className="text-xl">-</button>
                    <span className="font-bold">{subTextSize}</span>
                    <button onClick={()=>setSubTextSize(subTextSize+2)} className="text-xl">+</button>
                  </div>
               </div>
            </div>
            <button onClick={() => setShowWelcomeModal(false)} className="w-full bg-[#E8F14F] text-black font-black py-5 rounded-[2.2rem] mt-10 shadow-xl">حفظ التغييرات</button>
          </div>
        </div>
      )}

      {editTarget.show && (
        <div className="modal-overlay">
          <div className="modal-content">
            <span className="close-x" onClick={() => setEditTarget({show: false})}>✕</span>
            <h2 className="text-[#8BA421] font-bold mb-6">{editTarget.title}</h2>
            <textarea className="input-style min-h-[140px]" value={editTarget.value} onChange={(e) => setEditTarget({...editTarget, value: e.target.value})}/>
            <button onClick={() => {
              if(editTarget.field === 'name') setDeceasedName(editTarget.value);
              if(editTarget.field === 'status') setStatusText(editTarget.value);
              setEditTarget({show: false});
            }} className="w-full bg-[#E8F14F] text-black font-black py-4 rounded-[1.5rem]">حفظ</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AtharFinalSystem;