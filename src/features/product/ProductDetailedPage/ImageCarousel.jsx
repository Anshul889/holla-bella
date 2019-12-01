import { CarouselProvider, Image, Slide, Slider } from "pure-react-carousel";
import React from "react";
import { Divider } from "semantic-ui-react";

import CustomDotGroup from './CustomDotGroup.jsx';

const ImageCarousel = ({photoURL, photoURL2, photoURL3}) => (
  <CarouselProvider
    naturalSlideWidth={1}
    naturalSlideHeight={1}
    totalSlides={3}
  >
    <Slider>
      <Slide tag="a" index={0}>
        <Image src={photoURL} />
      </Slide>
      <Slide tag="a" index={1}>
        <Image src={photoURL2} />
      </Slide>
      <Slide tag="a" index={2}>
        <Image src={photoURL3} />
      </Slide>
    </Slider>
    <br></br>
    <br></br>
    <CustomDotGroup slides={3} />
  </CarouselProvider>
);

export default ImageCarousel;