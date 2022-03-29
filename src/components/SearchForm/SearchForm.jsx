import { useState } from 'react';
import PropTypes from 'prop-types';
import styles from '../SearchForm/Form.module.css';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Form = ({onSubmit}) => { 
const [searchQuery, setSearchQuery] = useState('');

const reset = () => { 
  setSearchQuery('')
}

const onHandleSubmit = e => {
  const notify =() => toast.error('enter the text')
  e.preventDefault()
  if (searchQuery.trim() === '') { 
    notify();
    return;
  }
  onSubmit(searchQuery)
  reset();
};

return (
  <header className={styles.header}>
    <form className={styles.form} onSubmit={onHandleSubmit} >
      <input
        type='text'
        name='searchQuery'
        placeholder='Search images...'
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button type='submit'>Найти...</button>
    </form>
  </header>
);
}

Form.propTypes = {
  searchQuery:PropTypes.string
}

export default Form;

