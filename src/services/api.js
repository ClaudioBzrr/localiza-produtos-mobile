import axios from 'axios'


const api =  axios.create({
    baseURL:'https://localiza-produtos-backend.herokuapp.com/'
})


export default api;