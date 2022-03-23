import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import styles from '../Modal/Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component { 

   //===Метод componentDidMount монтирует комопонет в DOM===//
  componentDidMount() { 
    window.addEventListener('keydown', this.onHandleKeyDouwn);
    console.log('componentDidMount');
  }
  //===Метод  componentWillUnmount  выполняет размонтирование компонента  в DOM===//
  componentWillUnmount() { 
    window.removeEventListener('keydown', this.onHandleKeyDouwn);
    console.log('componentWillUnmount');
  }
//===Метод заклрывает модальное окно по клику в любом месте, кроме самого модального окна===//
  onHandleCloseClikc = e => { 
    if (e.currentTarget === e.target) { 
      this.props.onClose()
    }
  }
  

  //===Метод закрывает окно при нажатиии клавтши Escape==//
  onHandleKeyDouwn = e => {
    if (e.code === 'Escape') {
       this.props.onClose();
    }
  };

  render() { 
    return createPortal(
      <div className={styles.Overlay} onClick={this.onHandleCloseClikc}>
        
        <div className={styles.modalImg} >
          <img src={this.props.large} alt="" />
        </div>
      </div>,
      modalRoot
    );
  }
}

export default Modal;


