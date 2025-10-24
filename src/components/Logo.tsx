import { Home } from "lucide-react";

export function Logo({ variant = 'default' }: { variant?: 'default' | 'light' }) {
  return (
    <div className="flex items-center gap-3">
      <div 
        className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg transition-transform hover:scale-105" 
        style={{ 
          background: variant === 'light' ? 'white' : 'linear-gradient(135deg, #793dfb 0%, #9b6dff 100%)'
        }}
      >
        <Home className={`w-6 h-6 ${variant === 'light' ? 'text-[#793dfb]' : 'text-white'}`} />
      </div>
      <span 
        className="text-2xl tracking-tight" 
        style={{ 
          color: variant === 'light' ? 'white' : '#793dfb',
          fontWeight: '600'
        }}
      >
        Dormity
      </span>
    </div>
  );
}
