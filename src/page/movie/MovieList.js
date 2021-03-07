import React, { useState, useEffect } from "react";
import CommonTable from "../../component/table/CommonTable";
import CommonTableColumn from "../../component/table/CommonTableColumn";
import CommonTableRow from "../../component/table/CommonTableRow";
import movieList from "../../test/MovieData";

const MovieList = () => {
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
                  <img src={item.poster} alt="포스터"></img>
                </CommonTableColumn>
              </CommonTableRow>
            );
          })
        : ""}
    </CommonTable>
  );
};

export default MovieList;
