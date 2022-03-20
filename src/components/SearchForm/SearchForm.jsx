import React, { Component } from 'react';
import styles from '../SearchForm/Form.module.css';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


class Form extends Component { 
  state = {
    searchQuery: '',
  };

  

  onHandleSearch = e => {
    this.setState({ searchQuery: e.currentTarget.value.toLowerCase() })
  };

  onHandleSubmit = e => {
    const notify =() => toast('enter the text')
    e.preventDefault()
    if (this.state.searchQuery.trim() === '') { 
      notify();
      return;
    }
    this.props.onSubmit(this.state.searchQuery)
    this.setState({ searchQuery: '' })
  };

  render() { 
    const { searchQuery } = this.state;
    const handleSearch = this.onHandleSearch;
    const submit = this.onHandleSubmit
    return (
      <header className={styles.header}>
        <form className={styles.form} onSubmit={submit} >
          <input
            type='text'
            name='searchQuery'
            placeholder='Search images...'
            value={searchQuery}
            onChange={handleSearch}
          />
          <button type='submit'>Найти...</button>
        </form>
      </header>
    );
  }
}

export default Form;