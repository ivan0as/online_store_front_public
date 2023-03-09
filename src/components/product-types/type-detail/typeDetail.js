import { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { UserContext } from '../../../context';
import { request } from '../../../requests';
import { goBack } from '../../../utils';
import Loading from '../../loading';
import css from './typeDetail.module.css';

function TypeDetail() {

  const {token} = useContext(UserContext)

  const {id} = useParams()

  const navigate = useNavigate()

  const location = useLocation()

  const [loading, setLoading] = useState(false)

  const [type, setType] = useState({})

  const [generalTypes, setGeneralTypes] = useState({})

  const [initialData, setInitialData] = useState({})

  useEffect (() => {
    const method = 'get'

    let url = `type/${id}`

    let option = {
      method: method,
      url: url
    }

    request(option).then (response => {
      setInitialData({
        name: response.data.name,
        generalTypeId: response.data.generalTypeId,
      })
      setType({
        name: response.data.name,
        generalTypeId: response.data.generalTypeId,
      })
    }).catch(error => {
      console.log(error.toJSON())
    })


    url = 'generalType'

    option = {
      method: method,
      url: url
    }

    request(option).then (response => {
      setGeneralTypes(response.data)
    }).catch(error => {
      console.log(error.toJSON())
    })
  }, [])

  useEffect (() => {
    if (Object.keys(type).length !== 0 && Object.keys(generalTypes).length !== 0) {
      setLoading(true)
    }
  }, [type])

  const handleChange = (e) => {
    const fieldName = e.target.name
    setType({...type, [fieldName]: e.target.value})
  }

  const deleteEntry = () => {
    const method = 'delete'

    const url = `type/${id}`

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
      for (let keyType in type) {
        if (keyInitialData === keyType && initialData[keyInitialData] !== type[keyType]) {
          dataToSend[keyInitialData] = type[keyType]
        }
      }
    }

    if (Object.keys(dataToSend).length !== 0) {
      const method = 'put'

      const url = `type/${id}`

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
        setType({
          name: response.data.name,
          generalTypeId: response.data.generalTypeId,
        })
        setInitialData({
          name: response.data.name,
          generalTypeId: response.data.generalTypeId,
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
    <div className={css.type_detail}>
      <button onClick={back} className={css.btn_back}>Назад</button>
      <div className={css.top_info}>
        <h2>Детальная информация</h2>
        <button className={css.btn_delete} onClick={deleteEntry}>Удалить</button>
      </div>
      {loading
        ?
          <form onSubmit={handleSubmit} className={css.form_type_change}>
            <label>Название<input name={'name'} type='text' value={type.name} onChange={handleChange}/></label>
            <label>Общий тип
              <select name={'generalTypeId'} value={type.generalTypeId} onChange={handleChange}>
                <option key={0} value={null}>{null}</option>
                {generalTypes.map(generalType => {
                  return <option key={generalType.id} value={generalType.id}>{generalType.name}</option>
                })}
              </select>
            </label>
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

export default TypeDetail;