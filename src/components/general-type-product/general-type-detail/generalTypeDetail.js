import { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { UserContext } from '../../../context';
import { request } from '../../../requests';
import { goBack } from '../../../utils';
import Loading from '../../loading';
import css from './generalTypeDetail.module.css';

function GeneralTypeDetail() {

  const {token} = useContext(UserContext)

  const {id} = useParams()

  const navigate = useNavigate()

  const location = useLocation()

  const [loading, setLoading] = useState(false)

  const [generalType, setGeneralType] = useState({})

  const [initialData, setInitialData] = useState({})

  useEffect (() => {
    const method = 'get'

    const url = `generalType/${id}`

    const option = {
      method: method,
      url: url
    }

    request(option).then (response => {
      setInitialData({
        name: response.data.name,
      })
      setGeneralType({
        name: response.data.name,
      })
    }).catch(error => {
      console.log(error.toJSON())
    })
  }, [])

  useEffect (() => {
    if (Object.keys(generalType).length !== 0) {
      setLoading(true)
    }
  }, [generalType])

  const handleChange = (e) => {
    const fieldName = e.target.name
    setGeneralType({...generalType, [fieldName]: e.target.value})
  }

  const deleteEntry = () => {
    const method = 'delete'

    const url = `generalType/${id}`

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
      for (let keyGeneralType in generalType) {
        if (keyInitialData === keyGeneralType && initialData[keyInitialData] !== generalType[keyGeneralType]) {
          dataToSend[keyInitialData] = generalType[keyGeneralType]
        }
      }
    }

    if (Object.keys(dataToSend).length !== 0) {
      const method = 'put'

      const url = `generalType/${id}`

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
        setGeneralType({
          name: response.data.name,
        })
        setInitialData({
          name: response.data.name,
        })
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
    <div className={css.general_type_detail}>
      <button onClick={back} className={css.btn_back}>Назад</button>
      <div className={css.top_info}>
        <h2>Детальная информация</h2>
        <button className={css.btn_delete} onClick={deleteEntry}>Удалить</button>
      </div>
      {loading
        ?
          <form onSubmit={handleSubmit} className={css.form_general_type_change}>
            <label>Название<input name={'name'} type='text' value={generalType.name} onChange={handleChange}/></label>
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

export default GeneralTypeDetail;