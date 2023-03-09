import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context';
import { request } from '../../requests';
import Loading from '../loading';
import css from './producer.module.css';

function Producer() {
  
  const {token} = useContext(UserContext)

  const [producers, setProducers] = useState([])

  const [formVisible, setFormVisible] = useState(false)

  const [loading, setLoading] = useState(false)

  const emptyObject = {
    name: '',
  }

  const [values, setValues] = useState(emptyObject)

  useEffect (() => {
    const method = 'get'

    const url = `producer`

    const option = {
      method: method,
      url: url
    }

    request(option).then (response => {
      setProducers(response.data)
      setLoading(true)
    }).catch(error => {
      console.log(error.toJSON())
    })
  }, [])

  const handleClick = () => {
    setFormVisible(!formVisible)
  }

  const handleChange = e => {
		const fieldName = e.target.name
		setValues({...values, [fieldName]: e.target.value})
	}

  const handleSubmit = e => {
    e.preventDefault()

    const method = 'post'

    const url = `producer`

    const headers = {
      'Authorization': `Bearer ${token}`,
    }

    const data = values

    const option = {
      method: method,
      url: url,
      headers: headers,
      data: data
    }

    request(option).then (response => {
      setValues(emptyObject)
      setProducers([...producers, response.data])
    }).catch(error => {
      console.log(error.toJSON())
      alert(error.response.data.message)
    })
  }
  
  return (
    <div className={css.producers}>
      {loading
        ?
          <>
            <div className={css.add_producer}>
              <button className={css.btn_form_visible} onClick={handleClick}>Добавить производителя</button>
              {formVisible &&
                <form className={css.form_add_producer} onSubmit={handleSubmit}>
                  <label>Наименование производителя<input name={'name'} value={values.name} onChange={handleChange}/></label>
                  <button className={css.btn_add_producer}>Добавить</button>
                </form>
              }
            </div>
            <div className={css.producers_list}>
              {producers.map(producer => {
                return(
                  <Link to={`${producer.id}`} key={producer.id} className={css.producer}>
                    <span>{producer.name}</span>
                  </Link>
                )
              })}
            </div>
          </>
        :
          <div className={css.loading}>
            <Loading />
          </div>
      }
    </div>
  );
}

export default Producer;