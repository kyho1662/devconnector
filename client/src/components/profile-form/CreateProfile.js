import React, { Fragment, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile } from '../../actions/profile';

const CreateProfile = ({ createProfile, history }) => {
  const [formData, setFormData] = useState({
    company: '',
    website: '',
    location: '',
    status: '',
    skills: '',
    githubusername: '',
    bio: '',
    twitter: '',
    facebook: '',
    linkedin: '',
    youtube: '',
    instagram: '',
  });

  const [displaySocialInputs, toggleSocialInputs] = useState(false);

  const {
    company,
    website,
    location,
    status,
    skills,
    githubusername,
    bio,
    twitter,
    facebook,
    linkedin,
    youtube,
    instagram,
  } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    createProfile(formData, history);
  };

  return (
    <Fragment>
      <h1 className="large text-primary">프로필 생성</h1>
      <p className="lead">
        <i className="fas fa-user"></i>프로필을 작성해주세요.
      </p>
      <small>* = 필수 입력 항목</small>
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <select name="status" value={status} onChange={(e) => onChange(e)}>
            <option value="0">* 직종</option>
            <option value="Developer">개발자</option>
            <option value="Junior Developer">주니어 개발자</option>
            <option value="Senior Developer">시니어 개발자</option>
            <option value="Manager">매니저</option>
            <option value="Student or Learning">학생</option>
            <option value="Instructor">강사</option>
            <option value="Intern">인턴</option>
            <option value="Other">기타</option>
          </select>
          <small className="form-text">자신의 현재 상태</small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="회사"
            name="company"
            value={company}
            onChange={(e) => onChange(e)}
          />
          <small className="form-text">운영 혹은 중인 회사</small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="홈페이지"
            name="website"
            value={website}
            onChange={(e) => onChange(e)}
          />
          <small className="form-text">자신 혹은 회사의 홈페이지</small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="거주"
            name="location"
            value={location}
            onChange={(e) => onChange(e)}
          />
          <small className="form-text">시 군 구</small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* 기술 스택"
            name="skills"
            value={skills}
            onChange={(e) => onChange(e)}
          />
          <small className="form-text">
            쉼표로 구분해 주세요 ex) HTML,CSS,JavaScript,PHP
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="깃허브 아이디"
            name="githubusername"
            value={githubusername}
            onChange={(e) => onChange(e)}
          />
          <small className="form-text">github.com</small>
        </div>
        <div className="form-group">
          <textarea
            placeholder="짧은 자기소개"
            name="bio"
            value={bio}
            onChange={(e) => onChange(e)}
          ></textarea>
          <small className="form-text">자신에 대해 설명해주세요</small>
        </div>

        <div className="my-2">
          <button
            onClick={() => toggleSocialInputs(!displaySocialInputs)}
            type="button"
            className="btn btn-light"
          >
            SNS 링크 추가
          </button>
          <span>옵션</span>
        </div>

        {displaySocialInputs && (
          <Fragment>
            <div className="form-group social-input">
              <i className="fab fa-twitter fa-2x"></i>
              <input
                type="text"
                placeholder="Twitter URL"
                name="twitter"
                value={twitter}
                onChange={(e) => onChange(e)}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-facebook fa-2x"></i>
              <input
                type="text"
                placeholder="Facebook URL"
                name="facebook"
                value={facebook}
                onChange={(e) => onChange(e)}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-youtube fa-2x"></i>
              <input
                type="text"
                placeholder="YouTube URL"
                name="youtube"
                value={youtube}
                onChange={(e) => onChange(e)}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-linkedin fa-2x"></i>
              <input
                type="text"
                placeholder="Linkedin URL"
                name="linkedin"
                value={linkedin}
                onChange={(e) => onChange(e)}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-instagram fa-2x"></i>
              <input
                type="text"
                placeholder="Instagram URL"
                name="instagram"
                value={instagram}
                onChange={(e) => onChange(e)}
              />
            </div>
          </Fragment>
        )}

        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">
          뒤로가기
        </Link>
      </form>
    </Fragment>
  );
};

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
};

export default connect(null, { createProfile })(withRouter(CreateProfile));
