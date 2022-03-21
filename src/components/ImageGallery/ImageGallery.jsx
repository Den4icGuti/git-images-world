import PropTypes from 'prop-types'
import styles from '../ImageGallery/ImageGallery.module.css'
import GalleryItem from "components/GalleryItem";

const ImageGallery = ({ img, onImgClick }) => { 
  return (
    <ul className={styles.list}>
      {img.map(({ id, webformatURL, largeImageURL, comments,downloads,likes }) => (
        
        <GalleryItem 
          key={id}
          src={webformatURL}
          modalImg={largeImageURL}
          onImgClick={onImgClick}
          comments={comments}
          downloads={downloads}
          likes={likes}
        />
        
      ))}
  </ul>
  );
}

ImageGallery.propTypes = {
  img: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      comments:PropTypes.number.isRequired,
    })
  )
    
}

export default ImageGallery;