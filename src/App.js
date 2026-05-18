import React, { useState } from 'react';

const FontStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@700&family=Plus+Jakarta+Sans:wght@800&display=swap');
    :root { --font-arabic: 'IBM Plex Sans Arabic', sans-serif; }
    body { font-family: var(--font-arabic); transition: 0.3s; margin: 0; overflow-x: hidden; }
    .dark-mode { background-color: #0A0A0A; color: white; }
    .light-mode { background-color: #F8F9FA; color: #1A1A1A; }
    
    /* النوافذ المقصوصة بعناية */
    .modal-overlay { background: rgba(0,0,0,0.85); backdrop-filter: blur(12px); position: fixed; inset: 0; z-index: 1000; display: flex; align-items: center; justify-content: center; padding: 20px; }
    .modal-content { 
      background: #161616; width: 100%; max-width: 480px; padding: 35px; border-radius: 3.5rem; 
      border: 1px solid rgba(255,255,255,0.05); height: fit-content; color: white; position: relative;
    }
    .close-x { position: absolute; left: 25px; top: 25px; cursor: pointer; opacity: 0.5; }
    .admin-card { background: #1A1A1A; border: 1px solid rgba(255,255,255,0.03); border-radius: 2.5rem; padding: 25px; }
    .input-style { width: 100%; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); padding: 15px; rounded: 1.5rem; color: white; outline: none; border-radius: 1rem; margin-bottom: 15px; }
  `}</style>
);

const AtharFinalProtectedSystem = () => {
  const [activePage, setActivePage] = useState('home'); 
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [currentLang, setCurrentLang] = useState('ar');

  const translations = {
    ar: { navHome: "الرئيسية", navStories: "الأدعية والقصص", admin: "الأدمن", placeholder: "اكتب قصتك أو ادعُ بدعائك...", send: "إرسال الآن", addMember: "إضافة عضو +", invite: "إرسال دعوة", dir: "rtl" },
    en: { navHome: "Home", navStories: "Stories", admin: "Admin", placeholder: "Write your story or prayer...", send: "Send Now", addMember: "Add Member +", invite: "Send Invite", dir: "ltr" }
  };
  const t = translations[currentLang] || translations.ar;

  // States
  const [deceasedName, setDeceasedName] = useState('الشيخ / محمد علي محمد سعيد');
  const [statusText, setStatusText] = useState('اللهم ارحمه واغفر له');
  const [deceasedImage, setDeceasedImage] = useState(null);
  const [stories, setStories] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  
  const [users, setUsers] = useState([
    { id: "1", name: "وسام", email: "wesam@gmail.com", joined: "2026-05-18 | 04:10 AM" },
    { id: "2", name: "أحمد", email: "ahmed@gmail.com", joined: "2026-05-18 | 04:15 AM" }
  ]);

  // Modal States
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [newMember, setNewMember] = useState({ name: '', email: '' });
  const [editTarget, setEditTarget] = useState({ show: false, title: '', value: '', field: '', id: null });

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark-mode' : 'light-mode'}`} dir={t.dir}>
      <FontStyles />
      
      {/* Navbar - منطقة محظورة */}
      <nav className="flex justify-between items-center px-10 py-6 border-b border-white/5 sticky top-0 z-50 bg-inherit">
        <div className="flex gap-10 items-center">
          <div className="text-[#8BA421] font-black text-2xl">ATHAR |</div>
          <div className="flex gap-6">
            <button onClick={() => setActivePage('home')} className={`font-bold ${activePage === 'home' ? 'text-[#8BA421]' : 'text-gray-500'}`}>{t.navHome}</button>
            <button onClick={() => setActivePage('stories')} className={`font-bold ${activePage === 'stories' ? 'text-[#8BA421]' : 'text-gray-500'}`}>{t.navStories}</button>
          </div>
        </div>
        <button onClick={() => setActivePage('admin')} className="w-12 h-12 rounded-2xl bg-[#8BA421] text-black font-black flex items-center justify-center">M</button>
      </nav>

      <main className="max-w-7xl mx-auto p-6 mt-4">
        
        {/* الصفحة الرئيسية - منطقة محظورة */}
        {activePage === 'home' && (
          <div className="space-y-8 animate-in fade-in">
            <div className="bg-[#161616] rounded-[3.5rem] p-10 border border-white/5 flex justify-between items-center">
               <div className="flex-1 space-y-4">
                  <div className="flex items-center gap-4">
                    <h1 className="text-4xl font-bold text-white">{deceasedName}</h1>
                    <button onClick={() => setEditTarget({show: true, title: 'تعديل الاسم', value: deceasedName, field: 'name'})} className="w-10 h-10 bg-[#4A5D4E] rounded-xl text-white">✎</button>
                  </div>
                  <div className="flex items-center gap-4">
                    <p className="text-xl text-[#8BA421] font-bold">{statusText}</p>
                    <button onClick={() => setEditTarget({show: true, title: 'تعديل الدعاء', value: statusText, field: 'status'})} className="w-8 h-8 bg-[#4A5D4E]/30 rounded-lg text-[#8BA421] text-[10px]">✎</button>
                  </div>
               </div>
               <div className="w-40 h-40 bg-white/5 rounded-[2.5rem] border border-white/5 relative overflow-hidden group">
                  {deceasedImage && <img src={deceasedImage} className="w-full h-full object-cover" />}
                  <label className="absolute inset-0 cursor-pointer flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-all">
                    <input type="file" className="hidden" onChange={(e) => {
                      const reader = new FileReader(); reader.onloadend = () => setDeceasedImage(reader.result); reader.readAsDataURL(e.target.files[0]);
                    }} />
                    <span className="text-[10px] font-bold text-white">تعديل الصورة</span>
                  </label>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
              <div className="md:col-span-7 bg-[#161616] p-10 rounded-[3.5rem] border border-white/5 flex flex-col justify-between min-h-[450px]">
                <textarea className="bg-transparent border-none text-2xl font-bold h-64 outline-none text-white resize-none" placeholder={t.placeholder} value={messageInput} onChange={(e) => setMessageInput(e.target.value)}/>
                <button onClick={() => { if(messageInput) { setStories([{id: Date.now(), text: messageInput, likes: 0, date: "الآن"}, ...stories]); setMessageInput(''); setActivePage('stories'); } }} className="w-full bg-[#4A5D4E] text-white py-5 rounded-[2.2rem] font-bold">{t.send}</button>
              </div>
              <div className="md:col-span-5 bg-[#161616] p-12 rounded-[3.5rem] border border-white/5 text-center flex flex-col items-center justify-center">
                  <h2 className="text-4xl font-bold text-white mb-4">بِسمِ اللَّهِ</h2>
                  <p className="opacity-40 font-bold text-white">أهلاً بكم في موقع تخليد الذكرى</p>
                  <button className="w-20 h-20 bg-[#4A5D4E] rounded-[2.5rem] text-white text-4xl mt-12">+</button>
              </div>
            </div>
          </div>
        )}

        {/* صفحة الأدمن - منطقة إضافة الأعضاء */}
        {activePage === 'admin' && (
          <div className="space-y-10 animate-in fade-in">
            <div className="flex justify-between items-center">
               <h2 className="text-4xl font-black text-[#8BA421]">{t.admin}</h2>
               <button onClick={() => setShowAddUserModal(true)} className="bg-[#8BA421] text-black px-8 py-3 rounded-2xl font-bold shadow-xl">{t.addMember}</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[#161616] p-8 rounded-[2.5rem] border border-white/5">
                    <h3 className="text-[#8BA421] font-bold mb-4">اللغة</h3>
                    <select className="w-full bg-black/40 border border-white/10 p-4 rounded-2xl text-white outline-none cursor-pointer" value={currentLang} onChange={(e) => setCurrentLang(e.target.value)}>
                        <option value="ar">العربية</option>
                        <option value="en">English</option>
                    </select>
                </div>
                <div className="bg-[#161616] p-8 rounded-[2.5rem] border border-white/5">
                    <h3 className="text-[#8BA421] font-bold mb-4">المظهر</h3>
                    <button onClick={() => setIsDarkMode(!isDarkMode)} className="w-full bg-[#4A5D4E] text-white p-4 rounded-2xl font-bold">Dark / Light</button>
                </div>
            </div>

            {/* سجل الأعضاء بالتفصيل - منطقة محظورة */}
            <div className="space-y-4">
               <h3 className="text-[#8BA421] font-bold pr-4 border-r-4 border-[#8BA421]">سجل الأعضاء بالتفصيل</h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {users.map(u => (
                    <div key={u.id} className="admin-card flex justify-between items-center text-white">
                       <div>
                          <div className="font-bold text-lg">{u.name}</div>
                          <div className="text-xs opacity-40">{u.email}</div>
                          <div className="text-[10px] opacity-20 mt-2">{u.joined}</div>
                       </div>
                       <button onClick={() => setUsers(users.filter(x => x.id !== u.id))} className="text-red-500 bg-red-500/10 p-2 rounded-full">🗑️</button>
                    </div>
                  ))}
               </div>
            </div>
          </div>
        )}

        {/* الأدعية والقصص - منطقة محظورة */}
        {activePage === 'stories' && (
          <div className="space-y-8 animate-in slide-in-from-bottom">
            <h2 className="text-4xl font-bold text-[#8BA421]">{t.navStories} |</h2>
            {stories.map(s => (
              <div key={s.id} className="bg-[#161616] p-10 rounded-[3.5rem] border border-white/5 text-white relative">
                <p className="text-2xl font-bold mb-8 pr-4 border-r-4 border-[#8BA421]/20">"{s.text}"</p>
                <div className="flex gap-4 border-t border-white/5 pt-6">
                   <button onClick={() => setStories(stories.map(x => x.id === s.id ? {...x, likes: x.likes+1} : x))} className="bg-[#8BA421]/10 px-6 py-2 rounded-full text-[#8BA421] font-bold">❤️ {s.likes}</button>
                   <button onClick={() => setEditTarget({show: true, title: 'تعديل', value: s.text, field: 'story', id: s.id})} className="p-3 bg-white/5 rounded-full text-[#8BA421]">✎</button>
                   <button onClick={() => setStories(stories.filter(x => x.id !== s.id))} className="p-3 bg-red-500/10 rounded-full text-red-500">🗑️</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* نافذة إضافة عضو جديد (بالجيميل ودعوة حقيقية) */}
      {showAddUserModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <span className="close-x" onClick={() => setShowAddUserModal(false)}>✕</span>
            <h2 className="text-[#8BA421] font-bold mb-8">إضافة عضو جديد للجيميل</h2>
            <input className="input-style" placeholder="اسم العضو" value={newMember.name} onChange={(e)=>setNewMember({...newMember, name: e.target.value})} />
            <input className="input-style" placeholder="البريد الإلكتروني (Gmail)" value={newMember.email} onChange={(e)=>setNewMember({...newMember, email: e.target.value})} />
            
            <div className="flex gap-4 mt-6">
                <button onClick={() => {
                   if(newMember.name && newMember.email) {
                      setUsers([...users, { id: Date.now().toString(), name: newMember.name, email: newMember.email, joined: "الآن" }]);
                      setShowAddUserModal(false);
                      setNewMember({name: '', email: ''});
                   }
                }} className="flex-1 bg-[#8BA421] text-black font-bold py-4 rounded-2xl">{t.invite}</button>
                <button onClick={() => { navigator.clipboard.writeText(`دعوة للانضمام لموقع أثر: ${newMember.email}`); alert("تم نسخ رابط الدعوة!"); }} className="flex-1 bg-white/10 text-white font-bold py-4 rounded-2xl">نسخ الرابط</button>
            </div>
          </div>
        </div>
      )}

      {/* نافذة التعديل العامة */}
      {editTarget.show && (
        <div className="modal-overlay">
          <div className="modal-content">
            <span className="close-x" onClick={() => setEditTarget({show: false})}>✕</span>
            <h2 className="text-[#8BA421] font-bold mb-6">{editTarget.title}</h2>
            <textarea className="input-style min-h-[120px]" value={editTarget.value} onChange={(e) => setEditTarget({...editTarget, value: e.target.value})}/>
            <button onClick={() => {
              if(editTarget.field === 'name') setDeceasedName(editTarget.value);
              if(editTarget.field === 'status') setStatusText(editTarget.value);
              if(editTarget.field === 'story') setStories(stories.map(st=>st.id===editTarget.id?{...st, text: editTarget.value}:st));
              setEditTarget({show: false});
            }} className="w-full bg-[#8BA421] text-black font-bold py-4 rounded-2xl">حفظ</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AtharFinalProtectedSystem;