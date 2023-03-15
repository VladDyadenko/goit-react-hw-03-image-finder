import { Foto, FotoImg } from "./ImageGalleryItem.styled";



const ImageGalleryItem =({smallImag,description, bigImage, openModal })=>{
   
return (
    <Foto  onClick={openModal}>
     <FotoImg  src={smallImag} alt={description} data-img={bigImage } />
    </Foto>
)
    
};

export default ImageGalleryItem;
