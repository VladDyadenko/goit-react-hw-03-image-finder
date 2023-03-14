import { Component } from "react";

import { Container } from "./App.styled.js";
import GetFotoPromisAPI from "GetFatch/image_api";
import {userDataAPIPixabay} from '../../GetFatch/image_api.jsx'
import Searchbar from "../Searchbar";
import ImageGallery from "../ImageGallery";
import Button from "../Button";
import Modal from "../Modal";



const getFotoPromisAPI = new GetFotoPromisAPI(userDataAPIPixabay);

class App extends Component {

  state ={
    valueForSearch: '',
    page:1,
    images:null,
    totalImages:0,
    imagesOnPage:0,
    showModal: false,
    currentImag:'',
    currentImageDescription:'',

  }


  componentDidUpdate(prevProps, prevState){

    const {valueForSearch, page}= this.state;

    getFotoPromisAPI.valueForSearch = valueForSearch.trim();

    
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

    };
     

  }

  toggleModal=()=>{

      this.state(({showModal}) =>({
      showModal: !showModal
    }))
  }

  clickModal=e=>{

    const imgModal = e.target.dataset.img;
    const imgModalAlt = e.target.alt;

    console.log(imgModal, imgModalAlt)



    return this.setState({
      currentImageDescription: imgModalAlt,
      currentImag: imgModal,
      
    })

    
    
  }


  handlBtnNewPage =(e)=>{

    return this.setState({

      page: getFotoPromisAPI.incrementPage(),
    
    })
   
  }

  addSearch=(valueForSearch)=>{

    this.setState({valueForSearch});
    getFotoPromisAPI.resetPage();


  }
  

  render() {
      const {images, imagesOnPage, totalImages, showModal,currentImag,currentImageDescription }= this.state;
      const newPage = this.handlBtnNewPage;
      const dataSearch = this.addSearch;
      const clickModal = this.clickModal;
      const toggleModal = this.toggleModal

    return (
          <Container >
            <Searchbar onSubmit={dataSearch}/>
            {images && <ImageGallery images={images} clickModal={clickModal}/>}
            {(imagesOnPage >=12 && imagesOnPage < totalImages) && <Button handlBtnNewPage={newPage}/>}
            {showModal && <Modal
              currentImag={currentImag}
              currentImageDescription={currentImageDescription}
              toggleModal={toggleModal}
            />}
          </Container>
    );
  };
};

export default App;

 
