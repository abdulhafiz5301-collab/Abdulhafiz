
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Story, Genre } from '../types';

interface CreateStoryProps {
  user: User;
  onSave: (story: Story) => void;
}

const GENRES: Genre[] = ['Sarguzasht', 'Fantastika', 'Detektiv', 'Romantika', 'Tarixiy'];

const CreateStory: React.FC<CreateStoryProps> = ({ user, onSave }) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState<Genre>('Sarguzasht');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return;

    setIsSubmitting(true);
    
    const newStory: Story = {
      id: Math.random().toString(36).substr(2, 9),
      title,
      authorId: user.id,
      authorName: user.name,
      genre,
      content,
      createdAt: new Date().toISOString().split('T')[0],
      imageUrl: `https://picsum.photos/seed/${Math.random()}/1200/500`
    };

    setTimeout(() => {
      onSave(newStory);
      setIsSubmitting(false);
      navigate('/');
    }, 800);
  };

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <div className="mb-10">
        <h1 className="text-4xl font-black text-slate-800 tracking-tight">Yangi hikoya yaratish</h1>
        <p className="text-slate-500 font-medium text-lg mt-2">O'z tasavvuringizni qog'ozga tushiring</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-xl shadow-slate-100 border border-slate-100 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <label className="text-sm font-black uppercase tracking-widest text-slate-400 ml-1">Hikoya sarlavhasi</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-blue-50 focus:border-blue-500 text-xl font-bold tracking-tight transition-all"
              placeholder="Qandaydir hayajonli nom..."
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-black uppercase tracking-widest text-slate-400 ml-1">Janr</label>
            <select 
              value={genre}
              onChange={(e) => setGenre(e.target.value as Genre)}
              className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-blue-50 focus:border-blue-500 font-bold transition-all appearance-none cursor-pointer"
            >
              {GENRES.filter(g => g !== 'Barchasi').map(g => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-black uppercase tracking-widest text-slate-400 ml-1">Hikoyani yozing</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={15}
            className="w-full px-8 py-6 bg-slate-50 border border-slate-200 rounded-[2rem] outline-none focus:ring-4 focus:ring-blue-50 focus:border-blue-500 font-serif text-xl leading-relaxed transition-all resize-none"
            placeholder="Bir bor ekan, bir yo'q ekan..."
            required
          />
        </div>

        <div className="flex flex-col md:flex-row justify-end items-center gap-6 pt-6">
          <button 
            type="button" 
            onClick={() => navigate('/')}
            className="w-full md:w-auto px-8 py-4 text-slate-400 font-black hover:text-slate-600 transition-colors"
          >
            Bekor qilish
          </button>
          <button 
            type="submit"
            disabled={isSubmitting}
            className="w-full md:w-auto bg-blue-600 text-white px-16 py-5 rounded-2xl font-black text-xl hover:bg-blue-700 shadow-2xl shadow-blue-100 transition-all disabled:opacity-50 active:scale-95"
          >
            {isSubmitting ? 'Saqlanmoqda...' : 'Saqlash'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateStory;
