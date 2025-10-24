import { useState, useRef, useEffect } from "react";
import { Logo } from "./Logo";
import { User, Bell } from "lucide-react";
import { Button } from "./ui/button";

interface DesktopNavProps {
  activeScreen: string;
  onNavigate: (screen: string) => void;
  unassignedCount?: number;
}

export function DesktopNav({ activeScreen, onNavigate, unassignedCount = 0 }: DesktopNavProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    }

    if (showNotifications) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [showNotifications]);

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-8">
            <div className="cursor-pointer" onClick={() => onNavigate('queue')}>
              <Logo />
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant={activeScreen === 'profile' ? 'default' : 'ghost'}
              onClick={() => onNavigate('profile')}
              size="icon"
              className={activeScreen === 'profile' ? 'bg-[#793dfb] hover:bg-[#6930e0]' : ''}
            >
              <User className="w-5 h-5" />
            </Button>
            
            <div className="relative" ref={notificationRef}>
              <Button 
                variant="ghost" 
                size="icon" 
                className="relative"
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </Button>
              
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 p-4 z-[100]">
                  <div className="space-y-3">
                    <h3 className="text-sm">Notifications</h3>
                    <div className="space-y-2">
                      <div className="p-3 rounded-lg bg-red-50 border border-red-100">
                        <div className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-red-500 rounded-full mt-1.5 flex-shrink-0"></div>
                          <div className="flex-1">
                            <p className="text-sm">New priority ticket has been added</p>
                            <p className="text-xs text-muted-foreground mt-1">Just now</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
