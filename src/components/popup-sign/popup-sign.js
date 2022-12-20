import { useState, useContext } from 'react';
import { USER_TYPES, USER_COPY } from '../../config';
import { LoadingContext } from '../../context';
import css from './popup-sign.module.css';
import img_loading from './icon-loading.png';

export default function PopupSign(props) {
    const {close, requestSignIn, requestSignUp} = props

    const [registration, setRegistration] = useState(false)

    const [values, setValues] = useState({
        [USER_TYPES.EMAIL]: '',
        [USER_TYPES.PASSWORD]: ''
    })

    
    const handleChange = (e) => {
        const fieldName = e.target.name
        setValues({...values, [fieldName]: e.target.value})
    }
    
    const handleSubmit = (e) => {
        e.preventDefault()
        if (!values[USER_TYPES.EMAIL] && !values[USER_TYPES.PASSWORD]) {
            alert ('Заполните E-mail и Пароль')
        } else if (!values[USER_TYPES.EMAIL]) {
            alert ('Заполните E-mail')
        } else if (!values[USER_TYPES.PASSWORD]){
            alert ('Заполните Пароль')
        } else {
            requestSignIn(values)
        }
    }

    const registrationSubmit = (e) => {
        e.preventDefault()
        if (!values[USER_TYPES.EMAIL] && !values[USER_TYPES.PASSWORD] && !values[USER_TYPES.PHONE]) {
            alert ('Заполните E-mail и Пароль и Телефон')
        } else if (!values[USER_TYPES.EMAIL]) {
            alert ('Заполните E-mail')
        } else if (!values[USER_TYPES.PASSWORD]){
            alert ('Заполните Пароль')
        } else if (!values[USER_TYPES.PHONE]){
            alert ('Заполните Телефон')
        } else {
            requestSignUp(values)
        }
    }

    const buttonSwitch = () => {
        setRegistration(!registration)
    }
    
    return (
        <div className={css.popup_sign}>
            <button onClick={close} className={css.button_close}>x</button>
            {registration
            ?   <div className={css.form_sign}>
                    <p>Регистрация</p>
                    <form onSubmit={registrationSubmit}>
                        <label>{USER_COPY[USER_TYPES.EMAIL]}<input id='signUpMail' name={[USER_TYPES.EMAIL]} type='text' value={values[USER_TYPES.EMAIL]} onChange={handleChange}/></label>
                        <label>{USER_COPY[USER_TYPES.PASSWORD]}<input id='signUpPassword' name={[USER_TYPES.PASSWORD]} type='text' value={values[USER_TYPES.PASSWORD]} onChange={handleChange}/></label>
                        <label>{USER_COPY[USER_TYPES.PHONE]}<input id='signUpPhone' name={[USER_TYPES.PHONE]} type='text' value={values[USER_TYPES.PHONE]} onChange={handleChange}/></label>
                        <button type='submit'>Зарегистрироваться</button>
                    </form>
                    <button className={css.btn_registration} onClick={buttonSwitch}>Авторизация</button>
                </div>
            :   <div className={css.form_sign}>
                    <p>Авторизация</p>
                    <form onSubmit={handleSubmit}>
                        <label>{USER_COPY[USER_TYPES.EMAIL]}<input id='signUpMail' name={[USER_TYPES.EMAIL]} type='text' value={values[USER_TYPES.EMAIL]} onChange={handleChange}/></label>
                        <label>{USER_COPY[USER_TYPES.PASSWORD]}<input id='signUpPassword' name={[USER_TYPES.PASSWORD]} type='text' value={values[USER_TYPES.PASSWORD]} onChange={handleChange}/></label>
                        <button type='submit'>Войти</button>
                    </form>
                    <button className={css.btn_registration} onClick={buttonSwitch}>Регистрация</button>
                </div>
            }
            
        </div>
    );
}