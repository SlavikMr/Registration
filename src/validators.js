export const getError = (fieldName, value, validators = [], fields) => {
  for (const validator of validators) {
    const error = validator(fieldName, value);
    if (error) return error;
  }
  if (fieldName === 'password2' && !fields.password1.error) {
    return value !== fields.password1.value ? 'Passwords are different' : '';
  }
};

export const requiredValidator = (fieldName, value) => {
  return !value ? 'This field is required.' : '';
}

export const minLengthValidator = (minLength) => (fieldName, value) => {
  if (value && value.length < minLength) {
    return `Min length is ${minLength} symbols`;
  }
  return null;
};

export const firstCharacterValidator = (regExp) => (fieldName, value) => {
  return !value.match(regExp) ? 'The value must start with a-z or A-Z' : '';
}

export const usernameValidator = (regExp) => (fieldName, value) => {
  return !value.match(regExp) ? 'The value must contain a-z or A-Z or 0-9' : '';
}

export const passwordValidator = (regExp) => (fieldName, value) => {
  return !value.match(regExp) ? `The value must contain at least one uppercase, one lowercase letter, 
    digit and | , \\ , / , ! , -` : '';
}
