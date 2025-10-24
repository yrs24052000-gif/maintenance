import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Input } from "./ui/input";
import { Search, Filter, LayoutGrid, List, X } from "lucide-react";
import { TicketCard } from "./TicketCard";
import { Logo } from "./Logo";
import { Button } from "./ui/button";

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

interface TicketQueueProps {
  tickets: Ticket[];
  onViewDetails: (ticket: Ticket, activeTab: string) => void;
  onClaimTicket: (ticketId: string) => void;
  currentStaff: string;
  initialTab?: string;
  onSeekApproval?: (ticketId: string) => void;
  onComplete?: (ticketId: string) => void;
  onAddNote?: (ticketId: string, note: string) => void;
}

export function TicketQueue({ tickets, onViewDetails, onClaimTicket, currentStaff, initialTab = "mytickets", onSeekApproval, onComplete, onAddNote }: TicketQueueProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState(initialTab);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filterTickets = (filterType: string) => {
    let filtered = tickets;
    
    switch (filterType) {
      case 'unclaimed':
        filtered = tickets.filter(t => !t.assignedTo && t.status === 'Open');
        break;
      case 'mytickets':
        filtered = tickets.filter(t => t.assignedTo === currentStaff);
        break;
      case 'active':
        filtered = tickets.filter(t => t.status === 'In Progress');
        break;
      case 'complete':
        filtered = tickets.filter(t => t.status === 'Complete');
        break;
      case 'archive':
        filtered = tickets.filter(t => t.status === 'Archive');
        break;
      default:
        filtered = tickets;
    }

    if (searchQuery) {
      filtered = filtered.filter(t => 
        t.propertyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.issueType.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  };

  const allTickets = filterTickets('all');
  const unassignedTickets = filterTickets('unclaimed');
  const myTickets = filterTickets('mytickets');
  const activeTickets = filterTickets('active');
  const completeTickets = filterTickets('complete');
  const archiveTickets = filterTickets('archive');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50/30 pb-20 md:pb-8">
      {/* Header Section - Mobile Optimized */}
      <div className="px-4 sm:px-6 lg:px-8 pt-6 max-w-7xl mx-auto">
        <div className="relative overflow-hidden rounded-2xl">
          <div 
            className="bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800"
            style={{ background: 'linear-gradient(135deg, #793dfb 0%, #6930e0 50%, #5a28c9 100%)' }}
          >
            {/* Decorative Pattern */}
            <div className="absolute inset-0 opacity-10 overflow-hidden">
              <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-32 -translate-y-32"></div>
              <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-48 translate-y-48"></div>
            </div>
            
            <div className="relative z-10 px-4 sm:px-6 py-6">
              {/* Logo - Hidden on mobile when desktop nav is visible */}
              <div className="mb-4 md:mb-6 block md:hidden">
                <Logo variant="light" />
              </div>
              
              <h1 className="text-white mb-4 md:mb-6 text-xl sm:text-2xl">Maintenance</h1>
              
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400 z-10" />
                <Input
                  placeholder="Search by ticket number, priority, type"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 sm:pl-10 pr-10 bg-white border-0 shadow-lg h-10 sm:h-11 text-sm sm:text-base"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors z-10"
                    aria-label="Clear search"
                  >
                    <X className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-6 lg:px-8 mt-6 max-w-7xl mx-auto">
        <Tabs defaultValue="mytickets" value={activeTab} onValueChange={setActiveTab} className="w-full">
          {/* Tabs List - Mobile Optimized */}
          <div className="flex items-center justify-between mb-4 gap-2 flex-wrap sm:flex-nowrap">
            <TabsList className="grid grid-cols-4 bg-white shadow-md flex-1 min-w-0 h-auto">
              <TabsTrigger value="mytickets" className="text-[10px] sm:text-sm py-1.5 sm:py-2 px-0.5 sm:px-2 data-[state=active]:bg-blue-500 data-[state=active]:text-white flex items-center justify-center gap-1">
                <span>My Tickets</span>
                {myTickets.length > 0 && (
                  <span className="min-w-[18px] h-[18px] sm:min-w-[20px] sm:h-[20px] flex items-center justify-center rounded-full bg-[#793dfb] text-white text-[8px] sm:text-xs px-1.5">
                    {myTickets.length}
                  </span>
                )}
              </TabsTrigger>
              <TabsTrigger value="unclaimed" className="text-[10px] sm:text-sm py-1.5 sm:py-2 px-0.5 sm:px-2 data-[state=active]:bg-blue-500 data-[state=active]:text-white flex items-center justify-center gap-1">
                <span>Unclaimed</span>
                {unassignedTickets.length > 0 && (
                  <span className="min-w-[18px] h-[18px] sm:min-w-[20px] sm:h-[20px] flex items-center justify-center rounded-full bg-red-500 text-white text-[8px] sm:text-xs px-1.5">
                    {unassignedTickets.length}
                  </span>
                )}
              </TabsTrigger>
              <TabsTrigger value="active" className="text-[10px] sm:text-sm py-1.5 sm:py-2 px-0.5 sm:px-2 data-[state=active]:bg-blue-500 data-[state=active]:text-white">
                Active
              </TabsTrigger>
              <TabsTrigger value="all" className="text-[10px] sm:text-sm py-1.5 sm:py-2 px-0.5 sm:px-2 data-[state=active]:bg-blue-500 data-[state=active]:text-white">
                All
              </TabsTrigger>
            </TabsList>

            {/* View Toggle - Desktop Only */}
            <div className="hidden lg:flex items-center gap-1 bg-white rounded-lg shadow-md p-1">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className={viewMode === 'grid' ? 'bg-[#793dfb] hover:bg-[#6930e0]' : ''}
              >
                <LayoutGrid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className={viewMode === 'list' ? 'bg-[#793dfb] hover:bg-[#6930e0]' : ''}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Tickets Grid/List */}
          <TabsContent value="mytickets" className="mt-0">
            {myTickets.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground bg-white rounded-2xl shadow-sm">
                No tickets assigned to you
              </div>
            ) : (
              <div className={viewMode === 'grid' ? 'grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4' : 'space-y-0'}>
                {myTickets.map(ticket => (
                  <TicketCard
                    key={ticket.id}
                    ticket={ticket}
                    onViewDetails={() => onViewDetails(ticket, activeTab)}
                    onSeekApproval={() => onSeekApproval?.(ticket.id)}
                    onComplete={() => onComplete?.(ticket.id)}
                    onAddNote={(note) => onAddNote?.(ticket.id, note)}
                  />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="unclaimed" className="mt-0">
            {unassignedTickets.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground bg-white rounded-2xl shadow-sm">
                No unclaimed tickets
              </div>
            ) : (
              <div className={viewMode === 'grid' ? 'grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4' : 'space-y-0'}>
                {unassignedTickets.map(ticket => (
                  <TicketCard
                    key={ticket.id}
                    ticket={ticket}
                    onViewDetails={() => onViewDetails(ticket, activeTab)}
                    onClaim={() => onClaimTicket(ticket.id)}
                    showClaimButton
                    onSeekApproval={() => onSeekApproval?.(ticket.id)}
                    onComplete={() => onComplete?.(ticket.id)}
                    onAddNote={(note) => onAddNote?.(ticket.id, note)}
                  />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="active" className="mt-0">
            {activeTickets.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground bg-white rounded-2xl shadow-sm">
                No active tickets
              </div>
            ) : (
              <div className={viewMode === 'grid' ? 'grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4' : 'space-y-0'}>
                {activeTickets.map(ticket => (
                  <TicketCard
                    key={ticket.id}
                    ticket={ticket}
                    onViewDetails={() => onViewDetails(ticket, activeTab)}
                    onClaim={() => onClaimTicket(ticket.id)}
                    showClaimButton={!ticket.assignedTo}
                    onSeekApproval={() => onSeekApproval?.(ticket.id)}
                    onComplete={() => onComplete?.(ticket.id)}
                    onAddNote={(note) => onAddNote?.(ticket.id, note)}
                  />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="all" className="mt-0">
            {allTickets.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground bg-white rounded-2xl shadow-sm">
                No tickets found
              </div>
            ) : (
              <div className={viewMode === 'grid' ? 'grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4' : 'space-y-0'}>
                {allTickets.map(ticket => (
                  <TicketCard
                    key={ticket.id}
                    ticket={ticket}
                    onViewDetails={() => onViewDetails(ticket, activeTab)}
                    onClaim={() => onClaimTicket(ticket.id)}
                    onSeekApproval={() => onSeekApproval?.(ticket.id)}
                    onComplete={() => onComplete?.(ticket.id)}
                    onAddNote={(note) => onAddNote?.(ticket.id, note)}
                    showClaimButton={!ticket.assignedTo}
                  />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
