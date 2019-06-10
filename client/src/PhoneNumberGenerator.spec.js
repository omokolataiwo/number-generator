import React from 'react';
import {render, cleanup, fireEvent, waitForElement} from '@testing-library/react';
import 'jest-dom/extend-expect';
import axiosMock from 'axios';
import PhoneNumberGenerator from './PhoneNumberGenerator';

afterEach(cleanup);

test('render component container', async () => {
     const {container} = render(<PhoneNumberGenerator />);
     expect(container.firstChild).toHaveClass('generate-form');
})
