
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Story } from '../types';
import { continueStoryWithAI } from '../services/geminiService';

interface StoryDetailsProps {
  stories: Story[];
  setStories: React.Dispatch<React.SetStateAction<Story[]>>;
}

const StoryDetails: React.FC<StoryDetailsProps> = ({ stories, setStories }) => {
  const { id } = useParams<{ id: string }>();
  const [story, setStory] = useState<Story | null>(null);
  const [isReading, setIsReading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const found = stories.find(s => s.id === id);
    if (found) setStory(found);
  }, [id, stories]);

  if (!story) {
    return (
      <div className="text-center py-32 animate-fade-in">
        <div className="text-6xl mb-6 opacity-30">🔍</div>
        <h2 className="text-2xl font-black text-slate-800 mb-6">Hikoya topilmadi</h2>
        <Link to="/" className="text-blue-600 font-bold hover:underline">Asosiy sahifaga qaytish</Link>
      </div>
    );
  }

  const handleContinueWithAI = async () => {
    setIsGenerating(true);
    setError('');
    try {
      const continuation = await continueStoryWithAI(story.title, story.content);
      const updatedContent = story.content + "\n\n" + continuation;
      
      const updatedStory = { ...story, content: updatedContent };
      setStory(updatedStory);
      
      // Update global state and persist
      setStories(prev => prev.map(s => s.id === id ? updatedStory : s));
      
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (err: any) {
      setError(err.message || "Xatolik yuz berdi.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mb-20 animate-fade-in relative">
      {/* Success Toast */}
      {showToast && (
        <div className="fixed top-24 right-8 bg-green-600 text-white px-6 py-4 rounded-2xl shadow-2xl z-50 animate-fade-in flex items-center gap-3 font-bold">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
          Hikoya muvaffaqiyatli kengaytirildi va saqlandi!
        </div>
      )}

      <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
        {/* Cover Image */}
        <div className="aspect-[21/9] w-full relative">
          <img 
            src={story.imageUrl || `https://picsum.photos/seed/${story.id}/1200/500`} 
            alt={story.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/30 to-transparent flex flex-col justify-end p-8 md:p-12">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-blue-600 text-white text-[10px] px-4 py-2 rounded-xl font-black uppercase tracking-widest shadow-lg shadow-blue-900/20">{story.genre}</span>
              <span className="text-slate-300 text-sm font-bold bg-black/20 backdrop-blur-md px-3 py-1 rounded-lg">{story.createdAt}</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-white leading-tight tracking-tight mb-2">{story.title}</h1>
            <p className="text-blue-300 font-bold text-lg flex items-center gap-2">
              <span className="text-xl">✍️</span> {story.authorName}
            </p>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-8 md:p-16">
          {!isReading ? (
            <div className="text-center py-20 bg-slate-50/50 rounded-3xl border border-slate-100">
              <h3 className="text-3xl font-black text-slate-800 mb-6 tracking-tight">Mutolaaga tayyormisiz?</h3>
              <p className="text-slate-500 mb-10 max-w-sm mx-auto font-medium text-lg leading-relaxed">Ushbu ajoyib asar dunyosiga sho'ng'ish va sarguzashtni boshlash uchun pastdagi tugmani bosing.</p>
              <button 
                onClick={() => setIsReading(true)}
                className="bg-blue-600 text-white px-16 py-6 rounded-2xl font-black text-xl hover:bg-blue-700 shadow-2xl shadow-blue-100 transition-all active:scale-95 group flex items-center gap-3 mx-auto"
              >
                Mutolaani boshlash
                <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7-7 7" /></svg>
              </button>
            </div>
          ) : (
            <div className="animate-fade-in space-y-16">
              <div className="prose prose-xl max-w-none text-slate-700 font-serif leading-[2.1] whitespace-pre-wrap first-letter:text-7xl first-letter:font-black first-letter:mr-4 first-letter:float-left first-letter:text-blue-600 selection:bg-blue-100 text-xl">
                {story.content}
              </div>

              {error && (
                <div className="p-6 bg-red-50 text-red-600 rounded-2xl border border-red-100 font-bold flex items-center gap-3">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  {error}
                </div>
              )}

              {/* AI Continue Block */}
              <div className="p-8 md:p-12 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[2.5rem] border border-blue-100 relative overflow-hidden text-white shadow-2xl shadow-blue-200">
                <div className="relative z-10">
                  <div className="flex flex-col lg:flex-row items-center gap-8">
                    <div className="flex-1 text-center lg:text-left">
                      <div className="flex items-center gap-3 mb-4 justify-center lg:justify-start">
                        <span className="bg-white/20 backdrop-blur-md text-white text-[10px] px-3 py-1 rounded-lg font-black tracking-widest uppercase">AI Imkoniyatlari</span>
                      </div>
                      <h4 className="text-3xl font-black mb-3 tracking-tight">Hikoya qiziq tuyulyaptimi? ✨</h4>
                      <p className="text-blue-100 font-medium leading-relaxed text-lg">Gemini AI yordamida ushbu hikoyani mantiqiy va kutilmagan burilishlar bilan davom ettiring. Har bir yangi qism avtomatik ravishda saqlanadi.</p>
                    </div>
                    <button 
                      onClick={handleContinueWithAI}
                      disabled={isGenerating}
                      className="w-full lg:w-auto bg-white text-blue-600 px-12 py-6 rounded-2xl font-black text-xl hover:bg-blue-50 transition-all disabled:opacity-50 flex items-center justify-center gap-4 active:scale-95 group"
                    >
                      {isGenerating ? (
                        <>
                          <svg className="animate-spin h-6 w-6 text-blue-600" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          AI yozmoqda...
                        </>
                      ) : (
                        <>
                          <span>AI bilan davom ettirish</span>
                          <svg className="w-6 h-6 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                        </>
                      )}
                    </button>
                  </div>
                </div>
                {/* Decorative background circles */}
                <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-blue-400/20 rounded-full blur-3xl"></div>
              </div>
            </div>
          )}

          <div className="mt-20 flex flex-col sm:flex-row justify-between items-center border-t border-slate-100 pt-10 gap-6">
            <Link to="/" className="text-blue-600 font-black hover:underline flex items-center gap-3 text-lg group">
              <svg className="w-6 h-6 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7" /></svg>
              Barcha hikoyalarga qaytish
            </Link>
            <div className="flex gap-4">
              <button 
                title="Ulashish"
                className="w-14 h-14 rounded-full border-2 border-slate-100 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:border-blue-200 transition-all active:scale-90"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92c0-1.61-1.31-2.92-2.92-2.92z"/></svg>
              </button>
              <button 
                onClick={() => window.print()}
                title="Chop etish"
                className="w-14 h-14 rounded-full border-2 border-slate-100 flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:border-indigo-200 transition-all active:scale-90"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryDetails;
