import { signup } from './signup.validator';
import { login } from './login.validator';
import { reset } from './reset.validator';
import { resend } from './resend.validator';
import { payload } from './payload.validator';

const authJOI = {
  signup,
  login,
  reset,
  resend,
  payload
};

export { authJOI };
