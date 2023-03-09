import { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { request } from '../../requests';
import { UserContext } from '../../context';
import Header from '../header';
import Main from '../main';
import Footer from '../footer';
import Loading from '../loading';
import css from './app.module.css';

function App() {

  const [user, setUser] = useState([])
  const [token, setToken] = useState(false)
  const [loading, setLoading] = useState(false)
  const [authorization, setAuthorization ] = useState(false)
  const [generalTypes, setGeneralTypes] = useState([])
  const [types, setTypes] = useState([])
  const [basketProducts, setBasketProducts] = useState([])
  const [search, setSearch] = useState('')

  useEffect (() => {
    const method = 'get'
    
    const url = 'user/auth'
    
    const getToken = window.localStorage.getItem('token')
  
    const headers = {
      'Authorization': `Bearer ${getToken}`
    }
  
    const option = {
      method: method,
      url: url,
      headers: headers
    }

    if (getToken) {
      if (!authorization) {
          request(option).then (responseData => {
          setUser(responseData)
          setLoading(true)
        }).catch(error => {
          if (error.toJSON().status !== 401) {
            console.log(error.toJSON())
          }
          localStorage.removeItem('token')
          setLoading(true)
        })
        setToken(getToken)
      }
    } else {
      setLoading(true)
    }
  }, [authorization])

  useEffect (() => {
    if (token) {
      window.localStorage.setItem('token', token)
    }
  }, [token])

  useEffect (() => {
    const method = 'get'
    
    const url = 'generalType'
  
    const option = {
      method: method,
      url: url
    }
    request(option).then (responseData => {
    setGeneralTypes(responseData)
    }).catch(error => {
      if (error.toJSON().status !== 401) {
        console.log(error.toJSON())
      }
    })
  }, [])

  useEffect (() => {
    const method = 'get'
    
    const url = 'type'
  
    const option = {
      method: method,
      url: url
    }
    request(option).then (responseData => {
    setTypes(responseData)
    }).catch(error => {
      if (error.toJSON().status !== 401) {
        console.log(error.toJSON())
      }
    })
  }, [])

  useEffect(() => {
    if (authorization) {
      const method = 'get'

      const url = `basket`

      const headers = {
        'Authorization': `Bearer ${token}`
      }
    
      const option = {
        method: method,
        url: url,
        headers: headers
      }

      request(option).then (response => {
        setBasketProducts(response.data)
      }).catch(error => {
        console.log(error.toJSON())
      })
    } else if (!authorization) {
      setBasketProducts([])
    }
  }, [authorization])

  const productDelete = (id) => {
    const method = 'delete'
        
    const url = `basket/${id}`
        
    const headers = {
        'Authorization': `Bearer ${token}`
    }
        
    const option = {
        method: method,
        url: url,
        headers: headers
    }
        
    request(option).catch(error => {
        console.log(error.toJSON())
    })

    setBasketProducts((prev) => prev.filter(product => product.id !== id))
  }

  const basketDelete = () => {
    const method = 'delete'
        
    const url = `basket`
        
    const headers = {
        'Authorization': `Bearer ${token}`
    }
        
    const option = {
        method: method,
        url: url,
        headers: headers
    }
        
    request(option).catch(error => {
        console.log(error.toJSON())
    })

    setBasketProducts([])
  }

  const handleChangeSearch = e => {
		setSearch(e.target.value)
	}

  const exitAccount = () => {
    setUser({})
    localStorage.removeItem('token')
    setToken(false)
  }

  return (
    <BrowserRouter>
      <UserContext.Provider value={{
        user, 
        setUser, 
        token, 
        setToken, 
        authorization, 
        setAuthorization, 
        generalTypes, 
        types, 
        basketProducts, 
        setBasketProducts,
        productDelete,
        basketDelete,
        search,
        setSearch,
        handleChangeSearch,
        exitAccount,
        }}>
        {loading
          ? <div className={css.app}>
              <Header />
              <Main />
              <Footer />
            </div>
          : <div className={css.loading}>
              <Loading />
            </div>
        }
        
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;