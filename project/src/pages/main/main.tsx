import classNames from 'classnames';
import { useAppSelector } from '../../hooks';
import Tabs from '../../components/tabs/tabs';
import OffersMainEmpty from '../../components/offers-main-empty/offers-main-empty';
import OffersMain from '../../components/offers-main/offers-main';
import Layout from '../../components/layout/layout';
import { getCity } from '../../store/offers-process/selectors';
import { getOffers } from '../../store/offers-data/selectors';

function Main(): JSX.Element {
  const selectedCity = useAppSelector(getCity);
  const offers = useAppSelector(getOffers).filter((offer) => offer.city.name === selectedCity.name);

  return (
    <Layout className="page--gray page--main">
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
