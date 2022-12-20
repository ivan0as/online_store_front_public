import axios from 'axios';

const request =(option) => {
    option.url = 'http://localhost:7000/api/' + option.url
    return axios(option)
   .then(response => {
        return response.data
    })
}
export { request }