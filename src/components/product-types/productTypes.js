import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context';
import { request } from '../../requests';
import Loading from '../loading';
import css from './productTypes.module.css';

function ProductTypes() {
  
  const {token} = useContext(UserContext)

  const [types, setTypes] = useState([])

  const [generalTypes, setGeneralTypes] = useState([])

  const [formVisible, setFormVisible] = useState(false)

  const [loading, setLoading] = useState(false)

  const emptyObject = {
    name: '',
  }

  const [values, setValues] = useState(emptyObject)

  useEffect (() => {
    const method = 'get'

    let url = `type`

    let option = {
      method: method,
      url: url
    }

    request(option).then (response => {
      setTypes(response.data)
      url = 'generalType'
  
      option = {
        method: method,
        url: url
      }
  
      request(option).then (response => {
        setGeneralTypes(response.data)
        setLoading(true)
      }).catch(error => {
        console.log(error.toJSON())
      })
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

    const url = `type`

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
      setTypes([...types, response.data])
    }).catch(error => {
      console.log(error.toJSON())
      alert(error.response.data.message)
    })
  }
  
  return (
    <div className={css.types}>
      {loading
        ?
          <>
            <div className={css.add_type}>
              <button className={css.btn_form_visible} onClick={handleClick}>Добавить тип товара</button>
              {formVisible &&
                <form className={css.form_add_type} onSubmit={handleSubmit}>
                  <label>Наименование типа товара<input name={'name'} value={values.name} onChange={handleChange}/></label>
                  <label>Общий тип
                    <select name={'generalTypeId'} value={values.generalTypeId} onChange={handleChange}>
                      <option key={0} value={null}>{null}</option>
                      {generalTypes.map(generalType => {
                        return <option key={generalType.id} value={generalType.id}>{generalType.name}</option>
                      })}
                    </select>
                  </label>
                  <button className={css.btn_add_type}>Добавить</button>
                </form>
              }
            </div>
            <div className={css.types_list}>
              {types.map(type => {
                return(
                  <Link to={`${type.id}`} key={type.id} className={css.type}>
                    <span>{type.name}</span>
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

export default ProductTypes;