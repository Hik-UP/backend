import { signup } from './signup.validator';
import { login } from './login.validator';
import { reset } from './reset.validator';
import { payload } from './payload.validator';

const authJOI = {
  signup,
  login,
  reset,
  payload
};

export { authJOI };
