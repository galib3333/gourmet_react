import axios from 'axios';
const SERVER_URL = "http://localhost/restApis";

const login = async (data) => {
    const LOGIN_ENDPOINT = `${SERVER_URL}/login.php`;
    try {
        let response = await axios.post(LOGIN_ENDPOINT, data);
        if(response.data.jwt){
            localStorage.setItem("access_token", response.data.jwt);
            localStorage.setItem("userdata", response.data.datas);
            return true;
        }else{
            return false;
        }
    } catch(e){
        return false;
        // console.log(e);
    }
}

const register = async (data) => {
    const SIGNUP_ENDPOINT = `${SERVER_URL}/register.php`;
    try {
        let response = await axios({
            method: 'post',
            responseType: 'json',
            url: SIGNUP_ENDPOINT,
            data: data
          });
    } catch(e){
        console.log(e);
    }
}

const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("userdata");
}

export { login, register, logout } 