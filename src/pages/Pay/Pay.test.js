import PayPage from './index';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => jest.fn(),
}));

it('renders payment page', () => {
  const { container } = render(<PayPage />);
  expect(container).toMatchSnapshot();
});

it('renders credit card screen when clicked', () => {
  const route = '/pay';
  const { container } = render(
    <MemoryRouter initialEntries={[route]}>
      <PayPage />
    </MemoryRouter>
  );
  const ccButton = screen.getByText('Credit Card');
  fireEvent.click(ccButton);
  expect(container).toMatchSnapshot();
});

it('renders debit card screen when clicked', () => {
  const route = '/pay';
  const { container } = render(
    <MemoryRouter initialEntries={[route]}>
      <PayPage />
    </MemoryRouter>
  );
  const ccButton = screen.getByText('Debit Card');
  fireEvent.click(ccButton);
  expect(container).toMatchSnapshot();
});
it('renders net banking screen when clicked', () => {
  const route = '/pay';
  const { container } = render(
    <MemoryRouter initialEntries={[route]}>
      <PayPage />
    </MemoryRouter>
  );
  const ccButton = screen.getByText('Net Banking');
  fireEvent.click(ccButton);
  expect(container).toMatchSnapshot();
});

it('Can cancel the payment', async () => {
  const route = '/pay';
  const { container } = render(
    <MemoryRouter initialEntries={[route]}>
      <PayPage />
    </MemoryRouter>
  );
  const ccButton = screen.getByText('Credit Card');
  fireEvent.click(ccButton);
  const cancelButton = screen.getByText('Cancel');
  fireEvent.click(cancelButton);
  expect(container).toMatchSnapshot();
});
