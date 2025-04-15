import css from "./ImageCard.module.css";

interface Photo {
  id: string;
  urls: {
    small: string;
  };
  description?: string;
  likes: number;
  user: {
    name: string;
    location?: string;
  };
}

interface ImageCardProps {
  photo: Photo;
  onClick: (photo: Photo) => void;
}

export default function ImageCard({ photo, onClick }: ImageCardProps) {
  return (
    <div className={css.card} onClick={() => onClick(photo)}>
      <img
        className={css.galleryImg}
        src={photo.urls.small}
        alt={photo.description || "Image"}
      />
      <div className={css.info}>
        <div className={css.infoList}>
          <span className={css.infoItem}>Likes:</span>
          <span className={css.infoItemValue}>{photo.likes}</span>
        </div>
        <div className={css.infoList}>
          <span className={css.infoItem}>Description:</span>
          <span className={css.infoItemValue}>{photo.description}</span>
        </div>
        <div className={css.infoList}>
          <span className={css.infoItem}>Author:</span>
          <span className={css.infoItemValue}>{photo.user.name}</span>
        </div>
        <div className={css.infoList}>
          <span className={css.infoItem}>Location:</span>
          <span className={css.infoItemValue}>{photo.user.location || "Unknown"}</span>
        </div>
      </div>
    </div>
  );
}