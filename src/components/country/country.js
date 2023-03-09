import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context';
import { request } from '../../requests';
import Loading from '../loading';
import css from './country.module.css';

function Country() {

  const {token} = useContext(UserContext)

  const [countries, setСountries] = useState([])

  const [formVisible, setFormVisible] = useState(false)

  const [loading, setLoading] = useState(false)

  const emptyObject = {
    name: '',
  }

  const [values, setValues] = useState(emptyObject)

  useEffect (() => {
    const method = 'get'

    const url = `country`

    const option = {
      method: method,
      url: url
    }

    request(option).then (response => {
      setСountries(response.data)
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

    const url = `country`

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
      setСountries([...countries, response.data])
    }).catch(error => {
      console.log(error.toJSON())
      alert(error.response.data.message)
    })
  }
  
  return (
    <div className={css.countries}>
      {loading
        ?
          <>
            <div className={css.add_country}>
              <button className={css.btn_form_visible} onClick={handleClick}>Добавить страну</button>
              {formVisible &&
                <form className={css.form_add_country} onSubmit={handleSubmit}>
                  <label>Наименование страны<input name={'name'} value={values.name} onChange={handleChange}/></label>
                  <button className={css.btn_add_country}>Добавить</button>
                </form>
              }
            </div>
            <div className={css.countries_list}>
              {countries.map(country => {
                return(
                  <Link to={`${country.id}`} key={country.id} className={css.country}>
                    <span>{country.name}</span>
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

export default Country;