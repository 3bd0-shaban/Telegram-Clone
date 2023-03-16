const AnimSlideLeft = {
    initial: {
        x: 500,
        opacity: 0,
    },
    animate: {
        x: 0,
        opacity: 1,
        transition: { duration: 0.4 }
    },
    exit: {
        x: 500,
        transition: { duration: 0.4, ease: 'easeInOut' }
    }
};
export default AnimSlideLeft