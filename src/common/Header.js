import './Header.css';
import KeyboardDoubleArrowDownTwoToneIcon from '@mui/icons-material/KeyboardDoubleArrowDownTwoTone';

function Header() {
    return (
        <div className="Header">
            <div className="header-title">Software Developer</div>
            <div className="header-subtitle">desiré guilarte</div>
            <div className="header-arrow-wrapper"><KeyboardDoubleArrowDownTwoToneIcon className="header-arrow" /></div>
        </div>
    );
}

export default Header;