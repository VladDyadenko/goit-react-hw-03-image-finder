import { Foto, FotoImg } from "./ImageGalleryItem.styled";



const ImageGalleryItem =({smallImag,description, bigImage, clickModal })=>{
   
return (
    <Foto  onClick={clickModal}>
     <FotoImg  src={smallImag} alt={description} data-img={bigImage } />
    </Foto>
)
    
};

export default ImageGalleryItem;
