import './index.css';
import { useAuth } from '../../Contexts/AuthContext.js'
import { Link } from 'react-router-dom';

const Header = ({ onLogout, isOpen, toggleMenu }) => {
  const { userData } = useAuth()

  return (
    <nav role="navigation" aria-label="Main Navigation">
      <div id="menuToggle">
        <input
          type="checkbox"
          checked={isOpen}
          onChange={toggleMenu}
          aria-label="Toggle menu"
        />
        <span></span>
        <span></span>
        <span></span>
        <ul id="menu" className={isOpen ? 'active' : ''} aria-expanded={isOpen}>
          {userData.role === 'teacher'
            ? <>
                <li><Link to="/t">Quizzes</Link></li>
                <li><Link to="/t/gradebook">Grades</Link></li>
              </>
            : <li><Link to="/s">Quizzes</Link></li>
          }
          <hr/>
          <div className="user-info">
            <p>{userData.firstName}</p>
          </div>
            <button className='btn logout-btn' onClick={onLogout}>Log Out</button>
        </ul>
      </div>
    </nav>
  );
};

export default Header;