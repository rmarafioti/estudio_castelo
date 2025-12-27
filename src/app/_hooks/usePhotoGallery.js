import { useState } from "react";

const usePhotoGallery = (photos) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const currentImageObj = photos[currentIndex];

  const openModal = (index) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % photos.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  return {
    handleNext,
    handlePrev,
    openModal,
    closeModal,
    currentImageObj,
    currentIndex,
    isOpen,
    photos,
  };
};

export default usePhotoGallery;
