import css from './authorizationFailed.module.css';

function AuthorizationFailed() {
  
  return (
    <div className={css.block_authorization_failed}>
      Для авторизованных пользователей
    </div>
  );
}

export default AuthorizationFailed;