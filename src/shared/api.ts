import axios from 'axios';

interface User {
  username: string;
  password: string;
}
interface Category {
parentId?: string;
name: string;
description?: string;
iconFileId?: string;
isReviewPhotoRequired: boolean;
}
interface Priority {
  name: string;
  term: number;
  backgroundColor: string;
  textColor: string;
  weight: number;
}
interface LoginResponse {
data: {
    token: string;
}
  success: boolean;
}
const authorizedApi = axios.create({
  baseURL: 'http://84.201.179.80:8081/v1',
  headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
});
const api = {

};

export { api };
