import { useContext } from 'react';
import { Routes, Route, Link} from 'react-router-dom';
import { UserContext } from '../../context';
import NoAccess from '../no-access';
import Users from '../users';
import AddProduct from '../add-product';
import ProductTypes from '../product-types';
import GeneralTypeProduct from '../general-type-product';
import Producer from '../producer';
import Country from '../country';
import Slider from '../slider';
import css from './adminPanel.module.css';

function AdminPanel() {

  const {authorization, user} = useContext(UserContext)
  
  return (
    <>
      {authorization
      ? 
        <>
          {user.data.user.role === "ADMIN"
            ?
              <div className={css.admin_panel}>
                <ul className={css.list_panel}>
                  <Link to={'users'} className={css.link}>
                    <li><button>Пользователи</button></li>
                  </Link>
                  <Link to={'add_product'} className={css.link}>
                    <li><button>Добавить товар</button></li>
                  </Link>
                  <Link to={'product_types'} className={css.link}>
                    <li><button>Типы товаров</button></li>
                  </Link>
                  <Link to={'general_type_product'} className={css.link}>
                    <li><button>Общий тип товаров</button></li>
                  </Link>
                  <Link to={'producer'} className={css.link}>
                    <li><button>Производители</button></li>
                  </Link>
                  <Link to={'country'} className={css.link}>
                    <li><button>Страны</button></li>
                  </Link>
                  <Link to={'slider'} className={css.link}>
                    <li><button>Слайдер</button></li>
                  </Link>
                </ul>
                <div className={css.info_panel}>
                  <Routes>
                    <Route path='users' element={<Users />} />
                    <Route path='add_product' element={<AddProduct />} />
                    <Route path='product_types' element={<ProductTypes />} />
                    <Route path='general_type_product' element={<GeneralTypeProduct />} />
                    <Route path='producer' element={<Producer />} />
                    <Route path='country' element={<Country />} />
                    <Route path='slider' element={<Slider />} />
                  </Routes>
                </div>
              </div>
            : <NoAccess />
          }
        </>
      : <NoAccess />
      }
    </>
  );
}

export default AdminPanel;