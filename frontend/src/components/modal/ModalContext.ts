import { createContext, useState } from 'react';

interface ModalContextValue {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  onToggle: () => void;
}

export const ModalContext = createContext<ModalContextValue | undefined>(undefined);
