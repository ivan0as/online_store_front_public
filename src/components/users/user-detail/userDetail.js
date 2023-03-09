import { useEffect, useState, useContext } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { UserContext } from '../../../context';
import { request } from '../../../requests';
import { ROLE_TYPE, ROLE_COPY } from '../../../config';
import { goBack } from '../../../utils';
import Loading from '../../loading';
import css from './userDetail.module.css';

function UserDetail() {

  const location = useLocation()

  const navigate = useNavigate()

  const {token} = useContext(UserContext)

  const {id} = useParams()

  const [loading, setLoading] = useState(false)

  const [user, setUser] = useState({})

  const [initialData, setInitialData] = useState({})

  useEffect (() => {
    const method = 'get'

    let url = `user/${id}`

    const headers = {
      'Authorization': `Bearer ${token}`
    }
      
    const option = {
      method: method,
      url: url,
      headers: headers,
    }

    request(option).then (response => {
      setInitialData({
        id: response.data.id,
        email: response.data.email,
        password: response.data.password,
        role: response.data.role,
        phoneNumber: response.data.phoneNumber,
      })
      setUser(response.data)
      setLoading(true)
    }).catch(error => {
      console.log(error.toJSON())
    })
  }, [])

  const handleChange = (e) => {
    const fieldName = e.target.name
    setUser({...user, [fieldName]: e.target.value})
  }

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

      const url = `user/${id}`

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
        setInitialData({
          id: response.data.id,
          email: response.data.email,
          password: response.data.password,
          role: response.data.role,
          phoneNumber: response.data.phoneNumber,
        })
        setUser(response.data)
      }).catch(error => {
        console.log(error.toJSON())
        alert(error.response.data.message)
      })
    } else {
      alert('Данные не изменены')
    }
  }

  const back = () => {
    const previousPage = goBack(location.pathname)
    navigate(previousPage)
  }

  return (
    <div className={css.user_detail}>
      <button onClick={back} className={css.btn_back}>Назад</button>
      <div className={css.top_info}>
        <h2>Детальная информация</h2>
      </div>
      {loading
        ?
          <form onSubmit={handleSubmit} className={css.form_user_change}>
            <label>E-mail<input name={'email'} type='text' value={user.email} onChange={handleChange}/></label>
            <label>Пароль<input name={'password'} type='text' onChange={handleChange}/></label>
            <label>Роль
              <select name={'role'} value={user.role} onChange={handleChange}>
                {Object.values(ROLE_TYPE).map(role => {
                  return <option key={role} value={role}>{ROLE_COPY[role]}</option>
                })}
              </select>
            </label>
            <label>Номер телефона<input name={'phoneNumber'} type='text' value={user.phoneNumber} onChange={handleChange}/></label>
            <button type='submit' className={css.btn_submit}>Изменить</button>
          </form>
        :
          <div className={css.loading}>
            <Loading />
          </div>
      }
    </div>
  );
}

export default UserDetail;