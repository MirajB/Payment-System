import PayEMIForm from './PayEMIForm';
import { render, screen, fireEvent } from '@testing-library/react';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

it('renders pay emi form', async () => {
  const { container } = render(<PayEMIForm />);
  const getDetailsButton = screen.getByText('Get Details');
  fireEvent.click(getDetailsButton);
  expect(container).toMatchSnapshot();
});
