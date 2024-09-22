'use client';

import { useContext, useRef, useState } from 'react';
import { ModalContext } from '@/components/modal/ModalContext';

export function Modal() {
  const { isOpen, onClose } = useModalContext();
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  if (isOpen) {
    return (
      <dialog
        open
        className={'grid backdrop-blur bg-transparent z-50 w-screen h-screen place-items-center'}
        ref={dialogRef}
        onMouseDown={(e) => {
          if (dialogRef.current !== null && e.target === dialogRef.current) {
            onClose();
          }
        }}
      >
        <div className={'container text-center bg-orange-500 rounded-lg'}>Hello</div>
      </dialog>
    );
  } else {
    return null;
  }
}

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);
  const onToggle = () => setIsOpen(!isOpen);
  return (
    <ModalContext.Provider
      value={{
        isOpen: isOpen,
        onOpen: onOpen,
        onClose: onClose,
        onToggle: onToggle,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export const useModalContext = () => {
  const modalContext = useContext(ModalContext);
  if (modalContext === undefined) {
    throw new Error('useModalContext must be inside a ModalProvider.');
  }
  return modalContext;
};
