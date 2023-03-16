import PropTypes from 'prop-types';
import { Foto, FotoImg } from './ImageGalleryItem.styled';

const ImageGalleryItem = ({ smallImag, description, bigImage, openModal }) => {
  return (
    <Foto onClick={openModal}>
      <FotoImg src={smallImag} alt={description} data-img={bigImage} />
    </Foto>
  );
};
ImageGalleryItem.propTypes = {
  smallImag: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  bigImage: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
};
export default ImageGalleryItem;
