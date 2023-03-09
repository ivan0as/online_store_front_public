import { useEffect, useState, useContext } from 'react';
import { UserContext } from '../../context';
import { request } from '../../requests';
import Loading from '../loading';
import css from './addProduct.module.css';

function AddProduct() {

  const {token} = useContext(UserContext)

  const [types, setTypes] = useState([])

  const [producers, setProducers] = useState([])

  const [countries, setСountries] = useState([])

  const [loading, setLoading] = useState(false)

  useEffect (() => {
    const method = 'get'

    let url = `type`

    const option = {
      method: method,
      url: url
    }

    request(option).then (response => {
      setTypes(response.data)
      option.url = 'producer'
  
      request(option).then (response => {
        setProducers(response.data)
        option.url = 'country'
    
        request(option).then (response => {
          setСountries(response.data)
          setLoading(true)
        }).catch(error => {
          console.log(error.toJSON())
        })
      }).catch(error => {
        console.log(error.toJSON())
      })
  
    }).catch(error => {
      console.log(error.toJSON())
    })

  }, [])

  const emptyObject = {
    name: '',
    description: '',
    price: '',
    img: '',
    typeId: '',
    producerId: '',
    countryId: '',
  }

  const [values, setValues] = useState(emptyObject)

  const handleChange = e => {
		const fieldName = e.target.name
		setValues({...values, [fieldName]: e.target.value})
	}

  const selectFile = e => {
    const fieldName = e.target.name
    const file = e.target.files[0]
		setValues({...values, [fieldName]: file})
  }

  const handleSubmit = e => {
    e.preventDefault()

    for (let key in values) {
      if (values[key] === '') {
        return alert('Данные не заполнены')
      }
    }

    if (!(!isNaN(parseFloat(values.price)) && isFinite(values.price))) {
      return alert ('Введите коретную цену')
    }

    const method = 'post'

    const url = `product`

    const headers = {
      'Authorization': `Bearer ${token}`,
    }

    const formData = new FormData()

    for (let key in values) {
      formData.append(key, values[key])
    }

    const data = formData
      
    const option = {
      method: method,
      url: url,
      headers: headers,
      data: data
    }

    request(option).then (response => {
      setValues(emptyObject)
    }).catch(error => {
      console.log(error.toJSON())
      alert(error.response.data.message)
    })
  }
  
  return (
    <div className={css.add_product}>
      {loading
        ?
          <>
            <h2>Добавление товара</h2>
            <form className={css.form_add_product} onSubmit={handleSubmit}>
              <label>Наименование товара<input name={'name'} value={values.name} onChange={handleChange}/></label>
              <label className={css.label_textarea}>Описание<textarea  name={'description'} value={values.description} onChange={handleChange}/></label>
              <label>Цена<input  name={'price'} value={values.price} onChange={handleChange}/></label>
              <label>Изображение товара<input type="file" accept="image/*" name={'img'} onChange={selectFile}/></label>
              <label>Тип товара
                <select name={'typeId'} value={values.typeId} onChange={handleChange}>
                  <option key={0} value={null}>{null}</option>
                  {types.map(type => {
                    return <option key={type.id} value={type.id}>{type.name}</option>
                  })}
                </select>
              </label>
              <label>Производитель
                <select name={'producerId'} value={values.producerId} onChange={handleChange}>
                  <option key={0} value={null}>{null}</option>
                  {producers.map(producer => {
                    return <option key={producer.id} value={producer.id}>{producer.name}</option>
                  })}
                </select>
              </label>
              <label>Страна производства
                <select name={'countryId'} value={values.countryId} onChange={handleChange}>
                  <option key={0} value={null}>{null}</option>
                  {countries.map(country => {
                    return <option key={country.id} value={country.id}>{country.name}</option>
                  })}
                </select>
              </label>
              <button className={css.btn_submit} type='submit'>Добавить</button>
            </form>

          </>
        : 
          <div className={css.loading}>
            <Loading />
          </div>
      }
    </div>
  );
}

export default AddProduct;