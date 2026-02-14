
import React, { useState } from 'react';
import { User } from '../types';

interface ProfileProps {
  user: User;
  onUpdate: (user: User) => void;
}

const Profile: React.FC<ProfileProps> = ({ user, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<User>({ ...user });

  const handleSave = () => {
    onUpdate(formData);
    setIsEditing(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden animate-fade-in">
      <div className="h-48 bg-gradient-to-r from-indigo-500 to-violet-600 relative">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
      </div>
      <div className="px-8 pb-10">
        <div className="relative -mt-20 mb-8 flex flex-col items-center text-center">
          <div className="relative group">
            <img 
              src={user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} 
              alt="Profile" 
              className="w-40 h-40 rounded-full border-8 border-white shadow-2xl bg-white object-cover"
            />
            {isEditing && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                <span className="text-white text-xs font-bold uppercase">Rasm yuklash</span>
              </div>
            )}
          </div>
          <h1 className="text-3xl font-serif font-bold text-slate-800 mt-6">{user.name}</h1>
          <p className="text-indigo-600 font-medium">{user.email}</p>
        </div>

        <div className="max-w-xl mx-auto space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">To'liq ism</label>
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
                />
              ) : (
                <div className="px-5 py-3 bg-slate-50 rounded-2xl text-slate-700 font-medium border border-transparent">{user.name}</div>
              )}
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Tug‘ilgan yil</label>
              {isEditing ? (
                <input
                  type="text"
                  name="birthYear"
                  value={formData.birthYear}
                  onChange={handleChange}
                  placeholder="Masalan: 1995"
                  className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
                />
              ) : (
                <div className="px-5 py-3 bg-slate-50 rounded-2xl text-slate-700 font-medium border border-transparent">{user.birthYear || 'Kiritilmagan'}</div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Bio (O'zingiz haqingizda)</label>
            {isEditing ? (
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows={5}
                placeholder="Mahoratingiz va ijodingiz haqida yozing..."
                className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all resize-none"
              />
            ) : (
              <div className="px-5 py-4 bg-slate-50 rounded-2xl text-slate-700 font-medium border border-transparent min-h-[120px] leading-relaxed">
                {user.bio || 'Hali o\'zingiz haqingizda ma\'lumot kiritmadingiz. O\'quvchilarga o\'zingizni tanishtiring!'}
              </div>
            )}
          </div>

          <div className="flex justify-center pt-6">
            {isEditing ? (
              <div className="flex gap-4 w-full">
                <button 
                  onClick={() => setIsEditing(false)}
                  className="flex-1 py-4 text-slate-500 font-bold hover:text-slate-700 transition-colors"
                >
                  Bekor qilish
                </button>
                <button 
                  onClick={handleSave}
                  className="flex-[2] py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 shadow-xl shadow-indigo-100 transition-all active:scale-95"
                >
                  Saqlash
                </button>
              </div>
            ) : (
              <button 
                onClick={() => setIsEditing(true)}
                className="w-full py-4 border-2 border-indigo-600 text-indigo-600 rounded-2xl font-bold hover:bg-indigo-50 transition-all active:scale-95"
              >
                Tahrirlash
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
