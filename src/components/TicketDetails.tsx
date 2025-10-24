import { useState } from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";
import { Dialog, DialogContent } from "./ui/dialog";
import { ArrowLeft, X, User, Calendar, Paperclip, ChevronDown, ChevronUp } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ImageViewer } from "./ImageViewer";

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

interface TicketDetailsProps {
  ticket: Ticket;
  onBack: () => void;
  onUpdateStatus: (ticketId: string, status: 'Open' | 'In Progress' | 'Complete' | 'Archive') => void;
  onAddNote: (ticketId: string, note: string) => void;
  onClaimTicket: (ticketId: string) => void;
  onViewUnitHistory: (unitNumber: string) => void;
  currentStaff: string;
}

export function TicketDetails({ 
  ticket, 
  onBack, 
  onUpdateStatus, 
  onAddNote,
  onClaimTicket,
  currentStaff 
}: TicketDetailsProps) {
  const [newNote, setNewNote] = useState("");
  const [uploadedPhotos, setUploadedPhotos] = useState<string[]>(ticket.photos || []);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [fullPageImage, setFullPageImage] = useState<string | null>(null);
  const [detailsExpanded, setDetailsExpanded] = useState(true);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Progress':
        return 'bg-white text-green-500 border-2 border-green-500 hover:bg-green-50';
      case 'Complete':
        return 'bg-white text-blue-500 border-2 border-blue-500 hover:bg-blue-50';
      case 'Archive':
        return 'bg-white text-gray-500 border-2 border-gray-500 hover:bg-gray-50';
      default:
        return 'bg-white text-purple-500 border-2 border-purple-500 hover:bg-purple-50';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'text-red-500';
      case 'Medium':
        return 'text-orange-400';
      case 'Low':
        return 'text-yellow-500';
      default:
        return 'text-gray-500';
    }
  };
  
  const displayPriority = ticket.priority === 'High' ? 'Urgent' : ticket.priority;

  const handleAddNote = () => {
    if (newNote.trim()) {
      onAddNote(ticket.id, newNote);
      setNewNote("");
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newPhotos = Array.from(files).map(file => URL.createObjectURL(file));
      setUploadedPhotos([...uploadedPhotos, ...newPhotos]);
    }
  };

  const allPhotos = [...(ticket.tenantPhotos || []), ...uploadedPhotos];

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
              className="flex-shrink-0"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <span className="text-sm text-muted-foreground">#{ticket.id}</span>
          </div>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title */}
            <div>
              <h1 className="text-2xl mb-2">{ticket.issueType} - {ticket.propertyName}</h1>
              <p className="text-sm text-muted-foreground">Unit {ticket.unitNumber}</p>
            </div>

            {/* Description Section */}
            <div>
              <h3 className="mb-3">Description</h3>
              <p className="text-sm leading-relaxed text-gray-700">{ticket.description}</p>
            </div>

            {/* Attachments */}
            {allPhotos.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3>Attachments</h3>
                  <span className="text-sm text-muted-foreground">{allPhotos.length}</span>
                </div>
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                  {allPhotos.map((photo, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(photo)}
                      className="aspect-square rounded-lg overflow-hidden bg-gray-100 hover:opacity-80 transition-opacity border border-gray-200"
                    >
                      <ImageWithFallback 
                        src={photo} 
                        alt={`Attachment ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Comments Section - Only for assigned staff */}
            {ticket.assignedTo === currentStaff && (
              <div>
                <h3 className="mb-3">Comments</h3>
                
                {/* Previous Comments */}
                {ticket.notes && ticket.notes.length > 0 && (
                  <div className="space-y-3 mb-4">
                    {ticket.notes.map((note, index) => (
                      <div key={index} className="flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                          <User className="w-4 h-4 text-purple-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm">{currentStaff}</span>
                            <span className="text-xs text-muted-foreground">Just now</span>
                          </div>
                          <p className="text-sm text-gray-700">{note}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                
                {/* Add Comment */}
                <div className="border border-gray-200 rounded-lg p-3 bg-white">
                  <Textarea
                    placeholder="Add a comment..."
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    rows={3}
                    className="border-0 p-0 focus-visible:ring-0 resize-none mb-2"
                  />
                  <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                    <label>
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                      <Button 
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.preventDefault();
                          (e.currentTarget.previousElementSibling as HTMLInputElement)?.click();
                        }}
                      >
                        <Paperclip className="w-4 h-4" />
                      </Button>
                    </label>
                    <Button 
                      onClick={handleAddNote}
                      size="sm"
                      disabled={!newNote.trim()}
                      variant="ghost"
                      className="bg-gradient-to-r from-purple-600 to-pink-500 text-white hover:from-purple-700 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed border-0"
                    >
                      Save
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Details Panel */}
          <div className="space-y-4">
            {/* Status Dropdown or Claim Button */}
            {ticket.assignedTo === currentStaff ? (
              <Select 
                value={ticket.status} 
                onValueChange={(value) => onUpdateStatus(ticket.id, value as 'Open' | 'In Progress' | 'Complete' | 'Archive')}
              >
                <SelectTrigger className={`${getStatusColor(ticket.status)} border-0`}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Complete">Complete</SelectItem>
                  <SelectItem value="Archive">Archive</SelectItem>
                </SelectContent>
              </Select>
            ) : ticket.status === 'Open' ? (
              <Button 
                onClick={() => onClaimTicket(ticket.id)}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white hover:from-purple-700 hover:to-pink-600 border-0"
              >
                Claim
              </Button>
            ) : (
              <Badge className={`${getStatusColor(ticket.status)} w-full justify-center py-2`}>
                {ticket.status}
              </Badge>
            )}

            {/* Details Section */}
            <div className="bg-white rounded-lg border border-gray-200">
              <button
                onClick={() => setDetailsExpanded(!detailsExpanded)}
                className="w-full flex items-center justify-between p-4 hover:bg-gray-50"
              >
                <h3 className="text-sm">Details</h3>
                {detailsExpanded ? (
                  <ChevronUp className="w-4 h-4 text-muted-foreground" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-muted-foreground" />
                )}
              </button>
              
              {detailsExpanded && (
                <div className="px-4 pb-4 space-y-3 text-sm">
                  {/* Claimed by */}
                  <div className="flex justify-between items-center py-2">
                    <span className="text-muted-foreground">Claimed by</span>
                    {ticket.assignedTo ? (
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center">
                          <User className="w-3 h-3 text-purple-600" />
                        </div>
                        <span>{ticket.assignedTo}</span>
                      </div>
                    ) : (
                      <span className="text-muted-foreground">Unclaimed</span>
                    )}
                  </div>

                  {/* Reporter */}
                  {ticket.tenantName && (
                    <div className="flex justify-between items-center py-2">
                      <span className="text-muted-foreground">Reporter</span>
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                          <User className="w-3 h-3 text-green-600" />
                        </div>
                        <span>{ticket.tenantName}</span>
                      </div>
                    </div>
                  )}

                  {/* Priority */}
                  <div className="flex justify-between items-center py-2">
                    <span className="text-muted-foreground">Priority</span>
                    <span className={getPriorityColor(ticket.priority)}>
                      {displayPriority}
                    </span>
                  </div>

                  {/* Due Date */}
                  <div className="flex justify-between items-center py-2">
                    <span className="text-muted-foreground">Due Date</span>
                    <span>{ticket.createdDate}</span>
                  </div>

                  {/* Contact */}
                  {ticket.tenantContact && (
                    <div className="flex justify-between items-center py-2">
                      <span className="text-muted-foreground">Contact</span>
                      <span className="text-xs">{ticket.tenantContact}</span>
                    </div>
                  )}

                  {/* Property */}
                  <div className="flex justify-between items-center py-2">
                    <span className="text-muted-foreground">Property</span>
                    <span className="text-xs">{ticket.propertyName}</span>
                  </div>

                  {/* Unit */}
                  <div className="flex justify-between items-center py-2">
                    <span className="text-muted-foreground">Unit</span>
                    <span>{ticket.unitNumber}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Image Preview Dialog */}
      {selectedImage && (
        <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
          <DialogContent className="max-w-4xl p-0 bg-black">
            <div 
              className="relative cursor-pointer"
              onClick={() => {
                setFullPageImage(selectedImage);
                setSelectedImage(null);
              }}
            >
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 z-10 bg-black/50 hover:bg-black/70 text-white"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImage(null);
                }}
              >
                <X className="w-5 h-5" />
              </Button>
              <ImageWithFallback 
                src={selectedImage} 
                alt="Preview"
                className="w-full h-auto max-h-[90vh] object-contain"
              />
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Full Page Image Viewer */}
      {fullPageImage && (
        <ImageViewer 
          imageUrl={fullPageImage}
          onClose={() => setFullPageImage(null)}
        />
      )}
    </div>
  );
}
