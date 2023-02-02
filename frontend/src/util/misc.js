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

export const getPageColorFromPath = (pathName) => {
  switch (pathName) {
    case '/':
      return 'white';
    case '/schedule':
      return '#fce1e4';
    case '/registry':
      return '#fcf4dd';
    case '/travel':
      return '#9cadce';
    case '/about':
      return '#d1cfe2';
    case '/moments':
      return '#daeaf6';
    case '/music':
      return '#c3ebd8';
    default:
      return 'white';
  }
}