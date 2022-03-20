import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import Container from './Container';
import Form from './SearchForm/SearchForm';
import ImageGallery from './ImageGallery';
import fetchApi from './Servise/API';


 export class App extends Component { 
  
   state = {
     searchQuery: '',
     gallery: [],
     page:1
   };
   
   onFormSubmit = searchQuery => {
     this.setState({searchQuery})
   };

   //===Обновляем состояние через метод зизненного цикла componentDidUpdate===//
   componentDidUpdate(prevProps, { searchQuery, page }) { 
     if (page !== this.state.page || searchQuery !== this.state.searchQuery) { 
      return this.fetchImg(searchQuery,page)
     }
   }

   //===Метод обработки запроса===//
   fetchImg = async () => {
     const { searchQuery, page } = this.state;
     try {
       const imgGallery = await fetchApi(searchQuery, page);
       this.setState(({ gallery }) => {
         return { gallery: [...gallery, ...imgGallery.hits] }
       });
     } catch (error) {
       console.log(error);
     }
   };

   render() { 
     const {  gallery } = this.state;
     const formSubmit = this.onFormSubmit;
     return (
       <Container>
         <ToastContainer
           position="top-right"
           autoClose={2000}
           theme={'dark'}
         />
         <Form onSubmit={formSubmit} />
         {gallery.length > 0 && (<ImageGallery img={gallery}/>)}
       </Container>
     
     );
  }
   }

   





