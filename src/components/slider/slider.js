import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context';
import { request } from '../../requests';
import { URL_IMG } from '../../config';
import Loading from '../loading';
import css from './slider.module.css';

function Slider() {
  
  const {token} = useContext(UserContext)

  const [sliders, setSliders] = useState([])

  const [formVisible, setFormVisible] = useState(false)

  const [loading, setLoading] = useState(false)

  const emptyObject = {
    img: '',
    url: '',
  }

  const [values, setValues] = useState(emptyObject)

  useEffect (() => {
    const method = 'get'

    const url = `slider`

    const option = {
      method: method,
      url: url
    }

    request(option).then (response => {
      setSliders(response.data)
      setLoading(true)
    }).catch(error => {
      console.log(error.toJSON())
    })
  }, [])

  const handleClick = () => {
    setFormVisible(!formVisible)
  }

  const handleChange = e => {
		const fieldName = e.target.name
    if (fieldName === 'img') {
      setValues({...values, [fieldName]: e.target.files[0]})
    } else {
      setValues({...values, [fieldName]: e.target.value})
    }
	}

  const handleSubmit = e => {
    e.preventDefault()

    const method = 'post'

    const url = `slider`

    const headers = {
      'Authorization': `Bearer ${token}`,
    }

    const formData = new FormData()

    for (let key in values) {
      formData.append(key, values[key])
    }

    const data = formData

    const option = {
      method: method,
      url: url,
      headers: headers,
      data: data
    }

    request(option).then (response => {
      setValues(emptyObject)
      setSliders([...sliders, response.data])
      formData.delete('img');
    }).catch(error => {
      console.log(error.toJSON())
      alert(error.response.data.message)
    })
  }
  
  return (
    <div className={css.sliders}>
      {loading
        ?
          <>
            <div className={css.add_slider}>
              <button className={css.btn_form_visible} onClick={handleClick}>Добавить тип товара</button>
              {formVisible &&
                <form className={css.form_add_slider} onSubmit={handleSubmit}>
                  <label>Изображение слайдера<input type="file" accept="image/*" name={'img'} onChange={handleChange}/></label>
                  <label>Ссылка<input name={'url'} value={values.url} onChange={handleChange}/></label>
                  <button className={css.btn_add_slider}>Добавить</button>
                </form>
              }
            </div>
            <div className={css.sliders_list}>
              {sliders.map(slider => {
                return(
                  <Link to={`${slider.id}`} key={slider.id} className={css.slider}>
                    <img className={css.slider_img} alt={`Слайдер №${slider.id}`} src={URL_IMG+slider.img} />
                  </Link>
                )
              })}
            </div>
          </>
        :
          <div className={css.loading}>
            <Loading />
          </div>
      }
    </div>
  );
}

export default Slider;