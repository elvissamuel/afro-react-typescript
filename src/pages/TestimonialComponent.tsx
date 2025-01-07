import React from "react";
import TestimonyComponent from "./TestimonyComponent";

interface Testimonial {
  name: string;
  role: string;
  testimony: string;
}

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
}

const TestimonialCarousel: React.FC<TestimonialCarouselProps> = ({ testimonials }) => {

  return (
    <div className="overflow-hidden w-[80%] mx-auto relative">
      <div className="grid grid-cols-3 animate-scroll w-full">
        {testimonials.map((testimonial, index) => (
            
        <TestimonyComponent key={index} {...testimonial}  />

        ))}
      </div>
    </div>
  );
};

export default TestimonialCarousel;
