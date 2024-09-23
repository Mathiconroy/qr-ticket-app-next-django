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
  const dialogRef = useRef<HTMLDivElement | null>(null);
  if (isOpen) {
    return createPortal(
      <div
        className={
          'fixed flex justify-center items-center backdrop-blur-md w-screen h-screen top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  z-50'
        }
        ref={dialogRef}
      >
        <div className={'bg-white h-fit py-4 text-center rounded-xl relative container'}>
          <div className={'flex absolute top-0 right-0 justify-end'}>
            <button onClick={onClose}>
              <BsX size={40} />
            </button>
          </div>
          {children}
        </div>
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
