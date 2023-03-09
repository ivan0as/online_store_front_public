import { useContext } from 'react';
import { UserContext } from '../../context';
import { Routes, Route } from 'react-router-dom';
import { request } from '../../requests';
import Home from '../home';
import Catalog from '../catalog';
import Basket from '../basket';
import Sales from '../sales';
import SaleDetail from '../sale-detail';
import UserSettings from '../user-settings';
import AdminPanel from '../admin-panel';
import css from './main.module.css';
import css_app from '../app/app.module.css';

function Main() {

  return (
    <main className={css.main}>
      <div className={`${css_app.container} ${css.main_content}`}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/catalog/*' element={<Catalog />} />
          <Route path='/basket' element={<Basket />} />
          <Route path='/sales' element={<Sales />} />
          <Route path='/sales/:id' element={<SaleDetail />} />
          <Route path='/salesAdmin' element={<Sales />} />
          <Route path='/salesAdmin/:id' element={<SaleDetail />} />
          <Route path='/user_settings' element={<UserSettings />} />
          <Route path='/admin_panel/*' element={<AdminPanel />} />
        </Routes>
      </div>
    </main>
  );
}

export default Main;