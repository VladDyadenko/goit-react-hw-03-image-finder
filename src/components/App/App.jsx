import { Component } from "react";
import { Hearts  } from 'react-loader-spinner'

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
    visible: false,


  }

  componentDidMount() {
    window.addEventListener('keydown', this. closeModalOnDown);
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

  componentWillUnmount() {
    window.removeEventListener('keydown', this. closeModalOnDown);
  }

  closeModalOnClick=(e)=>{
    const currentImgModal=e.target.nodeName;

    if(currentImgModal === "IMG") return
    else this.setState({
      showModal: false
    });
     
         
  }
  closeModalOnDown=(e)=>{
    const currentImgModal=e.key;

    if (currentImgModal !== "Escape") return
     else this.setState({
      showModal: false
    });
    
      
  }

  clickModal=e=>{

    const imgModal = e.target.dataset.img;
    const imgModalAlt = e.target.alt;
    
    if(this.showModal) {
      return
    } else
    this.setState({
      showModal: true
    })

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
      const {images, visible, imagesOnPage, totalImages, showModal,currentImag,currentImageDescription }= this.state;
      const newPage = this.handlBtnNewPage;
      const dataSearch = this.addSearch;
      const clickModal = this.clickModal;
      const modalOnClick = this.closeModalOnClick;
      const modalOnDown = this.closeModalOnDown;

    return (
          <Container >
            <Searchbar onSubmit={dataSearch}/>
            {images && <ImageGallery images={images} clickModal={clickModal}/>}
            {(imagesOnPage >=12 && imagesOnPage < totalImages) && <Button handlBtnNewPage={newPage}/>}
              {visible && <Hearts 
                  height="80"
                  width="80"
                  color="#4fa94d"
                  ariaLabel="hearts-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                />}
            {showModal && <Modal
              currentImag={currentImag}
              currentImageDescription={currentImageDescription}
              modalOnClick={modalOnClick}
              modalOnDown={modalOnDown}
            />}
          </Container>
    );
  };
};

export default App;

 
