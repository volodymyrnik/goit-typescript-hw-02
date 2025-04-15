import ImageCard from "../ImageCard/ImageCard";
import css from "./ImageGallery.module.css";

interface Photo {
  id: string;
  urls: {
    small: string;
    regular: string;
  };
  alt_description?: string;
  description?: string;
  likes: number;
  user: {
    name: string;
  };
}

interface ImageGalleryProps {
  photos: Photo[];
  onImageClick: (photo: Photo) => void;
}

export default function ImageGallery({ photos, onImageClick }: ImageGalleryProps) {
  return (
    <ul className={css.gallery}>
      {photos.map((photo) => (
        <li key={photo.id} className={css.galleryCard}>
          <ImageCard photo={photo} onClick={onImageClick} />
        </li>
      ))}
    </ul>
  );
}