import { Component } from "react";

import GetFotoPromisAPI from "GetFatch/image_api";
import {userDataAPIPixabay} from '../GetFatch/image_api.jsx'
import Searchbar from "./Searchbar";
import ImageGallery from "./ImageGallery";
import Button from "./Button";
import Modal from "./Modal";


const getFotoPromisAPI = new GetFotoPromisAPI(userDataAPIPixabay);

class App extends Component {

  state ={
    valueForSearch: '',
    page:1,
    images:null,
    totalImages:0,
    imagesOnPage:0,




  }


  componentDidUpdate(prevProps, prevState){

    const {valueForSearch, page}= this.state;

    getFotoPromisAPI.valueForSearch = this.state.valueForSearch.trim();

    
    if(!getFotoPromisAPI.valueForSearch){
      return
    }

    if(prevState.valueForSearch !== valueForSearch) {


      getFotoPromisAPI
      .axiosGallery()
      .then(({hits, totalHits}) =>{
              
       return this.setState({
          images: hits,
          totalImages: totalHits,
          imagesOnPage: hits.length,
          page:1,
        })
        
      })
      .catch(error => this.setState({ error }));
             
        
    };
    
  

    if(prevState.page !== page && page !== 1){

      getFotoPromisAPI
      .axiosGallery(page)
      .then(({hits}) =>{
              
       return this.setState(({images,imagesOnPage }) =>{
          return {
            images: [...images,...hits],
            imagesOnPage: hits.length +imagesOnPage,
          }
                    
        })
        
      })
      .catch(error => this.setState({ error }));

    }
     

  }

  handlBtnNewPage =(e)=>{

    return this.setState({
      page: getFotoPromisAPI.incrementPage(),
    
    })
   
  }

  addSearch=(valueForSearch)=>{

    this.setState({valueForSearch});

  }
  

  render() {
      const {images}= this.state;
     

    return (
          <>
            <Searchbar onSubmit={this.addSearch}/>
            {images && <ImageGallery images={images} >
            
            </ImageGallery>}
            <Button handlBtnNewPage={this.handlBtnNewPage}/>
            <Modal></Modal>
          </>
    );
  };
};

export  default App;

 
