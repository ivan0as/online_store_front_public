import { useState, useEffect, useContext } from 'react';
import { useParams, Link, useSearchParams } from 'react-router-dom';
import { UserContext } from '../../context';
import { request } from '../../requests';
import { URL_IMG } from '../../config'
import CountProduct from '../countProduct';
import css from './products.module.css';

function Products(props) {

  const {basketProduct, handleClick} = props

  const {type} = useParams()

  const [searchParams, setSearchParams] = useSearchParams()

  const [dataLoading, setDataLoading] = useState(false)

  const [products, setProducts] = useState([])

  const [pages, setPages] = useState([])

  const [producers, setProducers] = useState([])

  const [countries, setCountries] = useState([])

  const [searchParamsArray, setSearchParamsArray] = useState([])

  const getProduct = (params) => {

    let url
    
    if (Object.keys(params).length) {
      let paramsResult = ''
      
      for (let key in params) {
        const arr = params[key].split('%')
        arr.map(value => {
          paramsResult += `&${key}=${value}`
        })
      }
      url = `product?typeId=${type}${paramsResult}`
    } else {
      url = `product?typeId=${type}`
    }
    
    const method = 'get'

    const option = {
        method: method,
        url: url
    }

    request(option).then (response => {
      setProducts(response)
      setDataLoading(true)

      const arrPages = []

      for (let i = 1; i <= Math.ceil(response.data.count/9); i++) {
        arrPages.push(i)
      }

      setPages(arrPages)


    }).catch(error => {
      console.log(error.toJSON())
    })
  }

  useEffect(() => {
    const currentParams = Object.fromEntries([...searchParams])
    getProduct(currentParams)

    const object = {}

    for (let key in currentParams) {
      const arr = currentParams[key].split('%')
      object[key] = arr
    }
    setSearchParamsArray(object)
  }, [type, searchParams])

  const pagination = (e) => {
    const button = e.target.value
    const params = Object.fromEntries([...searchParams])
    setSearchParams({...params, ...{page: button}})
  }

  useEffect(() => {
    const method = 'get'

    let url = 'producer'

    let option = {
        method: method,
        url: url
    }

    request(option).then (response => {
      setProducers(response.data)
    }).catch(error => {
      console.log(error.toJSON())
    })

    url = 'country'

    option = {
        method: method,
        url: url
    }

    request(option).then (response => {
      setCountries(response.data)
    }).catch(error => {
      console.log(error.toJSON())
    })
  }, [])

  const handleCheckbox = e => {
    const fieldName = e.target.name
    const fieldId = e.target.id
    const params = Object.fromEntries([...searchParams])

    if (e.target.checked) {
      let value = searchParams.get(fieldName)
      if (value === null) {
        setSearchParams({...params, ...{[fieldName]: fieldId}})
      } else {
        setSearchParams({...params, ...{[fieldName]: `${value}%${fieldId}`}})
      }
    } else {
      let arr = params[fieldName].split('%')

      arr = arr.filter(value => value !== fieldId)

      if (arr.length !== 0) {
        arr = arr.join('%')
  
        setSearchParams({...params, ...{[fieldName]: arr}})
      } else {
        delete params[fieldName]
        setSearchParams(params)
      }
    }
  }

  const checked = (fieldName, fieldId) => {
    if (searchParamsArray[fieldName]) {
      const result = searchParamsArray[fieldName].find(element => Number(element) === fieldId)
      if (result) {
        return true
      } else {
        return false
      }
    }
  }

  return (
    <div className={css.catalog}>
      {dataLoading
        ? <>
            <div className={css.catalog_product}>
              <div className={css.filters}>
                <div className={css.filter_info}>
                  <p className={css.filter_title}>Производитель: </p>
                  <div className={css.filter_list}>
                    {producers.map(producer => {
                      return(
                        <label className={css.filter} key={producer.id}>
                          <input 
                            type="checkbox" 
                            id={producer.id} 
                            name='producerId' 
                            onChange={handleCheckbox}
                            defaultChecked={checked('producerId', producer.id)}
                          />
                          <span>{producer.name}</span>
                        </label>
                      )
                    })}
                  </div>
                </div>
                <div className={css.filter_info}>
                  <p className={css.filter_title}>Страна: </p>
                  <div className={css.filter_list}>
                    {countries.map(country => {
                      return(
                        <label className={css.filter} key={country.id}>
                          <input 
                            type="checkbox" 
                            id={country.id} 
                            name='countryId' 
                            onChange={handleCheckbox}
                            defaultChecked={checked('countryId', country.id)}
                          />
                          <span>{country.name}</span>
                        </label>
                      )
                    })}
                  </div>
                </div>
              </div>
              <div className={css.products}>
                {products.data.rows.map( product => {
                  return(
                    <div className={css.product} key={product.id}>
                      <Link className={css.link} to={`/${type}/${product.id}`}>
                        <img src={URL_IMG+product.img} alt="Картинка"/>
                        <p className={css.name}>{product.name}</p>
                      </Link>
                      <p className={css.text_price}>от <span className={css.price}>{product.price}</span></p>
                      {basketProduct(product.id)
                        ? <CountProduct basketProduct={basketProduct(product.id)} />
                        : <button className={css.btn_item_cart} onClick={() => handleClick(product)}>В корзину</button>
                      }
                    </div>
                  )
                })}
              </div>
            </div>
            <div className={css.pagination}>
              {pages.map(page => {
                return(
                  <button key={page} value={page} onClick={pagination}>{page}</button>
                )
              })}
            </div>
          </>
        : <div>1</div>
      }
    </div>
  );
}

export default Products;