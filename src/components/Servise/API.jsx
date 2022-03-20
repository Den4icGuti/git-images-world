import axios from "axios";
import PropTypes from 'prop-types'

//===Записываем базовый API в axios===//
  axios.defaults.baseURL = "https://pixabay.com/api/";

async function fetchApi(searchQuery,page) { 

  const paramUrl = new URLSearchParams({
    key: "25225743-62355b18deaf2a31912b18441",
    page: page,
    per_page: 12,
    q: searchQuery,
    img_type: 'photo&orientation=horizontal'
  });

  try {
    const response = await axios.get(`?${paramUrl}`);
    return response.data;
  } catch (error) { 
    return Promise.reject(new Error(error.message))
  }
}

fetchApi.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
  per_page:PropTypes.number.isRequired
}

export default fetchApi;