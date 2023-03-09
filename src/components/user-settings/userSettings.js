import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context';
import { request } from '../../requests';
import Loading from '../loading';
import AuthorizationFailed from '../authorization_failed/';
import css from './userSettings.module.css';

function UserSettings() {

  const {token, authorization, exitAccount} = useContext(UserContext)

  const [loading, setLoading] = useState(false)

  const [user, setUser] = useState([])

  const [initialData, setInitialData] = useState([])

  useEffect (() => {
    if (authorization) {
      const method = 'get'
  
      const url = `user/user`
  
      const headers = {
        'Authorization': `Bearer ${token}`
      }
      
      const option = {
        method: method,
        url: url,
        headers: headers
      }
  
      request(option).then (response => {
        setUser(response.data)
        setInitialData(response.data)
        setLoading(true)
      }).catch(error => {
        console.log(error.toJSON())
      })
    }
  }, [authorization])

  const handleSubmit = (e) => {
    e.preventDefault()
    
    const dataToSend = {}

    for (let keyInitialData in initialData) {
      for (let keyUser in user) {
        if (keyInitialData === keyUser && initialData[keyInitialData] !== user[keyUser]) {
          dataToSend[keyInitialData] = user[keyUser]
        }
      }
    }

    console.log(dataToSend)

    if (Object.keys(dataToSend).length !== 0) {
      const method = 'put'

      const url = `user`

      const headers = {
        'Authorization': `Bearer ${token}`
      }

      const data = dataToSend
      
      const option = {
        method: method,
        url: url,
        headers: headers,
        data: data
      }

      request(option).then (response => {
        setUser(response.data)
        setInitialData(response.data)
      }).catch(error => {
        console.log(error.toJSON())
        alert(error.response.data.message)
      })
    } else {
      alert('Данные не изменены')
    }
  }

  const handleChange = (e) => {
    const fieldName = e.target.name
    setUser({...user, [fieldName]: e.target.value})
  }

  return (
    <>
      {authorization
        ?
          <>
            {loading
              ? 
                <div className={css.user_profile}>
                  <h2 className={css.h2}>Мой профиль</h2>
                  <div className={css.nav_and_settings}>
                    <div className={css.nav_personal_account}>
                      <h3 className={css.h3}>Личный кабинет</h3>
                      <ul className={css.nav_account}>
                        <li><button>Мой профиль</button></li>
                        <li>
                          <Link to='/sales' className={css.link}>
                            <button>Мои заказы</button>
                          </Link>
                        </li>
                        <li>
                          <Link to='/basket' className={css.link}>
                            <button>Корзина</button>
                          </Link>
                        </li>
                      </ul>
                    </div>
                    <div className={css.user_settings}>
                      <h3 className={css.header_setting}>Редактирование профиля</h3>
                      <form onSubmit={handleSubmit} className={css.form}>
                        <label>E-mail<input name={'email'} type='text' value={user.email} onChange={handleChange}/></label>
                        <label>Имя<input name={'name'} type='text' value={user.name} onChange={handleChange}/></label>
                        <label>Телефон<input name={'phoneNumber'} type='text' value={user.phoneNumber} onChange={handleChange}/></label>
                        <label>Пароль<input name={'password'} type='text' onChange={handleChange}/></label>
                        <button type='submit' className={css.btn_submit}>Сохраненить измения</button>
                      </form>
                      <button className={css.exit} onClick={exitAccount}>Выйти из аккаунта</button>
                    </div>
                  </div>
                </div>
              : <div className={css.loading}>
                  <Loading />
                </div>
            }
          </>
        : <AuthorizationFailed />
      }
    </>
  );
}

export default UserSettings;