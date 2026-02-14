
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Story, Genre } from '../types';

interface HomeProps {
  stories: Story[];
}

const GENRES: Genre[] = ['Barchasi', 'Sarguzasht', 'Fantastika', 'Detektiv', 'Romantika', 'Tarixiy'];

const Home: React.FC<HomeProps> = ({ stories }) => {
  const [selectedGenre, setSelectedGenre] = useState<Genre>('Barchasi');

  const filteredStories = selectedGenre === 'Barchasi' 
    ? stories 
    : stories.filter(s => s.genre === selectedGenre);

  return (
    <div className="space-y-12 animate-fade-in">
      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-[2.5rem] p-8 md:p-16 text-white relative overflow-hidden">
        <div className="relative z-10 max-w-4xl">
          <h1 className="text-3xl font-black mb-2 leading-tight tracking-tight">Leader IT School Story Builder</h1>
          <p className="text-blue-100 text-lg md:text-xl mb-10 leading-relaxed">
            O'zbek yozuvchilarining sara asarlarini mutolaa qiling yoki AI bilan yangi sarguzashtlar yarating.
          </p>
          <div className="flex gap-4">
            <Link to="/create" className="bg-white text-blue-600 px-8 py-4 rounded-2xl font-black hover:shadow-xl transition-all active:scale-95">
              Hikoya yozish
            </Link>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
      </section>

      {/* Genre Filters */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-black text-slate-800 tracking-tight">Janrlar</h2>
        </div>
        <div className="flex flex-wrap gap-3">
          {GENRES.map(genre => (
            <button
              key={genre}
              onClick={() => setSelectedGenre(genre)}
              className={`px-6 py-3 rounded-2xl font-bold transition-all duration-300 ${
                selectedGenre === genre 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-100 scale-105' 
                  : 'bg-white text-slate-500 border border-slate-200 hover:border-blue-300 hover:text-blue-600'
              }`}
            >
              {genre}
            </button>
          ))}
        </div>
      </section>

      {/* Recommended / All */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-black text-slate-800 tracking-tight">
            {selectedGenre === 'Barchasi' ? 'Tavsiya etilgan hikoyalar' : `${selectedGenre} janridagi hikoyalar`}
          </h2>
        </div>
        
        {filteredStories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredStories.map(story => (
              <StoryCard key={story.id} story={story} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-white rounded-[2rem] border-2 border-dashed border-slate-200">
            <div className="text-6xl mb-4 opacity-30">📚</div>
            <p className="text-slate-500 text-xl font-medium">Hozircha ushbu janrda hikoyalar mavjud emas.</p>
          </div>
        )}
      </section>

      {/* All Stories List */}
      {selectedGenre === 'Barchasi' && stories.length > 0 && (
        <section className="pt-12 border-t border-slate-200">
          <h2 className="text-3xl font-black text-slate-800 mb-8 tracking-tight">Barcha hikoyalar</h2>
          <div className="space-y-4">
            {stories.map(s => (
              <Link key={s.id} to={`/story/${s.id}`} className="flex items-center gap-6 p-6 bg-white rounded-3xl border border-slate-100 hover:border-blue-200 hover:shadow-xl transition-all group">
                <img src={s.imageUrl || `https://picsum.photos/seed/${s.id}/100/100`} className="w-20 h-20 rounded-2xl object-cover" alt="" />
                <div className="flex-1">
                  <h4 className="text-xl font-black text-slate-800 group-hover:text-blue-600 transition-colors">{s.title}</h4>
                  <div className="flex items-center gap-3 text-slate-400 font-bold text-sm mt-1">
                    <span>{s.authorName}</span>
                    <span>•</span>
                    <span className="text-blue-600/60">{s.genre}</span>
                  </div>
                </div>
                <div className="bg-slate-50 text-slate-400 p-3 rounded-full group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

const StoryCard: React.FC<{ story: Story }> = ({ story }) => {
  return (
    <Link to={`/story/${story.id}`} className="bg-white rounded-[2rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all group flex flex-col h-full">
      <div className="aspect-[16/10] overflow-hidden relative">
        <img 
          src={story.imageUrl || `https://picsum.photos/seed/${story.id}/600/400`} 
          alt={story.title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute top-5 left-5">
          <span className="bg-white/95 backdrop-blur-sm text-blue-600 text-xs font-black uppercase tracking-widest px-4 py-2 rounded-xl shadow-sm">{story.genre}</span>
        </div>
      </div>
      <div className="p-8 flex-1 flex flex-col">
        <div className="flex items-center gap-2 mb-4 text-xs text-slate-400 font-black tracking-wider uppercase">
          <span>{story.createdAt}</span>
          <span>•</span>
          <span className="text-slate-700">{story.authorName}</span>
        </div>
        <h3 className="text-2xl font-black text-slate-800 mb-4 line-clamp-1 group-hover:text-blue-600 transition-colors leading-tight">{story.title}</h3>
        <p className="text-slate-600 text-sm line-clamp-3 mb-8 leading-relaxed font-medium">{story.content}</p>
        <div className="mt-auto flex items-center justify-between pt-6 border-t border-slate-50">
          <span className="text-blue-600 font-black text-sm">O'qish →</span>
          <div className="flex -space-x-2">
            {[1,2,3].map(i => (
              <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-[10px] font-bold overflow-hidden">
                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i + story.id}`} alt="" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Home;
