import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../context';
import { request } from '../../requests';
import { useParams } from 'react-router-dom';
import { URL_IMG } from '../../config'
import css from './saleDetail.module.css';

function SaleDetail() {

  const {id} = useParams()

  const {token} = useContext(UserContext)

  const [dataLoading, setDataLoading] = useState(false)

  const [sale, setSale] = useState([])

  useEffect(() => {
    const method = 'get'

    let url = `sales/user/${id}`

    const headers = {
      'Authorization': `Bearer ${token}`
    }

    const option = {
      method: method,
      url: url,
      headers: headers,
    }

    request(option).then (response => {
      setSale(response.data)
      setDataLoading(true)
    }).catch(error => {
      console.log(error.toJSON())
    })
  }, [id])

  const price = () => {
    let price = 0
    sale.sales_lineups.map(salesLineups => {
      price += salesLineups.priceAll
    })
    return price
  }

  return (
    <div>
      {dataLoading
        ? <div className={css.sale}>
            <div className={css.sale_info}>
              <p>Покупатель: {sale.user.email}</p>
              <p>Номер телефона: {sale.user.phoneNumber}</p>
              <p>Стутус заказа: {sale.status}</p>
              <p>Тип оплаты: {sale.paymentType}</p>
              <p>Сумма заказа: {price()} рублей</p>
            </div>
            <div className={css.sales_lineups}>
              <p>Заказанные товары:</p>
              {sale.sales_lineups.map(saleLineup => {
                return(
                  <div className={css.sale_lineup}>
                    <img src={URL_IMG + saleLineup.product.img}  alt='Товар'/>
                    <div className={css.sale_lineup_product_info}>
                      <p>{saleLineup.product.name}</p>
                      <p>Количество: {saleLineup.amount}</p>
                      <p>Цена от: {saleLineup.priceOne}</p>
                    </div>
                    <div className={css.sum}>
                      <p>Сумма товара: {saleLineup.priceAll}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        : <div>1</div>
      }
    </div>
  );
}

export default SaleDetail;