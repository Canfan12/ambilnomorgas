import { useState, useEffect } from 'react';

interface CurrentTimeDisplayProps {
  dark?: boolean;
  inline?: boolean;
  align?: 'left' | 'center' | 'right';
}

export default function CurrentTimeDisplay({ dark = false, inline = false, align = 'center' }: CurrentTimeDisplayProps) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const dtfTime = new Intl.DateTimeFormat('id-ID', {
    hour: '2-digit', minute: '2-digit', second: '2-digit'
  });
  
  const dtfDate = new Intl.DateTimeFormat('id-ID', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
  });

  const alignClass = align === 'right' ? 'items-end text-right justify-end' : align === 'left' ? 'items-start text-left justify-start' : 'items-center text-center justify-center';

  if (inline) {
    return (
      <div className={`flex items-center gap-2 ${alignClass}`}>
        <span className={`text-[10px] uppercase tracking-widest font-bold ${dark ? 'text-blue-200' : 'text-slate-500'}`}>
          {dtfDate.format(time)} -
        </span>
        <span className={`text-sm font-bold font-mono tracking-wider ${dark ? 'text-white drop-shadow-sm' : 'text-slate-800'}`}>
          {dtfTime.format(time).replace(/\./g, ':')}
        </span>
      </div>
    );
  }

  return (
    <div className={`flex flex-col ${alignClass}`}>
      <p className={`text-[10px] uppercase tracking-widest font-bold ${dark ? 'text-blue-200' : 'text-slate-500'}`}>
        {dtfDate.format(time)}
      </p>
      <p className={`text-sm font-bold font-mono tracking-wider mt-0.5 ${dark ? 'text-white drop-shadow-sm' : 'text-slate-800'}`}>
        {dtfTime.format(time).replace(/\./g, ':')}
      </p>
    </div>
  );
}
