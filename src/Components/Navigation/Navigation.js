import { NavLink } from 'react-router-dom';
import s from './Navigation.module.css';

const Navigation = () => (
    <div>
      <nav className={s.navigation}>
        <NavLink to="/" className={s.link} activeClassName={s.activeLink} exact>
          Home
        </NavLink>
  
        <NavLink to="/movies" className={s.link} activeClassName={s.activeLink}>
          Movies
        </NavLink>
      </nav>
      <hr />
    </div>
  );
  
  export default Navigation;