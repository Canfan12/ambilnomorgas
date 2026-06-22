import React, { useState } from 'react';
import { Flame, Lock, Shield, User as UserIcon } from 'lucide-react';
import { User } from '../types';
import { motion } from 'motion/react';
import CurrentTimeDisplay from './CurrentTimeDisplay';

interface LoginProps {
  key?: string;
  onLogin: (user: User) => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [isUser, setIsUser] = useState(true);
  const [cardNo, setCardNo] = useState('KG-2024-00312');
  const [password, setPassword] = useState('password123');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (isUser) {
      onLogin({ id: 'u1', name: 'Fandi Caniago', role: 'user', cardNo });
    } else {
      onLogin({ id: 'a1', name: 'Admin Pangkalan', role: 'admin' });
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex flex-col items-center justify-center min-h-[80vh] px-4"
    >
      <div className="w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden border border-slate-200 ring-4 ring-black/5">
        <div className="bg-gradient-to-br from-blue-700 via-blue-800 to-blue-900 px-8 py-10 text-center border-b-4 border-green-500 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 flex">
            <div className="h-full w-1/3 bg-red-600"></div>
            <div className="h-full w-1/3 bg-green-500"></div>
            <div className="h-full w-1/3 bg-blue-500"></div>
          </div>
          
          <div className="absolute top-10 -right-10 w-40 h-40 bg-red-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 pointer-events-none"></div>
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-green-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 pointer-events-none"></div>

          <div className="absolute top-4 right-4 z-10">
            <div className="bg-black/20 backdrop-blur-sm rounded-lg px-4 py-2 inline-block border border-white/10 shadow-sm text-right">
              <CurrentTimeDisplay dark={true} inline={true} align="right" />
            </div>
          </div>

          <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg border border-white/20 ring-4 ring-white/10 relative z-10 mt-10">
            <Flame className="w-10 h-10 text-red-600 drop-shadow-sm" />
            <div className="absolute bottom-2 right-2 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white"></div>
          </div>
          <h1 className="text-3xl font-black tracking-tight text-white relative z-10 drop-shadow-sm">Ambil Nomor <span className="text-red-500 drop-shadow-md bg-white px-2 py-0.5 rounded-lg ml-1">GAS</span></h1>
          <p className="text-blue-100 font-medium text-sm mt-3 tracking-widest uppercase relative z-10">Pangkalan Resmi Muaro Jambi</p>
        </div>

        <div className="p-6 md:p-8 bg-white/50 backdrop-blur-sm">
          <div className="flex p-1 bg-slate-100 rounded-xl mb-8 border border-slate-200 shadow-inner">
            <button
              onClick={() => setIsUser(true)}
              className={`flex-1 py-2.5 text-xs font-bold uppercase tracking-widest rounded-lg flex items-center justify-center gap-2 transition-all ${isUser ? 'bg-white text-blue-700 shadow-sm border border-slate-200' : 'text-slate-500 hover:text-slate-700'}`}
            >
              <UserIcon className="w-4 h-4" /> Pengguna
            </button>
            <button
              onClick={() => setIsUser(false)}
              className={`flex-1 py-2.5 text-xs font-bold uppercase tracking-widest rounded-lg flex items-center justify-center gap-2 transition-all ${!isUser ? 'bg-white text-green-700 shadow-sm border border-slate-200' : 'text-slate-500 hover:text-slate-700'}`}
            >
              <Shield className="w-4 h-4" /> Petugas
            </button>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {isUser ? (
              <div>
                <label className="block text-[10px] uppercase tracking-widest font-bold text-slate-500 mb-1.5">Nomor Kartu Gas</label>
                <input
                  key="user-id"
                  type="text"
                  value={cardNo}
                  onChange={(e) => setCardNo(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all font-mono text-sm text-slate-800 shadow-sm"
                  placeholder="Contoh: KG-2024-XXXXX"
                />
              </div>
            ) : (
              <div>
                <label className="block text-[10px] uppercase tracking-widest font-bold text-slate-500 mb-1.5">ID Petugas</label>
                <input
                  key="admin-id"
                  type="text"
                  defaultValue="ADM-001"
                  className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all font-mono text-sm text-slate-800 shadow-sm"
                />
              </div>
            )}
            
            <div>
              <label className="block text-[10px] uppercase tracking-widest font-bold text-slate-500 mb-1.5">Kata Sandi</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 outline-none transition-all text-sm text-slate-800 shadow-sm ${isUser ? 'focus:ring-blue-500 focus:border-blue-500' : 'focus:ring-green-500 focus:border-green-500'}`}
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              className={`w-full text-white py-3.5 rounded-xl font-bold mt-8 flex justify-center items-center gap-2 transition-all transform hover:scale-[1.01] uppercase tracking-widest text-sm shadow-xl ${isUser ? 'bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 shadow-blue-500/30' : 'bg-gradient-to-r from-green-600 to-green-800 hover:from-green-700 hover:to-green-900 shadow-green-500/30'}`}
            >
              <Lock className="w-4 h-4" /> MASUK
            </button>
          </form>

          {isUser && (
            <p className="text-center text-xs text-slate-500 mt-6 tracking-wide">
              Belum memiliki akses? Hubungi petugas di lokasi.
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}
