import React from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';

import { Modal, RadioButton } from '../atoms';

import { useRsvps, useSessions }from '../../hooks/'
import { mapModaltoButton, populateFormFromRsvp } from '../../util/misc';
import { ActionButton, ContentWrapper, Title } from '../../styles/ViewStyles';

const Landing = () => {
  const { user } = useSessions();
  const {
    rsvpFetched,
    currentRsvp,
    createRsvp,
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
    createRsvp(rsvpForm);
  };

  const rsvpFormBody = () => <RsvpFormWrapper>
    <RsvpFormText>Will you be able to join us on XX/XX/2023?</RsvpFormText>
    <div>
      <RadioButton id="accept"
        text="Joyfully Accept" 
        onChange={(e) => setRsvpForm({
          ...rsvpForm,
          attending: e.target.value,
        })}
        name="attending"
        checked={rsvpForm.attending === true}
        value={true}
      />
      <RadioButton id="decline"
        text="Regretfully Decline" 
        onChange={(e) => setRsvpForm({
          ...rsvpForm,
          attending: e.target.value,
        })}
        name="attending"
        checked={rsvpForm.attending === false}
        value={false}
      />
    </div>
    <br/>
    {user.plusOne && <>
      <RsvpFormText>{`Will ${user.plusOne} be able to join us?`}</RsvpFormText>
      <div>
        <RadioButton id="p1accept"
          text="Joyfully Accept" 
          onChange={(e) => setRsvpForm({
            ...rsvpForm,
            p1Attending: e.target.value,
          })}
          name="p1attending"
          checked={rsvpForm.p1Attending === true}
          value={true}
        />
        <RadioButton id="p1decline"
          text="Regretfully Decline" 
          onChange={(e) => setRsvpForm({
            ...rsvpForm,
            p1Attending: e.target.value,
          })}
          name="p1attending"
          checked={rsvpForm.p1Attending === false}
          value={false}
        />
      </div>
    </>}
  </RsvpFormWrapper>

  const modalObj = {
    createRsvp: (
      <RsvpModal>
        <RsvpFormText>Welcome {user.firstName} {user.lastName}!</RsvpFormText>
        <RsvpFormText>You have not yet RSVPed</RsvpFormText>
        {rsvpFormBody()}
        <ConfirmButton onClick={handleCreateRsvp}>{mapModaltoButton[activeModal]}</ConfirmButton>
      </RsvpModal>
    ),
    editRsvp: (
      <RsvpModal>
        <RsvpFormText>Welcome Back {user.firstName} {user.lastName}!</RsvpFormText>
        {rsvpFormBody()}
        <ConfirmButton onClick={handleCreateRsvp}>{mapModaltoButton[activeModal]}</ConfirmButton>
      </RsvpModal>
    ),
    viewRsvp: (
      <RsvpModal>
        <RsvpFormText>Welcome Back {user.firstName} {user.lastName}!</RsvpFormText>
        <RsvpFormText>Thank you for RSVPing :)</RsvpFormText>
        <br/>
        <RsvpFormText>Your Response:</RsvpFormText>
        <RsvpFormText>
          {`You (${user.firstName} ${user.lastName}) will ${currentRsvp.attending ? 'attend' : 'not attend'}`}
        </RsvpFormText>
        {user.plusOne && <RsvpFormText>
          {`${user.plusOne} will ${currentRsvp.attending ? 'attend' : 'not attend'}`}
        </RsvpFormText>}
        <ConfirmButton onClick={() => setActiveModal('editRsvp')}>Edit Rsvp</ConfirmButton>
      </RsvpModal>
    )
  }

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

  console.log({ user, rsvpFetched, currentRsvp, rsvpForm });
  return (
    <ContentWrapper path={location.pathname}>
      {activeModal && (
        <Modal
          content={modalObj[activeModal]}
          closeModal={() => setActiveModal(false)}
        />
      )}
      <Title>This is the landing page</Title>
      {rsvpBtn()}
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
`;

const RsvpFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const RsvpFormText = styled.p`
  font-size: 15px;
  line-height: 19px;
  margin: 0px 0px 8px 0px;
`;

const RsvpButton = styled(ActionButton)`
  padding: 14px 14px;
  background-color: black;
  color: white;

  &:hover {
    background-color: #212529;
  }
`;

const ConfirmButton = styled(ActionButton)`
  padding: 6px 10px;
  margin-top: auto;
`;

export default Landing;