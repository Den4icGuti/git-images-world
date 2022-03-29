import  { useState,useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import Load from './Loader';
import Container from './Container';
import Form from './SearchForm/SearchForm';
import Modal from './Modal';
import ImageGallery from './ImageGallery';
import BtnLoad from './BtnLoad';
import fetchApi from './Servise/API';


const App = () => { 
  const [searchQuery, setSearchQuery] = useState('');
  const [gallery, setGallery] = useState([]);
  const [page, setPage] = useState(1);
  const [load, setLoad] = useState(false);
  const [modalImg, setModalImg] = useState('');
  const [showModal, setShoModal] = useState(false)

  //===Mетод отправки запроса поиска, с каждым новым запросом возвращается в исходное положение на страницу 1===//
  const onFormSubmit = (query) => {
    setSearchQuery(query)
    setGallery([])
    setPage(1)
   };

  useEffect(() => {
    if (!searchQuery) {
      return;
    };
     //===Метод обработки запроса===//
    const fethImg = async () => {
      onLoading();
      try {
        const imgGallery = await fetchApi(searchQuery, page);
        setGallery(gallery => [...gallery, ...imgGallery.hits])
      } catch (error) {
        return error.messge
      } finally {
        onLoading()
      }
      handleScroll();
    }
    fethImg()
   },[searchQuery, page]);
    
  //==Методо открытия,закрытия модалки==//
  const onToggle = () => {
    setShoModal(showModal => !showModal)
  };
  //===Метод плавной прокрутки===//
  const handleScroll = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  //==Метод загрузчика, показать скрыть загрузсчик==//
  const onLoading = () => {
    setLoad(load => !load);
  };

  //==Метода открытия модального окна==//
  const onHandleModal = img => {
    setModalImg(img)
    onToggle()
  };
  
   //==Метод добавления следуйщей страницы page + 1==//
  const onHandleLoadMore = () => {
    setPage(page + 1)
  };

  return (
    <Container>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        theme={'dark'}
      />
      <Form onSubmit={onFormSubmit} />
      {showModal && (
        <Modal large={modalImg} onClose={onToggle} />)}
      {gallery.length > 0 && (<ImageGallery img={gallery} onImgClick={onHandleModal} />)}
      {load && <Load />}
      {gallery.length > 0 && gallery.length / page === 12 && (
        <BtnLoad onLoadMore={onHandleLoadMore} />
      )}
    </Container>
  );
  
   }
  
export default App;