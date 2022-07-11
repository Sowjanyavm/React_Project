import instance from "./axios";
import { useState, useEffect } from "react";
//import "./categories.css";
import "./Row.css";
import React from "react";
import Search from "../UI/Search";

//const base_url = "http://localhost:3006/";

const Butterflies = () => {
  const [Butterflies, setButterflies] = useState([]);
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const [value, setValue] = useState(1);

  useEffect(() => {
    async function fetchData() {
      const request = await instance.get("/Butterfly");
      setButterflies(request.data);
      return request;
    }
    fetchData();
  }, []);

  const searchHandler = (query) => {
    setQuery(query);
    console.log(Butterflies);
    if (query !== "") {
      const newList = Butterflies.filter((item) => {
        var values = Object.keys(item).map(function (e) {
          return item[e];
        });

        return values.join("").toLowerCase().includes(query.toLowerCase());
      });
      setSearchResults(newList);
    } else {
      setSearchResults(Butterflies);
    }
  };

  console.log(searchResults);
  return (
    <div className="row">
      <Search
        setResults={searchResults}
        item={query}
        getQuery={searchHandler}
      />

      <div id="sliderBox" className="slider">
        <form>
          <label>Opacity: </label>
          <input
            type="range"
            min="1"
            max="100"
            value={value}
            onChange={({ target: { value } }) => setValue(value)}
          />
          <span id="numOpacity">100</span>%
        </form>
      </div>

      <div className="row_img">
        {query.length < 1
          ? Butterflies.map((Butterflie) => (
              <div className="row__Images">
                <img
                  className={`row__poster ${
                    value > 1 ? "row__poster-50" : "row__poster-0"
                  }`}
                  key={Butterflie.id}
                  src={`${Butterflie.image}`}
                  alt={Butterflie.text}
                />
                <p>{Butterflie.text}</p>
              </div>
            ))
          : searchResults.map((Butterflie) => (
              <div className="row__Images">
                <img
                  className="row__poster"
                  key={Butterflie.id}
                  src={`${Butterflie.image}`}
                  alt={Butterflie.text}
                />
                <p>{Butterflie.text}</p>
              </div>
            ))}
      </div>
    </div>
  );
};

export default Butterflies;
