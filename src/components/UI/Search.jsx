import { useState, useRef } from "react";

const Search = (props) => {
  const inputEl = useRef("");

  const getSearchTerm = () => {
    props.getQuery(inputEl.current.value);
  };
  return (
    <div>
      <nav className="nav">
        <section className="search">
          <form>
            <input
              ref={inputEl}
              type="text"
              className="form-control"
              placeholder="Search names"
              value={props.term}
              onChange={getSearchTerm}
            />
          </form>
        </section>
      </nav>
      <h3 className="search_item">
        {props.setResults.length === 0 &&
          props.item !== "" &&
          "no search found.."}
      </h3>
    </div>
  );
};

export default Search;
