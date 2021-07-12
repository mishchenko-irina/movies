import { NavLink } from 'react-router-dom';

const Navigation = () => (
    <div>
      <nav>
        <NavLink to="/"  exact>
          Home
        </NavLink>
  
        <NavLink to="/movies">
          Movies
        </NavLink>
      </nav>
      <hr />
    </div>
  );
  
  export default Navigation;