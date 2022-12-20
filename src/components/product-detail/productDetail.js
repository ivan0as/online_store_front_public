import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../context';
import { useParams } from 'react-router-dom';
import { request } from '../../requests';
import { URL_IMG } from '../../config'
import CountProduct from '../countProduct';
import css from './productDetail.module.css';

function ProductDetal(props) {

  const {basketProduct, handleClick} = props
  
  const {basketProducts, setBasketProducts} = useContext(UserContext)

  const {id} = useParams()

  const [dataLoading, setDataLoading] = useState(false)

  const [product, setProduct] = useState([])

  const [producer, setProducer] = useState([])

  const [country, setCountry] = useState([])

  const find = (values, value, setValue) => {
    const result = values.data.find(({ id }) => id === value)
    setValue(result)
  }

  useEffect(() => {
    const method = 'get'

    let url = `product/${id}`

    let option = {
        method: method,
        url: url
    }

    request(option).then (response => {
      setDataLoading(true)
      setProduct(response)
    }).catch(error => {
      console.log(error.toJSON())
    })
  }, [id])

  useEffect(() => {
    if (product.length !== 0) {
      const method = 'get'

      let url = `producer`

      let option = {
          method: method,
          url: url
      }

      request(option).then (response => {
        find(response, product.data.producerId, setProducer)
      }).catch(error => {
        console.log(error.toJSON())
      })

      url = `country`

      option = {
          method: method,
          url: url
      }

      request(option).then (response => {
        find(response, product.data.countryId, setCountry)
      }).catch(error => {
        console.log(error.toJSON())
      })
    }
  }, [product])

  return (
    <>
      {dataLoading
        ? <div className={css.product_detail}>
            <div className={css.block_img}>
              <img className={css.img} src={URL_IMG+product.data.img} alt='Картинка' />
            </div>
            <div className={css.detail}>
              <div className={css.block_name}>
                <p className={css.name}>{product.data.name}</p>
              </div>
              <div className={css.info}>
                <p>Описание: {product.data.description}</p>
                <p>Производитель: {producer.length !==0 ? <span>{producer.name}</span> : <span>Данные не получены</span>}</p>
                <p>Страна: {country.length !==0 ? <span>{country.name}</span> : <span>Данные не получены</span>}</p>
              </div>
              <div className={css.block_price}>
                <p className={css.text_price}>Цена от <span className={css.price}>{product.data.price}</span> руб.</p>
                {basketProduct(product.data.id)
                  ? <CountProduct basketProduct={basketProduct(product.data.id)}/>
                  : <button className={css.btn_item_cart} onClick={() => handleClick(product.data)}>В корзину</button>
                }
              </div>
            </div>
          </div>
        : <div>1</div>
      }
    </>
  );
}

export default ProductDetal;