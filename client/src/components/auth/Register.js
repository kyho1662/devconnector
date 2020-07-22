import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';


const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name:'',
    email: '',
    password: '',
    password2: ''
  });

  const {name, email, password, password2} = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name] : e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    if(password !== password2) {
      setAlert('Passwords do not match', 'danger');
    } else {
      register({ name, email, password });
    }
  }
  
  if(isAuthenticated) {
      return <Redirect to='/dashboard' />
  }

  return (
    <Fragment>
      <h1 className="large text-primary">회원가입</h1>
      <p className="lead"><i className="fas fa-user"></i> 계정 생성</p>
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <input type="text" placeholder="이름" name="name" 
          value={name} onChange={e => onChange(e)} required />
        </div>
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
        <div className="form-group">
          <input
            type="password"
            placeholder="비밀번호 확인"
            name="password2"
            minLength="6" 
            value={password2} onChange={e => onChange(e)} required
          />
        </div>
        <input type="submit" className="btn btn-primary" value="등록" />
      </form>
      <p className="my-1">
        이미 계정이 있으십니까? <Link to="/login">로그인</Link>
      </p>
    </Fragment>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,

}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { setAlert, register })(Register);
