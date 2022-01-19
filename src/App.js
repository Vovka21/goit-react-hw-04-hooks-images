import { useState, useEffect } from 'react';
import fetchImages from './API/fetchImages';
import Searchbar from './components/Searchbar/Searchbar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Modal from './components/Modal/Modal';
import Button from './components/Button/Button';
import Loader from './components/Loader/Loader';
import styles from './App.module.css';

export default function App() {
  const [imgName, setImgName] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [imagePage, setImagePage] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(null);
  const [bigImageUrl, setBigImageUrl] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!imgName) {
      return;
    }

    const fetchImagePages = async (imgName, page) => {
      const { hits, total } = await fetchImages(imgName, page);
      const images = hits.map(({ id, webformatURL, largeImageURL }) => {
        return { id, webformatURL, largeImageURL };
      });

      setImagePage(prevImagePage => [...imagePage, ...images]);
      setTotal(total);
      setLoading(false);
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    };

    setLoading(true);
    fetchImagePages(imgName, page);
  }, [imgName, page]);

  const toggleModal = bigImageUrl => {
    setBigImageUrl(bigImageUrl);
    setShowModal(!showModal);
  };

  const handleGalleryItem = fullImageUrl => {
    setBigImageUrl(fullImageUrl);
    setShowModal(true);
  };

  const formSubmitHandler = value => {
    setImagePage([]);
    setImgName(value);
    setPage(1);
  };

  const handleClickMoreImages = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <div className={styles.App}>
      <Searchbar onSubmit={formSubmitHandler} />

      <ImageGallery
        imgName={imgName}
        imagePage={imagePage}
        onClose={toggleModal}
        onImageClick={handleGalleryItem}
      />

      {loading && <Loader />}

      {total > 0 && <Button onClick={handleClickMoreImages} />}

      {!loading && total === 0 && <p>No images!</p>}

      {showModal && (
        <Modal onClose={toggleModal}>
          <img src={bigImageUrl} alt="" />
        </Modal>
      )}
    </div>
  );
}
