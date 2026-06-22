import { Flame, Users, CheckCircle, ChevronRight, PackageOpen, Plus, Minus } from 'lucide-react';
import { QueueItem } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface AdminDashboardProps {
  key?: string;
  queue: QueueItem[];
  stock: number;
  totalStock: number;
  onNextQueue: () => void;
  onCompleteServing: () => void;
  onUpdateStock: (amount: number) => void;
}

export default function AdminDashboard({ queue, stock, totalStock, onNextQueue, onCompleteServing, onUpdateStock }: AdminDashboardProps) {
  const currentlyServing = queue.find(q => q.status === 'serving');
  const waitingCount = queue.filter(q => q.status === 'waiting').length;
  const doneCount = queue.filter(q => q.status === 'done').length;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex-1 flex flex-col md:flex-row p-4 sm:p-6 gap-6 h-full"
    >
      {/* Left Column */}
      <div className="w-full md:w-1/3 flex flex-col gap-6">
        
        {/* Status Antrean Utama */}
        <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-sm border border-white/50 p-6 flex flex-col shrink-0">
          <h3 className="text-sm font-bold text-slate-500 uppercase mb-4 flex items-center tracking-wide">
             <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
             Status Antrean Utama
          </h3>
          
          <div className="flex flex-col items-center py-6 bg-white/60 rounded-lg border border-slate-100 shadow-inner">
            <span className="text-xs text-slate-400 uppercase font-bold tracking-wider">Nomor Sekarang</span>
            {currentlyServing ? (
              <h1 className="text-7xl sm:text-8xl font-black text-[#1E293B] tracking-tighter mt-1 mb-2">
                {currentlyServing.queueNumber.replace('A-', '')}
              </h1>
            ) : (
              <h1 className="text-5xl font-black text-slate-300 tracking-tighter my-4 py-2">
                --
              </h1>
            )}
            
            <div className="mt-3 px-4 py-1.5 bg-green-100 text-green-700 rounded-full text-[10px] font-bold uppercase tracking-wider">
              {currentlyServing ? 'Loket Aktif' : 'Menunggu Pelanggan'}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="text-center p-3 bg-blue-50 rounded-lg">
               <p className="text-[10px] text-blue-600 uppercase font-bold tracking-wider">Total Antrean</p>
               <p className="text-2xl font-bold text-slate-800">{waitingCount}</p>
            </div>
            <div className="text-center p-3 bg-amber-50 rounded-lg">
               <p className="text-[10px] text-amber-600 uppercase font-bold tracking-wider">Selesai</p>
               <p className="text-2xl font-bold text-slate-800">{doneCount}</p>
            </div>
          </div>
        </div>

        {/* Monitoring Stok Real-time & Actions */}
        <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-sm border border-white/50 p-6 flex-1 flex flex-col">
          <h3 className="text-sm font-bold text-slate-500 uppercase mb-4 tracking-wide">Monitoring Stok Real-time</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 border border-slate-100 rounded-lg bg-white/60 shadow-inner">
              <div>
                <p className="font-bold text-slate-800">Gas LPG 3kg</p>
                <p className={`text-xs font-bold uppercase mt-0.5 ${stock > 10 ? 'text-green-600' : 'text-red-500'}`}>
                  {stock > 10 ? 'Tersedia' : 'Stok Menipis'}
                </p>
              </div>
              <div className="text-right flex items-baseline gap-1">
                <p className="text-2xl font-black text-slate-800 leading-none">{stock}</p>
                <span className="text-[10px] font-bold text-slate-400 uppercase">Unit</span>
              </div>
            </div>
            
            <div className="flex gap-2 pt-2 border-t border-slate-100">
              <button 
                onClick={() => onUpdateStock(-1)} 
                className="flex-1 py-2 bg-slate-100 border border-slate-200 text-slate-600 rounded-lg font-bold text-xs hover:bg-slate-200 transition uppercase tracking-wider"
              >
                - Stok
              </button>
              <button 
                onClick={() => onUpdateStock(1)} 
                className="flex-1 py-2 bg-slate-100 border border-slate-200 text-slate-600 rounded-lg font-bold text-xs hover:bg-slate-200 transition uppercase tracking-wider"
              >
                + Stok
              </button>
            </div>
          </div>

          <div className="mt-8 space-y-3">
            <button 
              onClick={onNextQueue}
              disabled={waitingCount === 0}
              className={`w-full py-3 border border-slate-200 rounded-lg font-bold text-sm transition uppercase tracking-wider ${waitingCount === 0 ? 'bg-slate-50 text-slate-400 cursor-not-allowed' : 'bg-white text-slate-800 hover:bg-slate-50 shadow-sm'}`}
            >
              Panggil Selanjutnya
            </button>
            <button 
              onClick={onCompleteServing}
              disabled={!currentlyServing}
              className={`w-full py-3 rounded-lg font-bold text-sm transition uppercase tracking-wider shadow-sm ${!currentlyServing ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
            >
              Tandai Selesai & Ambil Gas
            </button>
          </div>
        </div>
      </div>

      {/* Right Column / Table */}
      <div className="w-full md:w-2/3 flex flex-col min-h-0 bg-white/80 backdrop-blur-md rounded-xl shadow-sm border border-white/50 overflow-hidden">
        
        <div className="px-6 py-4 border-b border-white flex justify-between items-center bg-white/40 shrink-0">
          <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wide">Daftar Antrean Aktif</h3>
          <div className="flex space-x-2">
            <button className="px-3 py-1.5 bg-white border border-slate-200 text-xs font-bold text-slate-600 rounded shadow-sm hover:bg-slate-50 transition">Filter</button>
            <button className="px-3 py-1.5 bg-white border border-slate-200 text-xs font-bold text-slate-600 rounded shadow-sm hover:bg-slate-50 transition hidden sm:block">Cetak Rekap</button>
          </div>
        </div>
        
        <div className="flex-1 overflow-auto">
          <table className="w-full text-sm text-left border-collapse min-w-[500px]">
            <thead className="bg-white/40 text-slate-500 uppercase text-[10px] font-black tracking-widest border-b border-white sticky top-0 z-10 shadow-sm backdrop-blur-sm">
              <tr>
                <th className="px-6 py-3 whitespace-nowrap">ID</th>
                <th className="px-6 py-3">Nama Pengguna</th>
                <th className="px-6 py-3 text-slate-400">Identitas/Kartu</th>
                <th className="px-6 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <AnimatePresence>
                {queue.filter(q => q.status !== 'done').map((item) => (
                  <motion.tr 
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    key={item.id}
                    className={`${item.status === 'serving' ? 'bg-blue-50/50' : 'hover:bg-slate-50'} transition-colors duration-150`}
                  >
                    <td className="px-6 py-4 font-bold text-slate-800">{item.queueNumber}</td>
                    <td className="px-6 py-4 font-medium text-slate-700">{item.name}</td>
                    <td className="px-6 py-4 text-slate-400 text-xs font-mono">{item.cardNo}</td>
                    <td className="px-6 py-4">
                      {item.status === 'serving' ? (
                        <span className="text-[10px] uppercase font-bold text-blue-600 tracking-wider">
                          Sedang Dilayani
                        </span>
                      ) : (
                        <span className="text-[10px] uppercase font-bold text-amber-600 tracking-wider">
                          Menunggu
                        </span>
                      )}
                    </td>
                  </motion.tr>
                ))}
                {queue.filter(q => q.status !== 'done').length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center text-slate-400 font-medium">
                      <CheckCircle className="w-8 h-8 mx-auto text-slate-300 mb-2" />
                      Semua antrean telah selesai.
                    </td>
                  </tr>
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
        
        <div className="bg-white border-t border-slate-200 px-6 py-3 flex justify-between items-center text-xs text-slate-400 shrink-0">
          <p className="font-medium">&copy; 2026 Admin GasAntri Pro</p>
          <div className="flex space-x-4 font-bold uppercase tracking-wider text-[10px]">
            <span className="text-green-500">System: Online</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
