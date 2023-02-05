import React from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';

import { Modal, RadioButton } from '../atoms';

import { useRsvps, useSessions } from '../../hooks/'
import { mapModaltoButton, populateFormFromRsvp } from '../../util/misc';
import { device, ActionButton, ContentWrapper, GeneralText, GeneralTextLarge, Title, VerticalBlackLine, ImagePlaceholder } from '../../styles/ViewStyles';

const Landing = () => {
  const { user } = useSessions();
  const {
    rsvpFetched,
    currentRsvp,
    createRsvp,
    updateRsvp,
  } = useRsvps(user.id);
  const location = useLocation();

  const [activeModal, setActiveModal] = React.useState(null);

  const [rsvpForm, setRsvpForm] = React.useState({
    userId: user.id,
    attending: null,
  });

  React.useEffect(() => {
    if (currentRsvp) {
      setRsvpForm(populateFormFromRsvp(user, currentRsvp));
    }
  }, [currentRsvp]);

  const handleCreateRsvp = e => {
    e.preventDefault();
    createRsvp(rsvpForm, () => {
      setActiveModal('confirmation');
    });
  };

  const handleUpdateRsvp = e => {
    e.preventDefault();
    updateRsvp(currentRsvp._id, rsvpForm, () => {
      setActiveModal('confirmation');
    });
  };

  const rsvpFormBody = () => <RsvpFormWrapper>
    <GeneralText>Will you be able to join us on XX/XX/2023?</GeneralText>
    <div>
      <RadioButton id="accept"
        text="Joyfully Accept" 
        onChange={(e) => setRsvpForm({
          ...rsvpForm,
          attending: e.target.value,
        })}
        name="attending"
        checked={rsvpForm.attending === 'y'}
        value={'y'}
      />
      <RadioButton id="decline"
        text="Regretfully Decline" 
        onChange={(e) => setRsvpForm({
          ...rsvpForm,
          attending: e.target.value,
        })}
        name="attending"
        checked={rsvpForm.attending === 'n'}
        value={'n'}
      />
    </div>
    <br/>
    {user.plusOne && <>
      <GeneralText>{`Will ${user.plusOne} be able to join us?`}</GeneralText>
      <div>
        <RadioButton id="p1accept"
          text="Joyfully Accept" 
          onChange={(e) => setRsvpForm({
            ...rsvpForm,
            p1Attending: e.target.value,
          })}
          name="p1attending"
          checked={rsvpForm.p1Attending === 'y'}
          value={'y'}
        />
        <RadioButton id="p1decline"
          text="Regretfully Decline" 
          onChange={(e) => setRsvpForm({
            ...rsvpForm,
            p1Attending: e.target.value,
          })}
          name="p1attending"
          checked={rsvpForm.p1Attending === 'n'}
          value={'n'}
        />
      </div>
    </>}
  </RsvpFormWrapper>

  const modalObj = {
    createRsvp: (
      <RsvpModal>
        <GeneralText>Welcome {user.firstName} {user.lastName}!</GeneralText>
        <GeneralText>You have not yet RSVPed</GeneralText>
        {rsvpFormBody()}
        <ConfirmButton onClick={handleCreateRsvp}>{mapModaltoButton[activeModal]}</ConfirmButton>
      </RsvpModal>
    ),
    editRsvp: (
      <RsvpModal>
        <GeneralText>Welcome Back {user.firstName} {user.lastName}!</GeneralText>
        {rsvpFormBody()}
        <ConfirmButton onClick={handleUpdateRsvp}>{mapModaltoButton[activeModal]}</ConfirmButton>
      </RsvpModal>
    ),
    viewRsvp: (
      <RsvpModal>
        <GeneralText>Welcome Back {user.firstName} {user.lastName}!</GeneralText>
        <GeneralText>Thank you for RSVPing :)</GeneralText>
        <br/>
        <GeneralText>Your Response:</GeneralText>
        <GeneralText>
          {`You (${user.firstName} ${user.lastName}) will ${currentRsvp.attending === 'y' ? 'attend' : 'not attend'}`}
        </GeneralText>
        {user.plusOne && <GeneralText>
          {`${user.plusOne} will ${currentRsvp.attending === 'y' ? 'attend' : 'not attend'}`}
        </GeneralText>}
        <ConfirmButton onClick={() => setActiveModal('editRsvp')}>Edit Rsvp</ConfirmButton>
      </RsvpModal>
    ),
    confirmation: (
      <RsvpModal>
        <GeneralText>Thank you for submitting your RSVP :)</GeneralText>
        <ConfirmButton onClick={() => setActiveModal(null)}>Close</ConfirmButton>
      </RsvpModal>
    )
  };

  const rsvpBtn = () => {
    if (!rsvpFetched) {
      return (
        <p>Loading...</p>
      );
    } else {
      if (!Object.keys(currentRsvp).length) {
        return (
          <RsvpButton onClick={() => setActiveModal('createRsvp')}>
            RSVP Now
          </RsvpButton>
        );
      } else {
        return (
          <RsvpButton onClick={() => setActiveModal('viewRsvp')}>
            View RSVP
          </RsvpButton>
        );
      }
    }
  };

  return (
    <ContentWrapper path={location.pathname}>
      {activeModal && (
        <Modal
          content={modalObj[activeModal]}
          closeModal={() => setActiveModal(null)}
        />
      )}
      <ImagePlaceholder/>
      <InfoSection>
        <DateSection>
          <Title>XXXXXXXX</Title>
          <Title>XX, 2023</Title>
        </DateSection>
        <VerticalBlackLine />
        <DateSection>
          <Title>New York, NY</Title>
        </DateSection>
      </InfoSection>
      {rsvpBtn()}
      <Title>Lois & Chris' Wedding</Title>
      <GeneralTextLarge>XX.XX.2023</GeneralTextLarge>
      <GeneralTextLarge>5:00PM - 11:00PM</GeneralTextLarge>
      <GeneralText>Venue Name</GeneralText>
      <GeneralText>999 South St, New York, NY, 10030</GeneralText>
      <GeneralText>Please RSVP by XXXXXXXX XXth, 2023!</GeneralText>
    </ContentWrapper>
  );
};

const RsvpModal = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 500px;
  height: 300px;
  padding: 24px;

  @media ${device.mobile} {
    width: 300px;
  }
  
  @media ${device.tablet} {
    width: 450px;
  }
`;

const RsvpFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const RsvpButton = styled(ActionButton)`
  padding: 14px 14px;
  background-color: black;
  color: white;
  margin-bottom: 60px;

  &:hover {
    background-color: #212529;
  }
`;

const ConfirmButton = styled(ActionButton)`
  padding: 6px 10px;
  margin-top: auto;
`;

const InfoSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 48px 0px 24px 0px;

  @media ${device.mobile} {
    flex-direction: column;
  }
`;

const DateSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 220px;
`;

export default Landing;