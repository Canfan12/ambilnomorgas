import { MapPin, Clock, Flame, Info, BellRing, Ticket } from 'lucide-react';
import { QueueItem, User } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface UserDashboardProps {
  user: User;
  queue: QueueItem[];
  stock: number;
  totalStock: number;
}

export default function UserDashboard({ user, queue, stock, totalStock }: UserDashboardProps) {
  const stockPercentage = Math.round((stock / totalStock) * 100);
  
  const myQueueItem = queue.find(q => q.cardNo === user.cardNo);
  const currentlyServing = queue.find(q => q.status === 'serving');
  
  const myIndex = queue.findIndex(q => q.cardNo === user.cardNo);
  const waitingBeforeMe = myIndex > -1 ? queue.slice(0, myIndex).filter(q => q.status === 'waiting').length : 0;
  const estimatedMinutes = waitingBeforeMe * 3;

  const isMyTurnNext = waitingBeforeMe === 0 && myQueueItem?.status === 'waiting';
  const isMyTurn = myQueueItem?.status === 'serving';

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-md mx-auto h-full overflow-y-auto pb-12"
    >
      {/* Header Profile */}
      <div className="bg-white text-blue-600 p-6 shadow-sm border-b border-slate-200 border-t-4 border-t-red-500">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Halo,</h2>
            <p className="text-xl font-bold tracking-tight text-slate-800">{user.name}</p>
            <p className="text-xs bg-slate-50 border border-slate-200 text-slate-600 inline-block px-2 py-1 rounded mt-2 font-mono tracking-wide">{user.cardNo}</p>
          </div>
          <div className="bg-slate-50 border border-slate-200 p-2 rounded-lg relative">
            <BellRing className="w-5 h-5 text-slate-600" />
            {(isMyTurn || isMyTurnNext) && (
              <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
            )}
          </div>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 flex gap-4">
          <div className="bg-white p-2 rounded flex items-center justify-center border border-slate-100 shadow-sm">
            <MapPin className="w-5 h-5 text-green-500" />
          </div>
          <div>
            <p className="font-bold text-sm text-slate-800">Pangkalan Aris Tamaji</p>
            <p className="text-xs text-slate-500">Jl. Raya Kasang Pudak RT 06 No. 45, Jambi</p>
          </div>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6 relative z-10 w-full max-w-lg mx-auto">
        {/* Antrean Info */}
        <div className="bg-white/80 backdrop-blur-md p-6 rounded-xl shadow-sm border border-white/50 relative overflow-hidden">
          <div className="relative z-10 flex gap-4">
            <div className="flex-1 border-r border-slate-100 pr-4">
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-2">Nomor Anda</p>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-black text-[#1E293B] tracking-tighter">{myQueueItem ? myQueueItem.queueNumber.replace('A-','') : '-'}</span>
              </div>
              <div className="mt-3">
                <span className={`text-[10px] px-3 py-1 font-bold uppercase tracking-wider rounded flex items-center gap-1.5 w-max ${
                  isMyTurn ? 'bg-green-100 text-green-700' :
                  isMyTurnNext ? 'bg-blue-100 text-blue-700' : 
                  'bg-slate-100 text-slate-500'
                }`}>
                  {isMyTurn && <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>}
                  {isMyTurn ? 'Sedang Dilayani' : isMyTurnNext ? 'Giliran Berikutnya!' : 'Menunggu'}
                </span>
              </div>
            </div>
            <div className="flex-1 pl-2">
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-2">Sedang Dilayani</p>
              <span className="text-4xl font-black text-blue-600 tracking-tighter">{currentlyServing ? currentlyServing.queueNumber.replace('A-','') : '-'}</span>
              
              {myQueueItem?.status === 'waiting' && myIndex > -1 && (
                <div className="mt-3 text-[10px] font-bold uppercase tracking-wider text-amber-600 flex items-center gap-1.5 bg-amber-50 px-3 py-1 rounded w-max">
                  <Clock className="w-3 h-3" />
                  ± {estimatedMinutes} mnt
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Stock Info */}
        <div className="bg-white/80 backdrop-blur-md p-6 rounded-xl shadow-sm border border-white/50">
          <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">Informasi Stok</h3>
          <div className="flex justify-between items-center bg-white/60 border border-slate-100 p-3 rounded-lg shadow-inner">
            <div>
              <p className="font-bold text-slate-800">Gas LPG 3kg</p>
              <p className={`text-[10px] font-bold uppercase mt-0.5 ${stock > 10 ? 'text-green-600' : 'text-red-500'}`}>
                {stock > 10 ? 'Tersedia' : 'Stok Menipis'}
              </p>
            </div>
            <div className="text-right flex items-baseline gap-1">
              <p className="text-2xl font-black text-slate-800 leading-none">{stock}</p>
              <span className="text-[10px] font-bold text-slate-400 uppercase">Unit</span>
            </div>
          </div>
        </div>

        {/* Live Queue */}
        <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-sm border border-white/50 overflow-hidden">
          <div className="p-4 border-b border-white flex items-center justify-between bg-white/40">
            <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Daftar Antrean Aktif</h3>
          </div>
          
          <div className="divide-y divide-slate-100">
            <AnimatePresence>
              {queue.filter(q => q.status !== 'done').slice(0, 5).map((q) => (
                <motion.div 
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, height: 0 }}
                  key={q.id} 
                  className={`flex items-center justify-between p-4 ${q.cardNo === user.cardNo ? 'bg-blue-50/50' : 'hover:bg-slate-50'} transition-colors`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded flex items-center justify-center font-bold text-lg ${
                      q.status === 'serving' ? 'bg-blue-600 text-white' :
                      q.cardNo === user.cardNo ? 'bg-blue-100 text-blue-700' :
                      'bg-slate-100 text-slate-600'
                    }`}>
                      {q.queueNumber.replace('A-', '')}
                    </div>
                    <div>
                      <p className={`text-sm font-bold ${q.cardNo === user.cardNo ? 'text-blue-700' : 'text-slate-800'}`}>
                        {q.cardNo === user.cardNo ? 'Anda' : q.name}
                      </p>
                      <p className="text-[10px] text-slate-400 font-mono mt-0.5">{q.cardNo}</p>
                    </div>
                  </div>
                  {q.status === 'serving' ? (
                    <span className="text-[10px] uppercase font-bold text-blue-600 tracking-wider">Dilayani</span>
                  ) : q.cardNo === user.cardNo ? (
                    <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Nomor Anda</span>
                  ) : null}
                </motion.div>
              ))}
            </AnimatePresence>
            
            {queue.filter(q => q.status === 'waiting').length > 5 && (
              <div className="p-4 text-center text-[10px] font-bold tracking-widest uppercase text-slate-400 bg-slate-50">
                + {(queue.filter(q => q.status === 'waiting').length - 4)} Antrean Lainnya
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
