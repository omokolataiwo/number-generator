import React from 'react';
import {render, cleanup} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import 'jest-dom/extend-expect';
import axios from 'axios';

import App from './App';

jest.mock('axios');
axios.get.mockImplementation(() =>
  Promise.resolve({
    data: {phoneNumbers: ['1234']},
  }),
);

axios.post.mockImplementation(() =>
  Promise.resolve({
    data: {payload: {numbers: ['1234']}},
  }),
);

afterEach(cleanup);

test('render component container', async () => {
  const {container} = render(<App />);
});

test('render component without getting phone numbers', () => {
  const {container} = render(<App />);
  axios.get.mockImplementation(
    () => new Promise((resolve, reject) => reject()),
  );
});

test('input field change', () => {
  const {container} = render(<App />);
  userEvent.type(container.querySelector('#numberCount'), 'Hello');
});

test('sort ascending order', () => {
  const {container} = render(<App />);
  userEvent.click(container.querySelector('#sort-asc'));
});

test('sort descending order', () => {
  const {container} = render(<App />);
  userEvent.click(container.querySelector('#sort-desc'));
});

test('get maximum number', () => {
  const {container} = render(<App />);
  userEvent.click(container.querySelector('#max-num-btn'));
});

test('get mininum number', () => {
  const {container} = render(<App />);
  userEvent.click(container.querySelector('#min-num-btn'));
});

test('generate phone number with invalid input', () => {
  const {container} = render(<App />);
  userEvent.click(container.querySelector('#generate-btn'));
});

test('generate phone number with valid input', () => {
  const {container} = render(<App />);
  userEvent.type(container.querySelector('#numberCount'), '3');
  userEvent.click(container.querySelector('#generate-btn'));
});

test('generate phone number with valid input', () => {
  const {container} = render(<App />);

  axios.post.mockImplementation(
    () => new Promise((resolve, reject) => reject()),
  );
  userEvent.type(container.querySelector('#numberCount'), '3');
  userEvent.click(container.querySelector('#generate-btn'));
});
