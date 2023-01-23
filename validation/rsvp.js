import validator from './validator';

export const validateRsvp = (data) => {
  let errors = {};

  if (validator.isEmpty(data.attending)) {
    errors.attending = 'Attending field is required';
  }
  if (validator.isEmpty(data.appetizer)) {
    errors.appetizer = 'Please select an appetizer option';
  }
  if (validator.isEmpty(data.attending)) {
    errors.mainCourse = 'Please select a main course option';
  }

  if (data.p1Attending && validator.isEmpty(data.p1Appetizer)) {
    errors.p1Appetizer = 'Please select an appetizer option for your plus one';
  }
  if (data.p1Attending && validator.isEmpty(data.p1MainCourse)) {
    errors.p1MainCourse = 'Please select a main course option for your plus one';
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};