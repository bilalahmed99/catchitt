import React, { useState, useRef, useEffect } from 'react';
import {
  Dialog, DialogTitle, DialogContent,
  Tabs, Tab, Box, Button
} from '@mui/material';
import DndContainer from './DndContainerNew';

interface ThumbnailEditorModalProps {
  open: boolean;
  onClose: () => void;
  videoThumbnails: string[];
  selectedThumb: number;
  onSelectThumbnail: (index: number) => void;
  onCustomThumbnail: (file: File) => void;
  currentThumbnail: string | null;
}

const ThumbnailEditorModal: React.FC<ThumbnailEditorModalProps> = ({
  open,
  onClose,
  videoThumbnails,
  selectedThumb,
  onSelectThumbnail,
  onCustomThumbnail,
  currentThumbnail,
}) => {
  const [tab, setTab] = useState<'select' | 'upload'>('select');
  const [customCover, setCustomCover] = useState<string | null>(null);
  const [preview, setPreview] = useState<string>(currentThumbnail || '');
  const thumbnailsRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [linePosition, setLinePosition] = useState(50); // Initial center position for the line (50%)

  // Handle Manual Selection
  const handleSelectFrame = (thumbUrl: string, index: number) => {
    setPreview(thumbUrl); // Set preview to the clicked thumbnail
    onSelectThumbnail(index); // Set selected thumbnail in parent component
  };

  const handleCustomUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = e => {
      const url = e.target?.result as string;
      setPreview(url); // Set preview for custom upload
      setCustomCover(url);
      onCustomThumbnail(file); // Notify parent about the custom thumbnail
    };
    reader.readAsDataURL(file);
  };

  // Handle Mouse Down (for dragging line)
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.target !== lineRef.current) return; // Only drag if the mouse is down on the line
    setIsDragging(true);
    setStartX(e.clientX);
    if (thumbnailsRef.current) {
      setScrollLeft(thumbnailsRef.current.scrollLeft);
    }
  };

  // Handle Mouse Move (for dragging line)
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const moveX = e.clientX - startX;
    if (thumbnailsRef.current) {
      thumbnailsRef.current.scrollLeft = scrollLeft - moveX;
    }

    // Update the center line position based on mouse movement
    const newPosition = linePosition + (e.clientX - startX) * 100 / window.innerWidth;
    setLinePosition(Math.max(0, Math.min(100, newPosition))); // Keep it within bounds (0% to 100%)
  };

  // Handle Mouse Up (for dragging line)
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Detect the thumbnail that is centered
  useEffect(() => {
    const detectThumbnailInView = () => {
      if (thumbnailsRef.current && !preview) { // Only detect if preview is not already set
        const thumbnailsContainer = thumbnailsRef.current;
        const thumbnails = thumbnailsContainer.children;
        const containerWidth = thumbnailsContainer.offsetWidth;
        const centerX = thumbnailsContainer.scrollLeft + containerWidth / 2;

        let closestIndex = -1;
        let closestDistance = Number.MAX_VALUE;

        for (let i = 0; i < thumbnails.length; i++) {
          const thumb = thumbnails[i] as HTMLElement;
          const thumbCenterX = thumb.offsetLeft + thumb.offsetWidth / 2;
          const distance = Math.abs(thumbCenterX - centerX);

          if (distance < closestDistance) {
            closestDistance = distance;
            closestIndex = i;
          }
        }

        if (closestIndex !== -1) {
          const selectedThumbnail = videoThumbnails[closestIndex];
          setPreview(selectedThumbnail); // Update preview image based on the closest thumbnail
          onSelectThumbnail(closestIndex); // Update the selected thumbnail in parent component
        }
      }
    };

    detectThumbnailInView();
    const interval = setInterval(detectThumbnailInView, 100); // Update every 100ms

    return () => clearInterval(interval); // Cleanup on component unmount
  }, [scrollLeft, videoThumbnails, preview, onSelectThumbnail]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ px: 3, pt: 3, pb: 1 }}>Edit Thumbnail</DialogTitle>

      <DialogContent sx={{ px: 3 }}>
        {/* Tabs */}
        <Tabs
          value={tab}
          onChange={(_, newVal) => setTab(newVal)}
          sx={{ mb: 2 }}
        >
          <Tab value="select" label="Select cover" />
          <Tab value="upload" label="Upload cover" />
        </Tabs>

        {/* Preview */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            height: '220px',
            mb: 3,
          }}
        >
          {preview && (
            <img
              src={preview}
              alt="Preview"
              style={{
                height: '200px',
                objectFit: 'contain',
                borderRadius: '4px',
              }}
            />
          )}
        </Box>

        {/* Thumbnail Slider (Select tab) */}
        {tab === 'select' && (
          <Box sx={{ position: 'relative', height: 90, mb: 4 }}>
            {/* Dynamic center slider line */}
            <Box
              ref={lineRef}
              sx={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                width: '2px',
                backgroundColor: '#00BCD4',
                left: `${linePosition}%`,
                transform: 'translateX(-50%)',
                zIndex: 2,
                transition: 'left 0s', // Prevent animation on mouse drag
                cursor: 'ew-resize', // Indicate to the user that it can be dragged
              }}
              onMouseDown={handleMouseDown}
            />
            {/* Thumbnails scrollable container */}
            <Box
              ref={thumbnailsRef}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              sx={{
                display: 'flex',
                overflowX: 'auto',
                px: 1,
                height: '100%',
                scrollbarWidth: 'none',
                '&::-webkit-scrollbar': { display: 'none' },
                cursor: isDragging ? 'grabbing' : 'grab',
              }}
            >
              {videoThumbnails.map((thumb, idx) => (
                <Box
                  key={idx}
                  onClick={() => handleSelectFrame(thumb, idx)} // Image click works here
                  sx={{
                    flexShrink: 0,
                    width: '80px',
                    height: '80px',
                    cursor: 'pointer',
                    border:
                      selectedThumb === idx
                        ? '2px solid #00BCD4'
                        : '2px solid transparent',
                    borderRadius: '4px',
                    overflow: 'hidden',
                  }}
                >
                  <img
                    src={thumb}
                    alt={`Thumb ${idx}`}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </Box>
              ))}
            </Box>
          </Box>
        )}

        {/* Upload Tab */}
        {tab === 'upload' && (
          <Box sx={{ mb: 3 }}>
            <DndContainer
              crop
              text="Drag and drop cover image here"
              orText="click to browse"
              onChangeFile={handleCustomUpload}
              aspect={62 / 127}
            />
          </Box>
        )}

        {/* Confirm Button */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
          <Button
            variant="contained"
            color="error"
            onClick={onClose}
            sx={{ px: 4, borderRadius: '8px' }}
          >
            Confirm
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ThumbnailEditorModal;
