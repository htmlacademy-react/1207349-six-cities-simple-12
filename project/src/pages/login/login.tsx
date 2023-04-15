import Header from '../../components/header/header';
import { FormEvent, useState, ChangeEvent, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { loginAction } from '../../store/api-actions';
import { AuthData } from '../../types/auth-data';
import { AppRoute, AuthorizationStatus } from '../../const';

function Login(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const selectedCity = useAppSelector((state) => state.city);
  const isAuth = useAppSelector((state) => state.authorizationStatus === AuthorizationStatus.Auth);

  const [formData, setFormData] = useState<AuthData>({
    login: '',
    password: '',
  });

  useEffect(() => {
    if (isAuth) {
      navigate(AppRoute.Root);
    }
  }, [isAuth, navigate]);

  const fieldChangeHandler = (evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = evt.target;

    if (name === 'password' && !/^(?=.*[a-zA-Z])(?=.*\d)(?=.{1,}$)/.test(value)) {
      evt.target.setCustomValidity('Пароль должен состоять минимум из одной буквы и цифры.');
    } else {
      evt.target.setCustomValidity('');
    }

    setFormData({...formData, [name]: value});
  };

  const formSubmitHandler = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    dispatch(loginAction(formData));
  };

  return (
    <div className="page page--gray page--login">
      <Header />
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form className="login__form form" action="" onSubmit={formSubmitHandler}>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  onChange={fieldChangeHandler}
                  value={formData.login}
                  className="login__input form__input"
                  type="email"
                  name="login"
                  placeholder="Email"
                  required
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  onChange={fieldChangeHandler}
                  value={formData.password}
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  minLength={2}
                  required
                />
              </div>
              <button className="login__submit form__submit button" type="submit">Sign in</button>
            </form>
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
    </div>
  );
}

export default Login;
