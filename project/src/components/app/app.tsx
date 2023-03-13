import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {AppRoute} from '../../const';
import Main from '../../pages/main/main';
import Login from '../../pages/login/login';
import Room from '../../pages/room/room';
import NotFound from '../../pages/not-found/not-found';

type AppSceenProps = {
  offersDisplayCount: number;
}

function App({offersDisplayCount}: AppSceenProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path = {AppRoute.Root}
          element = {<Main offersDisplayCount = {offersDisplayCount} />}
        />
        <Route
          path = {AppRoute.Login}
          element = {<Login />}
        />
        <Route
          path = {AppRoute.Offer}
          element = {<Room />}
        />
        <Route
          path = '*'
          element = {<NotFound />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
