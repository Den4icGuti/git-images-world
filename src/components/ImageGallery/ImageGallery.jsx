// import PropTypes from 'prop-types'
import styles from '../ImageGallery/ImageGallery.module.css'
import GalleryItem from "components/GalleryItem";

const ImageGallery = ({ img, onImgClick }) => { 
  return (
    <ul className={styles.list}>
      {img.map(({ id, webformatUrl, largeImageUrl }) => (
        <GalleryItem 
          key={id}
          src={webformatUrl}
          modalImg={largeImageUrl}
          onImgClick={onImgClick}
        />
      ))}
  </ul>
  );
}

// ImageGallery.propTypes = {
//   img: PropTypes.arrayOf(
//     PropTypes.shape({
//       id: PropTypes.number.isRequired,
//       webformatUrl: PropTypes.string,
//       largeImageUrl:PropTypes.string.isRequired
//     })
//   ),
//     onImgClick:PropTypes.func.isRequired
// }

export default ImageGallery;