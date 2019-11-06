import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import debounce from '../utils/debounce';

const Underline = ({ refs, activeRoute, finishAnimating, animating }) => {
  const [{ x, width }, setAttributes] = React.useState({
    x: 0,
    width: 0,
  });

  const updateAttributes = React.useCallback(() => {
    if (refs && refs[activeRoute]) {
      setAttributes({
        x: refs[activeRoute].current.offsetLeft,
        width: refs[activeRoute].current.getBoundingClientRect().width,
      });
    }
  }, [activeRoute, refs])

  // Update attributes if active route changes (or refs change)
  React.useEffect(() => {
    updateAttributes();
  }, [activeRoute, refs, updateAttributes]);

  // After window resize, recalculate
  React.useEffect(() => {
    const recalculateAttrs = debounce(() => {
      updateAttributes();
    }, 500);

    window.addEventListener('resize', recalculateAttrs);
    return () => {
      window.removeEventListener('resize', recalculateAttrs);
    };
  });

  return (
    <motion.div
      className="tabs-list__underline"
      animate={{
        x,
        width,
      }}
      style={{
        opacity: animating ? 1 : 0,
      }}
      onAnimationComplete={finishAnimating}
    />
  );
};

Underline.defaultProps = {
  activeTabRef: undefined,
}

Underline.propTypes = {
  refs: PropTypes.objectOf(PropTypes.shape({
    current: PropTypes.shape({
      offsetLeft: PropTypes.number,
      getBoundingClientRect: PropTypes.func,
    }),
  })),
  previousRoute: PropTypes.string,
  activeRoute: PropTypes.string,
  finishAnimating: PropTypes.func.isRequired,
  animating: PropTypes.bool.isRequired,
};

export default Underline;
