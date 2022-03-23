import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import Load from './Loader';
import Container from './Container';
import Form from './SearchForm/SearchForm';
import Modal from './Modal';
import ImageGallery from './ImageGallery';
import BtnLoad from './BtnLoad';
import fetchApi from './Servise/API';


 export class App extends Component { 
  
   state = {
     searchQuery: '',
     gallery: [],
     page: 1,
     load:false
   };
   
   //===Mетод отправки запроса поиска, с каждым новым запросом возвращается в исходное положение на страницу 1===//
   onFormSubmit = query => {
     this.setState({
       searchQuery: query,
       page: 1,
       gallery:[],
       shoWModal: false,
       modalImg:''
     })
   };

   //===Обновляем состояние через метод жизненного цикла componentDidUpdate===//
   componentDidUpdate(prevProps, { searchQuery, page }) { 
     if (page !== this.state.page || searchQuery !== this.state.searchQuery) { 
      return this.fetchImg(searchQuery,page)
     }
     this.handleScroll();
   }

   //==Методо открытия,закрытия модалки==//
   onToggle = ()=> { 
     this.setState(({ shoWModal }) => ({
       shoWModal:!shoWModal
     }))
    
   }
    //===Метод плавной прокрутки===//
   handleScroll = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

   //==Метод загрузчика, показать скрыть загрузсчик==//
   onLoading = () => {
     this.setState(({ load }) => ({
       load: !load,
     }));
   };

   //===Метод обработки запроса===//
   fetchImg = async () => {
     const { searchQuery, page } = this.state;
     this.onLoading()
     try {
       const imgGallery = await fetchApi(searchQuery, page);
       this.setState(({ gallery }) => {
         return { gallery: [...gallery, ...imgGallery.hits] }
       });
     } catch (error) {
       console.log(error);
     } finally { 
       this.onLoading()
     }
   };

   //==Метода открытия модального окна==//
   onHandleModal = img => { 
     this.setState({ modalImg: img })
     this.onToggle()
   }
  
   //==Метод добавления следуйщей страницы page + 1==//
   onHandleLoadMore = () => { 
     this.setState((prevState) => { 
       return ({page: prevState.page + 1})
     })
   }

   render() { 
     const {  gallery,page,load,shoWModal,modalImg } = this.state;
     const formSubmit = this.onFormSubmit;
     const toggle = this.onToggle;
     const imgClick = this.onHandleModal;
     
     return (
       <Container>
         <ToastContainer
           position="top-right"
           autoClose={2000}
           theme={'dark'}
         />
         <Form onSubmit={formSubmit } />
         {shoWModal && (
           <Modal large={modalImg} onClose={toggle} />)}
         {gallery.length > 0 && (<ImageGallery img={gallery} onImgClick={imgClick}/>)}
             {load && <Load/>}
         {gallery.length > 0 && gallery.length / page === 12 && (
           <BtnLoad onLoadMore={this.onHandleLoadMore}/>
         )}
       </Container>
     );
  }
   }

   





