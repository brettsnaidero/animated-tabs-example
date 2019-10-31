import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Tab = React.forwardRef(
  ({ match, active, item, animating, startAnimating }, ref) => (
    <li className="tabs-list__item" key={`button-${item.name}`}>
      <Link
        to={item.route}
        className={`tabs-list__tab ${active ? 'active' : 'inactive'} ${animating}`}
        ref={ref}
        onClick={startAnimating}
      >
        {item.name}
      </Link>
    </li>
  ),
);

Tab.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string,
  }).isRequired,
  item: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.string,
    route: PropTypes.string,
  }).isRequired,
  active: PropTypes.bool.isRequired,
  animating: PropTypes.oneOf(['init', 'animating', 'stopped']).isRequired,
  startAnimating: PropTypes.func.isRequired,
};

export default Tab;
