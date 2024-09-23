import { useRef, useState } from 'react';
import { createPortal } from 'react-dom';

export function Modal({
  isOpen,
  onClose,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  if (isOpen) {
    return createPortal(
      <dialog
        open
        className={
          'fixed backdrop-blur-md text-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 container bg-white z-50'
        }
        ref={dialogRef}
        onMouseDown={(e) => {
          if (dialogRef.current !== null && e.target === dialogRef.current) {
            console.log('Clicked inside modal.');
            onClose();
          }
        }}
      >
        {children}
        <button onClick={onClose}>Close</button>
      </dialog>,
      document.body,
    );
  } else {
    return null;
  }
}

export const useModal = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return {
    isOpen: isOpen,
    onOpen: () => setIsOpen(true),
    onClose: () => setIsOpen(false),
    onToggle: () => setIsOpen(!isOpen),
  };
};
