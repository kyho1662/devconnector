import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { login } from '../../actions/auth';

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const {email, password} = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name] : e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    login(email, password);
    }

  if(isAuthenticated) {
    return <Redirect to='/dashboard' />
  }

  return (
    <Fragment>
      <h1 className="large text-primary">로그인</h1>
      <p className="lead"><i className="fas fa-user"></i>등록한 이메일로 로그인</p>
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <input type="email" placeholder="이메일" name="email" 
           value={email} onChange={e => onChange(e)} required/>
          <small className="form-text"
            >This site uses Gravatar so if you want a profile image, use a
            Gravatar email</small
          >
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="비밀번호"
            name="password"
            minLength="6" 
            value={password} onChange={e => onChange(e)} required
          />
        </div>

        <input type="submit" className="btn btn-primary" value="로그인" />
      </form>
      <p className="my-1">
        계정이 없으십니까? <Link to="/register">회원가입</Link>
      </p>
    </Fragment>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);
