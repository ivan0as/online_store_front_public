import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context';
import { request } from '../../requests';
import Loading from '../loading';
import css from './generalTypeProduct.module.css';

function GeneralTypeProduct() {
  
  const {token} = useContext(UserContext)

  const [generalTypes, setGeneralTypes] = useState([])

  const [formVisible, setFormVisible] = useState(false)

  const [loading, setLoading] = useState(false)

  const emptyObject = {
    name: '',
  }

  const [values, setValues] = useState(emptyObject)

  useEffect (() => {
    const method = 'get'

    const url = `generalType`

    const option = {
      method: method,
      url: url
    }

    request(option).then (response => {
      setGeneralTypes(response.data)
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

    const url = `generalType`

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
      setGeneralTypes([...generalTypes, response.data])
    }).catch(error => {
      console.log(error.toJSON())
      alert(error.response.data.message)
    })
  }
  
  return (
    <div className={css.general_types}>
      {loading
        ?
          <>
            <div className={css.add_general_type}>
              <button className={css.btn_form_visible} onClick={handleClick}>Добавить общий тип товара</button>
              {formVisible &&
                <form className={css.form_add_general_type} onSubmit={handleSubmit}>
                  <label>Наименование общего типа товара<input name={'name'} value={values.name} onChange={handleChange}/></label>
                  <button className={css.btn_add_general_type}>Добавить</button>
                </form>
              }
            </div>
            <div className={css.general_types_list}>
              {generalTypes.map(generalType => {
                return(
                  <Link to={`${generalType.id}`} key={generalType.id} className={css.general_type}>
                    <span>{generalType.name}</span>
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

export default GeneralTypeProduct;