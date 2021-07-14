import React, { useContext } from 'react'
import { useRef } from 'react'
import { useEffect } from 'react'


import "./styles.css"
import ImageList from '../../components/ImageList'
import ImageSlider from '../../components/ImageSlider'
import Menu from '../../components/Menu'
import PoiContext from '../../contexts/poi'

import DetailsPoi from '../DetailsPoi'

const Dashboard: React.FC = () => {
  const { pois, poisCarousel } = useContext(PoiContext);
  const fetch = useRef(useContext(PoiContext));

  useEffect(() => {
    fetch.current.fetchAllPoiCarousel()
    fetch.current.fetchAllPoi()
  }, [])


  return (
    <div className="Dashboard">
      <Menu />
      <ImageSlider pois={poisCarousel.slice(0, 5)} />
      <h2 className="titleDashboard">
        CONHEÇA LUGARES NO MUNDO EM UM CLICK!
      </h2>
      <ImageList pois={pois} />      
      <div className="footerDashboard">
        todos os direitos reservados
      </div>
    </div>
  );
}

export default Dashboard;