import axios from "axios";

class Service {
  constructor() {
    const token = localStorage.getItem("token");
    // console.log(process.env.REACT_APP_API_URL);
    const service = axios.create({
      baseURL: "https://flowrspot-api.herokuapp.com/api/v1/",
      headers: token
        ? {
            Authorization: `Bearer ${token}`,
          }
        : {},
    });

    service.interceptors.response.use(this.handleSuccess, this.handleError);
    this.service = service;
  }

  handleSuccess(response) {
    return response;
  }

  handleError = (error) => {
    console.log(error);
    switch (error.response.status) {
      case 401:
        this.redirectTo(document, "/");
        break;
      case 404:
        // this.redirectTo(document, "/404");
        break;
      default:
        // this.redirectTo(document, "/500");
        break;
    }
    return Promise.reject(error);
  };

  redirectTo = (document, path) => {
    document.location = path;
  };

  get(path) {
    return this.service.get(path).then((response) => response);
  }

  patch(path, payload) {
    return this.service
      .request({
        method: "PATCH",
        url: path,
        responseType: "json",
        data: payload,
      })
      .then((response) => response);
  }

  delete(path) {
    return this.service.delete(path).then((response) => response);
  }

  post(path, payload) {
    return this.service
      .request({
        method: "POST",
        url: path,
        responseType: "json",
        data: payload,
      })
      .then((response) => response);
  }
}

export default new Service();
