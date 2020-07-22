import React, { Fragment }from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const authLinks = (
    <ul>
      <li><a onClick={logout} href='#!'>
        <i className="fas fa-sign-out-alt"></i>{' '}
        <span className="hide-sm">로그아웃</span></a>
      </li>
    </ul>
  );
  const guestLinks = (
    <ul>
      <li><a href='#!'>개발자</a></li>
      <li><Link to='/register'>회원가입</Link></li>
      <li><Link to='/login'>로그인</Link></li>
    </ul>
  );
  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/"><i className="fas fa-code"></i> DevConnector</Link>
      </h1>
      { !loading && (<Fragment>{ isAuthenticated ? authLinks : guestLinks }</Fragment>)}
    </nav>
  )
}

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, { logout })(Navbar);
