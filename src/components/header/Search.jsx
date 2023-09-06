import { useState } from "react";
import axios from "axios"; 
import { sentRequest } from "../../pages/ServicePackage";
// import { set } from "core-js/core/dict";
import "core-js";


const Search = (props) => {
const [query, setQuery] = useState("");
// const [loading, setLoading] = useState(false);


// const setResult = props.onSearchResults;
// const setIsSearching= props.onSearching;
const handleKeyDown = () => {
  props.onSearching(true);
};

   const handleSearch = async (e) => {
    e.preventDefault();

    try {
      // setLoading(true);
      // setIsSearching(true);
      const response = await axios.get("http://localhost:8080/api/products/search", {
        params: { query },
      });
      console.log({response});
      props.onSearchResults(response.data);

    } catch (err) {
      console.error(err);
    }
  }
    return (
      <form
        className="mobile-menu-form"
        onKeyDown={handleKeyDown}
        onSubmit={handleSearch}
      >
        <div className="input-with-btn d-flex flex-column">
          <input type="text"
           placeholder="Search here..."
           value={query}
           onChange={(e) => setQuery(e.target.value)} />
          <button className="primary-btn1" type="submit">
            Search
          </button>
        </div>
      </form>
    );

}
export default Search;