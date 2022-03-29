import {useEffect} from 'react';
import { createPortal } from 'react-dom';
import styles from '../Modal/Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({onClose,large}) => { 

   //===Метод useEffect монтирует компонет в DOM===//
  useEffect(() => {
    window.addEventListener('keydown', onHandleKeyDouwn);
    return (() => {
      window.removeEventListener('keydown', onHandleKeyDouwn);
    })
  });

  //===Метод закрытия модалки по клику===//
  const onHandleCloseClikc = e => { 
    if (e.currentTarget === e.target) { 
      onClose()
    }
  }
  
  //===Метод закрывает окно при нажатиии клавтши Escape==//
 const onHandleKeyDouwn = e => {
    if (e.code === 'Escape') {
       onClose();
    }
  };

  return createPortal(
    <div className={styles.Overlay} onClick={onHandleCloseClikc}>
      <div className={styles.modalImg} >
        <img src={large} alt="" />
      </div>
    </div>,
    modalRoot
  );
}

export default Modal;


