const inputPattern = {
  email: {
    value: /^\S+@\S+$/i,
    message: 'Invalid email address',
  },
  password: {
    value: /^(?=.*[a-z])(?=.*\d)[A-Za-z\d]{8,}$/i,
    message: 'Minimum 8 characters, at least ONE lowercase letter and ONE number',
  },
  code: {
    value: /^[0-9]+$/,
    message: 'Invalid verification code',
  },
};

export default inputPattern;
