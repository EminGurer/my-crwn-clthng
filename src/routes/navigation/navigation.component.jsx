import { Fragment, useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { signOutUser } from '../../utils/firebase/firebase.utils';

import { UserContext } from '../../contexts/user.context';

import { ReactComponent as Logo } from '../../assets/crown.svg';
import './navigation.styles.scss';
const Navigation = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  console.log('current user in navigation is', currentUser);
  const signOutHandler = async () => {
    await signOutUser();
    setCurrentUser(null);
  };
  return (
    <Fragment>
      <div className='navigation'>
        <Link className='nav-logo-container' to='/'>
          <Logo />
        </Link>
        <div className='nav-links-container'>
          <Link className='nav-link' to='/shop'>
            SHOP
          </Link>
          {currentUser ? (
            <span className='nav-link' onClick={signOutHandler}>
              Sign Out
            </span>
          ) : (
            <Link className='nav-link' to='/auth'>
              SIGN IN
            </Link>
          )}
        </div>
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
