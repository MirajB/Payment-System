import HomePage from './index';
import { render } from '@testing-library/react';

it('renders home page', () => {
  const { container } = render(<HomePage />);
  expect(container).toMatchSnapshot();
});
