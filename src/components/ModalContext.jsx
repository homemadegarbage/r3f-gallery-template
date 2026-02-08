import { createContext, useContext, useState } from "react";

const ModalContext = createContext();

export function ModalProvider({ children }) {
  const [activeItem, setActiveItem] = useState(null);

  return (
    <ModalContext.Provider value={{ activeItem, setActiveItem }}>{children}</ModalContext.Provider>
  );
}

export function useModal() {
  return useContext(ModalContext);
}
