import { useState } from "react";
import axios from "axios"; 
import { sentRequest } from "../../pages/ServicePackage";

const Search = () => {
   const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);


   const handleSearch = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await axios.get("http://localhost:8080/api/search", {
        params: { query },
      });
      setResults(response.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }
    return (
      <form className="mobile-menu-form" onSubmit={handleSearch}>
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