import React from 'react';
import axios from 'axios';

import PhoneNumberGenerator from './PhoneNumberGenerator';

const BASE_URL = 'http://localhost:3000/api';
const MIN_NUMBER = -1;
const MAX_NUMBER = 1;
const ASC = 1;
const DESC = -1;

class App extends React.Component {
  state = {
    phoneNumbers: [],
    number: undefined,
    generateForm: {},
  };

  componentDidMount() {
    axios
      .get(`${BASE_URL}/phonenumber/fetch`)
      .then(({data: {phoneNumbers}}) => {
        this.setState({phoneNumbers});
      })
      .catch(error => {
        this.setState({generateForm: {error: error}});
      });
  }
  getPhoneNumber(order) {
    let {phoneNumbers} = this.state;
    phoneNumbers = [].concat(phoneNumbers);
    phoneNumbers = phoneNumbers.sort((a, b) => (a > b ? 1 : -1));

    const number =
      order === MIN_NUMBER
        ? phoneNumbers[0]
        : phoneNumbers[phoneNumbers.length - 1];
    this.setState({number});
  }

  sort(order) {
    const asc = (a, b) => (a > b ? 1 : -1);
    const desc = (a, b) => (a > b ? -1 : 1);
    let {phoneNumbers} = this.state;

    phoneNumbers = [].concat(phoneNumbers);
    order === ASC ? phoneNumbers.sort(asc) : phoneNumbers.sort(desc);
    this.setState({phoneNumbers});
  }

  inputFieldChange = event => {
    const {name, value} = event.target;
    this.setState({generateForm: {[name]: value}});
  };

  generateNumber = () => {
    let {
      generateForm: {numberCount},
    } = this.state;
    numberCount = parseInt(numberCount);

    if (isNaN(numberCount) || numberCount < 1) {
      this.setState({generateForm: {error: 'Enter a valid integer'}});
      return;
    }
    axios
      .post(`${BASE_URL}/phonenumber/generate`, {number: numberCount})
      .then(({data: {payload: {numbers}}}) => {
        numbers = numbers || [];
        this.setState(prvState => ({
          phoneNumbers: [...prvState.phoneNumbers, ...numbers],
        }));
      })
      .catch(error => {
      });
  };

  render() {
    const {
      phoneNumbers,
      number,
      generateForm: {error: formError},
    } = this.state;

    return (
      <div>
        <h1>Phone Number Generator</h1>
        <PhoneNumberGenerator
          onInputFieldChange={this.inputFieldChange}
          onGenerateNumber={this.generateNumber}
          error={formError}
        />
        <div className="control">
          <span className="sort">
            Sort{' '}
            <i id="sort-asc" onClick={() => this.sort(ASC)}>
              Asending
            </i>
            <i id="sort-desc" onClick={() => this.sort(DESC)}>
              Descending
            </i>
          </span>
          <span
            id="min-num-btn"
            className="min-max-btn"
            onClick={() => this.getPhoneNumber(MIN_NUMBER)}>
            Min
          </span>{' '}
          <span
            id="max-num-btn"
            className="min-max-btn"
            onClick={() => this.getPhoneNumber(MAX_NUMBER)}>
            Max
          </span>
        </div>
        <div id="min-max-number">{number}</div>
        <div className="phone-numbers" data-testid="phoneNumbers">
          {phoneNumbers.map(number => (
            <span data-testid="number" className="number" key={Math.random()}>
              {number}
            </span>
          ))}
        </div>
      </div>
    );
  }
}

export default App;
