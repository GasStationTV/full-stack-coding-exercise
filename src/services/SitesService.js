import axios from 'axios';

class SitesService {
  constructor() {
    this.apiUrl = 'http://localhost:9000/api/';
  }

  getSites() {
    return axios({
      baseURL: this.apiUrl,
      method: 'GET',
      url: 'sites'
    }).then(res => res.data);
  }

  getSite(id) {
    return axios({
      baseURL: this.apiUrl,
      method: 'GET',
      url: `site/${id}`
    }).then(res => res.data);
  }

  updateSite(id, site) {
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
