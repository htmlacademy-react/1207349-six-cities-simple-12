import { render, screen } from '@testing-library/react';
import { Host } from '../../types/offer';
import RoomHost from './room-host';

const host: Host = {
  id: 1,
  avatarUrl: 'img-src',
  name: 'Vasya',
  isPro: true,
};

const fakeRoomHost = (<RoomHost host={host} description='description-string' />);

describe('Component: RoomHost', () => {
  it('should render correctly', () => {
    render(fakeRoomHost);

    expect(screen.getByRole('img')).toBeInTheDocument();
    expect(screen.getByText('Vasya')).toBeInTheDocument();
    expect(screen.getByText('description-string')).toBeInTheDocument();
  });

  it('should render correctly when Pro host', () => {
    host.isPro = true;

    render(fakeRoomHost);

    expect(screen.getByText('Pro')).toBeInTheDocument();
  });

  it('should render correctly when no Pro host', () => {
    host.isPro = false;

    render(fakeRoomHost);

    expect(screen.queryByText('Pro')).not.toBeInTheDocument();
  });
});
