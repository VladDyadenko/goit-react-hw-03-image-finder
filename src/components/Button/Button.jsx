import PropTypes from 'prop-types';
import { Btn } from './Button.styled';

const Button = ({ handlBtnNewPage }) => {
  return (
    <Btn type="button" onClick={handlBtnNewPage}>
      Load more
    </Btn>
  );
};

Button.propTypes = {
  handlBtnNewPage: PropTypes.func.isRequired,
};

export default Button;
