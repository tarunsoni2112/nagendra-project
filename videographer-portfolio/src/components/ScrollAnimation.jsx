import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const ScrollAnimation = ({ children, id }) => {
  const sectionRef = useRef(null);
  
  useEffect(() => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);
    
    const section = sectionRef.current;
    
    // Create the zoom-in effect when scrolling
    gsap.fromTo(
      section,
      {
        scale: 0.8,
        opacity: 0,
        y: 100,
      },
      {
        scale: 1,
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom-=100',
          end: 'center center',
          scrub: 0.5,
          // markers: true, // Enable for debugging
        },
      }
    );
    
    return () => {
      // Clean up ScrollTrigger when component unmounts
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
  
  return (
    <div ref={sectionRef} id={id} className="scroll-section">
      {children}
    </div>
  );
};

export default ScrollAnimation;
