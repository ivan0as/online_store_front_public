import { useContext, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { UserContext } from '../../context';
import { request } from '../../requests';
import { URL_IMG, STATUS_COPY, PAYMENT_COPY } from '../../config';
import Loading from '../loading';
import AuthorizationFailed from '../authorization_failed';
import css from './sales.module.css';

function Sales(props) {

  const {token, authorization} = useContext(UserContext)

  const location = useLocation().pathname

  const [dataLoading, setDataLoading] = useState(false)

  const [sales, setSales] = useState([])

  const price = (idSalesLineups) => {
    const sale = sales.find(({ id }) => id === idSalesLineups)
    let price = 0
    sale.sales_lineups.map(salesLineups => {
      price += salesLineups.priceAll
    })
    return price
  }

  useEffect(() => {

    if (authorization) {
      const method = 'get'
  
      let url
  
      const headers = {
        'Authorization': `Bearer ${token}`
      }
  
      if (location === '/sales') {
        url = 'sales/user'
      } else if (location === '/salesAdmin') {
        url = 'sales/all'
      }
  
      const option = {
        method: method,
        url: url,
        headers: headers,
      }
  
      request(option).then (response => {
        setSales(response.data.sort((a, b) => b.id - a.id))
        setDataLoading(true)
      }).catch(error => {
        console.log(error.toJSON())
      })
    }

  }, [location, authorization])

  return (
    <>
      {authorization
        ?
          <div className={css.sales}>
            {dataLoading
              ? <>
                  {sales.length !== 0
                    ?
                      <>
                        {sales.map( sale => {
                          return(
                            <div className={css.sale} key={sale.id}>
                              <div className={css.sale_info}>
                                <Link to={
                                  location === '/sales' 
                                    ? `/sales/${sale.id}`
                                    : location === '/salesAdmin' && `/salesAdmin/${sale.id}`
                                }>
                                  <p>Заказ №{sale.id}</p>
                                </Link>
                                <p>{STATUS_COPY[sale.status]}</p>
                              </div>
                              <div className={css.sale_payment_type}>
                                <p>{PAYMENT_COPY[sale.paymentType]}</p>
                              </div>
                              <div className={css.sales_lineups}>
                                {sale.sales_lineups.map((sale_lineup, index) => {
                                  if (index < 3) {
                                    return(
                                      <div className={css.sale_lineup} key={sale_lineup.id}>
                                        <img className={css.img_product} src={URL_IMG + sale_lineup.product.img} alt='Товар'/>
                                        <p>Количество: {sale_lineup.amount}</p>
                                      </div>
                                    )
                                  }
                                })}
                                {sale.sales_lineups.length > 3 &&
                                  <p>+{sale.sales_lineups.length-3}</p>
                                }
                              </div>
                              <div className={css.price}>
                                <p>Сумма: {price(sale.id)}</p>
                              </div>
                            </div>
                          )
                        })}
                      </>
                    : <div className={css.noOrders}>Заказы отсутствуют</div>
                  }
                </>
              : 
                <div className={css.loading}>
                  <Loading />
                </div>
            }
          </div>
        : <AuthorizationFailed />
      }
    </>
  );
}

export default Sales;