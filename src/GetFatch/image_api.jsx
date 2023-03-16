import axios from 'axios';

export const userDataAPIPixabay = {
  url: 'https://pixabay.com/api/?',
  key: '33086348-7f53cf98727ae5d390ed7e65d',
  perPage: 12,
  valueForSearch: '',
  lang: 'ru,en',
};

class GetFotoPromisAPI {
  constructor(options) {
    this.perPage = options.perPage;
    this.valueForSearch = options.valueForSearch;
    this.page = 1;
    this.key = options.key;
    this.url = options.url;
    this.lang = options.lang;
  }

  async axiosGallery(currentPage) {
    return axios
      .get(`${this.url}`, {
        params: {
          key: this.key,
          q: this.valueForSearch,
          image_type: 'photo',
          orientation: 'horizontal',
          safesearch: true,
          lang: this.lang,
          per_page: this.perPage,
          page: currentPage,
        },
      })
      .then(({ data }) => {
        return data;
      });
  }

  get ValueForSearch() {
    return this.valueForSearch;
  }

  set ValueForSearch(value) {
    this.valueForSearch = value;
  }

  incrementPage() {
    this.page += 1;
    return this.page;
  }

  resetPage() {
    this.numberPage = 1;
  }
}

export default GetFotoPromisAPI;
