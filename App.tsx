import React, { useState, useEffect } from 'react';
import { UserAnswers, StepType } from './types';
import { PerformanceChart, PredictionChart } from './components/Charts';

// Icons
const ChevronRight = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
  </svg>
);

const CheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-4 h-4 text-white">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
);

// --- HELPER COMPONENTS ---

const Button = ({ onClick, children, className = "", variant = "primary" }: any) => {
  const baseStyle = "w-full py-4 rounded-xl font-bold text-lg transition-all duration-200 transform active:scale-95 shadow-lg flex items-center justify-center gap-2";
  const variants = {
    primary: "bg-green-600 text-white hover:bg-green-700 shadow-green-200",
    secondary: "bg-white text-zinc-800 border-2 border-zinc-100 hover:border-green-500 hover:text-green-700 shadow-sm",
    danger: "bg-red-600 text-white hover:bg-red-700 shadow-red-200"
  };
  return (
    <button onClick={onClick} className={`${baseStyle} ${variants[variant as keyof typeof variants]} ${className}`}>
      {children}
    </button>
  );
};

const Layout = ({ children, className = "" }: { children?: React.ReactNode, className?: string }) => (
  <div className={`min-h-screen bg-gray-50 flex flex-col items-center font-['Poppins'] ${className}`}>
    <div className="w-full max-w-md bg-white min-h-screen shadow-2xl flex flex-col pb-20">
      <div className="flex justify-center pt-6 pb-2">
        <img src="https://i.imgur.com/qCa9DCR.jpg" alt="HipnoDURA Logo" className="w-[100px] h-[100px] object-contain" />
      </div>
      {children}
    </div>
  </div>
);

const Header = ({ progress }: { progress: number }) => (
  <div className="px-6 pt-2 pb-2">
    <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
      <div 
        className="h-full bg-green-500 transition-all duration-500 ease-out" 
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  </div>
);

// --- NOTIFICATION COMPONENT ---

const NotificationToast = () => {
  const [show, setShow] = useState(false);
  const [data, setData] = useState({ name: '', city: '' });

  const users = [
    { name: 'Ricardo', city: 'São Paulo' },
    { name: 'João', city: 'Rio de Janeiro' },
    { name: 'Felipe', city: 'Belo Horizonte' },
    { name: 'Bruno', city: 'Curitiba' },
    { name: 'André', city: 'Porto Alegre' },
    { name: 'Carlos', city: 'Salvador' },
    { name: 'Eduardo', city: 'Brasília' },
    { name: 'Lucas', city: 'Fortaleza' },
    { name: 'Gustavo', city: 'Recife' },
    { name: 'Marcelo', city: 'Campinas' },
    { name: 'Rafael', city: 'Goiânia' },
    { name: 'Pedro', city: 'Manaus' },
  ];

  useEffect(() => {
    let timeoutId: any;

    const triggerNotification = () => {
       const randomUser = users[Math.floor(Math.random() * users.length)];
       setData(randomUser);
       setShow(true);

       // Hide after 4 seconds
       setTimeout(() => {
          setShow(false);
          // Schedule next one between 8-15 seconds
          const nextDelay = Math.random() * (15000 - 8000) + 8000;
          timeoutId = setTimeout(triggerNotification, nextDelay);
       }, 4000);
    };

    // Initial delay
    timeoutId = setTimeout(triggerNotification, 5000);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className={`fixed top-4 right-4 z-50 max-w-[90%] w-auto transition-all duration-700 transform ${show ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0 pointer-events-none'}`}>
      <div className="bg-white/95 backdrop-blur-sm border border-gray-100 shadow-xl rounded-lg p-3 flex items-center gap-3 pr-6">
         <div className="bg-green-100 p-1.5 rounded-full shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-green-600">
              <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
            </svg>
         </div>
         <div>
            <p className="text-[11px] font-bold text-zinc-800 leading-tight">{data.name} de {data.city}</p>
            <p className="text-[10px] text-zinc-500 leading-tight">acabou de receber acesso</p>
         </div>
      </div>
    </div>
  );
};

// --- VIEW COMPONENTS ---

const Intro = ({ onNext }: { onNext: () => void }) => (
  <Layout>
    <div className="flex-1 flex flex-col justify-center px-6 py-8 space-y-6 text-center">
      <h1 className="text-2xl font-bold text-zinc-900 leading-tight">
        Aumente sua potência sexual e desempenho em poucos minutos por dia usando apenas auto-hipnose.
      </h1>
      <div className="rounded-2xl overflow-hidden shadow-lg mx-auto w-full">
        <img src="https://i.imgur.com/ypZGaVZ.jpeg" alt="Couple" className="w-full h-auto object-cover" />
      </div>
      <p className="text-zinc-600 text-lg">
        Descubra o segredo mental capaz de multiplicar sua potência sexual e eliminar qualquer falha na cama usando apenas auto-hipnose.
      </p>
      <div className="mt-auto pt-4">
        <Button onClick={onNext}>QUERO ASSUMIR O CONTROLE <ChevronRight /></Button>
      </div>
    </div>
  </Layout>
);

const QuizSingleSelect = ({ question, options, onSelect, progress }: any) => (
  <Layout>
    <Header progress={progress} />
    <div className="flex-1 px-6 py-8 flex flex-col">
      <h2 className="text-2xl font-bold text-zinc-900 mb-8 text-center">{question}</h2>
      <div className="space-y-3">
        {options.map((opt: string) => (
          <Button key={opt} variant="secondary" onClick={() => onSelect(opt)} className="text-left justify-start px-6">
            {opt}
          </Button>
        ))}
      </div>
    </div>
  </Layout>
);

const QuizMultiSelect = ({ question, options, onNext, progress, subtitle }: any) => {
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (opt: string) => {
    if (selected.includes(opt)) {
      setSelected(selected.filter(s => s !== opt));
    } else {
      setSelected([...selected, opt]);
    }
  };

  return (
    <Layout>
      <Header progress={progress} />
      <div className="flex-1 px-6 py-8 flex flex-col">
        <h2 className="text-2xl font-bold text-zinc-900 mb-2 text-center">{question}</h2>
        {subtitle && <p className="text-zinc-500 mb-6 text-center">{subtitle}</p>}
        <div className="space-y-3 mb-8">
          {options.map((opt: string) => {
            const isSelected = selected.includes(opt);
            return (
              <button 
                key={opt} 
                onClick={() => toggle(opt)} 
                className={`w-full py-4 px-6 rounded-xl font-medium text-lg text-left transition-all border-2 flex justify-between items-center ${isSelected ? 'border-green-500 bg-green-50 text-green-900' : 'border-zinc-100 bg-white text-zinc-800'}`}
              >
                {opt}
                {isSelected && <div className="bg-green-500 rounded-full p-1"><CheckIcon /></div>}
              </button>
            )
          })}
        </div>
        <div className="mt-auto">
          <Button onClick={() => onNext(selected)} disabled={selected.length === 0} className={selected.length === 0 ? "opacity-50" : ""}>
            Continuar
          </Button>
        </div>
      </div>
    </Layout>
  );
};

const Interstitial = ({ text, image, chart, children, onNext }: any) => (
  <Layout>
    <div className="flex-1 flex flex-col justify-center px-6 py-8 space-y-6 text-center">
      <h2 className="text-xl font-medium text-zinc-800 leading-relaxed text-center">
        {text}
      </h2>
      {image && (
        <div className="rounded-2xl overflow-hidden shadow-lg mx-auto w-full">
          <img src={image} alt="Illustration" className="w-full h-auto object-cover" />
        </div>
      )}
      {chart && (
        <div className="w-full">
            {chart}
        </div>
      )}
      {children}
      <div className="mt-auto pt-4 w-full">
        <Button onClick={onNext}>CONTINUAR</Button>
      </div>
    </div>
  </Layout>
);

const Analysis = ({ onComplete }: { onComplete: () => void }) => {
  const steps = ["Sintomas", "Causa raiz", "Objetivos", "Problemas"];
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (currentStep < steps.length) {
      const timer = setTimeout(() => {
        setCurrentStep(prev => prev + 1);
      }, 1500);
      return () => clearTimeout(timer);
    } else {
        setTimeout(onComplete, 1000);
    }
  }, [currentStep, onComplete, steps.length]);

  return (
    <Layout>
      <div className="flex-1 flex flex-col items-center justify-center px-6 space-y-8">
        <div className="w-16 h-16 border-4 border-zinc-200 border-t-green-500 rounded-full animate-spin"></div>
        <h2 className="text-xl font-bold text-zinc-900 uppercase tracking-wide">ESTAMOS ANALISANDO SUAS RESPOSTAS</h2>
        
        <div className="w-full space-y-4">
          {steps.map((step, idx) => (
            <div key={step} className="flex items-center justify-between w-full bg-gray-50 p-4 rounded-xl">
              <span className={`font-bold text-lg ${idx < currentStep ? 'text-green-600' : 'text-red-500'}`}>
                {step}
              </span>
              {idx < currentStep ? (
                <div className="bg-green-500 rounded-full p-1"><CheckIcon /></div>
              ) : (
                <div className="w-4 h-4 rounded-full border-2 border-red-200 border-t-red-500 animate-spin"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

const SalesPage = ({ answers }: { answers: UserAnswers }) => {
  // Timer Logic
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutes
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const testimonials = [
    {
        img: "https://i.imgur.com/BJPY2Qu.jpeg",
        text: "Eu achava que era ansiedade, mas era falta de controle mental. Em 2 semanas, passei de 5 minutos para quase 25. Minha esposa nem acreditou.",
        name: "Carlos M."
    },
    {
        img: "https://i.imgur.com/tBgJKYL.jpeg",
        text: "Já tinha tentado pílulas, sprays, tudo. O HipnoDURA+ foi a única coisa que me fez sentir no comando de verdade. Sensação indescritível.",
        name: "Roberto S."
    },
    {
        img: "https://i.imgur.com/fPRKetm.jpeg",
        text: "A primeira sessão já me deixou mais calmo. Hoje, consigo controlar exatamente quando quero chegar lá. Mudou meu casamento.",
        name: "André L."
    },
    {
        img: "https://i.imgur.com/go7d1Ms.jpeg",
        text: "Simplesmente funciona. É como se você reprogramasse o cérebro para não ter pressa. Recomendo demais.",
        name: "Fernando P."
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
        setActiveTestimonial(prev => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-white font-['Poppins'] pb-8">
      
      <NotificationToast />

      {/* Banner Static */}
      <div className="bg-red-600 text-white text-center py-3 px-4 shadow-md">
        <p className="text-sm font-medium">
          VOCÊ ACABA DE GANHAR <span className="font-bold text-yellow-300">60% DE DESCONTO</span> VÁLIDO SOMENTE EM: <span className="font-mono font-bold text-yellow-300 text-lg ml-1">{formatTime(timeLeft)}</span>
        </p>
      </div>

      <div className="w-full flex justify-center py-6">
        <img src="https://i.imgur.com/qCa9DCR.jpg" alt="HipnoDURA Logo" className="w-[100px] h-[100px] object-contain" />
      </div>

      <div className="max-w-md mx-auto px-6 py-8 space-y-12">
        
        {/* Before / After */}
        <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
                <h3 className="text-center font-bold text-red-600 text-sm">Antes do HipnoDURA +</h3>
                <img src="https://i.imgur.com/3HfXbnB.jpeg" className="rounded-xl shadow-md w-full" alt="Sad man" />
                <ul className="text-xs space-y-2 text-zinc-600">
                    <li className="flex gap-2 items-start"><span className="text-red-500">✖</span> Ansiedade e pressão na hora H</li>
                    <li className="flex gap-2 items-start"><span className="text-red-500">✖</span> Baixo controle do tempo</li>
                    <li className="flex gap-2 items-start"><span className="text-red-500">✖</span> Autoconfiança abalada</li>
                    <li className="flex gap-2 items-start"><span className="text-red-500">✖</span> Falta de conexão e presença</li>
                </ul>
            </div>
            <div className="space-y-2">
                <h3 className="text-center font-bold text-green-600 text-sm">Depois do HipnoDURA +</h3>
                <img src="https://i.imgur.com/aKhLzTh.jpeg" className="rounded-xl shadow-md w-full" alt="Happy couple" />
                <ul className="text-xs space-y-2 text-zinc-600">
                    <li className="flex gap-2 items-start"><span className="text-green-500">✔</span> Controle total do ritmo</li>
                    <li className="flex gap-2 items-start"><span className="text-green-500">✔</span> Maior resistência e duração</li>
                    <li className="flex gap-2 items-start"><span className="text-green-500">✔</span> Confiança renovada</li>
                    <li className="flex gap-2 items-start"><span className="text-green-500">✔</span> Prazer muito mais intenso</li>
                </ul>
            </div>
        </div>

        <div className="bg-gray-50 p-6 rounded-2xl border-l-4 border-green-500 shadow-sm">
            <h3 className="text-xl font-bold text-zinc-900 mb-4 text-center">Volte a ser tratado como um homem de verdade…</h3>
            <ul className="space-y-4">
                {[
                    "Redescubra o orgulho de saber que consegue comandar a situação na hora H",
                    "Sinta sua confiança voltando conforme você dura mais e assume o controle",
                    "Acorde leve, seguro e com a sensação de estar no seu auge novamente",
                    "Perca o medo de falhar e volte a aproveitar o momento sem ansiedade",
                    "Escute dela: “O que você fez? Você está muito mais potente!”"
                ].map((item, i) => (
                    <li key={i} className="flex gap-3 items-start">
                        <div className="mt-1 min-w-[20px]"><div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center"><CheckIcon /></div></div>
                        <span className="text-zinc-700 text-sm leading-relaxed">{item}</span>
                    </li>
                ))}
            </ul>
        </div>

        <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-zinc-900 text-center">Mantenha o controle e dure mais tempo</h2>
        </div>

        {/* Personalized Plan */}
        <div className="bg-white border-2 border-zinc-100 rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-zinc-900 p-4 text-center">
                <h3 className="text-white font-bold tracking-wider">SEU PLANO PERSONALIZADO</h3>
            </div>
            <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 gap-4 text-sm">
                    <div className="flex justify-between border-b pb-2">
                        <span className="text-zinc-500">Idade:</span>
                        <span className="font-bold">{answers.age}</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                        <span className="text-zinc-500">Objetivo de tempo de duração:</span>
                        <span className="font-bold text-green-600">30 minutos ou mais</span>
                    </div>
                     <div className="flex justify-between border-b pb-2">
                        <span className="text-zinc-500">Objetivo Principal:</span>
                        <span className="font-bold text-right w-1/2">{answers.goals[0] || "Durar mais tempo"}</span>
                    </div>
                </div>

                <div className="space-y-6 mt-8">
                    {[
                        { week: "Semana 1", title: "Destrua a ansiedade", desc: "Destrua a ansiedade de desempenho e elimine imediatamente as tensões que sabotam sua potência." },
                        { week: "Semana 2", title: "Amplifique sua sensibilidade", desc: "Amplifique sua sensibilidade física e prenda sua mente no momento — sem distrações, sem falhas." },
                        { week: "Semana 3", title: "Domine sua estimulação", desc: "Domine sua estimulação, assuma o controle total do ritmo e pare de perder o comando na hora H." },
                        { week: "Semana 4", title: "Silencie o excesso", desc: "Silencie o excesso de pensamentos, desbloqueie sua confiança máxima e consolide um desempenho que só melhora." },
                    ].map((item, i) => (
                        <div key={i} className="flex gap-4">
                            <div className="flex flex-col items-center">
                                <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center font-bold text-sm shrink-0">{i + 1}</div>
                                {i < 3 && <div className="w-0.5 h-full bg-green-200 my-1"></div>}
                            </div>
                            <div className="pb-4">
                                <h4 className="font-bold text-zinc-900">{item.week}: {item.title}</h4>
                                <p className="text-sm text-zinc-600 mt-1">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        {/* Deliverables */}
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-center">O QUE VOCÊ VAI RECEBER</h2>
            
            <div className="bg-green-50 p-6 rounded-xl border border-green-100">
                <h3 className="font-bold text-lg text-green-800 mb-2 text-center">Oferta Especial Personalizada – HipnoDURA+</h3>
                <p className="text-sm text-zinc-700">Método HipnoDURA+ – Acesso Vitalício</p>
                <p className="text-sm text-zinc-600 mt-2">Sessões de auto-hipnose guiada desenvolvidas para reprogramar sua mente e recuperar seu controle, potência e resistência sexual.</p>
            </div>

            <div className="space-y-4">
                 {[
                    { title: "Reprogramação dos Gatilhos Mentais de Falha", desc: "Aprenda a neutralizar ansiedade, tensão e pensamentos acelerados que te fazem perder o domínio na hora H." },
                    { title: "Controle de Estimulação e Ritmo", desc: "Treine sua mente para sustentar o desejo sem perder o comando, prolongando naturalmente o tempo na cama." },
                    { title: "Resultados Reais e Evolutivos", desc: "Você cria confiança, presença e performance contínua — sem remédios, sem efeitos colaterais, sem depender de nada externo." }
                 ].map((feat, i) => (
                     <div key={i} className="flex gap-3">
                         <div className="text-green-500 mt-1"><CheckIcon /></div>
                         <div>
                             <h4 className="font-bold text-zinc-900">{feat.title}</h4>
                             <p className="text-sm text-zinc-600">{feat.desc}</p>
                         </div>
                     </div>
                 ))}
            </div>
        </div>

        {/* Bonuses */}
        <div className="bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-6">
            <h3 className="text-center font-bold text-xl text-yellow-800 mb-6">BÔNUS EXCLUSIVOS (por tempo limitado):</h3>
            <div className="space-y-6">
                {[
                    { name: "Áudio “Controle Total no Momento H”", val: "67,00", desc: "Um áudio avançado de hipnose para usar antes da relação e entrar imediatamente no estado ideal de foco e controle." },
                    { name: "E-book “Desbloqueio da Potência Masculina”", val: "47,00", desc: "Guia prático para entender o que limita sua performance e como reverter isso de forma simples e permanente." },
                    { name: "Sessão Extra “Ansiedade Zero”", val: "57,00", desc: "Áudio especial para eliminar o medo de falhar, a pressão e o nervosismo que atrapalham seu desempenho." },
                    { name: "Guia “Domínio do Ritmo e Resistência”", val: "67,00", desc: "Técnicas mentais e físicas para controlar o tempo e aumentar sua duração progressivamente." },
                    { name: "Grupo VIP de Evolução Masculina – Acesso Vitalício", val: "197,00", desc: "Comunidade exclusiva com suporte, acompanhamento e troca entre homens focados em evolução e potência." },
                ].map((bonus, i) => (
                    <div key={i} className="border-b border-yellow-200 last:border-0 pb-4 last:pb-0">
                        <div className="flex gap-2 mb-1">
                            <span className="text-2xl">🎁</span>
                            <h4 className="font-bold text-zinc-900 text-sm">{bonus.name} <span className="text-zinc-500 font-normal">(VALOR: R$ {bonus.val})</span></h4>
                        </div>
                        <p className="text-xs text-zinc-700 pl-9">{bonus.desc}</p>
                    </div>
                ))}
            </div>
        </div>

        {/* Pricing */}
        <div className="bg-white shadow-2xl rounded-2xl p-6 border-2 border-green-500 text-center space-y-4">
            <p className="text-zinc-500 line-through">VALOR TOTAL DOS BÔNUS: R$ 435,00</p>
            <p className="font-bold text-green-600 text-lg">HOJE: TOTALMENTE GRÁTIS JUNTO COM O MÉTODO HIPNODURA+!</p>
            <div className="py-4">
                <span className="block text-red-600 font-bold text-sm">de R$ 197,00 por apenas</span>
                <span className="block text-5xl font-extrabold text-green-600">R$ 47,00</span>
                <span className="block text-zinc-500 text-sm">Pagamento Único</span>
            </div>
            <Button className="w-full text-xl py-6 animate-pulse" onClick={() => window.open('https://pay.kirvano.com/172a231a-c12f-4ce9-b50b-ec44161ed6d9', '_blank')}>
                🔥 QUERO MEU PLANO AGORA
            </Button>
        </div>

        {/* Comparison Table */}
        <div className="space-y-6">
            <h3 className="font-bold text-center text-lg">📊 Compare os Custos Para Aumentar o Desempenho Sexual:</h3>
            <div className="space-y-4 text-sm">
                {[
                    { name: "Viagra / Cialis (1 mês)", cost: "R$ 300 – R$ 600", note: "Efeito temporário, dependência e efeitos colaterais.", bad: true },
                    { name: "Tratamentos em clínicas masculinas", cost: "R$ 1.000 – R$ 5.000", note: "Sessões invasivas, dolorosas e sem garantia real.", bad: true },
                    { name: "Terapia sexual tradicional", cost: "R$ 400 por sessão", note: "Resultados lentos, exige meses indo toda semana.", bad: true },
                    { name: "Injeções penianas", cost: "R$ 600 por aplicação", note: "Dolorosas, arriscadas e efeito curto.", bad: true },
                    { name: "Auto-Hipnose para Potência Sexual (MÉTODO COMPLETO)", cost: "R$ 47,00", note: "Reprograme sua mente. Dure mais. Controle seu ritmo. Sinta a diferença desde a primeira sessão.", highlight: true }
                ].map((item, i) => (
                    <div key={i} className={`p-4 rounded-xl border ${item.highlight ? 'bg-green-50 border-green-500 shadow-lg' : 'bg-gray-50 border-gray-200 opacity-80'}`}>
                        <div className="flex justify-between font-bold mb-1">
                            <span>{item.name}</span>
                            <span>{item.cost}</span>
                        </div>
                        <p className="text-xs text-zinc-600">{item.note}</p>
                    </div>
                ))}
            </div>
            <p className="text-center font-medium text-zinc-700 italic">A mesma potência, controle e confiança — sem remédios, sem riscos e sem gastar uma fortuna.</p>
        </div>

        {/* Carousel */}
        <div className="space-y-4">
            <h3 className="font-bold text-center uppercase text-zinc-500 text-sm tracking-widest">ALGUMAS TRANSFORMAÇÕES COM O HIPNODURA+</h3>
            
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="h-64 relative bg-gray-100">
                    <img src={testimonials[activeTestimonial].img} alt="Testimonial" className="w-full h-full object-cover" />
                </div>
                <div className="p-6 text-center space-y-3">
                    <div className="flex justify-center text-yellow-400 text-lg">★★★★★</div>
                    <p className="text-zinc-600 text-sm italic leading-relaxed">
                        "{testimonials[activeTestimonial].text}"
                    </p>
                    <p className="text-zinc-900 font-bold text-sm border-t border-gray-100 pt-3 inline-block px-4">
                        {testimonials[activeTestimonial].name}
                    </p>
                </div>
            </div>

            <div className="flex justify-center gap-2">
                {testimonials.map((_, i) => (
                    <div key={i} className={`w-2 h-2 rounded-full transition-all ${i === activeTestimonial ? 'bg-green-600 w-4' : 'bg-gray-300'}`} />
                ))}
            </div>
        </div>

        {/* How it works */}
        <div className="bg-zinc-900 text-white p-8 rounded-3xl space-y-8">
            <h2 className="text-2xl font-bold text-center">Como funciona?</h2>
            <div className="space-y-6">
                {[
                    { icon: "🧘‍♂️", text: "Encontre um lugar tranquilo onde você possa relaxar" },
                    { icon: "📱", text: "Acesse a gravação na nossa área de membros" },
                    { icon: "🎧", text: "Ouça uma sessão de 20 minutos por dia" },
                    { icon: "🚀", text: "Comece a aproveitar os primeiros resultados em apenas uma semana" }
                ].map((step, i) => (
                    <div key={i} className="flex items-center gap-4">
                        <div className="text-3xl">{step.icon}</div>
                        <p className="font-medium">{step.text}</p>
                    </div>
                ))}
            </div>
            <Button variant="primary" className="w-full mt-4 bg-white text-zinc-900 hover:bg-gray-100 shadow-none" onClick={() => window.open('https://pay.kirvano.com/172a231a-c12f-4ce9-b50b-ec44161ed6d9', '_blank')}>
                QUERO O HIPNODURA+
            </Button>
        </div>

        {/* Guarantee */}
        <div className="border border-green-200 bg-green-50 p-6 rounded-2xl text-center space-y-4">
            <div className="text-4xl">🛡️</div>
            <h3 className="font-bold text-xl text-zinc-900">GARANTIA DE 7 DIAS</h3>
            <p className="text-sm text-zinc-700 leading-relaxed">
                Sua satisfação é nossa prioridade. Se por qualquer motivo você não estiver 100% satisfeito com o Método HipnoDURA+ nos primeiros 7 dias, basta nos enviar um e-mail. Devolveremos todo o seu dinheiro, sem perguntas.
            </p>
        </div>

        {/* FAQ */}
        <div className="space-y-6">
            <h3 className="text-center font-bold text-xl">Perguntas Frequentes</h3>
            <div className="space-y-2">
                {[
                    { q: "Preciso ter experiência com hipnose?", a: "Não! O método é 100% guiado e fácil de seguir." },
                    { q: "Funciona para qualquer idade?", a: "Sim, nossos alunos variam de 18 a 75 anos." },
                    { q: "Como recebo o acesso?", a: "Imediatamente após a confirmação do pagamento, você recebe um e-mail com seus dados de acesso." },
                    { q: "É seguro?", a: "Totalmente seguro e natural. Sem remédios ou efeitos colaterais." }
                ].map((faq, i) => (
                    <details key={i} className="bg-white border border-gray-200 rounded-lg p-4 group">
                        <summary className="font-bold text-zinc-800 cursor-pointer list-none flex justify-between items-center">
                            {faq.q}
                            <span className="text-green-500 transition-transform group-open:rotate-180">▼</span>
                        </summary>
                        <p className="mt-2 text-sm text-zinc-600">{faq.a}</p>
                    </details>
                ))}
            </div>
        </div>

      </div>
    </div>
  );
};

// --- MAIN APP LOGIC ---

export default function App() {
  const [step, setStep] = useState<StepType>('INTRO');
  const [answers, setAnswers] = useState<UserAnswers>({} as UserAnswers);

  const updateAnswer = (key: keyof UserAnswers, value: any) => {
    setAnswers(prev => ({ ...prev, [key]: value }));
  };

  const next = (nextStep: StepType) => {
      window.scrollTo(0,0);
      setStep(nextStep);
  }

  // Calculate Dates for Charts
  const now = new Date();
  const months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
  const currentMonthName = months[now.getMonth()];
  
  // Safe next month calculation to avoid date overflow issues
  const nextMonthIndex = (now.getMonth() + 1) % 12;
  const nextMonthName = months[nextMonthIndex];


  switch (step) {
    case 'INTRO':
      return <Intro onNext={() => next('Q1')} />;
    
    case 'Q1':
      return <QuizSingleSelect 
        progress={5}
        question="Quantos anos você tem?" 
        options={["18-30", "31-40", "41-50", "51-60", "61-70", "70+"]} 
        onSelect={(val: string) => { updateAnswer('age', val); next('Q2'); }} 
      />;

    case 'Q2':
        return <QuizSingleSelect 
            progress={10}
            question="Você está em um relacionamento?" 
            options={["Casado", "Saindo com alguém", "Solteiro", "Outro"]} 
            onSelect={(val: string) => { updateAnswer('relationship', val); next('Q3'); }} 
        />;

    case 'Q3':
        return <QuizMultiSelect 
            progress={15}
            question="Você está passando por quais dificuldades no momento?" 
            subtitle="Você pode selecionar a quantidade que quiser"
            options={["Dificuldade de durar mais tempo durante o sexo", "Orgasmo com baixa intensidade", "Problemas com ereção", "Ejaculação difícil de controlar", "Outro"]} 
            onNext={(vals: string[]) => { updateAnswer('difficulties', vals); next('Q4'); }} 
        />;

    case 'Q4':
        return <QuizSingleSelect 
            progress={20}
            question="Um número cada vez maior de profissionais da psicologia recomenda o HipnoDURA +. Você recebeu recomendação de um(a) psicólogo(a)?" 
            options={["Sim", "Não"]} 
            onSelect={(val: string) => { updateAnswer('psychologist', val); next('TESTIMONIAL_1'); }} 
        />;

    case 'TESTIMONIAL_1':
        return <Interstitial 
            text="Veja o depoimento de Antônio depois que conheceu o HipnoDURA +"
            image="https://i.imgur.com/l5grIUl.jpg"
            onNext={() => next('INTERSTITIAL_1')}
        >
             <div className="bg-green-50 p-5 rounded-xl text-left border border-green-100 relative shadow-sm mt-2">
                <div className="absolute -top-3 left-4 bg-green-500 text-white px-3 py-0.5 rounded-full text-xs font-bold shadow-sm">COMPRA VERIFICADA</div>
                <p className="text-zinc-700 italic text-sm mt-3 leading-relaxed">
                    "Rapaz, vou te contar... eu já tinha tentado de tudo, viu? Gastava o que não tinha com remédio e só me dava dor de cabeça. A patroa já tava até perdendo a paciência.
                    <br/><br/>
                    Aí apareceu esse tal de HipnoDURA+. No começo fiquei meio assim, achando que era conversa fiada, mas resolvi tentar.
                    <br/><br/>
                    Olha, foi a melhor coisa que fiz! Hoje eu que mando no negócio, não passo mais vergonha e a mulher tá rindo à toa. O negócio funciona de verdade, pode confiar!"
                </p>
                <div className="mt-3 flex items-center gap-1">
                    <span className="font-bold text-zinc-900 text-sm">Antônio Silva</span>
                    <span className="text-yellow-500 text-sm">★★★★★</span>
                </div>
            </div>
        </Interstitial>;

    case 'INTERSTITIAL_1':
        return <Interstitial 
            text="A hipnoterapia oferece técnicas eficazes para você gerenciar e superar desafios relacionados ao desempenho, derrubar barreiras mentais, aumentar a confiança e melhorar o controle, resultando em melhores experiências sexuais."
            image="https://i.imgur.com/7aCjwTs.jpeg"
            onNext={() => next('Q5')}
        >
            <p className="text-zinc-500 italic mt-4 text-center">Vamos saber mais sobre você e sua experiência.</p>
        </Interstitial>;

    case 'Q5':
        return <QuizSingleSelect 
            progress={30}
            question="Quanto tempo o sexo dura para você?" 
            options={["Menos de 3 minutos", "3-7 minutos", "7-15 minutos", "15 minutos ou mais", "Prefiro não responder"]} 
            onSelect={(val: string) => { updateAnswer('duration', val); next('Q6'); }} 
        />;

    case 'Q6':
        return <QuizSingleSelect 
            progress={35}
            question="Você tem usado pílulas/remédios para melhorar sua vida sexual?" 
            options={["Sim, o tempo todo", "Tomo algo do tipo de vez em quando", "Raramente", "Não, nunca", "Não quero responder"]} 
            onSelect={(val: string) => { updateAnswer('pills', val); next('Q7'); }} 
        />;

    case 'Q7':
        return <QuizSingleSelect 
            progress={40}
            question="Com qual frequência você assiste pornografia?" 
            options={["Diariamente", "Várias vezes por semana", "Várias vezes por mês", "Nunca", "Não quero responder"]} 
            onSelect={(val: string) => { updateAnswer('porn', val); next('INTERSTITIAL_2'); }} 
        />;

    case 'INTERSTITIAL_2':
        return <Interstitial 
            text="A hipnoterapia ajuda a lidar com a ejaculação precoce e os problemas de desempenho. Ela acessa o seu subconsciente e reformula padrões prejudiciais, estimulando sua confiança e controle. Assim, você gerencia respostas e desenvolve reações mais saudáveis e fortalecedoras."
            image="https://i.imgur.com/z33P4uf.jpeg"
            onNext={() => next('Q8')}
        />;

    case 'Q8':
        return <QuizSingleSelect 
            progress={50}
            question="Você fuma?" 
            options={["Sim, regularmente", "Sim, de vez em quando", "Não, eu parei", "Não, eu nunca fumei"]} 
            onSelect={(val: string) => { updateAnswer('smoking', val); next('Q9'); }} 
        />;

    case 'Q9':
        return <QuizSingleSelect 
            progress={55}
            question="Como você classificaria seu nível de estresse diário?" 
            options={["Muito alto", "Alto", "Médio", "Baixo", "Muito baixo"]} 
            onSelect={(val: string) => { updateAnswer('stress', val); next('Q10'); }} 
        />;

    case 'Q10':
        return <QuizSingleSelect 
            progress={60}
            question="Você pratica atividade física?" 
            options={["Sim, frequentemente", "Sim, de vez em quando", "Não, mas quero começar", "Não, prefiro levar uma vida mais relaxada"]} 
            onSelect={(val: string) => { updateAnswer('activity', val); next('INTERSTITIAL_3'); }} 
        />;

    case 'INTERSTITIAL_3':
        return <Interstitial 
            text="Muitas das soluções disponíveis não tratam a causa raiz dos problemas de desempenho: o desalinhamento entre a mente consciente e subconsciente, que prejudica a confiança, o controle e o bem-estar sexual no geral. A hipnoterapia é diferente."
            chart={<PerformanceChart />}
            onNext={() => next('Q11')}
        />;

    case 'Q11':
        return <QuizSingleSelect 
            progress={70}
            question="Você notou uma diminuição do seu desejo sexual ao longo do tempo?" 
            options={["Sim, significativamente", "Sim, de certa forma", "Não, continua a mesma coisa", "Não, na verdade, aumentou", "Não quero responder"]} 
            onSelect={(val: string) => { updateAnswer('desire', val); next('Q12'); }} 
        />;

    case 'Q12':
        return <QuizSingleSelect 
            progress={75}
            question="Você ejacula antes do que gostaria?" 
            options={["Sim", "Algumas vezes", "Não", "Não quero responder"]} 
            onSelect={(val: string) => { updateAnswer('earlyEjaculation', val); next('Q13'); }} 
        />;

    case 'Q13':
        return <QuizSingleSelect 
            progress={80}
            question="Você está sentindo que sua parceira está decepcionada com o seu desempenho?" 
            options={["Sim", "Algumas vezes", "Eu não sei", "Não", "Não quero responder"]} 
            onSelect={(val: string) => { updateAnswer('partnerDisappointment', val); next('INTERSTITIAL_4'); }} 
        />;

    case 'INTERSTITIAL_4':
        return <Interstitial 
            text="Muitos homens enfrentam problemas de desempenho sexual causados por barreiras emocionais e experiências do passado. A hipnoterapia ajuda a lidar com esses problemas subjacentes e a melhorar a experiência sexual no geral."
            image="https://i.imgur.com/KXHJEaU.jpeg"
            onNext={() => next('Q14')}
        >
            <p className="text-zinc-600 mt-4 text-center">A hipnose melhora o desempenho sexual por meio da demolição de barreiras mentais e da construção de confiança. Ela reprograma padrões de pensamento negativos, proporcionando mais controle, conforto e satisfação.</p>
        </Interstitial>;

    case 'Q14':
        return <QuizMultiSelect 
            progress={85}
            question="Como você se sente sobre seu desempenho sexual?" 
            subtitle="Você pode selecionar a quantidade que quiser"
            options={["Confiante e satisfeito", "Feliz de modo geral, porém ansioso de vez em quando", "De vez em quando estressado ou autoconsciente", "Muitas vezes me sinto pouco confiante ou preocupado", "Não quero responder"]} 
            onNext={(vals: string[]) => { updateAnswer('feelings', vals); next('Q15'); }} 
        />;

    case 'Q15':
        return <QuizSingleSelect 
            progress={90}
            question="Quanto tempo você gostaria de durar com sua parceira?" 
            options={["10 minutos", "15 minutos", "20 minutos", "25 minutos", "30 minutos ou mais"]} 
            onSelect={(val: string) => { updateAnswer('goalDuration', val); next('Q16'); }} 
        />;

    case 'Q16':
        return <QuizMultiSelect 
            progress={95}
            question="Como você gostaria de mudar sua vida sexual?" 
            subtitle="Você pode selecionar a quantidade que quiser"
            options={["Dure mais tempo durante o sexo", "Tenha orgasmos mais intensos", "Tenha ereções mais rígidas", "Melhore o controle da sua ejaculação", "Outro"]} 
            onNext={(vals: string[]) => { updateAnswer('goals', vals); next('INTERSTITIAL_5'); }} 
        />;

    case 'INTERSTITIAL_5':
        return <Interstitial 
            text="O HipnoDURA + pode ajudar você a melhorar o seu desempenho sexual com apenas 20 minutos por dia. Usando o programa de hipnoterapia personalizado de Roberto A. Oliveira, você vai ganhar confiança, aumentar seu controle e ter maior satisfação."
            image="https://i.imgur.com/HiZ4txZ.jpeg"
            onNext={() => next('ANALYSIS')}
        >
             <p className="text-zinc-600 mt-4 text-center">A melhor parte é que ajuda você a derrubar barreiras mentais e obter controle, tudo no conforto da sua casa.</p>
        </Interstitial>;

    case 'ANALYSIS':
        return <Analysis onComplete={() => next('RESULT_1')} />;

    case 'RESULT_1':
        return (
            <Layout>
                <div className="flex-1 px-6 py-8 flex flex-col space-y-6">
                    <div className="bg-green-50 border border-green-200 p-4 rounded-xl text-center">
                        <h2 className="font-bold text-green-800 uppercase text-lg">VOCÊ FOI APROVADO E SELECIONADO PARA USAR O HIPNODURA +</h2>
                    </div>
                    
                    <div>
                        <h3 className="text-lg font-bold text-zinc-900 mb-2 text-center">O que está bloqueando seu desempenho?</h3>
                        <div className="bg-white shadow-lg rounded-xl p-4 border border-gray-100">
                             <div className="flex justify-between items-center mb-2">
                                <span className="font-bold text-red-600">Confiança reduzida</span>
                                <span className="font-bold text-red-600 bg-red-100 px-2 rounded">28/100</span>
                             </div>
                             <p className="text-zinc-600 text-sm mb-4">Suas respostas mostram sinais de baixa autoestima e falta de controle. A baixa autoestima e a falta de controle está afetando sua intimidade.</p>
                             <div className="text-red-600 text-4xl text-center font-bold">!</div>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 text-center">
                        <div className="flex flex-col items-center">
                            <span className="text-2xl mb-1">⏱️</span>
                            <span className="text-xs font-bold text-zinc-500">Desempenho</span>
                            <div className="w-full bg-gray-200 h-2 rounded mt-1"><div className="w-[20%] bg-red-500 h-full rounded"></div></div>
                            <span className="text-xs font-bold text-red-600 mt-1">BAIXO</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <span className="text-2xl mb-1">🤦‍♂️</span>
                            <span className="text-xs font-bold text-zinc-500">Estresse</span>
                            <div className="w-full bg-gray-200 h-2 rounded mt-1"><div className="w-[90%] bg-red-500 h-full rounded"></div></div>
                            <span className="text-xs font-bold text-red-600 mt-1">ALTO</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <span className="text-2xl mb-1">🦁</span>
                            <span className="text-xs font-bold text-zinc-500">Confiança</span>
                            <div className="w-full bg-gray-200 h-2 rounded mt-1"><div className="w-[15%] bg-red-500 h-full rounded"></div></div>
                            <span className="text-xs font-bold text-red-600 mt-1">POUCA</span>
                        </div>
                    </div>

                    <div className="bg-zinc-900 text-white p-4 rounded-xl text-center">
                        <p className="font-medium">O programa HipnoDURA + vai mudar positivamente todas essas áreas. Fazendo você virar um macho ALFA</p>
                    </div>

                    <div className="space-y-2">
                        <h3 className="font-bold text-zinc-900 text-center">A hipnoterapia é algo seguro para você?</h3>
                        <p className="text-zinc-600">Você é um candidato ideal para a hipnoterapia para melhorar suas experiências íntimas.</p>
                    </div>

                    <div className="mt-auto">
                        <Button onClick={() => next('RESULT_2')}>CONTINUAR</Button>
                    </div>
                </div>
            </Layout>
        );

    case 'RESULT_2':
        return (
            <Layout>
                <div className="flex-1 px-6 py-8 flex flex-col space-y-8 text-center">
                     <h2 className="text-2xl font-bold text-zinc-900 leading-tight">
                        DURAR MAIS ATÉ <span className="text-green-600 uppercase">{nextMonthName}</span>
                     </h2>
                     <p className="text-zinc-600 font-medium">92% dos homens como você relatam melhorias em suas vidas íntimas depois de concluir o programa!</p>
                     
                     <div className="w-full">
                        <PredictionChart currentMonth={currentMonthName} nextMonth={nextMonthName} />
                     </div>

                     <p className="text-zinc-800 font-bold">Com base em suas respostas, prevemos que você aumentará seu tempo de duração antes de <span className="uppercase text-green-600">{nextMonthName}</span>!</p>

                     <div className="mt-auto w-full">
                        <Button onClick={() => next('RESULT_3')}>CONTINUAR</Button>
                     </div>
                </div>
            </Layout>
        );

    case 'RESULT_3':
        return (
             <Layout>
                <div className="flex-1 px-6 py-8 flex flex-col space-y-8">
                     <h2 className="text-2xl font-bold text-zinc-900 text-center">Melhoria da intimidade e muito mais</h2>
                     <p className="text-zinc-600 text-center">Você irá notar melhorias nestas áreas:</p>
                     
                     <div className="space-y-6">
                        <div className="bg-green-50 p-6 rounded-2xl border-l-4 border-green-500">
                            <h3 className="font-bold text-lg text-zinc-900">Relacionamentos mais próximos</h3>
                            <p className="text-zinc-700">9 de 10 usuários se sentem mais conectados com seus parceiros.</p>
                        </div>
                        <div className="bg-green-50 p-6 rounded-2xl border-l-4 border-green-500">
                            <h3 className="font-bold text-lg text-zinc-900">Aumento da confiança</h3>
                            <p className="text-zinc-700">8 de 10 usuários experimentaram um aumento na confiança geral.</p>
                        </div>
                        <div className="bg-green-50 p-6 rounded-2xl border-l-4 border-green-500">
                            <h3 className="font-bold text-lg text-zinc-900">Melhoria do humor</h3>
                            <p className="text-zinc-700">9 de 10 usuários se sentem mais conectados e satisfeitos, deixando as frustrações para trás.</p>
                        </div>
                     </div>

                     <div className="mt-auto w-full">
                        <Button onClick={() => next('RESULT_4')}>CONTINUAR</Button>
                     </div>
                </div>
            </Layout>
        );

    case 'RESULT_4':
        return (
             <Layout>
                <div className="flex-1 px-6 py-8 flex flex-col space-y-6 text-center">
                     <h2 className="text-3xl font-bold text-green-600">Taxa de sucesso de 93%</h2>
                     <p className="font-bold text-zinc-900 uppercase tracking-widest text-sm">Com comprovação científica, verificado pelos usuários</p>
                     
                     <p className="text-zinc-600 leading-relaxed text-left text-sm">
                        O Hypnozio foi desenvolvido com a ajuda dos melhores especialistas em hipnoterapia, cada um trazendo sua experiência única para garantir a eficácia de cada sessão. Pesquisas indicam que a hipnose demonstra uma incrível taxa de sucesso de 93%, superando tratamentos comportamentais e psicoterapêuticos. Descubra o poder transformador da hipnoterapia sem restrições ou riscos. Inúmeras pessoas aumentaram sua confiança no quarto com a hipnoterapia - nós o convidamos a experimentar o mesmo!
                     </p>

                     <div className="rounded-2xl overflow-hidden shadow-lg mx-auto w-full">
                        <img src="https://i.imgur.com/HiZ4txZ.jpeg" alt="Therapy" className="w-full h-auto object-cover" />
                     </div>

                     <p className="text-sm text-zinc-500 font-medium">Desenvolvido com a ajuda dos melhores especialistas em hipnoterapia</p>

                     <div className="mt-auto w-full pt-4">
                        <Button onClick={() => next('VIDEO_SAMPLE')}>CONTINUAR</Button>
                     </div>
                </div>
            </Layout>
        );

    case 'VIDEO_SAMPLE':
        return (
            <Layout>
                <div className="flex-1 px-6 py-8 flex flex-col space-y-8 items-center text-center">
                     <div>
                        <h2 className="text-2xl font-bold text-zinc-900 mb-2">Ainda com dúvida?</h2>
                        <p className="text-zinc-600 font-medium text-lg">Escute esse pequeno exemplo !</p>
                     </div>

                     <div className="w-full rounded-2xl overflow-hidden shadow-2xl bg-black border-4 border-zinc-100">
                        <video 
                            src="https://i.imgur.com/3XxCwQj.mp4" 
                            controls 
                            playsInline 
                            className="w-full h-auto" 
                        />
                     </div>

                     <div className="mt-auto w-full pt-4">
                        <Button onClick={() => next('SALES')}>CONTINUAR</Button>
                     </div>
                </div>
            </Layout>
        );
    
    case 'SALES':
        return <SalesPage answers={answers} />;

    default:
      return null;
  }
}