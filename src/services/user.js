import axios from "axios";

const serviceUser = {
    create: (data) => axios({url: `${process.env.REACT_APP_API_URL}/user`, method:'POST', data}),
    login: (username, password) => axios({url: `${process.env.REACT_APP_API_URL}/user/login`, method:'POST', data: {username, password}}),
    getData: (token) => axios({url: `${process.env.REACT_APP_API_URL}/user/data`, method:'GET', headers: {'Authorization': `Bearer ${token}`}}),
    getUserByUser: (id, token) => axios({url: `${process.env.REACT_APP_API_URL}/user/${id}`, method:'GET', headers: {'Authorization': `Bearer ${token}`}}),
}

export default serviceUser;