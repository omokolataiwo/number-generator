import React from 'react';
import {
  render,
  cleanup,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import 'jest-dom/extend-expect';
import axiosMock from 'axios';
import PhoneNumberGenerator from './PhoneNumberGenerator';

afterEach(cleanup);

test('render component container', async () => {
  const {container} = render(<PhoneNumberGenerator />);
  expect(container.firstChild).toHaveClass('generate-form');
  expect(container).toMatchSnapshot();
});

test('call on generate number', async () => {
     const mockOnInputFieldChange = jest.fn(() => {});
     const {container} = render(<PhoneNumberGenerator onInputFieldChange={mockOnInputFieldChange} />);
  userEvent.type(container.querySelector('#numberCount'), 'hellow');
  expect(mockOnInputFieldChange).toHaveBeenCalled();
});
