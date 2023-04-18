import classNames from 'classnames';
import { ReactNode } from 'react';
import Header from '../header/header';

type LayoutProps = {
  className?: string;
  children: ReactNode;
};

function Layout({className, children}: LayoutProps): JSX.Element {
  return (
    <div className={classNames('page', className)}>
      <Header />
      {children}
    </div>
  );
}

export default Layout;
