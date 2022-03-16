import React from 'react';
import PropTypes from 'prop-types';

export default class Reviews extends React.Component {
  render() {
    const { review } = this.props;
    return (
      <div>
        <h4>{review.email}</h4>
        <span>{review.rating}</span>
        <p>{review.evaluation}</p>
      </div>
    );
  }
}

Reviews.propTypes = {
  review: PropTypes.shape({
    email: PropTypes.string.isRequired,
    rating: PropTypes.string.isRequired,
    evaluation: PropTypes.string.isRequired,
  }).isRequired,
};
