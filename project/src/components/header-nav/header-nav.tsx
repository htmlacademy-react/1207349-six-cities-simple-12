import { Link } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { logoutAction } from '../../store/api-actions';
import { getAuthorizationStatus, getCurrentUser } from '../../store/user-process/selectors';


function HeaderNav(): JSX.Element {
  const dispatch = useAppDispatch();

  const userEmail = useAppSelector(getCurrentUser)?.email;
  const isAuth = useAppSelector(getAuthorizationStatus) === AuthorizationStatus.Auth;

  return (
    <nav className="header__nav" role="navigation">
      <ul className="header__nav-list">
        <li className="header__nav-item user">
          {isAuth ?
            <div className="header__nav-profile">
              <div className="header__avatar-wrapper user__avatar-wrapper"></div>
              <span className="header__user-name user__name">{userEmail}</span>
            </div> :
            <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Login}>
              <div className="header__avatar-wrapper user__avatar-wrapper"></div>
              <span className="header__login">Sign in</span>
            </Link> }
        </li>
        {!isAuth ? '' :
          <li className="header__nav-item">
            <Link
              className="header__nav-link"
              to={AppRoute.Login}
              onClick={(evt) => {
                evt.preventDefault();
                dispatch(logoutAction());
              }}
            >
              <span className="header__signout">Sign out</span>
            </Link>
          </li> }
      </ul>
    </nav>
  );
}

export default HeaderNav;
