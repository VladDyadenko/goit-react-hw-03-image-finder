import PropTypes from 'prop-types';
import ImageGalleryItem from 'components/ImageGalleryItem';
import { Fotos } from './ImageGallery.styled';

const ImageGallery = ({ images, openModal }) => {
  return (
    <Fotos>
      {images.map(({ id, tags, webformatURL, largeImageURL }) => (
        <ImageGalleryItem
          key={id}
          smallImag={webformatURL}
          bigImage={largeImageURL}
          description={tags}
          openModal={openModal}
        ></ImageGalleryItem>
      ))}
    </Fotos>
  );
};
ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      tags: PropTypes.string.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ).isRequired,
  openModal: PropTypes.func.isRequired,
};

export default ImageGallery;
