import { useEffect, useLayoutEffect, useRef, useState } from 'react';
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
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  useEffect(() => {
    if (dialogRef.current !== null) {
      if (isOpen) {
        dialogRef.current.showModal();
      } else {
        dialogRef.current.close();
      }
    }
  }, [isOpen]);
  return (
    <dialog
      className={'container rounded-xl'}
      ref={dialogRef}
      onClick={(event) => {
        if (dialogRef.current !== null) {
          const rect = dialogRef.current.getBoundingClientRect();
          const isInDialog =
            rect.top <= event.clientY &&
            event.clientY <= rect.top + rect.height &&
            rect.left <= event.clientX &&
            event.clientX <= rect.left + rect.width;
          if (!isInDialog) {
            dialogRef.current.close();
            onClose();
          }
        }
      }}
    >
      <div className={'bg-white py-4 text-center relative'}>
        <div className={'flex absolute top-0 right-0 justify-end'}>
          <button onClick={onClose}>
            <BsX size={40} />
          </button>
        </div>
        {children}
      </div>
    </dialog>
  );
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
