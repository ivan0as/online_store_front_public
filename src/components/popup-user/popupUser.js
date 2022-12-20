import { UserContext } from '../../context';
import { useContext } from 'react';
import { USER_TYPES } from '../../config';
import { Link } from 'react-router-dom';
import css from './popupUser.module.css';

function PopupUser() {
  const {user, setUser, setToken} = useContext(UserContext)

  const exit = () => {
    let dataUser = {
        "status": false,
        "data": {
            "token": false,
            "user": {
                "id": false,
                [USER_TYPES.EMAIL]: false,
                [USER_TYPES.ROLE]: false,
                [USER_TYPES.PHONE]: false,
            }
        }
    }
    setUser(dataUser)
    localStorage.removeItem('token')
    setToken(false)
  }
  return (
    <div className={css.popup}>
      <div>
        <p>{user.data.user[USER_TYPES.EMAIL]}</p>
        <p>{user.data.user[USER_TYPES.PHONE]}</p>
      </div>
      <ul className={css.user_menu}>
        <li><button className={css.button}>Мои заказы</button></li>
        <Link to={'user_settings'}>
          <li><button className={css.button}>Настройки аккаунта</button></li>
        </Link>
        {user.data.user[USER_TYPES.ROLE] === "ADMIN" &&
          <Link to={'admin_panel'}>
            <li><button className={css.button}>Админ панель</button></li>
          </Link>
        }
      </ul>
      <button className={`${css.button} ${css.button_exit}`} onClick={exit}>Выйти из аккаунта</button>
    </div>
  );
}

export default PopupUser;