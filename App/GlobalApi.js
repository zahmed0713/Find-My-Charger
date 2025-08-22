// GlobalApi.js
import axios from 'axios';

const BASE_URL = "https://maps.googleapis.com/maps/api/place/nearbysearch/json";
const API_KEY = "AIzaSyAooBfMOhOijTPqRo-LsulE9zVDv7JZskk";

const NewNearByPlace = async (location, keyword = 'Charger') => {
  const { latitude, longitude } = location;
  const url = `${BASE_URL}?location=${latitude},${longitude}&radius=5000&keyword=${encodeURIComponent(keyword)}&key=${API_KEY}`;

  try {
    const response = await axios.get(url);
    return response;
  } catch (error) {
    console.error('Google Places NearbySearch API Error:', error.response?.data || error.message);
    return { data: { results: [] } };
  }
};

export default {
  NewNearByPlace
};
