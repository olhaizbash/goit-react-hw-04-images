import css from './ImageGalleryItem.module.css';
import { useState } from 'react';
import { Modal } from '../Modal/Modal';

export function ImageGalleryItem({ webformatURL, largeImageURL }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <li className={css.imageGalleryItem}>
      <img
        onClick={() => {
          openModal();
        }}
        className={css.imageGalleryItemimage}
        src={webformatURL}
        alt=""
      />
      {isModalOpen && (
        <Modal
          imgUrl={largeImageURL}
          onClose={() => {
            closeModal();
          }}
        />
      )}
    </li>
  );
}
