import { useState } from "react";
import { X, ZoomIn, ZoomOut } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface ImageViewerProps {
  imageUrl: string;
  onClose: () => void;
}

export function ImageViewer({ imageUrl, onClose }: ImageViewerProps) {
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  const handleZoomToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (zoomLevel === 1) {
      setZoomLevel(2);
    } else {
      setZoomLevel(1);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-black flex items-center justify-center"
      onClick={handleBackdropClick}
    >
      {/* Close Button - Top right of screen */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-50 bg-white/20 hover:bg-white/30 text-white rounded-full p-2 transition-all duration-200 backdrop-blur-sm"
        aria-label="Close"
      >
        <X className="w-5 h-5" />
      </button>

      {/* Image Container with aspect ratio preserved */}
      <div className="relative w-full h-full flex items-center justify-center overflow-auto">
        <div 
          className="relative transition-transform duration-300 ease-out"
          style={{ transform: `scale(${zoomLevel})` }}
        >
          <ImageWithFallback 
            src={imageUrl} 
            alt="Full view"
            className={`max-w-[90vw] max-h-[90vh] w-auto h-auto object-contain ${
              zoomLevel === 1 ? 'cursor-zoom-in' : 'cursor-zoom-out'
            }`}
            onClick={handleZoomToggle}
          />
        </div>
      </div>
    </div>
  );
}
