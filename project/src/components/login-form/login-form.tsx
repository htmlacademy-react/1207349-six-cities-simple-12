import { FormEvent, useState, ChangeEvent } from 'react';
import { useAppDispatch } from '../../hooks';
import { loginAction } from '../../store/api-actions';
import { AuthData } from '../../types/auth-data';

function LoginForm(): JSX.Element {
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState<AuthData>({
    login: '',
    password: '',
  });

  const fieldChangeHandler = (evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = evt.target;

    if (name === 'password' && !/^(?=.*[a-zA-Z])(?=.*\d)(?=.{1,}$)/.test(value)) {
      evt.target.setCustomValidity('The password must consist of at least one letter and a number.');
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
  );
}

export default LoginForm;
