import instance from "./axios";
import { useState, useEffect } from "react";
//import "./categories.css";
import "./Row.css";
import Search from "../UI/Search";

const Offices = () => {
  const [Offices, setOffices] = useState([]);
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const [value, setValue] = useState(1);

  useEffect(() => {
    async function fetchData() {
      const request = await instance.get("/Office");
      setOffices(request.data);
      return request;
    }
    fetchData();
  }, []);

  const searchHandler = (query) => {
    setQuery(query);

    if (query !== "") {
      const newList = Offices.filter((item) => {
        var values = Object.keys(item).map(function (e) {
          return item[e];
        });

        return values.join("").toLowerCase().includes(query.toLowerCase());
      });
      setSearchResults(newList);
    } else {
      setSearchResults(Offices);
    }
  };

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
        {query < 1
          ? Offices.map((Office) => (
              <div className="row__Images">
                <img
                  className={`row__poster ${
                    value > 1 ? "row__poster-50" : "row__poster-0"
                  }`}
                  key={Office.id}
                  src={`${Office.image}`}
                  alt={Office.text}
                />
                <p>{Office.text}</p>
              </div>
            ))
          : searchResults.map((Office) => (
              <div className="row__Images">
                <img
                  className="row__poster"
                  key={Office.id}
                  src={`${Office.image}`}
                  alt={Office.text}
                />
                <p>{Office.text}</p>
              </div>
            ))}
      </div>
    </div>
  );
};

export default Offices;
