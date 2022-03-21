import styles from '../BtnLoad/BtnLoad.module.css'
const BtnLoad = ({ onLoadMore }) => { 
  return (
    <button className={styles.BtnLoad} type="button" onClick={onLoadMore}>Load more...</button>
  )
}

export default BtnLoad;

