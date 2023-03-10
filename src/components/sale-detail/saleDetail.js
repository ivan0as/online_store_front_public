import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../context';
import { request } from '../../requests';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { goBack } from '../../utils';
import { URL_IMG, STATUS_TYPE, STATUS_COPY, PAYMENT_TYPE, PAYMENT_COPY, DELIVERY_COPY } from '../../config';
import Loading from '../loading';
import css from './saleDetail.module.css';

function SaleDetail() {

  const {id} = useParams()

  const location = useLocation().pathname.split('/')[1]

  const locationForBack = useLocation()

  const navigate = useNavigate()

  const {token} = useContext(UserContext)

  const [dataLoading, setDataLoading] = useState(false)

  const [sale, setSale] = useState([])

  const [initialData, setInitialData] = useState([])

  const [pharmacies, setPharmacies] = useState([])

  useEffect(() => {
    let method = 'get'

    let url

    if (location === 'sales') {
      url = `sales/user/${id}`
    } else if (location === 'salesAdmin') {
      url = `sales/admin/${id}`
    }

    const headers = {
      'Authorization': `Bearer ${token}`
    }

    let option = {
      method: method,
      url: url,
      headers: headers,
    }

    request(option).then (response => {
      setSale(response.data)

      setInitialData(response.data)

      method = 'get'

      url = 'pharmacy'

      option = {
        method: method,
        url: url,
      }

      request(option).then (response => {
        setPharmacies(response.data)
        setDataLoading(true)
      }).catch(error => {
        console.log(error.toJSON())
      })
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

  const handleChange = e => {
		const fieldName = e.target.name
		setSale({...sale, [fieldName]: e.target.value})
	}

  const handleSubmit = (e) => {
    e.preventDefault()

    const dataToSend = {}

    for (let keyInitialData in initialData) {
      for (let keySale in sale) {
        if (keyInitialData === keySale && initialData[keyInitialData] !== sale[keySale]) {
          dataToSend[keyInitialData] = sale[keySale]
        }
      }
    }

    if (Object.keys(dataToSend).length !== 0) {
      const method = 'put'

      const url = `sales/admin/${id}`

      const headers = {
        'Authorization': `Bearer ${token}`
      }

      const data = dataToSend
      
      const option = {
        method: method,
        url: url,
        headers: headers,
        data: data
      }

      request(option).then (response => {
        setSale(response.data)
        setInitialData(response.data)
      }).catch(error => {
        console.log(error.toJSON())
        alert(error.response.data.message)
      })
    } else {
      alert('???????????? ???? ????????????????')
    }
  }

  const back = () => {
    const previousPage = goBack(locationForBack.pathname)
    navigate(previousPage)
  }

  return (
    <div>
      {dataLoading
        ? <div className={css.sale}>
            <button onClick={back} className={css.btn_back}>??????????</button>
            {location === 'sales' &&
              <div className={css.sale_info}>
                <p>????????????????????: {sale.user.email}</p>
                <p>?????????? ????????????????: {sale.user.phoneNumber}</p>
                <p>???????????? ????????????: {STATUS_COPY[sale.status]}</p>
                <p>?????? ????????????: {PAYMENT_COPY[sale.paymentType]}</p>
                <p>?????? ????????????????: {DELIVERY_COPY[sale.deliveryType]}</p>
                {sale.clientAddress &&
                  <p>?????????? ??????????????: {sale.clientAddress}</p>
                }
                {sale.pharmacyId &&
                  <p>?????????? ????????????: {sale.pharmacy.address}</p>
                }
                <p>?????????? ????????????: {price()} ????????????</p>
              </div>
            }
            {location === 'salesAdmin' &&
              <form className={css.sale_info} onSubmit={handleSubmit}>
                <p>????????????????????: {sale.user.email}</p>
                <p>?????????? ????????????????: {sale.user.phoneNumber}</p>
                <label>?????? ????????????: 
                  <select name={'paymentType'} value={sale.paymentType} onChange={handleChange}>
                    {Object.values(PAYMENT_TYPE).map(type => {
                      return <option key={type} value={type}>{PAYMENT_COPY[type]}</option>
                    })}
                  </select>
                </label>
                <label>???????????? ????????????: 
                  <select name={'status'} value={sale.status} onChange={handleChange}>
                    {Object.values(STATUS_TYPE).map(status => {
                      return <option key={status} value={status}>{STATUS_COPY[status]}</option>
                    })}
                  </select>
                </label>
                <p>?????? ????????????????: {DELIVERY_COPY[sale.deliveryType]}</p>
                {sale.clientAddress &&
                  <label>?????????? ??????????????:<input name={'clientAddress'} type='text' value={sale.clientAddress} onChange={handleChange}/></label>
                }
                {sale.pharmacyId &&
                  <label>?????????? ????????????:
                    <select name={'pharmacyId'} value={sale.pharmacyId} onChange={handleChange}>
                      {pharmacies.map(pharmacy => {
                        return <option key={pharmacy.id} value={pharmacy.id}>{pharmacy.address}</option>
                      })}
                    </select>
                  </label>
                }
                <p>?????????? ????????????: {price()} ????????????</p>
                <button type='submit' className={css.btn_submit}>????????????????</button>
              </form>
            }
            <div className={css.sales_lineups}>
              <p>???????????????????? ????????????:</p>
              {sale.sales_lineups.map(saleLineup => {
                return(
                  <div className={css.sale_lineup} key={saleLineup.id}>
                    <img src={URL_IMG + saleLineup.product.img}  alt='??????????'/>
                    <div className={css.sale_lineup_product_info}>
                      <p>{saleLineup.product.name}</p>
                      <p>????????????????????: {saleLineup.amount}</p>
                      <p>???????? ????: {saleLineup.priceOne}</p>
                    </div>
                    <div className={css.sum}>
                      <p>?????????? ????????????: {saleLineup.priceAll}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        : <div className={css.loading}>
            <Loading />
          </div>
      }
    </div>
  );
}

export default SaleDetail;