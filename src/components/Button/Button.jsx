import css from './Button.module.css'

const Button =({handlBtnNewPage})=>{
    return (
        <button type='button' className={css.gallaryButton} onClick={handlBtnNewPage}>Load more</button>
    )
    
};

export default Button;