import PropTypes from 'prop-types';
import { Component } from 'react';
import { createPortal } from 'react-dom';

import { Container, ImgModal, Overlay } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  static propTypes = {
    onClose: PropTypes.func.isRequired,
    currentImag: PropTypes.string.isRequired,
    currentImageDescription: PropTypes.string.isRequired,
  };

  componentDidMount() {
    const { onClose } = this.props;

    window.addEventListener('keydown', e => {
      if (e.code === 'Escape') {
        onClose();
      }
    });

    window.addEventListener('click', e => {
      if (e.target.nodeName !== 'IMG') {
        onClose();
      }
    });
  }

  componentWillUnmount() {
    const { onClose } = this.props;

    window.removeEventListener('keydown', e => {
      if (e.code === 'Escape') {
        onClose();
      }
    });
    window.removeEventListener('click', e => {
      if (e.target.nodeName !== 'IMG') {
        onClose();
      }
    });
  }

  render() {
    const { currentImag, currentImageDescription } = this.props;

    return createPortal(
      <Overlay>
        <Container>
          <ImgModal src={currentImag} alt={currentImageDescription} />
        </Container>
      </Overlay>,
      modalRoot
    );
  }
}

export default Modal;
