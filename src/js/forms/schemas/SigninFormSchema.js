const SigninFormSchema = {
  username: {
    field: 'text',
    type: 'text',
    placeholder: 'Username',
    defaultValue: '',
    required: true,
  },
  password: {
    field: 'text',
    type: 'password',
    placeholder: 'Password',
    defaultValue: '',
    required: true,
  },
};

export default SigninFormSchema;
