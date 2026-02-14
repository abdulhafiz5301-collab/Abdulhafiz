
import React, { useState } from 'react';
import { User } from '../types';

interface LoginProps {
  onLogin: (user: User) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      email,
      bio: '',
      birthYear: ''
    };
    onLogin(newUser);
  };

  return (
    <div className="max-w-md mx-auto mt-20 animate-fade-in">
      <div className="bg-white p-8 rounded-3xl shadow-xl shadow-blue-100 border border-slate-100">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-black mb-2 text-blue-600 tracking-tighter">Leader IT School Story Builder</h1>
          <p className="text-slate-500 font-medium">Hikoyalar olamiga xush kelibsiz!</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Ismni kiriting</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-blue-50 focus:border-blue-500 outline-none transition-all font-medium"
              placeholder="Masalan: Alisher Navoiy"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Emailni kiriting</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-blue-50 focus:border-blue-500 outline-none transition-all font-medium"
              placeholder="example@mail.com"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black text-lg hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 active:scale-95"
          >
            {isRegister ? 'Ro‘yxatdan o‘tish' : 'Kirish'}
          </button>
        </form>

        <div className="mt-8 text-center">
          <button
            onClick={() => setIsRegister(!isRegister)}
            className="text-blue-600 font-bold hover:underline"
          >
            {isRegister ? 'Allaqachon hisobingiz bormi? Kirish' : 'Hisobingiz yo‘qmi? Ro‘yxatdan o‘tish'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
