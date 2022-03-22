import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import Load from './Loader';
import Container from './Container';
import Form from './SearchForm/SearchForm';
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
   
   //===Mетод отправки запроса поиска, с каждым новым запросом возвращается в исхдное положение===//
   onFormSubmit = query => {
     this.setState({
       searchQuery: query,
       page: 1,
       gallery:[]
     })
   };

   //===Обновляем состояние через метод зизненного цикла componentDidUpdate===//
   componentDidUpdate(prevProps, { searchQuery, page }) { 
     if (page !== this.state.page || searchQuery !== this.state.searchQuery) { 
      return this.fetchImg(searchQuery,page)
     }
     this.handleScroll();
   }
    //===Метод плавной прокрутки===//
   handleScroll = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

   onLoading = () => {
     this.setState(({ load }) => ({
       load: !load
     }))
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

   onHandleLoadMore = () => { 
     this.setState((prevState) => { 
       return ({page: prevState.page + 1})
     })
   }

   render() { 
     const {  gallery,page,load } = this.state;
     const formSubmit = this.onFormSubmit;
     return (
       <Container>
         <ToastContainer
           position="top-right"
           autoClose={2000}
           theme={'dark'}
         />
         <Form onSubmit={formSubmit} />
       
         {gallery.length > 0 && (<ImageGallery img={gallery} />)}
             {load && <Load/>}
         {gallery.length > 0 && gallery.length / page === 12 && (
           
           <BtnLoad onLoadMore={this.onHandleLoadMore}/>
         )}
        
       </Container>
     
     );
  }
   }

   





