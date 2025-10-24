import { Button } from "./ui/button";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { ArrowLeft, Mail, LogOut, Bell, User } from "lucide-react";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";

interface ProfileProps {
  staff: {
    name: string;
    email: string;
    phone: string;
    assignedProperties: string[];
  };
  onBack: () => void;
  onLogout: () => void;
}

export function Profile({ staff, onBack, onLogout }: ProfileProps) {
  const initials = staff.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onBack}
              className="flex-shrink-0 md:hidden"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-xl">Profile</h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-5xl mx-auto space-y-4">
          {/* Profile Info Card */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <Avatar className="w-16 h-16">
                  <AvatarFallback 
                    className="text-xl text-white"
                    style={{ background: 'linear-gradient(135deg, #793dfb 0%, #6930e0 100%)' }}
                  >
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-xl mb-1">{staff.name}</h2>
                  <p className="text-sm text-muted-foreground">{staff.email}</p>
                </div>
              </div>
              
              {/* Logout Button */}
              <Button 
                variant="ghost"
                onClick={onLogout}
                className="border-2 border-purple-500 text-purple-500 hover:bg-purple-50 bg-white"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>

            {/* Notification */}
            <div className="pt-4 border-t border-gray-200">
              <h3 className="mb-4">Notification</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm">New Ticket Alerts</Label>
                    <p className="text-xs text-muted-foreground">Get notified of new tickets</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm">Priority Updates</Label>
                    <p className="text-xs text-muted-foreground">High priority ticket alerts</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
