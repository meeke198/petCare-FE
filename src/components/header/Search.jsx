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
const query = useSelector(state => state.search.query);
const isSearching = useSelector(state => state.search.isSearching);
console.log({ searchInput });
console.log({ query });
console.log({ isSearching });


// const setResult = props.onSearchResults;
// const setIsSearching= props.onSearching;
const handleSubmit = (e) => {
  e.preventDefault();
  dispatch(searchStart(true));
  dispatch(updateQuery(searchInput));
  setSearchInput("")
};

    return (
      <form className="search-form" onSubmit={handleSubmit}>
        <input
          className="search-input"
          type="text"
          placeholder="Search keyword"
          width={15}
          height={15}
          viewBox="0 0 15 15"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
          <svg
            style={{ marginRight: 25, width: 30, height: 25 }}
            viewBox="0 0 15 15"
          >
            <path d="M13.8914 12.3212L11.3164 9.74312C11.1877 9.63999 11.0332 9.56265 10.8787 9.56265H10.4667C11.1619 8.6603 11.5997 7.52593 11.5997 6.26265C11.5997 3.32358 9.1792 0.900146 6.2437 0.900146C3.28245 0.900146 0.887695 3.32358 0.887695 6.26265C0.887695 9.22749 3.28245 11.6251 6.2437 11.6251C7.4797 11.6251 8.6127 11.2126 9.5397 10.4908V10.9291C9.5397 11.0837 9.5912 11.2384 9.71995 11.3673L12.2692 13.9197C12.5267 14.1775 12.9129 14.1775 13.1447 13.9197L13.8657 13.1978C14.1232 12.9658 14.1232 12.5791 13.8914 12.3212ZM6.2437 9.56265C4.41545 9.56265 2.9477 8.09312 2.9477 6.26265C2.9477 4.45796 4.41545 2.96265 6.2437 2.96265C8.0462 2.96265 9.5397 4.45796 9.5397 6.26265C9.5397 8.09312 8.0462 9.56265 6.2437 9.56265Z" />
          </svg>
      </form>
    );

}
export default Search;