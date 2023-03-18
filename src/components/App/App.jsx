import { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Container } from './App.styled.js';
import GetFotoPromisAPI from 'GetFatch/image_api';
import { userDataAPIPixabay } from '../../GetFatch/image_api.jsx';
import Searchbar from '../Searchbar';
import ImageGallery from '../ImageGallery';
import Button from '../Button';
import Modal from '../Modal';
import Loader from '../Loader';
import ErrorCard from '../ErrorCard';

const getFotoPromisAPI = new GetFotoPromisAPI(userDataAPIPixabay);

class App extends Component {
  state = {
    valueForSearch: '',
    page: 1,
    images: null,
    totalImages: 0,
    imagesOnPage: 0,
    showModal: false,
    currentImag: '',
    currentImageDescription: '',
    visible: false,
    status: 'idle',
    error: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const { valueForSearch, page } = this.state;

    getFotoPromisAPI.valueForSearch = valueForSearch.trim();

    if (!getFotoPromisAPI.valueForSearch) {
      return;
    }

    if (prevState.valueForSearch !== valueForSearch) {
      this.setState({ visible: true });

      getFotoPromisAPI
        .axiosGallery()
        .then(data => {
          const { hits, totalHits } = data;

          if (hits.length === 0) {
            toast.warn('No photos to show!');
          }

          return (
            this.setState({
              images: hits,
              totalImages: totalHits,
              imagesOnPage: hits.length,
              page: 1,
            }),
            toast.success(`Found ${totalHits} fhotos`)
          );
        })
        .catch(error => {
          if (error.response || error.request) this.setState({ error });
          else this.setState({ error });
        })
        .finally(() => this.setState({ visible: false }));
    }

    if (prevState.page !== page && page !== 1) {
      this.setState({ visible: true });

      getFotoPromisAPI
        .axiosGallery(page)
        .then(({ hits }) => {
          return this.setState(({ images, imagesOnPage }) => {
            return {
              images: [...images, ...hits],
              imagesOnPage: hits.length + imagesOnPage,
            };
          });
        })
        .catch(error => {
          if (error.response || error.request) this.setState({ error });
          else this.setState({ error });
        })
        .finally(() => this.setState({ visible: false }));
    }
  }

  closeModal = e => {
    this.setState(() => ({
      showModal: false,
    }));
  };

  openModal = e => {
    const imgModal = e.target.dataset.img;
    const imgModalAlt = e.target.alt;

    if (this.showModal) {
      return;
    } else
      this.setState({
        showModal: true,
      });

    return this.setState({
      currentImageDescription: imgModalAlt,
      currentImag: imgModal,
    });
  };

  handlBtnNewPage = e => {
    return this.setState({
      page: getFotoPromisAPI.incrementPage(),
    });
  };

  addSearch = valueForSearch => {
    this.setState({ valueForSearch });
    getFotoPromisAPI.resetPage();
  };

  render() {
    const {
      images,
      visible,
      imagesOnPage,
      totalImages,
      showModal,
      currentImag,
      currentImageDescription,
      error,
    } = this.state;

    const newPage = this.handlBtnNewPage;
    const dataSearch = this.addSearch;
    const openModal = this.openModal;
    const closeModal = this.closeModal;

    return (
      <Container>
        <Searchbar onSubmit={dataSearch} />
        {error && <ErrorCard error={error} />}
        {images && <ImageGallery images={images} openModal={openModal} />}
        {visible && <Loader />}
        {imagesOnPage >= 12 && imagesOnPage < totalImages && (
          <Button handlBtnNewPage={newPage} />
        )}
        {showModal && (
          <Modal
            currentImag={currentImag}
            currentImageDescription={currentImageDescription}
            onClose={closeModal}
          />
        )}
        <ToastContainer autoClose={1500} />
      </Container>
    );
  }
}

export default App;

// status{'idle', 'pending', 'rejected', 'resolved'}