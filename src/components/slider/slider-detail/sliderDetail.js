import { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { UserContext } from '../../../context';
import { request } from '../../../requests';
import { URL_IMG } from '../../../config';
import { goBack } from '../../../utils';
import Loading from '../../loading';
import css from './sliderDetail.module.css';

function SliderDetail() {

  const {token} = useContext(UserContext)

  const {id} = useParams()

  const navigate = useNavigate()

  const location = useLocation()

  const [loading, setLoading] = useState(false)

  const [slider, setSlider] = useState({})

  const [initialData, setInitialData] = useState({})

  useEffect (() => {
    const method = 'get'

    const url = `slider/${id}`

    const option = {
      method: method,
      url: url
    }

    request(option).then (response => {
      setInitialData({
        id: response.data.id,
        img: response.data.img,
      })
      setSlider(response.data)
    }).catch(error => {
      console.log(error.toJSON())
    })
  }, [])

  useEffect (() => {
    if (Object.keys(slider).length !== 0) {
      setLoading(true)
    }
  }, [slider])

  const handleChange = (e) => {
    const fieldName = e.target.name
    if (fieldName === 'img') {
      setSlider({...slider, [fieldName]: e.target.files[0]})
    } else {
      setSlider({...slider, [fieldName]: e.target.value})
    }
  }

  const deleteEntry = () => {
    const method = 'delete'

    const url = `slider/${id}`

    const headers = {
      'Authorization': `Bearer ${token}`
    }
      
    const option = {
      method: method,
      url: url,
      headers: headers,
    }

    request(option).then (response => {
      alert('Данные успешно удалены')
      navigate(-1)
    }).catch(error => {
      console.log(error.toJSON())
      alert(error.response.data.message)
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const dataToSend = {}

    for (let keyInitialData in initialData) {
      for (let keySlider in slider) {
        if (keyInitialData === keySlider && initialData[keyInitialData] !== slider[keySlider]) {
          dataToSend[keyInitialData] = slider[keySlider]
        }
      }
    }

    if (Object.keys(dataToSend).length !== 0) {
      const method = 'put'

      const url = `slider/${id}`

      const headers = {
        'Authorization': `Bearer ${token}`
      }

      const formData = new FormData()

      for (let key in dataToSend) {
        formData.append(key, dataToSend[key])
      }

      const data = formData
      
      const option = {
        method: method,
        url: url,
        headers: headers,
        data: data
      }

      request(option).then (response => {
        setInitialData({
        id: response.data.id,
        img: response.data.img,
        })
        setSlider(response.data)
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
    <div className={css.slider_detail}>
      <button onClick={back} className={css.btn_back}>Назад</button>
      <div className={css.top_info}>
        <h2>Детальная информация</h2>
        <button className={css.btn_delete} onClick={deleteEntry}>Удалить</button>
      </div>
      {loading
        ?
          <form onSubmit={handleSubmit} className={css.form_slider_change}>
            <label>Изображение слайдера<input type="file" accept="image/*" name={'img'} onChange={handleChange}/></label>
            <label>Ссылка<input name={'url'} type='text' value={slider.url} onChange={handleChange}/></label>
            <button type='submit' className={css.btn_submit}>Изменить</button>
            <img className={css.slider_img} alt={`Слайдер №${slider.id}`} src={URL_IMG+slider.img} />
          </form>
        :
          <div className={css.loading}>
            <Loading />
          </div>
      }
    </div>
  );
}

export default SliderDetail;