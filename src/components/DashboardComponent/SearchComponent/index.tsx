import React, { useState, useContext } from "react";
import { Modal, IconButton, Paper } from "@material-ui/core";
import { Search } from "@material-ui/icons";

import "./styles.css";
import PoiContext from "../../../contexts/poi";

function SearchComponent() {
  const [open, setOpen] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const { searchPois, searchPoi } = useContext(PoiContext);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSearchPois = () => {
    if (search.length >= 2) {
      searchPoi(search);
    }
  };

  return (
    <div>
      <IconButton onClick={handleOpen}>
        <Search style={{ color: "white" }}></Search>
      </IconButton>
      <Modal open={open} onClose={handleClose}>
        <div
          style={{
            transform: `translate(${5}%, ${10}%)`,
          }}
          className="modalSearchList"
        >
          <input
            onChange={(e) => {
              setSearch(e.target.value);
              handleSearchPois();
            }}
            value={search}
            className="textFieldSearchComponent"
            placeholder="Pesquisar"
          ></input>
          <Paper className="paperSearchPoi">
            <div className="listPoisSearch">
              {searchPois ? (
                searchPois.map((poi: any) => {
                  return (
                    <div className="poiCardSearch" key={poi.id}>
                      <img
                        className="poiCardPictureSearch"
                        alt={poi.name}
                        src={poi.picture}
                      ></img>
                      <div className="divCardDetails">
                        <div className="poiCardTitleSearch"> {poi.name} </div>
                        <div className="poiCardDescriptionSearch">
                          {poi.description}
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <></>
              )}
            </div>
          </Paper>
        </div>
      </Modal>
    </div>
  );
}

export default SearchComponent;
