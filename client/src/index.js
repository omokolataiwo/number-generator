import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api';
const MIN_NUMBER = -1;
const MAX_NUMBER = 1;
const ASC = 1;
const DESC = -1; 

class App extends React.Component {
  state = {
    phoneNumbers: [],
    number: undefined,
  };

  componentDidMount() {
    axios
      .get(`${BASE_URL}/phonenumber/fetch`)
      .then(({data: {phoneNumbers}}) => {
        this.setState({phoneNumbers});
      })
      .catch(error => {
        console.log(error);
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

  render() {
    const {phoneNumbers, number} = this.state;

    return (
      <div>
        <h1>Phone Number Generator</h1>
        <div className="control">
          <span>
            Sort <i onClick={() => this.sort(ASC)}>Asending</i>
            <i onClick={() => this.sort(DESC)}>Descending</i>
          </span>
          <span onClick={() => this.getPhoneNumber(MIN_NUMBER)}>Min</span>{' '}
          <span onClick={() => this.getPhoneNumber(MAX_NUMBER)}>Max</span>
        </div>
        <div>{number}</div>
        <div className="phone-numbers">
          {phoneNumbers.map(number => (
            <span key={Math.random()}>{number}</span>
          ))}
        </div>
      </div>
    );
  }
}

const rootElement = document.getElementById('app');
ReactDOM.render(<App />, rootElement);
