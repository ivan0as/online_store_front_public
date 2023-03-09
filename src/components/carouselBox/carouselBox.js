import { useState, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { URL_IMG } from '../../config';
import { request } from '../../requests';
import css from './carouselBox.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function CarouselBox() {
  const [sliders, setSliders] = useState()

  const [loading, setLoading] = useState(false)

  useEffect (() => {
    const method = 'get'

    const url = `slider`

    const option = {
      method: method,
      url: url
    }

    request(option).then (response => {
      setSliders(response.data)
      setLoading(true)
    }).catch(error => {
      console.log(error.toJSON())
    })
  }, [])

  return (
    <>
      {loading &&
        <Carousel>
          {sliders.map( slider => {
            return (
              <Carousel.Item key={slider.id}>
                <a href={slider.url}>
                  <img
                    className={`d-block w-100 ${css.slider}`}
                    src={URL_IMG+slider.img}
                    alt={`Слайдер №${slider.id}`}
                  />
                </a>
              </Carousel.Item>
            )
          })}
        </Carousel>
      }
    </>
  );
}

export default CarouselBox;