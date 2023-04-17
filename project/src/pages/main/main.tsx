import classNames from 'classnames';
import { useAppSelector } from '../../hooks';
import Tabs from '../../components/tabs/tabs';
import OffersMainEmpty from '../../components/offers-main-empty/offers-main-empty';
import OffersMain from '../../components/offers-main/offers-main';
import Layout from '../../components/layout/layout';

function Main(): JSX.Element {
  const offers = useAppSelector((state) => state.offers.filter((offer) => offer.city.name === state.city.name));
  const selectedCity = useAppSelector((state) => state.city);

  return (
    <Layout className="page page--gray page--main">
      <main className={classNames('page__main page__main--index', {'page__main--index-empty': offers.length === 0})}>
        <Tabs />
        {offers.length > 0
          ? <OffersMain offers={offers} selectedCity={selectedCity} />
          : <OffersMainEmpty selectedCity={selectedCity} /> }
      </main>
    </Layout>
  );
}

export default Main;
