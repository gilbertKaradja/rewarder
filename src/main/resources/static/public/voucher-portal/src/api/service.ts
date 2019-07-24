import axios from 'axios';

const env = process.env.NODE_ENV;

const baseURL = env === 'development' ? 'http://localhost:7775/' : './';

const getBaseUrl = () => {
    return 'http://173.255.194.101:20001/api/v1'
}

export const createServiceInstance = () => {
    return {
        customerVoucher: {
            generateCustomerVouchers: generateCustomerVouchers
        }
    }
}


const generateCustomerVouchers = (formData:FormData) => {
    const url = `${baseURL}vouchers/generate`;

    return axios.post(url, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
}