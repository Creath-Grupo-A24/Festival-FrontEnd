import React, { useRef, useEffect, useState } from "react";

const ScrollObserver = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const targetRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(targetRef.current);
        }
      },
      {
        threshold: 1, // Adjust the threshold as needed
      }
    );

    if (targetRef.current) {
      observer.observe(targetRef.current);
    }

    return () => {
      if (targetRef.current) {
        observer.unobserve(targetRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={targetRef}
      style={{ opacity: isVisible ? 1 : 0, transition: "opacity 1s ease" }}
    >
      {children}
    </div>
  );
};

export default ScrollObserver;
