import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { request } from '../../requests';
import { URL_IMG } from '../../config';
import CountProduct from '../countProduct';
import Loading from '../loading';
import css from './productDetail.module.css';

function ProductDetal(props) {

  const {basketProduct, handleClick} = props

  const navigate = useNavigate()

  const location = useLocation()

  const {id} = useParams()

  const [dataLoading, setDataLoading] = useState(false)

  const [product, setProduct] = useState([])

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

  const back = () => {
    navigate(-1)
  }

  return (
    <>
      {dataLoading
        ? 
          <div className={css.user_view_interface}>
            <button onClick={back} className={css.btn_back}>Назад</button>
            <div className={css.product_detail}>
              <div className={css.block_img}>
                <img className={css.img} src={URL_IMG+product.data.img} alt='Картинка' />
              </div>
              <div className={css.detail}>
                <div className={css.block_name}>
                  <p className={css.name}>{product.data.name}</p>
                </div>
                <div className={css.info}>
                  <p>Производитель: {product.data.producer ? product.data.producer.name : '-'}</p>
                  <p>Страна: {product.data.country ? product.data.country.name : '-'}</p>
                </div>
                <div className={css.block_price}>
                  <p className={css.text_price}>Цена <span className={css.price}>{product.data.price}</span> руб.</p>
                  {basketProduct(product.data.id)
                    ? <CountProduct basketProduct={basketProduct(product.data.id)}/>
                    : <button className={css.btn_item_cart} onClick={() => handleClick(product.data)}>В корзину</button>
                  }
                </div>
              </div>
            </div>
            <p className={css.description}>Описание: {product.data.description}</p>
          </div>
        : <div className={css.loading}>
            <Loading />
          </div>
      }
    </>
  );
}

export default ProductDetal;