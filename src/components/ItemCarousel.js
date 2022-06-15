import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';

export default function ControlledCarousel() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="../Best store.png"
          alt="First slide"
          height={400}
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="../Best store(1).png"
          alt="Second slide"
          height={400}

        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="../Best store(2).png"
          alt="Third slide"
          height={400}

        />

      </Carousel.Item>
    </Carousel>
  );
}

