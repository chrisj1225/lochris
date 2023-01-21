import React from 'react';

import useSessions from '../../hooks/useSessions.hooks';
import useSessionErrors from '../../hooks/useSessionErrors.hooks';

const LoginView = () => {
  const {
    isAuthenticated,
    user,
    isLoggedIn,
    loginUser,
  } = useSessions();
  const { errors } = useSessionErrors();

  const [state, setState] = React.useState({
    email: '',
    password: '',
    errors: {},
  });

  const updateField = field => {
    return e => setState({
      ...state,
      [field]: e.currentTarget.value,
    })
  }

  const handleSubmit = e => {
    e.preventDefault();

    let user = {
      email: state.email,
      password: state.password,
    }

    loginUser(user);
  }

  const renderErrors = () => {
    <ul>
      {Object.keys(errors).map((errKey, i) => (
        <li key={i}>
          {errors[errKey]}
        </li>
      ))}
    </ul>
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <input type="text"
            value={state.email}
            onChange={updateField('email')}
            placeholder="Email"
          />
          <input type="password"
            value={state.password}
            onChange={updateField('password')}
            placeholder="password"
          />
          <input type="submit"
            value="Submit"
          />
          {renderErrors()}
        </div>
      </form>
    </div>
  )
}

export default LoginView;
