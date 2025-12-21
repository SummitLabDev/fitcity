import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import useFocusTrap from '../hooks/useFocusTrap';

const VideoDialog = ({ isOpen, onClose, src, label }) => {
  const dialogRef = useRef(null);

  useFocusTrap(isOpen, dialogRef, onClose);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 px-4"
      role="dialog"
      aria-modal="true"
      aria-label={label}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl overflow-hidden rounded-3xl border border-white/10 bg-black shadow-2xl"
        ref={dialogRef}
        tabIndex="-1"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className="absolute right-3 top-3 z-10 rounded-full bg-black/70 px-3 py-1 text-sm text-white hover:bg-black/90"
          aria-label="Sluit video"
          onClick={onClose}
        >
          Sluiten
        </button>
        <video src={src} className="h-full w-full" controls autoPlay playsInline preload="metadata">
          Je browser ondersteunt geen video weergave.
        </video>
      </div>
    </div>,
    document.body
  );
};

export default VideoDialog;
