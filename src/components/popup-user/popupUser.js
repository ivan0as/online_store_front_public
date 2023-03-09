import { UserContext } from '../../context';
import { useContext, useRef } from 'react';
import { USER_TYPES } from '../../config';
import { Link } from 'react-router-dom';
import { useOutsideAlerter } from '../../utils';
import css from './popupUser.module.css';

function PopupUser(props) {
  const {user, exitAccount} = useContext(UserContext)

  const {popupUserSwitch, popupUserButton} = props

  const exit = () => {
    exitAccount()
    popupUserSwitch()
  }

  const popupUser = useRef(null)

  useOutsideAlerter(popupUser, popupUserButton, popupUserSwitch)

  const close = () => {
    popupUserSwitch()
  }

  return (
    <div className={css.popup} ref={popupUser}>
      <div>
        <p>{user.data.user[USER_TYPES.NAME]}</p>
        <p>{user.data.user[USER_TYPES.EMAIL]}</p>
        <p>{user.data.user[USER_TYPES.PHONE]}</p>
      </div>
      <ul className={css.user_menu}>
        <Link to={'sales'}>
          <li><button className={css.button} onClick={close}>Мои заказы</button></li>
        </Link>
        <Link to={'user_settings'}>
          <li><button className={css.button} onClick={close}>Настройки аккаунта</button></li>
        </Link>
        {user.data.user[USER_TYPES.ROLE] === "ADMIN" &&
          <>
            <Link to={'admin_panel'}>
              <li><button className={css.button} onClick={close}>Админ панель</button></li>
            </Link>
            <Link to={'salesAdmin'}>
              <li><button className={css.button} onClick={close}>Все заказы</button></li>
            </Link>
          </>
        }
      </ul>
      <button className={`${css.button} ${css.button_exit}`} onClick={exit}>Выйти из аккаунта</button>
    </div>
  );
}

export default PopupUser;