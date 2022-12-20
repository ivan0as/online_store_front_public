import { useContext, useEffect } from 'react';
import { UserContext } from '../../context';
import { request } from '../../requests';
import css from './countProduct.module.css';

function CountProduct(props) {

  const {basketProduct} = props

  const {token, basketProducts, setBasketProducts, productDelete} = useContext(UserContext)

  const requestChangeAmount = (id, amount) => {
    const method = 'put'
        
    const url = `basket/${id}`
        
    const headers = {
        'Authorization': `Bearer ${token}`
    }

    const data = {
      'amount': amount
    }
        
    const option = {
        method: method,
        url: url,
        headers: headers,
        data: data
    }
        
    request(option).catch(error => {
      console.log(error.toJSON())
    })
  }

  const handleChange = e => {
    const fieldName = e.target.name
    const fieldId = e.target.id
    setBasketProducts(basketProducts.map(product => 
      product.id == fieldId ? {...product, [fieldName]: e.target.value} : product
    ))
  }

  const checkAmount = (idBasketProduct, amount) => {
    if (amount > 0) {
      requestChangeAmount(idBasketProduct, amount)
    } else {
      productDelete(idBasketProduct)
    }
  }

  const handleClickMinus = (idBasketProduct) => {
    const findProduct = basketProducts.find(({ id }) => id === idBasketProduct)
    if (findProduct.amount > 1) {
      setBasketProducts(basketProducts.map(product => 
        product.id == idBasketProduct ? {...product, "amount": product.amount-1} : product
      ))
      requestChangeAmount(idBasketProduct, findProduct.amount-1)
    } else {
      productDelete(idBasketProduct)
    }
  }

  const handleClickPlus = (idBasketProduct) => {
    setBasketProducts(basketProducts.map(product => 
      product.id == idBasketProduct ? {...product, "amount": product.amount+1} : product
    ))
    const findProduct = basketProducts.find(({ id }) => id === idBasketProduct)
    requestChangeAmount(idBasketProduct, findProduct.amount+1)
  }

  return (
    <div>
      {basketProduct &&
      <>
        <button className={css.minus} onClick={() => handleClickMinus(basketProduct.id)}>-</button>
        <input 
          className={css.amount} 
          value={basketProduct.amount}
          id={basketProduct.id} 
          name='amount'
          onChange={handleChange}
          onBlur={() => checkAmount(basketProduct.id, basketProduct.amount)}
        />
        <button className={css.plus} onClick={() => handleClickPlus(basketProduct.id)}>+</button>
      </>
      }
    </div>
  );
}

export default CountProduct;