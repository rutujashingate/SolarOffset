import { motion } from 'framer-motion';

/**
 * This component is used to display a loading animation when the app is first loaded.
 * @returns {JSX.Element}
 * @constructor
 */
function AppLoadingAnimation() {
  const animationEndDistance = 1000;
  const animationStartDistance = 0;
  return (
    <motion.div
      className="h-100vh"
      initial={{
        display: 'block',
      }}
      animate={{
        display: 'none',
      }}
      transition={{
        delay: 1,
      }}
    >
      <motion.div
        className="d-flex h-100"
      >
        <motion.div
          initial={{
            x: animationStartDistance,
          }}
          animate={{
            x: -animationEndDistance,
          }}
          transition={{
            delay: 0.5,
            duration: 1,
          }}
          className="flex-basis-50 d-flex align-items-center justify-content-end bg-dark"
        >
          <p className="h1 me-3 text-white">Solar</p>
        </motion.div>
        <motion.div
          initial={{
            x: animationStartDistance,
          }}
          animate={{
            x: animationEndDistance,
          }}
          transition={{
            delay: 0.5,
            duration: 1,
          }}
          className="flex-basis-50 d-flex align-items-center justify-content-start bg-dark"
        >
          <p className="h1 ms-3 text-white">Offset</p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default AppLoadingAnimation;
