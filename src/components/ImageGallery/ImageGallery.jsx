
import ImageGalleryItem from 'components/ImageGalleryItem';
import { Fotos } from './ImageGallery.styled';

const ImageGallery =({images, clickModal})=>{
    
    

    return (
    <Fotos >

    {images.map(({id, tags, webformatURL, largeImageURL }) =>(

        <ImageGalleryItem
        key={id}
        smallImag={webformatURL}
        bigImage={largeImageURL}
        description={tags}
        clickModal={clickModal}
      
        ></ImageGalleryItem>
    ))}
    </Fotos>)
};

export default ImageGallery;
