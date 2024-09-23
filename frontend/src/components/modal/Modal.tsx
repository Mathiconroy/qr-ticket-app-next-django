import { useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { BsX } from 'react-icons/bs';

export function Modal({
  isOpen,
  onClose,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
  // TODO: Figure out why the backdrop doesn't work.
  const dialogRef = useRef<HTMLDivElement | null>(null);
  if (isOpen) {
    return createPortal(
      <div
        className={
          'fixed py-4 backdrop-blur-md bg-white text-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 container z-50'
        }
        ref={dialogRef}
      >
        <div className={'flex absolute top-0 right-0 justify-end'}>
          <button onClick={onClose}>
            <BsX size={40} />
          </button>
        </div>
        {children}
      </div>,
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
