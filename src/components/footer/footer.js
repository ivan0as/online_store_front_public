import { COMPANY } from '../../config';
import css from './footer.module.css';
import css_app from '../app/app.module.css';

function Footer() {
  return (
    <footer className={css.footer}>
            <div className={`${css_app.container} ${css.footer_content}`}>
                <p>{COMPANY}</p>
                <p>Всё</p>
            </div>
    </footer>
  );
}

export default Footer;