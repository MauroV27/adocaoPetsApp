import './Logo.css';
import logo from '../../assets/logo.png';

const Logo = () => {
  return (
    <div className="logo-container">
      <img src={logo} alt="Logo" className="logo" />
    </div>
  );
};

export default Logo;