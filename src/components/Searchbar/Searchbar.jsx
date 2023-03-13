import { Component } from 'react';
import { toast } from 'react-toastify';
import css from './Searchbar.module.css'


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
            toast.error('Enter a search term.');
            return;
          }

        onSubmit(searchValue);

      

    }

   

    render(){


    return (
        <header className={css.searchbar}>
            <form className={css.form} onSubmit={this.handleSubmit}>
                <button type="submit" className={css.button}>
                    <span className={css.buttonLabel}>Search</span>
                </button>
            
                <input
                    className={css.input}
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                    onChange={this.handlInputChange}
                    value={this.searchValue}

                />
            </form>
        </header>)
    }

   
};

export default Searchbar;
