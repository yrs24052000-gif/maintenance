import { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { ArrowLeft, Calendar, AlertCircle, User } from "lucide-react";

interface HistoricalTicket {
  id: string;
  issueType: string;
  status: string;
  dateCompleted: string;
  staffAssigned: string;
  priority: string;
}

interface UnitHistoryProps {
  unitNumber: string;
  propertyName: string;
  tickets: HistoricalTicket[];
  onBack: () => void;
  onViewDetails: (ticketId: string) => void;
}

export function UnitHistory({ unitNumber, propertyName, tickets, onBack, onViewDetails }: UnitHistoryProps) {
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterIssue, setFilterIssue] = useState("all");

  const issueTypes = [...new Set(tickets.map(t => t.issueType))];

  const filteredTickets = tickets.filter(ticket => {
    const statusMatch = filterStatus === "all" || ticket.status === filterStatus;
    const issueMatch = filterIssue === "all" || ticket.issueType === filterIssue;
    return statusMatch && issueMatch;
  });

  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'Complete':
        return 'bg-white text-blue-500 border-2 border-blue-500';
      case 'In Progress':
        return 'bg-white text-green-500 border-2 border-green-500';
      case 'Archive':
        return 'bg-white text-gray-500 border-2 border-gray-500';
      default:
        return 'bg-white text-purple-500 border-2 border-purple-500';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50/30 pb-20 md:pb-8">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div 
          className="bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800"
          style={{ background: 'linear-gradient(135deg, #793dfb 0%, #6930e0 50%, #5a28c9 100%)' }}
        >
          <div className="absolute inset-0 opacity-10 overflow-hidden">
            <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-32 -translate-y-32"></div>
          </div>
          
          <div className="relative px-4 sm:px-6 lg:px-8 py-6 max-w-7xl mx-auto">
            <div className="flex items-center gap-3">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={onBack}
                className="text-white hover:bg-white/20 flex-shrink-0"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div className="min-w-0">
                <h2 className="text-white text-lg sm:text-xl">Unit History</h2>
                <p className="text-sm text-white/80 truncate">{propertyName} - Unit {unitNumber}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-6 lg:px-8 mt-6 max-w-4xl mx-auto">
        {/* Filters */}
        <Card className="p-4 sm:p-6 mb-4 shadow-lg">
          <h3 className="mb-3 text-base sm:text-lg">Filter Tickets</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs sm:text-sm text-muted-foreground mb-1.5 block">Status</label>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Done">Done</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Open">Open</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-xs sm:text-sm text-muted-foreground mb-1.5 block">Issue Type</label>
              <Select value={filterIssue} onValueChange={setFilterIssue}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Issues</SelectItem>
                  {issueTypes.map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        <div className="mb-3">
          <span className="text-xs sm:text-sm text-muted-foreground">
            {filteredTickets.length} ticket{filteredTickets.length !== 1 ? 's' : ''} found
          </span>
        </div>

        {/* Tickets List */}
        {filteredTickets.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground bg-white rounded-2xl shadow-sm">
            No tickets found with the selected filters
          </div>
        ) : (
          <div className="space-y-3">
            {filteredTickets.map(ticket => (
              <Card key={ticket.id} className="p-4 sm:p-5 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-3">
                  <div className="flex-1 min-w-0">
                    <span className="text-xs sm:text-sm text-muted-foreground">#{ticket.id}</span>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center flex-shrink-0">
                        <AlertCircle className="w-4 h-4 text-blue-600" />
                      </div>
                      <span className="text-sm sm:text-base break-words">{ticket.issueType}</span>
                    </div>
                  </div>
                  <Badge className={`${getStatusStyles(ticket.status)} whitespace-nowrap text-xs`}>
                    {ticket.status}
                  </Badge>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-orange-50/50 border border-orange-100">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center flex-shrink-0">
                      <Calendar className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-xs sm:text-sm text-muted-foreground">{ticket.dateCompleted}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-green-50/50 border border-green-100">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center flex-shrink-0">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-xs sm:text-sm text-muted-foreground truncate">{ticket.staffAssigned}</span>
                  </div>
                </div>

                <Button 
                  size="sm"
                  variant="ghost"
                  className="w-full border-2 border-purple-500 text-purple-500 hover:bg-purple-50 bg-white text-xs sm:text-sm h-8 sm:h-9"
                  onClick={() => onViewDetails(ticket.id)}
                >
                  View Details
                </Button>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
