import { useState } from 'react';

export function useModal(initialIsOpen: boolean = false) {
  const [isOpen, setIsOpen] = useState(initialIsOpen);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const toggleModal = () => setIsOpen(!isOpen);
  return {
    isOpen,
    openModal,
    closeModal,
    toggleModal
  };
}
