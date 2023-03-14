
import { createPortal } from 'react-dom';

import { Container, ImgModal, Overlay } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');


const Modal =({currentImag, currentImageDescription,modalOnClick,modalOnDown })=>{


    return createPortal (
        <Overlay onClick={(e)=>modalOnClick(e)} onKeyDown={(e)=>modalOnDown(e)} >
            <Container>
                <ImgModal src={currentImag} alt={currentImageDescription} />
            </Container>
        </Overlay>, modalRoot )

}
export default Modal;

