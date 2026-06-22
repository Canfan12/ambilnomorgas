/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { QueueItem, User } from './types';
import { initialQueue } from './data';
import Login from './components/Login';
import UserDashboard from './components/UserDashboard';
import AdminDashboard from './components/AdminDashboard';
import { LogOut } from 'lucide-react';
import { AnimatePresence } from 'motion/react';
import CurrentTimeDisplay from './components/CurrentTimeDisplay';

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [queue, setQueue] = useState<QueueItem[]>(initialQueue);
  const [stock, setStock] = useState(34);
  const totalStock = 50;

  const handleLogin = (loggedInUser: User) => {
    setUser(loggedInUser);
  };

  const handleLogout = () => {
    setUser(null);
  };

  // Admin Actions
  const handleNextQueue = () => {
    setQueue(prev => {
      // Find currently serving and mark as done (if any)
      const currentIdx = prev.findIndex(q => q.status === 'serving');
      const newQueue = [...prev];
      if (currentIdx !== -1) {
        newQueue[currentIdx] = { ...newQueue[currentIdx], status: 'done' };
      }
      
      // Find next waiting and mark as serving
      const nextIdx = newQueue.findIndex(q => q.status === 'waiting');
      if (nextIdx !== -1) {
        newQueue[nextIdx] = { ...newQueue[nextIdx], status: 'serving' };
      }
      
      return newQueue;
    });
  };

  const handleCompleteServing = () => {
    setQueue(prev => {
      const newQueue = [...prev];
      const currentIdx = newQueue.findIndex(q => q.status === 'serving');
      if (currentIdx !== -1) {
        newQueue[currentIdx] = { ...newQueue[currentIdx], status: 'done' };
        // Decrease stock automatically upon dispensing gas
        setStock(s => Math.max(0, s - 1));
      }
      return newQueue;
    });
  };

  const handleUpdateStock = (amount: number) => {
    setStock(prev => Math.max(0, Math.min(totalStock, prev + amount)));
  };

  return (
    <div className="font-sans min-h-screen flex flex-col">
      {/* Universal Header - For demo testing purposes */}
      {user && (
        <header className="bg-white text-slate-800 px-6 py-4 flex justify-between items-center shadow-sm border-b border-slate-200 border-t-4 border-t-red-500 z-50">
          <div className="flex items-center space-x-3">
            <div className="bg-green-500 p-2 rounded-lg text-white">
              <FlameIcon className="w-5 h-5 flex-shrink-0" />
            </div>
            <span className="text-xl font-bold tracking-tight text-blue-600">Ambil Nomor <span className="text-red-500">Gas</span></span>
          </div>
          <div className="flex items-center space-x-6">
            <div className="hidden md:flex flex-col text-right pr-4 border-r border-slate-200">
              <CurrentTimeDisplay inline={true} align="right" />
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right hidden sm:block">
                <p className="text-xs text-slate-500 uppercase">{user.role === 'admin' ? 'Petugas/Admin' : 'Pengguna'}</p>
                <p className="text-sm font-bold text-slate-800">{user.name}</p>
              </div>
              <button 
                onClick={handleLogout}
                className="h-10 w-10 rounded-full bg-slate-50 flex items-center justify-center border border-slate-200 hover:bg-slate-100 transition-colors cursor-pointer text-slate-600 shadow-sm"
                title="Logout / Ganti Akun"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </header>
      )}

      <main className="flex-1 overflow-hidden flex flex-col">
        <AnimatePresence mode="wait">
          {!user ? (
            <Login key="login" onLogin={handleLogin} />
          ) : user.role === 'admin' ? (
            <AdminDashboard 
              key="admin"
              queue={queue}
              stock={stock}
              totalStock={totalStock}
              onNextQueue={handleNextQueue}
              onCompleteServing={handleCompleteServing}
              onUpdateStock={handleUpdateStock}
            />
          ) : (
            <UserDashboard 
              key="user"
              user={user}
              queue={queue}
              stock={stock}
              totalStock={totalStock}
            />
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

function FlameIcon(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>
    </svg>
  );
}
