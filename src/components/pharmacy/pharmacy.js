import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context';
import { request } from '../../requests';
import loading from '../loading';
import Loading from '../loading';
import css from './pharmacy.module.css';

function Pharmacy() {
  
  const {token} = useContext(UserContext)

  const [pharmacies, setPharmacies] = useState([])

  const [formVisible, setFormVisible] = useState(false)

  const [loading, setLoading] = useState(false)

  const emptyObject = {
    address: '',
  }

  const [values, setValues] = useState(emptyObject)

  useEffect (() => {
    const method = 'get'

    const url = `pharmacy`

    const option = {
      method: method,
      url: url
    }

    request(option).then (response => {
      setPharmacies(response.data)
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

    const url = `pharmacy`

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
      setPharmacies([...pharmacies, response.data])
    }).catch(error => {
      console.log(error.toJSON())
      alert(error.response.data.message)
    })
  }
  
  return (
    <div className={css.pharmacies}>
      {loading
        ?
          <>
            <div className={css.add_pharmacy}>
              <button className={css.btn_form_visible} onClick={handleClick}>Добавить аптеку</button>
              {formVisible &&
                <form className={css.form_add_pharmacy} onSubmit={handleSubmit}>
                  <label>Адрес аптеки<input name={'address'} value={values.address} onChange={handleChange}/></label>
                  <button className={css.btn_add_pharmacy}>Добавить</button>
                </form>
              }
            </div>
            <div className={css.pharmacies_list}>
              {pharmacies.map(pharmacy => {
                return(
                  <Link to={`${pharmacy.id}`} key={pharmacy.id} className={css.pharmacy}>
                    <span>{pharmacy.address}</span>
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

export default Pharmacy;