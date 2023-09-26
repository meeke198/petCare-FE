import { useState } from "react";
import axios from "axios"; 
import { sentRequest } from "../../pages/ServicePackage";
// import { set } from "core-js/core/dict";
import "core-js";
import { useDispatch, useSelector } from "react-redux";
import {searchStart, updateQuery} from "../../redux/searchSlice"


const Search = (props) => {
  const [searchInput, setSearchInput] = useState()
  const dispatch = useDispatch();
const handleSubmit = (e) => {
  e.preventDefault();
  dispatch(searchStart(true));
  dispatch(updateQuery(searchInput));
  setSearchInput("")
};

    return (
      <form className="search-form" onSubmit={handleSubmit}>
        <input
         style={{ backgroundColor:"transparent"}}
          type="text"
          placeholder="Search product"
          width={15}
          height={15}
          viewBox="0 0 15 15"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </form>
    );

}
export default Search;