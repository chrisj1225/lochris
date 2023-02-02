import { ReactComponent as AirplaneIcon } from '../assets/icons/airplane.svg';
import { ReactComponent as CarIcon } from '../assets/icons/car.svg';
import { ReactComponent as FoodIcon } from '../assets/icons/food.svg';
import { ReactComponent as HotelIcon } from '../assets/icons/hotel.svg';
import { ReactComponent as TrainIcon } from '../assets/icons/train.svg';

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
    case '/about':
      return '#d1cfe2';
    case '/moments':
      return '#daeaf6';
    case '/travel':
      return '#9cadce';
    case '/schedule':
      return '#fce1e4';
    case '/registry':
      return '#fcf4dd';
    case '/music':
      return '#c3ebd8';
    default:
      return 'white';
  }
};

export const travelIconMap = {
  airplane: <AirplaneIcon/>,
  car: <CarIcon/>,
  food: <FoodIcon/>,
  hotel: <HotelIcon/>,
  train: <TrainIcon/>,
};

export const mapTypeToTravelIcon = (type) => {
  return travelIconMap[type];
};
