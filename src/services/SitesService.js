import axios from 'axios';

class SitesService {
  constructor() {
    this.apiUrl = 'http://localhost:9000/api/';
  }

  get(url) {
    return axios({
      baseURL: this.apiUrl,
      method: 'GET',
      url
    }).then(res => res.data);
  }

  update(id, site) {
    return axios({
      baseURL: this.apiUrl,
      method: 'POST',
      url: `site/${id}`,
      data: {
        _id: id,
        site
      }
    }).then(res => res.data);
  }
}

export default new SitesService();
