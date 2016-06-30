const VerifyEmailFormSchema = {
  usernameOrEmail: {
    field: 'text',
    type: 'text',
    placeholder: 'Username or email',
    defaultValue: '',
    required: true,
    username: true,
    email: true,
  },
};

export default VerifyEmailFormSchema;
