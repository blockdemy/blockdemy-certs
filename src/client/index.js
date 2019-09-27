import axios from 'axios';
import config from './config';

const CertsClient = axios.create(config);

export default CertsClient;
