import { Link } from 'react-router-dom';
import { memo } from 'react';
import { AppRoute } from '../../const';
import { useLocation } from 'react-router-dom';
import HeaderNav from '../header-nav/header-nav';


function Header(): JSX.Element {
  const location = useLocation();
  const isLoginPage = AppRoute.Login === location.pathname;

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link to={AppRoute.Root} className="header__logo-link header__logo-link--active" data-testid="link-to-root">
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
            </Link>
          </div>
          {!isLoginPage && <HeaderNav /> }
        </div>
      </div>
    </header>
  );
}

export default memo(Header);
