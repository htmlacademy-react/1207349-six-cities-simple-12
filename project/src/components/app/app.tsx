import { Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../const';
import Main from '../../pages/main/main';
import Login from '../../pages/login/login';
import Room from '../../pages/room/room';
import NotFound from '../../pages/not-found/not-found';
import Loading from '../../pages/loading/loading';
import { useAppSelector } from '../../hooks';
import HistoryRouter from '../history-route/history-route';
import browserHistory from '../../browser-history';
import { getOffersDataLoadingStatus } from '../../store/offers-data/selectors';

function App(): JSX.Element {
  const isOffersDataLoading = useAppSelector(getOffersDataLoadingStatus);

  if (isOffersDataLoading) {
    return (
      <Loading />
    );
  }

  return (
    <HistoryRouter history={browserHistory}>
      <Routes>
        <Route
          path={AppRoute.Root}
          element={
            <Main />
          }
        />
        <Route
          path={AppRoute.Login}
          element={<Login />}
        />
        <Route
          path={AppRoute.Offer}
          element={
            <Room />
          }
        />
        <Route
          path='*'
          element={<NotFound />}
        />
      </Routes>
    </HistoryRouter>
  );
}

export default App;
