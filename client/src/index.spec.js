import React from 'react';
import {render, cleanup, waitForElement} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import 'jest-dom/extend-expect';
import axios from 'axios';

import App from './App';

jest.mock('axios');

const mockAxiosGet = type => {
  const types = {
    successfulNumbers: () => {
      axios.get.mockImplementation(() =>
        Promise.resolve({
          data: {phoneNumbers: ['1234', '9876']},
        }),
      );
    },
    failedNumbers: () => {},
  };

  types[type]();
};

afterEach(cleanup);

const mountAndWait = async selector => {
  const {getByTestId, container} = render(<App />);
  await waitForElement(() => document.querySelectorAll(selector));
  return {getByTestId, container};
};

test('render component container', async () => {
  mockAxiosGet('successfulNumbers');
  await mountAndWait('.number');
  const numberDom = document.querySelectorAll('.number')[0];
  expect(numberDom).toHaveTextContent('1234');
});

test('render component without getting phone numbers', async () => {
  axios.get.mockImplementation(
    () => new Promise((resolve, reject) => reject('Internal server error.')),
  );
  const {getByTestId} = await mountAndWait('.error');
  expect(getByTestId('error')).toHaveTextContent('Internal server error.');
});

test('input field change', () => {
  const {container} = render(<App />);

  const numberCount = container.querySelector('#numberCount');
  userEvent.type(numberCount, '300');
  expect(numberCount).toHaveValue('300');
});

test('sort ascending order', async () => {
  mockAxiosGet('successfulNumbers');
  const {container} = await mountAndWait('.number');
  userEvent.click(container.querySelector('#sort-asc'));
  const numberDom = document.querySelectorAll('.number')[0];
  expect(numberDom).toHaveTextContent('1234');
});

test('sort descending order', async () => {
  mockAxiosGet('successfulNumbers');
  const {container} = await mountAndWait('.number');
  userEvent.click(container.querySelector('#sort-desc'));
  const numberDom = document.querySelectorAll('.number')[0];
  expect(numberDom).toHaveTextContent('9876');
});

test('get maximum number', async () => {
  mockAxiosGet('successfulNumbers');
  const {container} = await mountAndWait('.number');

  userEvent.click(container.querySelector('#max-num-btn'));
  const numberDom = document.querySelector('#min-max-number');
  expect(numberDom).toHaveTextContent('9876');
});

test('get mininum number', async () => {
  mockAxiosGet('successfulNumbers');
  const {container} = await mountAndWait('.number');

  userEvent.click(container.querySelector('#min-num-btn'));
  const numberDom = document.querySelector('#min-max-number');
  expect(numberDom).toHaveTextContent('1234');
});

axios.post.mockImplementation(() =>
  Promise.resolve({
    data: {payload: {numbers: ['1234', '9876']}},
  }),
);

test('generate phone number with valid input', async () => {
  const {container} = await mountAndWait('.number');
  userEvent.type(container.querySelector('#numberCount'), '3');
  userEvent.click(container.querySelector('#generate-btn'));
  const numberDom = document.querySelectorAll('.number')[0];
  expect(numberDom).toHaveTextContent('1234');
});

test('server error for generate phone number with valid input', async () => {
  axios.post.mockImplementation(
    () => new Promise((resolve, reject) => reject('Internal server error.')),
  );

  const {container, getByTestId} = await mountAndWait('.error');

  userEvent.type(container.querySelector('#numberCount'), '3');
  userEvent.click(container.querySelector('#generate-btn'));
});
