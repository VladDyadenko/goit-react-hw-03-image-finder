
import ImageGalleryItem from 'components/ImageGalleryItem';
import { Fotos } from './ImageGallery.styled';

const ImageGallery =({images, openModal})=>{
    
    

    return (
    <Fotos >

    {images.map(({id, tags, webformatURL, largeImageURL }) =>(

        <ImageGalleryItem
        key={id}
        smallImag={webformatURL}
        bigImage={largeImageURL}
        description={tags}
        openModal={openModal}
      
        ></ImageGalleryItem>
    ))}
    </Fotos>)
};

export default ImageGallery;
