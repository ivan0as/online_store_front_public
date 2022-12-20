import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { COROUSEL_TYPES } from '../../config';
import css from './carouselBox.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import mock from '../../mock/carousel-mock.js';

function CarouselBox() {
  const tasksState = (mock.slider)
  const [slides, setSlides] = useState(tasksState);

  return (
    <Carousel>
      {slides.map( slide => {
        return (
          <Carousel.Item>
            <img key={slide[COROUSEL_TYPES.ID]}
              className="d-block w-100"
              src={slide[COROUSEL_TYPES.SRCIMG]}
              alt={slide[COROUSEL_TYPES.ALT]}
            />
          </Carousel.Item>
        )
      })}
    </Carousel>
  );
}

export default CarouselBox;