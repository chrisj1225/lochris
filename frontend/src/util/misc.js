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
      return '#d4afb9';
    case '/registry':
      return '#d1cfe2';
    case '/travel':
      return '#9cadce';
    case '/about':
      return '#7ec4cf';
    case '/moments':
      return '#daeaf6';
    case '/music':
      return '#c3ebd8';
    default:
      return 'white';
  }
}