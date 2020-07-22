import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'


const Landing = ({ isAuthenticated }) => {
  if(isAuthenticated) {
    return <Redirect to='/dashboard'/>
  }

  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">Developer Connector</h1>
          <p className="lead">
            개발자를 위한 프로필/포트폴리오를 만들고 다른 개발자들과 정보를 공유하세요
          </p>
          <div className="buttons">
            <Link to='/register' className="btn btn-primary">회원가입</Link>
            <Link to='/login' className="btn btn-light">로그인</Link>
          </div>
        </div>
      </div>
   </section> 
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool,
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps)(Landing);
