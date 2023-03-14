
import { Component } from 'react';
import { createPortal } from 'react-dom';

import { Container, Overlay } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');


class Modal extends Component{



    render() {
        const {currentImag, currentImageDescription, toggleModal} = this.props;


         return createPortal (
        <Overlay  onClick={toggleModal}>
            <Container>
                <img src={currentImag} alt={currentImageDescription} />
            </Container>
        </Overlay>, modalRoot )
    };
}

export default Modal;

