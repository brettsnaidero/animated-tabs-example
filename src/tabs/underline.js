import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import debounce from '../utils/debounce';

const Underline = ({ refs, activeRoute, finishAnimating, animating }) => {
  const [attrs, setAttrs] = React.useState({
    left: 0,
    width: 0,
  });

  React.useEffect(() => {
    if (refs && refs[activeRoute]) {
      setAttrs({
        left: refs[activeRoute].current.offsetLeft,
        width: refs[activeRoute].current.getBoundingClientRect().width,
      });
    }
  }, [activeRoute, refs]);

  // After window resize, recalculate
  React.useEffect(() => {
    const recalculateAttrs = debounce(() => {
      if (refs && refs[activeRoute]) {
        setAttrs({
          left: refs[activeRoute].current.offsetLeft,
          width: refs[activeRoute].current.getBoundingClientRect().width,
        });
      }
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
        x: attrs.left,
        width: attrs.width,
      }}
      style={{
        opacity: animating ? 1 : 0,
      }}
      transition={{
        duration: 0.4,
        ease: 'easeInOut',
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
