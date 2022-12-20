import { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context';
import { request } from '../../requests';
import { URL_IMG } from '../../config'
import css from './sales.module.css';

function Sales() {

  const {token} = useContext(UserContext)

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
    const method = 'get'

    const url = 'sales/user'

    const headers = {
      'Authorization': `Bearer ${token}`
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
  }, [])

  return (
    <div className={css.sales}>
      {dataLoading
        ? <>
            {sales.map( sale => {
              return(
                <div className={css.sale} key={sale.id}>
                  <div className={css.sale_info}>
                    <Link to={`/sales/${sale.id}`}>
                      <p>Заказ №{sale.id}</p>
                    </Link>
                    <p>{sale.status}</p>
                  </div>
                  <div className={css.sale_payment_type}>
                    <p>{sale.paymentType}</p>
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
        : <div>1</div>
      }
    </div>
  );
}

export default Sales;