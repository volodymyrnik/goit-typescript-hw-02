import { useState, useEffect } from "react";
import "./App.css";
import { SearchBar } from "./components/SearchBar/SearchBar";
import toast, { Toaster } from "react-hot-toast";
import fetchPhoto from "./fetchPhoto";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Spinner from "./components/Loader/Loader";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import ImageModal from "./components/ImageModal/ImageModal";

// Тип для фото
export interface Photo {
  id: string;
  alt_description: string;
  urls: {
    small: string;
    regular: string;
  };
}

function App() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [selectPhoto, setSelectPhoto] = useState<Photo | null>(null);

  function openModal(photo: Photo) {
    setSelectPhoto(photo);
  }

  function closeModal() {
    setSelectPhoto(null);
  }

  const handleSubmit = (term: string) => {
    if (!term.trim()) {
      toast.error("Please enter a search term!");
      return;
    }
    setSearchTerm(term);
    setPage(1);
    setPhotos([]);
  };

  useEffect(() => {
    if (!searchTerm) return;

    const fetchImages = async () => {
      try {
        setIsLoading(true);
        setError(false);
        const images = await fetchPhoto(searchTerm, page);
        if (images.length === 0) {
          toast.error("No images found!");
          return;
        }
        setPhotos((prevImages) =>
          page === 1 ? images : [...prevImages, ...images]
        );
      } catch (error) {
        setError(true);
        toast.error("Error! Please, reload page!");
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, [searchTerm, page]);

  return (
    <div>
      <Toaster />
      <SearchBar onSubmit={handleSubmit} />
      {error && <ErrorMessage error={error} />}
      <ImageGallery photos={photos} onImageClick={openModal} />
      {isLoading && <Spinner />}
      {photos.length > 0 && !isLoading && (
        <LoadMoreBtn onClick={() => setPage(page + 1)}>
          Load more {page}
        </LoadMoreBtn>
      )}
      <ImageModal onClose={closeModal} photo={selectPhoto} />
    </div>
  );
}

export default App;