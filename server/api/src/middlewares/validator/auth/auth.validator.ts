import { signup } from './signup.validator';
import { login } from './login.validator';
import { payload } from './payload.validator';

const authJOI = {
  signup,
  login,
  payload
};

export { authJOI };
