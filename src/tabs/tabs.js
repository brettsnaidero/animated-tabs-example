import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect, matchPath, withRouter } from 'react-router-dom';
import Tab from './tab';
import Underline from './underline';

const Tabs = ({ items, match, location }) => {
  const [animating, setAnimating] = React.useState('init');

  const tabRefs = items.reduce((acc, item) => {
    acc[item.id] = React.createRef();
    return acc;
  }, {});

  const startAnimating = () => {
    setAnimating('animating');
  };

  const finishAnimating = () => {
    setAnimating('stopped');
  };

  const active = items.find((item) =>
    matchPath(location.pathname, {
      path: `/${item.route}`,
      exact: true,
    }),
  );

  const activeId = active && active.id;

  return (
    <div className="tabs">
      <ul role="tablist" aria-orientation="horizontal" className="tabs-list">
        {items.map((item) => (
          <Tab
            key={item.id}
            match={match}
            location={location}
            item={item}
            ref={tabRefs[item.id]}
            active={activeId === item.id}
            startAnimating={startAnimating}
            animating={animating}
          />
        ))}
        <Underline
          activeTabRef={tabRefs[activeId]}
          finishAnimating={finishAnimating}
          animating={animating}
        />
      </ul>
      <Switch>
        {items.map((item) => (
          <Route
            key={item.id}
            path={`/${item.route}`}
            render={item.render}
          />
        ))}
        <Route render={() => <Redirect to={items[0] ? items[0].route : '/'} />} />
      </Switch>
    </div>
  );
};

Tabs.defaultProps = {
  items: [],
};

Tabs.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string,
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      route: PropTypes.route,
    }),
  ),
};

export default withRouter(Tabs);
