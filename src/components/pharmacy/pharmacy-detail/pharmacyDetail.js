import { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { UserContext } from '../../../context';
import { request } from '../../../requests';
import { goBack } from '../../../utils';
import Loading from '../../loading';
import css from './pharmacyDetail.module.css';

function PharmacyDetail() {

  const {token} = useContext(UserContext)

  const {id} = useParams()

  const navigate = useNavigate()

  const location = useLocation()

  const [loading, setLoading] = useState(false)

  const [pharmacy, setPharmacy] = useState({})

  const [initialData, setInitialData] = useState({})

  useEffect (() => {
    const method = 'get'

    const url = `pharmacy/${id}`

    const option = {
      method: method,
      url: url
    }

    request(option).then (response => {
      setInitialData({
        address: response.data.address,
      })
      setPharmacy(response.data)
    }).catch(error => {
      console.log(error.toJSON())
    })
  }, [])

  useEffect (() => {
    if (Object.keys(pharmacy).length !== 0) {
      setLoading(true)
    }
  }, [pharmacy])

  const handleChange = (e) => {
    const fieldName = e.target.name
    setPharmacy({...pharmacy, [fieldName]: e.target.value})
  }

  const deleteEntry = () => {
    const method = 'delete'

    const url = `pharmacy/${id}`

    const headers = {
      'Authorization': `Bearer ${token}`
    }
      
    const option = {
      method: method,
      url: url,
      headers: headers,
    }

    request(option).then (response => {
      alert('Данные успешно удалены')
      navigate(-1)
    }).catch(error => {
      console.log(error.toJSON())
      alert(error.response.data.message)
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const dataToSend = {}

    for (let keyInitialData in initialData) {
      for (let keyPharmacy in pharmacy) {
        if (keyInitialData === keyPharmacy && initialData[keyInitialData] !== pharmacy[keyPharmacy]) {
          dataToSend[keyInitialData] = pharmacy[keyPharmacy]
        }
      }
    }

    if (Object.keys(dataToSend).length !== 0) {
      const method = 'put'

      const url = `pharmacy/${id}`

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
        setInitialData({
          address: response.data.address,
        })
        setPharmacy(response.data)
      }).catch(error => {
        console.log(error.toJSON())
        alert(error.response.data.message)
      })
    } else {
      alert('Данные не изменены')
    }
  }

  const back = () => {
    const previousPage = goBack(location.pathname)
    navigate(previousPage)
  }

  return (
    <div className={css.pharmacy_detail}>
      <button onClick={back} className={css.btn_back}>Назад</button>
      <div className={css.top_info}>
        <h2>Детальная информация</h2>
        <button className={css.btn_delete} onClick={deleteEntry}>Удалить</button>
      </div>
      {loading
        ?
          <form onSubmit={handleSubmit} className={css.form_pharmacy_change}>
            <label>Адрес аптеки<input name={'address'} type='text' value={pharmacy.address} onChange={handleChange}/></label>
            <button type='submit' className={css.btn_submit}>Изменить</button>
          </form>
        :
          <div className={css.loading}>
            <Loading />
          </div>
      }
    </div>
  );
}

export default PharmacyDetail;