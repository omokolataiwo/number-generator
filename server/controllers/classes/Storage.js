import {promises as fs} from 'fs';

const FILENAME = './phonenumber.txt';

export default class Storage {
  async write(numbers) {
    await fs.writeFile(FILENAME, numbers);
  }

  async read() {
    try {
      const phoneNumbers = await fs.readFile(FILENAME, 'utf8');
      return phoneNumbers;
    } catch (error) {
      this.write('');
      return '';
    }
  }
}
