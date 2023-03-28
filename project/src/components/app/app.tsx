import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../const';
import { Offer } from '../../types/offer';
import { City } from '../../types/city';
import { Review } from '../../types/review';
import Main from '../../pages/main/main';
import Login from '../../pages/login/login';
import Room from '../../pages/room/room';
import NotFound from '../../pages/not-found/not-found';

type AppSceenProps = {
  offersDisplayCount: number;
  offers: Offer[];
  cities: City[];
  reviews: Review[];
}

function App({offersDisplayCount, offers, cities, reviews}: AppSceenProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Root}
          element={
            <Main
              offersDisplayCount={offersDisplayCount}
              offers={offers}
              cities={cities}
            />
          }
        />
        <Route
          path={AppRoute.Login}
          element={<Login />}
        />
        <Route
          path={AppRoute.Offer}
          element={<Room reviews={reviews} />}
        />
        <Route
          path='*'
          element={<NotFound />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
