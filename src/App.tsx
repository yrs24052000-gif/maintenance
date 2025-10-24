import { useState } from "react";
import { TicketQueue } from "./components/TicketQueue";
import { TicketDetails } from "./components/TicketDetails";
import { UnitHistory } from "./components/UnitHistory";
import { Profile } from "./components/Profile";
import { BottomNav } from "./components/BottomNav";
import { DesktopNav } from "./components/DesktopNav";
import { Footer } from "./components/Footer";
import { ChatBox } from "./components/ChatBox";
import { Toaster } from "./components/ui/sonner";
import { toast } from "sonner@2.0.3";

interface Ticket {
  id: string;
  propertyName: string;
  unitNumber: string;
  issueType: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'Open' | 'In Progress' | 'Complete' | 'Archive';
  createdDate: string;
  description: string;
  assignedTo?: string;
  tenantName?: string;
  tenantContact?: string;
  notes?: string[];
  photos?: string[];
  tenantPhotos?: string[];
}

const mockTickets: Ticket[] = [
  {
    id: "T-2024-001",
    propertyName: "Sunset Apartments",
    unitNumber: "204",
    issueType: "Plumbing",
    priority: "High",
    status: "Open",
    createdDate: "Oct 8, 2025",
    description: "Leaking pipe under kitchen sink. Water pooling on floor.",
    tenantName: "Sarah Johnson",
    tenantContact: "(555) 123-4567",
    notes: [],
    photos: [],
    tenantPhotos: ["https://images.unsplash.com/photo-1700174542278-4f8fc5ab6565?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicm9rZW4lMjBraXRjaGVuJTIwc2lua3xlbnwxfHx8fDE3NjA1MjE3MTJ8MA&ixlib=rb-4.1.0&q=80&w=1080"]
  },
  {
    id: "T-2024-002",
    propertyName: "Harbor View Complex",
    unitNumber: "105",
    issueType: "Electrical",
    priority: "Medium",
    status: "In Progress",
    createdDate: "Oct 7, 2025",
    description: "Outlet in bedroom not working. No power to the left wall.",
    assignedTo: "John Smith",
    tenantName: "Michael Chen",
    tenantContact: "(555) 234-5678",
    notes: ["Checked breaker box - circuit is fine", "Scheduled replacement for tomorrow"],
    photos: [],
    tenantPhotos: ["https://images.unsplash.com/photo-1467733238130-bb6846885316?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJpY2FsJTIwb3V0bGV0JTIwcHJvYmxlbXxlbnwxfHx8fDE3NjA1MjE3MTN8MA&ixlib=rb-4.1.0&q=80&w=1080"]
  },
  {
    id: "T-2024-003",
    propertyName: "Oak Street Residences",
    unitNumber: "301",
    issueType: "HVAC",
    priority: "Low",
    status: "Open",
    createdDate: "Oct 6, 2025",
    description: "Air conditioning not cooling effectively. Temperature stays at 78°F.",
    tenantName: "Emma Davis",
    tenantContact: "(555) 345-6789",
    notes: [],
    photos: [],
    tenantPhotos: ["https://images.unsplash.com/photo-1647022528152-52ed9338611d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhaXIlMjBjb25kaXRpb25pbmclMjB1bml0fGVufDF8fHx8MTc2MDUyMTcxM3ww&ixlib=rb-4.1.0&q=80&w=1080"]
  },
  {
    id: "T-2024-004",
    propertyName: "Sunset Apartments",
    unitNumber: "102",
    issueType: "Appliance",
    priority: "Medium",
    status: "In Progress",
    createdDate: "Oct 5, 2025",
    description: "Refrigerator making loud noise and not keeping food cold.",
    assignedTo: "John Smith",
    tenantName: "Robert Wilson",
    tenantContact: "(555) 456-7890",
    notes: ["Compressor issue confirmed", "Ordered replacement parts"],
    photos: [],
    tenantPhotos: ["https://images.unsplash.com/photo-1582484898866-ac15ca496f0d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicm9rZW4lMjByZWZyaWdlcmF0b3J8ZW58MXx8fHwxNzYwNTIxNzEzfDA&ixlib=rb-4.1.0&q=80&w=1080"]
  },
  {
    id: "T-2024-005",
    propertyName: "Harbor View Complex",
    unitNumber: "210",
    issueType: "Plumbing",
    priority: "High",
    status: "Open",
    createdDate: "Oct 9, 2025",
    description: "Toilet constantly running. Water bill concerns.",
    tenantName: "Lisa Anderson",
    tenantContact: "(555) 567-8901",
    notes: [],
    photos: []
  },
  {
    id: "T-2024-006",
    propertyName: "Oak Street Residences",
    unitNumber: "204",
    issueType: "General Maintenance",
    priority: "Low",
    status: "Complete",
    createdDate: "Oct 3, 2025",
    description: "Window screen needs replacement in living room.",
    assignedTo: "John Smith",
    tenantName: "David Martinez",
    tenantContact: "(555) 678-9012",
    notes: ["Measured window", "Installed new screen", "Completed and verified with tenant"],
    photos: []
  },
  {
    id: "T-2024-007",
    propertyName: "Sunset Apartments",
    unitNumber: "305",
    issueType: "Electrical",
    priority: "High",
    status: "Open",
    createdDate: "Oct 9, 2025",
    description: "Multiple outlets not working in main bedroom. Possible circuit issue.",
    tenantName: "Jessica Taylor",
    tenantContact: "(555) 789-0123",
    notes: [],
    photos: []
  },
  {
    id: "T-2024-008",
    propertyName: "Harbor View Complex",
    unitNumber: "115",
    issueType: "Door/Lock",
    priority: "Medium",
    status: "Archive",
    createdDate: "Oct 2, 2025",
    description: "Front door lock sticking. Difficult to unlock.",
    assignedTo: "John Smith",
    tenantName: "Amanda White",
    tenantContact: "(555) 890-1234",
    notes: ["Lubricated lock mechanism", "Replaced worn key", "Lock functioning properly"],
    photos: []
  }
];

const mockHistoricalTickets = [
  {
    id: "T-2024-020",
    issueType: "Plumbing",
    status: "Complete",
    dateCompleted: "Sep 15, 2025",
    staffAssigned: "Mike Johnson",
    priority: "Medium"
  },
  {
    id: "T-2024-015",
    issueType: "Electrical",
    status: "Complete",
    dateCompleted: "Aug 22, 2025",
    staffAssigned: "John Smith",
    priority: "High"
  },
  {
    id: "T-2024-008",
    issueType: "HVAC",
    status: "Archive",
    dateCompleted: "Jul 10, 2025",
    staffAssigned: "Mike Johnson",
    priority: "Low"
  },
  {
    id: "T-2024-003",
    issueType: "General Maintenance",
    status: "Archive",
    dateCompleted: "Jun 5, 2025",
    staffAssigned: "John Smith",
    priority: "Low"
  }
];

const currentStaff = {
  name: "John Smith",
  email: "john.smith@dormity.com",
  phone: "(555) 123-4567",
  assignedProperties: ["Sunset Apartments", "Harbor View Complex", "Oak Street Residences"]
};

export default function App() {
  const [screen, setScreen] = useState<'queue' | 'details' | 'history' | 'profile'>('queue');
  const [tickets, setTickets] = useState<Ticket[]>(mockTickets);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [historyUnit, setHistoryUnit] = useState<string>("");
  const [historyProperty, setHistoryProperty] = useState<string>("");
  const [activeTab, setActiveTab] = useState<string>("all");

  const unassignedCount = tickets.filter(t => !t.assignedTo).length;

  const handleViewDetails = (ticket: Ticket, fromTab: string) => {
    setSelectedTicket(ticket);
    setActiveTab(fromTab);
    setScreen('details');
  };

  const handleClaimTicket = (ticketId: string) => {
    setTickets(tickets.map(t => 
      t.id === ticketId ? { ...t, assignedTo: currentStaff.name, status: 'In Progress' as const } : t
    ));
    if (selectedTicket?.id === ticketId) {
      setSelectedTicket({ ...selectedTicket, assignedTo: currentStaff.name, status: 'In Progress' });
    }
    toast.success("Ticket added to My Tickets!");
  };

  const handleUpdateStatus = (ticketId: string, status: 'Open' | 'In Progress' | 'Complete' | 'Archive') => {
    setTickets(tickets.map(t => 
      t.id === ticketId ? { ...t, status } : t
    ));
    if (selectedTicket?.id === ticketId) {
      setSelectedTicket({ ...selectedTicket, status });
    }
    toast.success(`Status updated to ${status}`);
  };

  const handleUpdatePriority = (ticketId: string, priority: 'High' | 'Medium' | 'Low') => {
    setTickets(tickets.map(t => 
      t.id === ticketId ? { ...t, priority } : t
    ));
    if (selectedTicket?.id === ticketId) {
      setSelectedTicket({ ...selectedTicket, priority });
    }
    toast.success(`Priority updated to ${priority}`);
  };

  const handleAddNote = (ticketId: string, note: string) => {
    setTickets(tickets.map(t => 
      t.id === ticketId ? { ...t, notes: [...(t.notes || []), note] } : t
    ));
    if (selectedTicket?.id === ticketId) {
      setSelectedTicket({ ...selectedTicket, notes: [...(selectedTicket.notes || []), note] });
    }
    toast.success("Note added successfully!");
  };

  const handleSeekApproval = (ticketId: string) => {
    toast.success("Approval request sent to leasing agent!");
  };

  const handleComplete = (ticketId: string) => {
    handleUpdateStatus(ticketId, 'Archive');
    toast.success("Ticket moved to archive!");
  };

  const handleViewUnitHistory = (unitNumber: string) => {
    const ticket = tickets.find(t => t.unitNumber === unitNumber);
    if (ticket) {
      setHistoryUnit(unitNumber);
      setHistoryProperty(ticket.propertyName);
      setScreen('history');
    }
  };

  const handleLogout = () => {
    toast.success("Logged out successfully!");
    // In a real app, this would clear session and redirect to login
  };

  const handleNavigate = (navScreen: string) => {
    setScreen(navScreen as 'queue' | 'profile');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Desktop Navigation - Hidden on mobile */}
      <div className="hidden md:block">
        <DesktopNav 
          activeScreen={screen === 'details' || screen === 'history' ? 'queue' : screen} 
          onNavigate={handleNavigate}
          unassignedCount={unassignedCount}
        />
      </div>

      {/* Main Content */}
      <div className="w-full">
        {screen === 'queue' && (
          <TicketQueue
            tickets={tickets}
            onViewDetails={handleViewDetails}
            onClaimTicket={handleClaimTicket}
            currentStaff={currentStaff.name}
            initialTab={activeTab}
            onSeekApproval={handleSeekApproval}
            onComplete={handleComplete}
            onAddNote={handleAddNote}
          />
        )}

        {screen === 'details' && selectedTicket && (
          <TicketDetails
            ticket={selectedTicket}
            onBack={() => {
              setScreen('queue');
            }}
            onUpdateStatus={handleUpdateStatus}
            onAddNote={handleAddNote}
            onClaimTicket={handleClaimTicket}
            onViewUnitHistory={handleViewUnitHistory}
            currentStaff={currentStaff.name}
          />
        )}

        {screen === 'history' && (
          <UnitHistory
            unitNumber={historyUnit}
            propertyName={historyProperty}
            tickets={mockHistoricalTickets}
            onBack={() => setScreen('details')}
            onViewDetails={(ticketId) => {
              toast.info("Historical ticket details would load here");
            }}
          />
        )}

        {screen === 'profile' && (
          <Profile
            staff={currentStaff}
            onBack={() => setScreen('queue')}
            onLogout={handleLogout}
          />
        )}
      </div>

      {/* Mobile Bottom Navigation - Hidden on desktop */}
      <div className="md:hidden">
        <BottomNav 
          activeScreen={screen === 'details' || screen === 'history' ? 'queue' : screen} 
          onNavigate={handleNavigate} 
        />
      </div>

      {/* Footer */}
      <Footer />

      {/* Chat Box */}
      <ChatBox />
      
      <Toaster />
    </div>
  );
}
