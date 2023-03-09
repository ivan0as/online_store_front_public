import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context';
import { request } from '../../requests';
import Loading from '../loading';
import css from './users.module.css';

function Users() {
    
  const {token} = useContext(UserContext)

  const [users, setUsers] = useState([])

  const [loading, setLoading] = useState(false)

  useEffect (() => {
    const method = 'get'

    const url = `user/`

    const headers = {
      'Authorization': `Bearer ${token}`
    }
      
    const option = {
      method: method,
      url: url,
      headers: headers,
    }

    request(option).then (response => {
      setLoading(true)
      setUsers(response.data)
    }).catch(error => {
      console.log(error.toJSON())
    })
  }, [])
  
  return (
    <div className={css.users}>
      {loading
        ? 
          <div className={css.users_list}>
            <p className={`${css.user} ${css.users_header}`}>
              <span>E-mail</span>
              <span>Роль</span>
            </p>
            {users.map(user => {
              return(
                <Link to={`${user.id}`} key={user.id} className={css.link_user}>
                  <p className={css.user}>
                    <span>{user.email}</span>
                    <span>{user.role}</span>
                  </p>
                </Link>
              )
            })}
          </div>
        : 
          <div className={css.loading}>
            <Loading />
          </div>
      }
    </div>
  );
}

export default Users;