import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
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
  )
}

export default Landing
