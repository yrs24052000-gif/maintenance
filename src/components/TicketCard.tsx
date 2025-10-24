import { useState } from "react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Clock, X, RotateCcw } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ImageViewer } from "./ImageViewer";
import { Textarea } from "./ui/textarea";

interface TicketCardProps {
  ticket: {
    id: string;
    propertyName: string;
    unitNumber: string;
    issueType: string;
    priority: 'High' | 'Medium' | 'Low';
    status: 'Open' | 'In Progress' | 'Complete' | 'Archive';
    createdDate: string;
    description: string;
  };
  onViewDetails: () => void;
  onClaim?: () => void;
  showClaimButton?: boolean;
  onSeekApproval?: () => void;
  onComplete?: () => void;
  onAddNote?: (note: string) => void;
}

export function TicketCard({ ticket, onViewDetails, onClaim, showClaimButton, onSeekApproval, onComplete, onAddNote }: TicketCardProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [fullPageImage, setFullPageImage] = useState<string | null>(null);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [note, setNote] = useState<string>("");

  const getPriorityStyles = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'bg-gradient-to-r from-red-500 to-pink-500 text-white border-0 shadow-md';
      case 'Medium':
        return 'bg-gradient-to-r from-orange-500 to-yellow-400 text-white border-0 shadow-md';
      case 'Low':
        return 'bg-gradient-to-r from-yellow-400 to-yellow-300 text-white border-0 shadow-md';
      default:
        return 'bg-gradient-to-r from-gray-500 to-gray-400 text-white border-0 shadow-md';
    }
  };

  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'In Progress':
        return 'bg-gradient-to-r from-green-500 to-emerald-400 text-white border-0 shadow-md';
      case 'Complete':
        return 'bg-gradient-to-r from-blue-500 to-cyan-400 text-white border-0 shadow-md';
      case 'Archive':
        return 'bg-gradient-to-r from-gray-500 to-gray-400 text-white border-0 shadow-md';
      default:
        return 'bg-gradient-to-r from-gray-500 to-gray-400 text-white border-0 shadow-md';
    }
  };

  const priorityStyles = getPriorityStyles(ticket.priority);

  const getStatusBgColor = (status: string) => {
    switch (status) {
      case 'Open':
        return 'bg-gradient-to-br from-orange-100 to-orange-50';
      case 'In Progress':
        return 'bg-gradient-to-br from-green-100 to-green-50';
      case 'Complete':
        return 'bg-gradient-to-br from-blue-100 to-blue-50';
      case 'Archive':
        return 'bg-gradient-to-br from-gray-100 to-gray-50';
      default:
        return 'bg-white';
    }
  };

  const getPriorityDotColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'bg-red-500';
      case 'Medium':
        return 'bg-orange-500';
      case 'Low':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-500';
    }
  };

  // Sample images for the gallery (only 2 images)
  const sampleImages = [
    'https://images.unsplash.com/photo-1759692072150-166d6387c616?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwbHVtYmluZyUyMHJlcGFpcnxlbnwxfHx8fDE3NjA2MTI5NTh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1576446468729-7674e99608f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJpY2FsJTIwd2lyaW5nfGVufDF8fHx8MTc2MDY5OTc3Mnww&ixlib=rb-4.1.0&q=80&w=1080',
  ];

  // Display priority text as "Urgent" instead of "High"
  const displayPriority = ticket.priority === 'High' ? 'Urgent' : ticket.priority;

  const handleImageClick = () => {
    if (selectedImage) {
      setFullPageImage(selectedImage);
    }
  };

  const handleCloseFullPage = () => {
    setFullPageImage(null);
  };

  const handleCardClick = (e: React.MouseEvent) => {
    // Don't flip if clicking on images or buttons
    const target = e.target as HTMLElement;
    if (
      target.closest('button') || 
      target.closest('img') || 
      target.closest('.image-thumbnail') ||
      selectedImage
    ) {
      return;
    }
    setIsFlipped(!isFlipped);
  };

  const handleAddNoteClick = () => {
    if (note.trim() && onAddNote) {
      onAddNote(note.trim());
      setNote("");
    }
  };

  return (
    <>
      {/* Full Page Image Viewer */}
      {fullPageImage && (
        <ImageViewer 
          imageUrl={fullPageImage}
          onClose={handleCloseFullPage}
        />
      )}

      <div 
        className="mb-3 sm:mb-4"
        style={{ perspective: '1000px' }}
      >
        <div
          className="relative w-full transition-all duration-500"
          style={{ 
            transformStyle: 'preserve-3d',
            transition: 'transform 0.6s',
            transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
          }}
        >
          {/* Front of Card */}
          <Card 
            className={`relative p-4 sm:p-5 hover:shadow-xl ${selectedImage ? 'bg-black' : getStatusBgColor(ticket.status)} overflow-hidden border border-gray-200/50 cursor-pointer`}
            style={{ 
              backfaceVisibility: 'hidden'
            }}
            onClick={handleCardClick}
          >
          {selectedImage ? (
          // Image Preview Mode - Image shown in card
          <div className="relative w-full">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-2 right-2 z-20 bg-white/90 hover:bg-white text-black rounded-full p-2 transition-colors shadow-lg"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div 
              className="relative w-full rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
              onClick={handleImageClick}
            >
              <div className="aspect-video flex items-center justify-center">
                <ImageWithFallback 
                  src={selectedImage} 
                  alt="Preview"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>
        ) : (
        // Normal Card Mode
        <>
          {/* Gradient overlay for visual interest */}
          <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-purple-50 to-transparent rounded-bl-full opacity-50 pointer-events-none"></div>
          
          <div className="relative">
            {/* Top Section: Left and Right */}
            <div className="flex justify-between gap-3">
              {/* Left Side - All content */}
              <div className="flex-1">
                {/* Date */}
                <div className="flex items-center gap-1.5 mb-2">
                  <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0 text-gray-400" />
                  <span className="truncate text-xs sm:text-sm text-gray-500" style={{ fontWeight: 400 }}>{ticket.createdDate}</span>
                </div>

                {/* Ticket ID */}
                <div className="flex items-center gap-2 px-0 py-0 w-fit mb-2">
                  <span className="text-xs sm:text-sm truncate bg-gradient-to-r from-purple-600 to-fuchsia-400 bg-clip-text text-transparent" style={{ fontWeight: 700 }}>#{ticket.id}</span>
                  <div className={`w-2 h-2 rounded-full ${getPriorityDotColor(ticket.priority)} flex-shrink-0`}></div>
                </div>
                
                {/* Unit Number and Property Name - Combined on same line */}
                <div className="flex items-center gap-2 mb-2">
                  <p className="" style={{ fontWeight: 600, color: '#1a1a1a' }}>{ticket.unitNumber}</p>
                  <div className="w-1 h-1 rounded-full bg-gray-400 flex-shrink-0"></div>
                  <p className="text-xs sm:text-sm truncate" style={{ color: '#9ca3af', fontWeight: 400 }}>{ticket.propertyName}</p>
                </div>
                
                {/* Issue Type */}
                <p className="text-sm sm:text-base mb-2" style={{ fontWeight: 500, color: '#374151' }}>{ticket.issueType}</p>

                {/* Description - Full Width */}
                <p className="text-xs sm:text-sm line-clamp-2 bg-transparent p-0 rounded-lg border-0" style={{ color: '#6b7280', fontWeight: 400 }}>
                  {ticket.description}
                </p>
              </div>

              {/* Right Side - Badges, Claim Button, and Images */}
              <div className="flex flex-col items-end gap-2">
                {/* Priority + Status/Claim badges */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  <Badge className={`${priorityStyles} text-xs`}>
                    {displayPriority}
                  </Badge>
                  {ticket.status !== 'Open' ? (
                    <Badge className={`${getStatusStyles(ticket.status)} text-xs whitespace-nowrap`}>
                      {ticket.status}
                    </Badge>
                  ) : (
                    (ticket.status === 'Open' || showClaimButton) && (
                      <Badge 
                        onClick={() => onClaim?.()}
                        className="bg-gradient-to-r from-purple-600 to-pink-500 text-white hover:from-purple-700 hover:to-pink-600 transition-all duration-300 text-xs whitespace-nowrap cursor-pointer border-0 shadow-md"
                      >
                        Claim
                      </Badge>
                    )
                  )}
                </div>

                {/* Image Gallery - Below badges */}
                <div className="flex gap-1.5 mt-2">
                  {sampleImages.map((img, index) => (
                    <button
                      key={index}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedImage(img);
                      }}
                      className="image-thumbnail w-10 h-10 rounded-lg overflow-hidden bg-gray-100 hover:opacity-80 transition-all border-2 border-gray-200 flex-shrink-0 hover:border-purple-400"
                    >
                      <ImageWithFallback 
                        src={img}
                        alt={`Image ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </>
        )}
          </Card>

          {/* Back of Card - Flipped View */}
          <Card 
            className={`absolute inset-0 p-4 sm:p-5 ${getStatusBgColor(ticket.status)} overflow-hidden border border-gray-200/50`}
            style={{
              transform: 'rotateY(180deg)',
              backfaceVisibility: 'hidden'
            }}
            onClick={handleCardClick}
          >
              {/* Gradient overlay for visual interest */}
              <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-purple-50 to-transparent rounded-bl-full opacity-50 pointer-events-none"></div>
              
              <div className="relative h-full flex flex-col">
                {/* Top Action Buttons */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSeekApproval?.();
                    }}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white border-0 shadow-md text-xs sm:text-sm py-2"
                  >
                    Seek Approval
                  </Button>
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (note.trim() && onAddNote) {
                        onAddNote(note.trim());
                        setNote("");
                      }
                      onComplete?.();
                    }}
                    disabled={ticket.status === 'Archive'}
                    className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 text-white border-0 shadow-md text-xs sm:text-sm py-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Complete
                  </Button>
                </div>

                {/* Notes Section */}
                <div className="flex flex-col">
                  <label className="text-sm mb-2" style={{ fontWeight: 600, color: '#374151' }}>
                    Notes
                  </label>
                  <Textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    onClick={(e) => e.stopPropagation()}
                    placeholder="Type your notes here..."
                    className="w-full h-20 resize-none bg-white/50 border-gray-300 text-sm"
                  />
                </div>
              </div>
          </Card>
        </div>
      </div>
    </>
  );
}
