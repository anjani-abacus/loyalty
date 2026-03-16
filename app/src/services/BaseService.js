import axios from 'axios';

// npm start — —reset-cache
// Define the base URL

// // live url
export const BASE_URL = 'http://192.168.100.73:7000/api/loyalty/v1/';
export const UPLOAD_URL = 'http://192.168.100.73:7000/api/uploads/';
export const SAVE_GEOLOCATION = 'http://192.168.100.73:7000/api/index.php/CronJob/saveGeoLocation';


// demo url
// export const BASE_URL = 'https://dev.basiq360.com/basiq360-Product/api/index.php/app/';
// export const UPLOAD_URL = 'https://dev.basiq360.com/basiq360-Product/api/uploads/';
// export const SAVE_GEOLOCATION = 'https://dev.basiq360.com/basiq360-Product/api/index.php/CronJob/saveGeoLocation';


// Export the base URL separately
export const getBaseUrl = () => BASE_URL;
