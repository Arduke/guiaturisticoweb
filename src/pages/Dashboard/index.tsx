import React, { useContext } from "react";
import { useRef } from "react";
import { useEffect } from "react";

import "./styles.css";
import ImageList from "../../components/DashboardComponent/ImageList";
import ImageSlider from "../../components/DashboardComponent/ImageSlider";
import Menu from "../../components/Menu";
import PoiContext from "../../contexts/poi";
import notimagefound from "../../images/notimagefound.svg";

const Dashboard = () => {
  const { pois, poisCarousel } = useContext(PoiContext);
  const fetch = useRef(useContext(PoiContext));

  useEffect(() => {
    fetch.current.fetchAllPoiCarousel();
    fetch.current.fetchAllPoi();
  }, []);

  return (
    <div className="Dashboard">
      <Menu />
      {pois.length !== 0 && poisCarousel.length !== 0 ? (
        <>
          <ImageSlider pois={poisCarousel.slice(0, 5)} />
          <h2 className="titleDashboard">
            CONHEÇA LUGARES NO MUNDO EM UM CLICK!
          </h2>
          <ImageList pois={pois} />
          <div className="footerDashboard">
            <h4>Todos os direitos reservados @2021 </h4>
            <br />
            Carlos Eduardo Martis Filho, Isabela Rocha Silveira, Danilo
            Barberini
          </div>
        </>
      ) : (
        <div className="notFoundDashboard">
          <h2>Não há nenhum ponto turistico cadastrado</h2>
          <img
            className="notImageFound"
            src={notimagefound}
            alt="notimagefound"
          />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
