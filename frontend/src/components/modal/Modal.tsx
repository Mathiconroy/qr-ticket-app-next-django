import { useRef, useState } from 'react';
import { createPortal } from 'react-dom';

export function Modal({
  isOpen,
  onClose,
  onOpen,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  children: React.ReactNode;
}) {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  return createPortal(
    <dialog
      open
      className={
        'fixed text-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 container bg-white z-50'
      }
      ref={dialogRef}
      onMouseDown={(e) => {
        if (dialogRef.current !== null && e.target === dialogRef.current) {
          onClose();
        }
      }}
    >
      {children}
    </dialog>,
    document.body,
  );
}

export const useModal = () => {
  const [isOpen, setIsOpen] = useState<Boolean>(false);
  return {
    isOpen: isOpen,
    onOpen: () => setIsOpen(true),
    onClose: () => setIsOpen(false),
    onToggle: () => setIsOpen(!isOpen),
  };
};
