import {React, useState } from 'react';
import CountUp from 'react-countup';
import VisibilitySensor from 'react-visibility-sensor';

const Counter = ({ start, end, duration, suffix, className }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className={`d-flex align-items-center border-start border-5 border-primary px-3 ${className}`}>
      <VisibilitySensor
        onChange={(isVisible) => setIsVisible(isVisible)}
        partialVisibility={true} // Triggers when at least 50% of the component is visible
      >
        <CountUp start={isVisible ? start : 0} end={isVisible ? end : 0} duration={duration} separator="," decimals={0}>
          {({ countUpRef }) => (
            <>
              <h1 className="flex-shrink-0 display-5 text-primary mb-0" ref={countUpRef}>.</h1>
              <div className="ps-4">
                <p className="mb-0">{suffix}</p>
                <h6 className="text-uppercase mb-0">Experience</h6>
              </div>
            </>
          )}
        </CountUp>
      </VisibilitySensor>
    </div>
  );
};

export default Counter;
