import axios from 'axios';
import { CLOUDINARY_API, SERVICE_API } from '../common/constants/pathAPI';

export const axiosClient = axios.create({ baseURL: SERVICE_API });

export const axiosAdmin = axios.create({ baseURL: CLOUDINARY_API });
