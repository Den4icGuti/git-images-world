import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import Container from './Container';
import Form from './SearchForm/SearchForm';

 export class App extends Component { 
  
   state = {
     searchQuery: ''
   };
   
   onFormSubmit = searchQuery => {
     this.setState({searchQuery})
   };

   render() { 
    const formSubmit = this.onFormSubmit
     return (
       <Container>
         <ToastContainer
           position="top-right"
           autoClose={2000}
           theme={'dark'}
         />
         <Form onSubmit={formSubmit} />
       </Container>
     
     );
  }
}




