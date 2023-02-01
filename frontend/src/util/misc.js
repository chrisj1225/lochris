export const populateFormFromRsvp = (user, currentRsvp) => {
  let rsvpForm = {
    userId: user.id,
    attending: currentRsvp.attending,
  }

  if (user.plusOne) {
    rsvpForm.p1Attending = currentRsvp.p1Attending;
  }
  return rsvpForm;
};

export const mapModaltoButton = {
  'createRsvp': 'RSVP',
  'editRsvp': 'Update RSVP',
  'viewRsvp': 'Edit RSVP',
};
