import { Axios, baseUrl } from "src/boot/axios";

export default {
    index(params){
      return Axios.get(baseUrl + '/measures', {params : params});
    },
    show(id){
        return Axios.get(baseUrl + '/measures/' + id);
    },
    store(data){
        return Axios.post(baseUrl + '/measures', data);
    },
    update(id, data){
        return Axios.put(baseUrl + '/measures/' + id, data);
    },
    destroy(id){
        return Axios.delete(baseUrl + 'measures/' + id);
    },
};