import Storage from './classes/Storage';

export default class PhoneNumber {
  static async fetch(req, res) {
    const storage = new Storage();

    try {
      let phoneNumbers = await storage.read();
      phoneNumbers = phoneNumbers === '' ? [] : phoneNumbers.split(',');
      return res.status(200).json({phoneNumbers});
    } catch (error) {
      console.log(error);
      return res.status(501).send('Internal server error');
    }
  }

  static async generate(req, res) {
    let phoneNumberCount = req.params.number;
    const storage = new Storage();
    let phoneNumbers = await storage.read();

    phoneNumbers = phoneNumbers.length ? phoneNumbers.split(',') : [];

    if (phoneNumbers.length > 1000) {
      return res.status(406).json({
        status: 'error',
        message: 'Maximum phone number size reached.',
      });
    }
    const numbers = [];

    while (phoneNumberCount-- > 0) {
      const number = Math.ceil(10000000000 + Math.random() * 90000000000);

      if (phoneNumbers.includes(number)) {
        phoneNumbersCount++;
      } else {
        phoneNumbers.unshift(number);
        numbers.push(number);
      }
    }

    try {
      await storage.write(phoneNumbers);
      return res.status(201).json({
        status: 'successful',
        payload: {numbers},
      });
    } catch (error) {
      console.log(error);
      return res.status(501).send('Internal server error');
    }
  }
}
