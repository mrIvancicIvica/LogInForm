import axios from "axios";

const base_url = 'http://localhost:8000/users'

export default axios({
    baseURL: base_url
})