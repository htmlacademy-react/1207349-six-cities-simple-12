import {Link} from 'react-router-dom';
import {AppRoute} from '../../const';

type HeaderProps = {
  isAuth?: boolean;
  isLoginPage?: boolean;
}

function Header({isAuth = false, isLoginPage}: HeaderProps): JSX.Element {
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link to={AppRoute.Root} className="header__logo-link header__logo-link--active">
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
            </Link>
          </div>
          {isLoginPage ? '' :
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  {isAuth ?
                    <div className="header__nav-profile">
                      <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                      <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                    </div> :
                    <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Login}>
                      <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                      <span className="header__login">Sign in</span>
                    </Link> }
                </li>
                {!isAuth ? '' :
                  <li className="header__nav-item">
                    <Link className="header__nav-link" to={AppRoute.Login}>
                      <span className="header__signout">Sign out</span>
                    </Link>
                  </li> }
              </ul>
            </nav> }
        </div>
      </div>
    </header>
  );
}

export default Header;
