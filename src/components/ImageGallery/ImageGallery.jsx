import css from './ImageGallery.module.css'
import ImageGalleryItem from 'components/ImageGalleryItem';

const ImageGallery =({images})=>{
    

    return (
    <ul className={css.gallery}>

    {images.map(({id, tags, webformatURL}) =>(

        <ImageGalleryItem
        key={id}
        smallImag={webformatURL}
        description={tags}
        ></ImageGalleryItem>
    ))}
    </ul>)
};

export default ImageGallery;
