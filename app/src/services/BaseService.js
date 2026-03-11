import axios from 'axios';

// npm start — —reset-cache
// Define the base URL

// // live url
export const BASE_URL = 'https://asdf.basiq360.com/api/index.php/app/';
export const UPLOAD_URL = 'https://portal.basiq360.com/api/uploads/';
export const SAVE_GEOLOCATION = 'https://portal.basiq360.com/api/index.php/CronJob/saveGeoLocation';


// demo url
// export const BASE_URL = 'https://dev.basiq360.com/basiq360-Product/api/index.php/app/';
// export const UPLOAD_URL = 'https://dev.basiq360.com/basiq360-Product/api/uploads/';
// export const SAVE_GEOLOCATION = 'https://dev.basiq360.com/basiq360-Product/api/index.php/CronJob/saveGeoLocation';


// Export the base URL separately
export const getBaseUrl = () => BASE_URL;
