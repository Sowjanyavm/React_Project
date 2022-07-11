import instance from "./axios";
import { useState, useEffect } from "react";
//import "./categories.css";
import "./Row.css";
import Search from "../UI/Search";

const CellPhones = () => {
  const [Cellphone, setCelPhone] = useState([]);
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const [value, setValue] = useState(1);

  useEffect(() => {
    async function fetchData() {
      const request = await instance.get("/Cellphone");
      setCelPhone(request.data);
      return request;
    }
    fetchData();
  }, []);

  //console.log(Cars);
  const searchHandler = (query) => {
    setQuery(query);

    if (query !== "") {
      const newList = Cellphone.filter((item) => {
        var values = Object.keys(item).map(function (e) {
          return item[e];
        });

        return values.join("").toLowerCase().includes(query.toLowerCase());
      });
      setSearchResults(newList);
    } else {
      setSearchResults(Cellphone);
    }
  };

  //console.log(Cars);
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
          ? Cellphone.map((celphone) => (
              <div className="row__Images">
                <img
                  className={`row__poster ${
                    value > 1 ? "row__poster-50" : "row__poster-0"
                  }`}
                  key={celphone.id}
                  src={`${celphone.image}`}
                  alt={celphone.text}
                />
                <p>{celphone.text}</p>
              </div>
            ))
          : searchResults.map((celphone) => (
              <div className="row__Images">
                <img
                  className="row__poster"
                  key={celphone.id}
                  src={`${celphone.image}`}
                  alt={celphone.text}
                />
                <p>{celphone.text}</p>
              </div>
            ))}
      </div>
    </div>
  );
};

export default CellPhones;
