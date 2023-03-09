import { useContext, useState, useEffect } from 'react';
import { UserContext } from '../../context';
import { URL_IMG } from '../../config'
import { PAYMENT_TYPE, PAYMENT_COPY, DELIVERY_TYPE, DELIVERY_COPY, ADDRESS_TYPE, ADDRESS_COPY } from '../../config';
import { request } from '../../requests';
import CountProduct from '../countProduct';
import AuthorizationFailed from '../authorization_failed';
import css from './basket.module.css';

function Basket() {

  const {token, basketProducts, productDelete, basketDelete, authorization} = useContext(UserContext)

  const emptyObject = {
    paymentType: PAYMENT_TYPE.CASH,
    deliveryType: '',
    clientAddress: '',
    pharmacyId: '',
  }

  const [values, setValues] = useState(emptyObject)

  const [pharmacies, setPharmacies] = useState([])

  const [clientAddress, setClientAddress] = useState({
    [ADDRESS_TYPE.ADDRESS]: '',
    [ADDRESS_TYPE.APARTMENT]: '',
    [ADDRESS_TYPE.ENTRANCE]: '',
    [ADDRESS_TYPE.FLOOR]: '',
  })

  const [checkoutStatus, setCheckoutStatus] = useState({
    basket: true,
    additionalForm: false,
  })

  useEffect (() => {
    if (authorization) {
      const method = 'get'
  
      const url = 'pharmacy'
  
      const option = {
        method: method,
        url: url,
      }
  
      request(option).then (response => {
        setPharmacies(response.data)
      }).catch(error => {
        console.log(error.toJSON())
      })
    }
  }, [authorization])

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

  const handleChangeValues = e => {
		const fieldName = e.target.name
		setValues({...values, [fieldName]: e.target.value})
	}

  const handleChangeClientAddress = e => {
    const fieldName = e.target.name
    setClientAddress({...clientAddress, [fieldName]: e.target.value})
  }

  const next = (state) => {
    const obj = {}
    for (let key in checkoutStatus) {
      obj[key] = false
    }

    obj[state] = true
    setCheckoutStatus(obj)
  }

  const submit = () => {

    if (!values.deliveryType && !values.paymentType) {
      return alert('Заполните тип оплаты и тип доставки')
    } else if (!values.paymentType) {
      return alert('Заполните тип оплаты')
    } else if (!values.deliveryType) {
      return alert('Заполните тип доставки')
    } else if (values.deliveryType === DELIVERY_TYPE.PICKUP && !values.pharmacyId) {
      return alert('Выберите аптеку')
    } else if (values.deliveryType === DELIVERY_TYPE.HOME && !clientAddress[ADDRESS_TYPE.ADDRESS]) {
      return alert('Не заполнен адрес доставки')
    }

    const method = 'post'

    const url = 'sales'

    const headers = {
      'Authorization': `Bearer ${token}`
    }

    const data = values

    if (values.deliveryType === DELIVERY_TYPE.HOME) {
      let fullClientAddress = ''
      for (let key in clientAddress) {
        if (clientAddress[key]) {
          fullClientAddress += `${ADDRESS_COPY[key]}: ${clientAddress[key]}, `
        }
      }
      fullClientAddress = fullClientAddress.slice(0, -2)

      data.clientAddress = fullClientAddress

      delete data.pharmacyId
    }

    if (values.deliveryType === DELIVERY_TYPE.PICKUP) {
      delete data.clientAddress
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
    <>
      {authorization
        ?
          <div className={css.basket}>
            {basketProducts.length !== 0
              ? <form className={css.form} onSubmit={handleSubmit}>
                  {checkoutStatus.basket &&
                    <>
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
                        <button className={css.btn_next} onClick={() => (next('additionalForm'))}>Далее</button>
                      </div>
                    </>
                  }
                  {checkoutStatus.additionalForm &&
                    <div className={css.basket_additional}>
                      <label>Тип оплаты: 
                        <select name={'paymentType'} value={values.paymentType} onChange={handleChangeValues}>
                          {Object.values(PAYMENT_TYPE).map(type => {
                            return <option key={type} value={type}>{PAYMENT_COPY[type]}</option>
                          })}
                        </select>
                      </label>
                      <label>Тип доставки: 
                        <select name={'deliveryType'} value={values.deliveryType} onChange={handleChangeValues}>
                          <option key={0} value={null}>{null}</option>
                          {Object.values(DELIVERY_TYPE).map(delivery => {
                            return <option key={delivery} value={delivery}>{DELIVERY_COPY[delivery]}</option>
                          })}
                        </select>
                      </label>
                      {values.deliveryType === DELIVERY_TYPE.HOME &&
                        <div className={css.client_address}>
                          <label>Адрес доставки<input name={[ADDRESS_TYPE.ADDRESS]} value={clientAddress[ADDRESS_TYPE.ADDRESS]} onChange={handleChangeClientAddress}/></label>
                          <label>Квартира<input name={[ADDRESS_TYPE.APARTMENT]} value={clientAddress[ADDRESS_TYPE.APARTMENT]} onChange={handleChangeClientAddress}/></label>
                          <label>Подъезд<input name={[ADDRESS_TYPE.ENTRANCE]} value={clientAddress[ADDRESS_TYPE.ENTRANCE]} onChange={handleChangeClientAddress}/></label>
                          <label>Этаж<input name={[ADDRESS_TYPE.FLOOR]} value={clientAddress[ADDRESS_TYPE.FLOOR]} onChange={handleChangeClientAddress}/></label>
                        </div>
                      }
                      {values.deliveryType === DELIVERY_TYPE.PICKUP &&
                        <label>Аптека
                          <select name={'pharmacyId'} value={values.pharmacyId} onChange={handleChangeValues}>
                            <option key={0} value={null}>{null}</option>
                            {pharmacies.map(pharmacy => {
                              return <option key={pharmacy.id} value={pharmacy.id}>{pharmacy.address}</option>
                            })}
                          </select>
                        </label>
                      }
                      <button className={css.btn_next} onClick={submit}>Создать заказ</button>
                    </div>
                  }
                </form>
              : <p>В корзине не товаров</p>
            }
          </div>
        : <AuthorizationFailed />
      }
    </>
  );
}

export default Basket;