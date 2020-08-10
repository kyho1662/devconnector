import React from 'react';
import { Link } from 'react-router-dom';

const DashboardActions = () => {
  return (
    <div class="dash-buttons">
      <Link to="/edit-profile" class="btn btn-light">
        <i class="fas fa-user-circle text-primary"></i> 프로필 수정
      </Link>
      <Link to="/add-experience" class="btn btn-light">
        <i class="fab fa-black-tie text-primary"></i> 경력 추가
      </Link>
      <Link to="add-education.html" class="btn btn-light">
        <i class="fas fa-graduation-cap text-primary"></i> 학력 추가
      </Link>
    </div>
  );
};

export default DashboardActions;
