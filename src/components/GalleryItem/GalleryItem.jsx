import styles from '../GalleryItem/GallItem.module.css';

const GalleryItem = ({ src, onImgClick, modalImg,comments,downloads,likes }) => { 
  return (
    <li className={styles.item} onClick={() => onImgClick(modalImg)}>
      <img className={styles.imgGallery} src={src} alt='' />
      <div className={styles.InfoFoto}>
        <p className={styles.desc}>Comments: {comments}</p>
        <p className={styles.desc}>Downloads: {downloads}</p>
        <p className={styles.desc}>likes: {likes}</p>
      </div>
    
    </li>
  )
}

export default GalleryItem;