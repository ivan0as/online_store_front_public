import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context';
import { Link, useLocation, Routes, Route } from 'react-router-dom';
import { request } from '../../requests';
import Products from '../products';
import ProductDetal from '../product-detail';
import css from './catalog.module.css';

function Catalog() {
  
  const location = useLocation()

  const {token, basketProducts, setBasketProducts, authorization} = useContext(UserContext)

  const [breadcrumbs, setBreadcrumbs] = useState('')
  
  const result = (id) => {
    if (basketProducts.length !== 0) {
      const find = basketProducts.find(({ productId }) => productId === id)
      if (find) {
        const basketProduct = find
        return basketProduct
      }
    }
    return false
  }

  const handleClick = (product) => {
    if (authorization) {
      const method = 'post'
  
      const url = `basket`
  
      const headers = {
        'Authorization': `Bearer ${token}`
      }
  
      const data = {
        'productId': product.id,
        'amount': 1
      }
  
      const option = {
        method: method,
        url: url,
        headers: headers,
        data: data
      }
  
      request(option).then (response => {
        setBasketProducts([...basketProducts, response.data])
      }).catch(error => {
        console.log(error.toJSON())
      })
    } else {
      alert('Нужна авторизация')
    }
  }

  useEffect(() => {
    const splitUrl = location.pathname.split('/')

    let breadcrumbsBlank = []

    for (let i = 2; i <= splitUrl.length-1; i++) {
      if (i === 2) {
        breadcrumbsBlank[i-2] = {
          name: decodeURI(splitUrl[i]),
          url: `/catalog/${decodeURI(splitUrl[i])}`
        }
      } else {
        breadcrumbsBlank[i-2] = {
          name: decodeURI(splitUrl[i]),
          url: false
        }
      }
    }
    breadcrumbsBlank.unshift({
      name:'Главная',
      url:'/'
    })
    setBreadcrumbs(breadcrumbsBlank)
  }, [location])

  return (
    <div className={css.catalog}>
      <div>
        {breadcrumbs && !(location.pathname === '/catalog/search') &&
          <>
            {breadcrumbs.map(breadcrumb => {
              return(
                <>
                  {breadcrumb.url
                  ?
                    <Link className={css.breadcrumb} to={breadcrumb.url}>
                      <span>{breadcrumb.name}/</span>
                    </Link>
                  : <span>{breadcrumb.name}/</span>
                  }
                </>
              )
            })}
          </>
        }
      </div>

      <Routes>
        <Route path='/:type' element={<Products basketProduct={result} handleClick={handleClick}/>} />
        <Route path='/:type/:id' element={<ProductDetal basketProduct={result} handleClick={handleClick}/>} />
        <Route path='/search' element={<Products basketProduct={result} handleClick={handleClick}/>} />
      </Routes>
    </div>
  );
}

export default Catalog;