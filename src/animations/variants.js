export const animation2 = {
  container: {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
  },
  item: {
    hidden: { y: 30, opacity: 0, filter: "brightness(0)" },
    show: { 
      y: 0, 
      opacity: 1, 
      filter: "brightness(1)",
      transition: { type: "spring", stiffness: 80, damping: 12 } 
    }
  },
  glow: {
    initial: { boxShadow: "0 0 0px var(--neon-blue)" },
    animate: {
      boxShadow: ["0 0 5px var(--neon-blue)", "0 0 20px var(--neon-blue)", "0 0 5px var(--neon-blue)"],
      transition: { duration: 2, repeat: Infinity }
    }
  },
  float: {
    animate: {
      y: [0, -15, 0],
      rotate: [0, 1, -1, 0],
      transition: { duration: 4, repeat: Infinity, ease: "easeInOut" }
    }
  }
};
