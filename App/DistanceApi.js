// GlobalApi.js
import axios from 'axios';

const BASE_URL = "https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial";
const API_KEY = "API Key";

const NewDistance = async (location, destination) => {
  const { latitude, longitude } = location;
  const url = `${BASE_URL}&origins=${latitude},${longitude}&destinations=${destination.lat},${destination.lng}&key=${API_KEY}`;

  try {
    const response = await axios.get(url);
    return response;
  } catch (error) {
    console.error('Google Places distance matrix API Error:', error.response?.data || error.message);
    return { data: { results: [] } };
  }
};

export default {
  NewDistance
};

