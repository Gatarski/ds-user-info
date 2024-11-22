import { useState } from "react";

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2 MB
const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp"
];

export const useModalVisibility = () => {
  const [isVisible, setIsVisible] = useState(false);

  const showModal = () => setIsVisible(true);
  const hideModal = () => setIsVisible(false);

  return {
    isVisible,
    showModal,
    hideModal,
  };
};

export const isAvatarImageNotCorrect = (file: File | undefined): boolean => {
  return (
    !file ||
    file.size >= MAX_FILE_SIZE ||
    !ALLOWED_IMAGE_TYPES.includes(file.type)
  );
};
