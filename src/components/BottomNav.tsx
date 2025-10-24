import { ClipboardList, User } from "lucide-react";

interface BottomNavProps {
  activeScreen: string;
  onNavigate: (screen: string) => void;
}

export function BottomNav({ activeScreen, onNavigate }: BottomNavProps) {
  const navItems = [
    { id: 'queue', label: 'Tickets', icon: ClipboardList },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg safe-area-inset-bottom z-50">
      <div className="flex justify-around items-center max-w-md mx-auto px-2">
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = activeScreen === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center gap-1.5 py-3 px-6 rounded-xl transition-all duration-200 ${
                isActive ? 'text-white scale-105' : 'text-gray-500 hover:text-gray-700'
              }`}
              style={isActive ? { 
                background: 'linear-gradient(135deg, #793dfb 0%, #9b6dff 100%)',
                boxShadow: '0 4px 12px rgba(121, 61, 251, 0.3)'
              } : {}}
            >
              <Icon className={`w-6 h-6 ${isActive ? 'animate-pulse' : ''}`} />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
