import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-builder-react-project.firebaseio.com/'
});

export default instance;