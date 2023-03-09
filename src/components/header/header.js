import { useState, useContext, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { request } from '../../requests';
import { COMPANY, NUMBER, USER_TYPES } from '../../config';
import { UserContext } from '../../context';
import PopupSign from '../popup-sign';
import PopupUser from '../popup-user';
import CatalogMenu from '../catalog-menu';
import css from './header.module.css';
import css_app from '../app/app.module.css';


function Header() {
  const [isFormVisible, setFormVisible] = useState(false)
  const [popupUserFormVisible, setPopupUserFormVisible] = useState(false)
  const [catalogMenuFormVisible, setCatalogMenuFormVisible] = useState(false)

  const navigate = useNavigate()


  const {
    user, 
    setUser, 
    authorization, 
    setAuthorization, 
    setToken, 
    search,
    handleChangeSearch,
  } = useContext(UserContext)

  useEffect(() => {
    if (user.status === 'OK') {
        setAuthorization(true)
        setFormVisible(false)
    } else {
        setAuthorization(false)
    }
  }, [user, setAuthorization])

  const close = () => {
    switchVisible(false)
  }

  const signIn = () => {
    if (!isFormVisible) {
      switchVisible()
    }
  }

  const switchVisible = () => {
    setFormVisible(!isFormVisible)
  }

  const requestSignIn = (values) => {
    const method = 'post'
    
    const url = 'user/login'

    const data = {
        [USER_TYPES.EMAIL]: values[USER_TYPES.EMAIL],
        [USER_TYPES.PASSWORD]: values[USER_TYPES.PASSWORD]
    }
    
    const option = {
        method: method,
        url: url,
        data: data
    }

    request(option).then (responseData => {
      setUser(responseData)
      setToken(responseData.data.token)
    }).catch(error => {
      alert(error.response.data.message)
    })
  }

  const requestSignUp = (values) => {
    const method = 'post'
    
    const url = 'user/registration'

    const data = values
    
    const option = {
        method: method,
        url: url,
        data: data
    }

    request(option).then (responseData => {
      setUser(responseData)
      setToken(responseData.data.token)
    }).catch(error => {
      alert(error.response.data.message)
    })
  }

  const popupUserSwitch = () => {
    setPopupUserFormVisible(!popupUserFormVisible)
  }

  const catalogMenuSwitch = () => {
    setCatalogMenuFormVisible(!catalogMenuFormVisible)
  }

  const handleSubmit = e => {
    e.preventDefault()

    if (search) {
      navigate(`catalog/search?searchName=${search}`)
    } else {
      alert('Поле не должно быть пустым')
    }
    
  }

  const catalogButton = useRef(null)

  const popupUserButton = useRef(null)

  return (
    <header className={css.header}>
      <div className={`${css_app.container} ${css.header_content}`}>
        <div className={css.header_info}>
          <nav className={css.navigation}>
            <ul>
              <li><button>Все аптеки</button></li>
              <li><button>Помощь</button></li>
              <li><button>О компании</button></li>
            </ul>
          </nav>
          <div className={css.phone_support}>
            <a href={`tel:${NUMBER}`}>{NUMBER}</a>
          </div>
        </div>
        <div className={css.header_line_middle}>
          <Link to='/' className={css.link}>
            
            <h1 className={css.h1}>{COMPANY}</h1>
          </Link>
          <button className={css.catalog} onClick={catalogMenuSwitch} ref={catalogButton}>Каталог</button>
          {catalogMenuFormVisible && (
            <CatalogMenu catalogMenuSwitch={catalogMenuSwitch} catalogButton={catalogButton}/>
          )}
          <form className={css.form_search} onSubmit={handleSubmit}>
            <input className={css.search} placeholder="Введите название лекарства" value={search} onChange={handleChangeSearch}/>
            <button className={css.find} type='submit'>Найти</button>
          </form>
          <nav className={css.buttons_user}>
            <ul>
              <Link to='/sales' className={css.link}>
                <li><button>Заказы</button></li>
              </Link>
              <Link to='/basket' className={css.link}>
                <li><button>Корзина</button></li>
              </Link>
              {authorization
              ? <li>
                  <button onClick={popupUserSwitch} ref={popupUserButton}>Профиль</button>
                  {popupUserFormVisible && (
                    <PopupUser popupUserButton={popupUserButton} popupUserSwitch={popupUserSwitch}/>
                  )}
                </li>
              : <li><button onClick={signIn}>Войти</button></li>
              }
            </ul>
          </nav>
        </div>
        {isFormVisible &&(
          <PopupSign close={close} requestSignIn={requestSignIn} requestSignUp={requestSignUp}/>
        )}
      </div>
    </header>
  );
}

export default Header;