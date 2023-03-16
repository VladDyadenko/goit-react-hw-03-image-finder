import { Component } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import { FaSistrix } from 'react-icons/fa';

import { FormBox, FormBtn, FormElement, FormInput } from './Searchbar.styled';

class Searchbar extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  state = {
    searchValue: '',
  };

  handlInputChange = e => {
    this.setState({ searchValue: e.currentTarget.value });
  };

  handleSubmit = e => {
    e.preventDefault();

    const { searchValue } = this.state;
    const { onSubmit } = this.props;

    if (searchValue.trim() === '') {
      toast.error('Enter data to search!');
      return;
    }

    onSubmit(searchValue);
  };

  render() {
    return (
      <FormBox>
        <FormElement onSubmit={this.handleSubmit}>
          <FormBtn type="submit">
            <FaSistrix size={20}></FaSistrix>
          </FormBtn>

          <FormInput
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handlInputChange}
            value={this.searchValue}
          />
        </FormElement>
      </FormBox>
    );
  }
}

export default Searchbar;
