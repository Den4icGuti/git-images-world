
const GalleryItem = ({ src, onImgClick, modalImg }) => { 
  return (
    <li onClick={() => onImgClick(modalImg) }>
      <img src={src} alt=''/>
    </li>
  )
}

export default GalleryItem;