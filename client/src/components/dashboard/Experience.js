import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { connect } from 'react-redux';

const Experience = ({ experience }) => {
  const experiences = experience.map((exp) => (
    <td key={exp._id}>
      <td>{exp.company}</td>
      <td className="hide-sm">{exp.title}</td>
      <td>
        <Moment format="YYYY/MM/DD">{exp.from}</Moment> -{' '}
        {exp.to === null ? (
          ' Now'
        ) : (
          <Moment format="YYYY/MM/DD">{exp.to}</Moment>
        )}
      </td>
      <td>
        <button className="btn btn-danger">삭제</button>
      </td>
    </td>
  ));
  return (
    <Fragment>
      <h2 className="my-2">경력</h2>
      <table className="tabe">
        <thead>
          <tr>
            <th>Company</th>
            <th ClassName="hide-sm">Title</th>
            <th ClassName="hide-sm">Years</th>
            <th />
          </tr>
        </thead>
        <tbody>{experiences}</tbody>
      </table>
    </Fragment>
  );
};

Experience.propTypes = {
  experience: PropTypes.array.isRequired,
};

export default Experience;
