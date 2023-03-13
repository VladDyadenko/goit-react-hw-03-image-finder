import css from './ImageGalleryItem.module.css'


const ImageGalleryItem =({smallImag,description })=>{
   
return (
    <li className={css.galleryItem}>
     <img src={smallImag} alt={description} />
    </li>
)
    
};

export default ImageGalleryItem;
