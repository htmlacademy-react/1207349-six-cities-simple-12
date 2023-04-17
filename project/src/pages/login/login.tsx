import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { AppRoute, AuthorizationStatus } from '../../const';
import Layout from '../../components/layout/layout';
import LoginForm from '../../components/login-form/login-form';

function Login(): JSX.Element {
  const navigate = useNavigate();

  const selectedCity = useAppSelector((state) => state.city);
  const isAuth = useAppSelector((state) => state.authorizationStatus === AuthorizationStatus.Auth);

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
              <Link to={AppRoute.Root} className="locations__item-link">
                <span>{selectedCity.name}</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </Layout>
  );
}

export default Login;
