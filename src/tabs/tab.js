import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Tab = React.forwardRef(
  ({ active, item, animating, startAnimating }, ref) => (
    <li className="tabs-list__item" key={`tab-${item.route}`}>
      <Link
        to={item.route}
        className={`tabs-list__tab ${active ? 'active' : 'inactive'} ${animating ? 'animating' : ''}`}
        ref={ref}
        onClick={startAnimating}
      >
        {item.name}
      </Link>
    </li>
  ),
);

Tab.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string,
    route: PropTypes.string,
  }).isRequired,
  active: PropTypes.bool.isRequired,
  animating: PropTypes.bool.isRequired,
  startAnimating: PropTypes.func.isRequired,
};

export default Tab;
