import css from './Modal.module.css'

const Modal =({currentImag, currentImageDescription})=>{
    <div className={css.overlay}>
        <div className={css.modal}>
            <img src={currentImag} alt={currentImageDescription} />
        </div>
    </div>
};

export default Modal;

