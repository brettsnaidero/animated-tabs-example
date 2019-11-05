import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect, matchPath, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Tab from './tab';
import Underline from './underline';

const Tabs = ({ items }) => {
  const [animating, setAnimating] = React.useState(false);

  const tabRefs = items.reduce((acc, item) => {
    acc[item.route] = React.createRef();
    return acc;
  }, {});

  const location = useLocation();

  // Find active path
  const active = items.find((item) =>
    matchPath(location.pathname, {
      path: `/${item.route}`,
      exact: true,
    }),
  );

  const activeRoute = active && active.route;

  return (
    <React.Fragment>
      <div className="tabs">
        <ul role="tablist" aria-orientation="horizontal" className="tabs-list">
          {items.map((item) => (
            <Tab
              key={item.route}
              location={location}
              item={item}
              ref={tabRefs[item.route]}
              active={activeRoute === item.route}
              animating={animating}
              startAnimating={() => setAnimating(true)}
            />
          ))}
        </ul>
        <Underline
          refs={tabRefs}
          activeRoute={activeRoute}
          finishAnimating={() => setAnimating(false)}
          animating={animating}
        />
      </div>
      <AnimatePresence exitBeforeEnter>
        <Switch location={location} key={location.pathname}>
          {items.map((item) => (
            <Route
              key={item.route}
              path={`/${item.route}`}
              render={() => (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {item.render()}
                </motion.div>
              )}
            />
          ))}
          {/*
            Need to wrap the redirect in a motion component with an "exit" defined
            https://www.framer.com/api/motion/animate-presence/#animating-custom-components
          */}
          <Route
            key="redirection"
            render={() => (
              <motion.div exit={{ opacity: 0 }}>
                <Redirect to={items[0] ? `/${items[0].route}` : '/'} />
              </motion.div>
            )}
          />
        </Switch>
      </AnimatePresence>
    </React.Fragment>
  );
};

Tabs.defaultProps = {
  items: [],
};

Tabs.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      route: PropTypes.route,
    }),
  ),
};

export default Tabs;
