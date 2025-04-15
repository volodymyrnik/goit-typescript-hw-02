import React from "react";
import Modal from "react-modal";
import css from "./ImageModal.module.css";

Modal.setAppElement("#root");

interface ImageModalProps {
  onClose: () => void;
  photo: {
    urls: {
      regular: string;
    };
    description?: string;
    likes: number;
    user: {
      name: string;
    };
  } | null;
}

export default function ImageModal({ onClose, photo }: ImageModalProps) {
  const isOpen = Boolean(photo);
  return (
    <Modal
      className={css.modal}
      overlayClassName={`${css.overlay} ${isOpen ? css.overlayIsOpen : ""}`}
      isOpen={isOpen}
      onRequestClose={onClose}
    >
      {photo && (
        <>
          <button className={css.modalCloseButton} onClick={onClose}>
            X
          </button>
          <img
            className={css.modalImage}
            src={photo.urls.regular}
            alt={photo.description || "Image"}
          />
          <p className={css.text}>Likes: {photo.likes}</p>
          <p className={css.text}>Description: {photo.description}</p>
          <p className={css.text}>Author: {photo.user.name}</p>
        </>
      )}
    </Modal>
  );
}