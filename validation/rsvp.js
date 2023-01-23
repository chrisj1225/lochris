import validator from './validator';
import { validText } from './valid-text';

export const validateRsvp = (data) => {
  let errors = {};

  if (validator.isEmpty(data.attending)) {
    errors.text = 'Attending field is required';
  }
  if (validator.isEmpty(data.appetizer)) {
    errors.text = 'Please select an appetizer option';
  }
  if (validator.isEmpty(data.attending)) {
    errors.text = 'Please select a main course option';
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};