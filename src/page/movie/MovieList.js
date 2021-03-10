import React, { useState, useEffect } from "react";
import CommonTable from "../../component/table/CommonTable";
import CommonTableColumn from "../../component/table/CommonTableColumn";
import CommonTableRow from "../../component/table/CommonTableRow";
//import movieList from "../../test/MovieData";
const axios = require("axios");

const MovieList = ({ authObject }) => {
  const [movieList, setMovieList] = useState([]);
console.log(authObject.accessToken);
  useEffect(() => {
    async function fetchData() {
      const url = "http://192.168.1.29:3000/v1/movies";
      const response = await axios.get(url, {
        headers: {
          "api-version": "1.2",
          "content-type": "application/json",
          "x-access-token": authObject.accessToken,
          "x-refresh-token": authObject.getRefreshToken(),
        },
      });

      console.log(response);
      if (response.status === 200) {
        setMovieList(response.data);
      } else {
        alert("에러!");
      }
    }

    fetchData();
  }, []);

  return (
    <CommonTable headersName={["id", "name", "year", "director", "poster"]}>
      {movieList
        ? movieList.map((item, index) => {
            return (
              <CommonTableRow key={index}>
                <CommonTableColumn>{item.id}</CommonTableColumn>
                <CommonTableColumn>{item.name}</CommonTableColumn>
                <CommonTableColumn>{item.year}</CommonTableColumn>
                <CommonTableColumn>{item.director}</CommonTableColumn>
                <CommonTableColumn>
                  <img
                    src={item.poster}
                    alt="포스터"
                    style={{ width: 185, height: 260 }}
                  ></img>
                </CommonTableColumn>
              </CommonTableRow>
            );
          })
        : ""}
    </CommonTable>
  );
};

export default MovieList;
