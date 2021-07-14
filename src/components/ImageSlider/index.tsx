import React from 'react';
import { useState } from 'react';
import { ArrowBackIos, ArrowForwardIos } from '@material-ui/icons'

import "./styles.css"
import { Chip } from '@material-ui/core';

interface Props {
  pois: Array<any> | [{}]
}

interface Category {
  name: string;
  id: string
}


const ImageSlider: React.FC<Props> = ({ pois }) => {
  const [current, setCurrent] = useState(0)
  const lenght = pois.length


  if (!Array.isArray(pois) || pois.length <= 0) {
    return null
  }

  const prevSlide = () => {
    setCurrent(current === 0 ? lenght - 1 : current - 1)
  }

  const nextSlide = () => {
    setCurrent(current === lenght - 1 ? 0 : current + 1)
  }

  return (
    <section className="slider">
      <ArrowBackIos className="left-arrow" onClick={prevSlide} />
      <ArrowForwardIos className="rigth-arrow" onClick={nextSlide} />
      {pois.map((poi, index) => {
        return (
          <div className={index === current ? 'slide active' : 'slide'} key={index}>
            {index === current && (
              <div className="imageContainer">
                <img className="imageSlider" key={poi.id} alt={poi.name} src={poi.picture} />
                <div className="centeredSliderImage">
                  <h1>
                    {poi.name}
                  </h1>
                  <p>
                    {poi.description}
                  </p>
                  <div className="chipList">
                    {poi.categories.map((categorie: Category) =>{
                      return <Chip  key={categorie.id} label={categorie.name}></Chip>}
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        )
      })}
    </section>
  )
}

export default ImageSlider;