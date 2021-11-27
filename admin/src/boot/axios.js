import { boot } from 'quasar/wrappers'
import axios from 'axios'

// const baseURL = "/api";
const baseUrl = 'http://tpv.ap/api'

const headers = {
  "Content-Type": "application/json",
  "Accept": "application/json",
  "X-Requested-With": "XMLHttpRequest",
};

const options = {
  headers
};

const Axios = axios.create(options);

Axios.interceptors.request.use(
  function(config) {
    const tokenStore = JSON.parse(localStorage.getItem("tpv-token"));
    if (tokenStore) {
      config.headers.Accept = "application/json";
      config.headers.Authorization = "Bearer " + tokenStore.token;
    }
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);

Axios.interceptors.response.use(
  function(response) {
    // Do something with response data
    // console.log("Request's response: ", response);
    return response.data;
  },
  function(error) {
    if(error.response){
      if(error.response.data.message == 'Unauthenticated.'){
        localStorage.removeItem("tpv-token");
        window.location.replace('/login');
        return null;
      }
      return Promise.reject(error.response.data);
    }else{
      return Promise.reject(error);
    }
  }
);



export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = Axios
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
})

export { Axios, baseUrl }

