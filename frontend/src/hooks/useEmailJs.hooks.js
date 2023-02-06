import React from 'react';
import emailjs from '@emailjs/browser';

import { emailJSKeys } from '../config/keys';

const useEmailJs = (selectedUserIds, userIdMap) => {
  const handleSendTestEmail = () => {
    const selectedUsers = selectedUserIds.map(id => userIdMap[id]);
    selectedUsers.forEach((user) => {
      const templateParams = {
        email: user.email,
        to_firstName: user.firstName,
        to_lastName: user.lastName,
        reply_to: 'chrisj1225@gmail.com',
        message: 'You are cordially invited!',
      }

      if (user.plusOne) {
        templateParams.to_plusOne_name = user.plusOne;

        emailjs.send(
          emailJSKeys.serviceId,
          emailJSKeys.testP1TemplateId,
          templateParams,
          emailJSKeys.publicKey
        )
        .then((res) => {
          console.log({ status: res.status, text: res.text, msg: 'Success!', templateParams });

        })
        .catch((err) => console.log({ err, status: 'Failed' }));
      } else {
        emailjs.send(
          emailJSKeys.serviceId,
          emailJSKeys.testTemplateId,
          templateParams,
          emailJSKeys.publicKey
        )
        .then((res) => {
          console.log({ status: res.status, text: res.text, msg: 'Success!', templateParams });
        })
        .catch((err) => console.log({ err, status: 'Failed' }));
      }
    })
  };

  return {
    handleSendTestEmail,

  };
};

export default useEmailJs;