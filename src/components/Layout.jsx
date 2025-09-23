import {Link} from 'react-router-dom';

export const Layout = ({children}) => {
  return (
    <div>
      <nav>
        <ul>
          <li><Link to="/">Dashboard</Link></li>
          <li><Link to="/projects">Projects</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/signup">Sign Up</Link></li>
        </ul>
      </nav>
      <main>
        {children}
      </main>
    </div>
  );
};