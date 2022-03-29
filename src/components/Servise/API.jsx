import axios from "axios";
import PropTypes from 'prop-types';

async function fetchApi(searchQuery,page) { 

  try {
    const response = await axios.get("https://pixabay.com/api/", {
      params: {
        key: '25225743-62355b18deaf2a31912b18441',
        page: page,
        per_page: 12,
        q: searchQuery,
        img_type: 'photo&orientation=horizontal'
      }
});
    return response.data;
  } catch (error) { 
    return error.message
  }
}

fetchApi.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
  per_page:PropTypes.number.isRequired
}

export default fetchApi;