import { Component } from 'react';

import {FaSistrix} from "react-icons/fa";

import { FormBox, FormBtn, FormElement, FormInput } from './Searchbar.styled';
// import { toast } from 'react-toastify';



class Searchbar extends Component {

    state={
        searchValue: '',
    }

    handlInputChange = (e)=>{
       
        this.setState({searchValue: e.currentTarget.value})
    }

    handleSubmit = (e)=>{
        e.preventDefault();

        const {searchValue} = this.state
        const {onSubmit} = this.props

        if (searchValue.trim() === '') {
            // toast.error('Enter a search term.');
            return;
          }

        onSubmit(searchValue);

      

    }

   

    render(){
        

    return (
        <FormBox >
            <FormElement  onSubmit={this.handleSubmit}>
                <FormBtn type="submit" >
                    <FaSistrix  size={20}></FaSistrix>
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
        </FormBox>)
    }

   
};

export default Searchbar;
