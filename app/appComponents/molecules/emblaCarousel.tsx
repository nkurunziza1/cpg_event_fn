"use client";

import React from "react";
import { EmblaOptionsType } from "embla-carousel";
import {
  PrevButton,
  NextButton,
  usePrevNextButtons,
} from "../atoms/carousel/emblaCarouselArrowButton";
import useEmblaCarousel from "embla-carousel-react";
import Card, { CardProps } from "../atoms/card";

type PropType = {
  slides: CardProps[];
  options?: EmblaOptionsType;
};

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  const showNavigation = slides.length > 3;

  return (
    <section className="embla bg-white relative">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((project, index) => (
            <div className="embla__slide" key={index}>
              <Card
                id={project.id}
                title={project.title}
                category={project.category}
                image={project.image}
                description={project.description}
              />
            </div>
          ))}
        </div>
      </div>

      {showNavigation && (
        <div className="embla__controls absolute top-[50%] hidden lg:block">
          <div className="embla__buttons">
            <PrevButton
              onClick={onPrevButtonClick}
              disabled={prevBtnDisabled}
            />
            <NextButton
              onClick={onNextButtonClick}
              disabled={nextBtnDisabled}
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default EmblaCarousel;
