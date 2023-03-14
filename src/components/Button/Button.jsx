    import { Btn } from "./Button.styled";

const Button =({handlBtnNewPage})=>{
    return (
        <Btn type='button'  onClick={handlBtnNewPage}>Load more</Btn>
    )
    
};

export default Button;