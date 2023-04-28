/* istanbul ignore file */
import { crypto } from '../utils/cryptography.util';

const defaultSkin = {
  id: '',
  name: crypto.randomString(20),
  description: crypto.randomString(20),
  pictures: [`https://${crypto.randomString(20)}.com`],
  model: `https://${crypto.randomString(20)}.com`
};

const defaultUser = {
  id: '',
  username: crypto.randomString(20),
  email: `test@${crypto.randomString(8)}.com`,
  password: crypto.randomString(64),
  picture: `https://${crypto.randomString(20)}.com`,
  fcmToken: crypto.randomString(64),
  sex: 'M',
  age: Math.floor(Math.random() * (100 - 20) + 20),
  tall: Math.floor(Math.random() * (200 - 90) + 90),
  weight: Math.floor(Math.random() * (200 - 60) + 60),
  roles: [''],
  token: ''
};

const vars = {
  defaultSkin,
  defaultUser
};

export { vars };
