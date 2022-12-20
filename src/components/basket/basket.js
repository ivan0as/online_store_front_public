import { useContext, useState } from 'react';
import { UserContext } from '../../context';
import { URL_IMG } from '../../config'
import { PAYMENT_TYPE, PAYMENT_COPY } from '../../config';
import { request } from '../../requests';
import CountProduct from '../countProduct';
import css from './basket.module.css';

function Basket() {

  const {token, basketProducts, productDelete, basketDelete} = useContext(UserContext)

  const [paymentType, setPaymentType] = useState(PAYMENT_TYPE.CASH)

  const sum = (amount, price) => {
    const priceAll = amount * price
    return priceAll
  }

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  const handleClick = (id) => {
    productDelete(id)
  }

  const amountAll = () => {
    let amountAll = 0
    basketProducts.map(basketProduct => {
      amountAll+=basketProduct.amount
    })
    return amountAll
  }

  const sumAll = () => {
    let sumAll = 0
    basketProducts.map(basketProduct => {
      sumAll+=basketProduct.amount * basketProduct.product.price
    })
    return sumAll
  }

  const handleChange = e => {
		setPaymentType(e.target.value)
	}

  const submit = () => {
    const method = 'post'

    const url = 'sales'

    const headers = {
      'Authorization': `Bearer ${token}`
    }

    const data = {
      'paymentType': paymentType
    }

    const option = {
      method: method,
      url: url,
      headers: headers,
      data: data
    }

    request(option).then (response => {
      basketDelete()
    }).catch(error => {
      console.log(error.toJSON())
    })
  }

  return (
    <div className={css.basket}>
      {basketProducts.length !== 0
        ? <form className={css.form} onSubmit={handleSubmit}>
            <div className={css.basket_products}>
              <p>Корзина: </p>
              {basketProducts.map( basketProduct => {
                return(
                  <div className={css.basket_product} key={basketProduct.id}>
                    <div className={css.top_basket_product}>
                      <button className={css.btn_delete_product} onClick={() => handleClick(basketProduct.id)}>X</button>
                    </div>
                    <div className={css.bottom_product}>
                      <img className={css.img_product}
                      src={URL_IMG + basketProduct.product.img}
                      alt='Товар'
                      />
                      <div className={css.info_basket_product}>
                        <p>{basketProduct.product.name}</p>
                        <p>Цена от {basketProduct.product.price}</p>
                        <CountProduct basketProduct={basketProduct}/>
                        <p>Сумма товара: {sum(basketProduct.amount, basketProduct.product.price)}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
              <button className={css.clear_basket} onClick={basketDelete}>Очистить корзину</button>
            </div>
            <div className={css.basket_info}>
              <p>Информация о заказе:</p>
              <p>Количество товаров: {amountAll()}</p>
              <p>Итог: {sumAll()}</p>
              <label>Тип оплаты: 
                <select value={paymentType} onChange={handleChange}>
                  {Object.values(PAYMENT_TYPE).map(type => {
                    return <option key={type} value={type}>{PAYMENT_COPY[type]}</option>
                  })}
                </select>
              </label>
              <button className={css.btn_submit} onClick={submit}>Заказать</button>
            </div>
          </form>
        : <p>В корзине не товаров</p>
      }
    </div>
  );
}

export default Basket;