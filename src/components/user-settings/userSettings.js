import { useEffect, useState, useContext } from 'react';
import { UserContext } from '../../context';
import { request } from '../../requests';
import css from './userSettings.module.css';

function UserSettings() {

  const {token} = useContext(UserContext)

  const [loading, setLoading] = useState(false)

  const [user, setUser] = useState([])

  const [initialData, setInitialData] = useState([])

  useEffect (() => {
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
      setInitialData({
        'email': response.data.email,
        'password': response.data.password,
        'phoneNumber': response.data.phoneNumber
      })
      setLoading(true)
    }).catch(error => {
      console.log(error.toJSON())
    })
  }, [])

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
        setInitialData({
          'email': response.data.email,
          'password': response.data.password,
          'phoneNumber': response.data.phoneNumber
        })
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
    <div className={css.user_settings}>
      {loading
        ? <>
            <p>Настройки пользователя</p>
            <form onSubmit={handleSubmit} className={css.form}>
              <label>Почта<input name={'email'} type='text' value={user.email} onChange={handleChange}/></label>
              <label>Пароль<input name={'password'} type='text' onChange={handleChange}/></label>
              <label>Номер телефона<input name={'phoneNumber'} type='text' value={user.phoneNumber} onChange={handleChange}/></label>
              <button type='submit' className={css.btn_submit}>Изменить</button>
            </form>
          </>
        : <p>Загрузка</p>
      }
    </div>
  );
}

export default UserSettings;