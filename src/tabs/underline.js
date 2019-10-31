import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

const Underline = ({ activeTabRef, finishAnimating, animating }) => {
  const [attrs, setAttrs] = React.useState({
    left: 0,
    width: 0,
  });

  React.useEffect(() => {
    if (activeTabRef) {
      console.log(activeTabRef.current.offsetLeft);

      setAttrs({
        left: activeTabRef.current ? activeTabRef.current.offsetLeft : 0,
        width: activeTabRef.current
          ? activeTabRef.current.getBoundingClientRect().width
          : 0,
      });
    }
  }, [activeTabRef]);

  return (
    <motion.div
      className={`tabs-list__underline ${animating}`}
      animate={{
        left: attrs.left,
        width: attrs.width,
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
  activeTabRef: PropTypes.shape({
    current: PropTypes.shape({
      offsetLeft: PropTypes.number,
      getBoundingClientRect: PropTypes.func,
    }),
  }),
  finishAnimating: PropTypes.func.isRequired,
  animating: PropTypes.oneOf(['init', 'animating', 'stopped']).isRequired,
};

export default Underline;
