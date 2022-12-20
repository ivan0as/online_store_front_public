import { useContext } from 'react';
import { UserContext } from '../../context';
import { Routes, Route} from 'react-router-dom';
import { request } from '../../requests';
import Home from '../home';
import Products from '../products';
import ProductDetal from '../product-detail';
import Basket from '../basket';
import Sales from '../sales';
import SaleDetail from '../sale-detail';
import UserSettings from '../user-settings';
import AdminPanel from '../admin-panel';
import css from './main.module.css';
import css_app from '../app/app.module.css';

function Main() {

  const {token, basketProducts, setBasketProducts} = useContext(UserContext)

  const result = (id) => {
    if (basketProducts.length !== 0) {
      const find = basketProducts.find(({ productId }) => productId === id)
      if (find) {
        const basketProduct = find
        return basketProduct
      }
    }
    return false
  }

  const handleClick = (product) => {
    const method = 'post'

    const url = `basket`

    const headers = {
      'Authorization': `Bearer ${token}`
    }

    const data = {
      'productId': product.id,
      'amount': 1
    }

    const option = {
      method: method,
      url: url,
      headers: headers,
      data: data
    }

    request(option).then (response => {
      setBasketProducts([...basketProducts, response.data])
    }).catch(error => {
      console.log(error.toJSON())
    })
  }

  return (
    <main className={css.main}>
      <div className={`${css_app.container} ${css.main_content}`}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/:type' element={<Products basketProduct={result} handleClick={handleClick}/>} />
          <Route path='/:type/:id' element={<ProductDetal basketProduct={result} handleClick={handleClick}/>} />
          <Route path='/basket' element={<Basket />} />
          <Route path='/sales' element={<Sales />} />
          <Route path='/sales/:id' element={<SaleDetail />} />
          <Route path='/user_settings' element={<UserSettings />} />
          <Route path='/admin_panel/*' element={<AdminPanel />} />
        </Routes>
      </div>
    </main>
  );
}

export default Main;