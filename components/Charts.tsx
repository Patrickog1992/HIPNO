import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

export const PerformanceChart = () => {
  const data = [
    { name: 'Início', hipno: 30, sem: 30 },
    { name: 'Semana 1', hipno: 50, sem: 28 },
    { name: 'Semana 2', hipno: 70, sem: 25 },
    { name: 'Semana 3', hipno: 85, sem: 22 },
    { name: 'Mês 1', hipno: 100, sem: 20 },
  ];

  return (
    <div className="w-full h-96 bg-white p-4 rounded-xl shadow-md border border-gray-100 relative flex flex-col">
      <div className="text-center mb-4 shrink-0">
        <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest">Comparativo de Desempenho</h3>
      </div>
      
      <div className="absolute top-1/2 left-4 z-10 pointer-events-none">
        <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded opacity-90">Começo do programa</span>
      </div>
      <div className="absolute top-10 right-4 z-10 pointer-events-none">
        <span className="text-[10px] font-black text-green-700 bg-green-100 px-2 py-1 rounded border border-green-200 shadow-sm">POTÊNCIA E DURAÇÃO NO MÁXIMO</span>
      </div>

      <div className="flex-1 w-full min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
            <XAxis dataKey="name" tick={{fontSize: 10}} interval={0} />
            <YAxis hide />
            <Tooltip 
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
              labelStyle={{ fontWeight: 'bold', color: '#333' }}
            />
            <Line 
              type="monotone" 
              dataKey="hipno" 
              name="Com HipnoDURA+" 
              stroke="#16a34a" 
              strokeWidth={4} 
              dot={{ r: 4, fill: '#16a34a', strokeWidth: 2, stroke: '#fff' }}
            />
            <Line 
              type="monotone" 
              dataKey="sem" 
              name="Sem HipnoDURA+" 
              stroke="#dc2626" 
              strokeWidth={3} 
              strokeDasharray="5 5" 
              dot={{ r: 3, fill: '#dc2626' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-2 flex justify-center gap-4 text-xs shrink-0">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full bg-green-600"></div>
          <span className="font-semibold text-green-800">Com HipnoDURA +</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full bg-red-600"></div>
          <span className="font-semibold text-red-800">Sem o programa</span>
        </div>
      </div>
    </div>
  );
};

export const PredictionChart = ({ currentMonth, nextMonth }: { currentMonth: string, nextMonth: string }) => {
  const data = [
    { name: currentMonth, score: 20, label: 'AGORA' },
    { name: 'Semana 1', score: 45, label: '' },
    { name: 'Semana 2', score: 65, label: '' },
    { name: 'Semana 3', score: 85, label: '' },
    { name: nextMonth, score: 98, label: 'COM HIPNODURA+' },
  ];

  return (
    <div className="w-full h-72 bg-gradient-to-b from-white to-green-50 rounded-xl p-4 border border-green-100 relative">
       {/* Labels positioned absolutely for precision control over text */}
       <div className="absolute bottom-10 left-6 flex flex-col items-center z-10">
          <div className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full mb-1">AGORA</div>
          <span className="text-xs font-bold text-gray-500">{currentMonth}</span>
       </div>

       <div className="absolute top-6 right-2 flex flex-col items-center z-10">
          <div className="bg-green-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full mb-1">COM O HIPNODURA+</div>
          <span className="text-xs font-bold text-gray-500">{nextMonth}</span>
       </div>

      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 20, right: 0, left: 0, bottom: 20 }}>
          <defs>
            <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#16a34a" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#16a34a" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
          <XAxis dataKey="name" hide />
          <YAxis hide domain={[0, 110]} />
          <Area 
            type="monotone" 
            dataKey="score" 
            stroke="#16a34a" 
            strokeWidth={4} 
            fillOpacity={1} 
            fill="url(#colorScore)" 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};