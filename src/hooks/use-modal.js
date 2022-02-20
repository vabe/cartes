import { useState } from "react";

export default function useModal() {
  const [isOpen, setIsOpen] = useState(false);

  function toggleModal() {
    setIsOpen((previousState) => !previousState);
  }

  return { isOpen, toggleModal };
}
