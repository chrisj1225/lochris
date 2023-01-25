import validator from 'validator';

export const validateRsvp = (data, plusOne) => {
  let errors = {};

  if (data.attending === null) {
    errors.attending = 'Please select attending status';
  }

  if (plusOne && data.p1Attending === null) {
    errors.p1Attending = 'Please select your plus one attending status';
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};