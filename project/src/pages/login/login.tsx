import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { AppRoute, AuthorizationStatus, city } from '../../const';
import Layout from '../../components/layout/layout';
import LoginForm from '../../components/login-form/login-form';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import { changeCity } from '../../store/offers-process/offers-process';

function Login(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const isAuth = useAppSelector(getAuthorizationStatus) === AuthorizationStatus.Auth;

  const cities = Object.values(city);
  const randomCity = cities[Math.floor(Math.random() * cities.length)];

  useEffect(() => {
    if (isAuth) {
      navigate(AppRoute.Root);
    }
  }, [isAuth, navigate]);

  return (
    <Layout className="page--gray page--login">
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <LoginForm />
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link
                to={AppRoute.Root}
                className="locations__item-link"
                onClick={() => dispatch(changeCity(randomCity))}
                data-testid="login-city-link"
              >
                <span>{randomCity.name}</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </Layout>
  );
}

export default Login;
