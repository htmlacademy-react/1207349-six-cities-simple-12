import {Link} from 'react-router-dom';
import Header from '../../components/header/header';

function NotFound(): JSX.Element {
  return (
    <div className="page page--gray page--main">
      <Header />
      <main className="page__main page__main--index page__main--index-empty">
        <div className="cities">
          <div className="cities__places-container cities__places-container--empty container">
            <section className="cities__no-places">
              <div className="cities__status-wrapper tabs__content" style={{ background: 'none' }}>
                <b className="cities__status">404 Not Found</b>
                <Link className="cities__status-description button" to="/">Go to home 🏠</Link>
              </div>
            </section>
            <div className="cities__right-section"></div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default NotFound;