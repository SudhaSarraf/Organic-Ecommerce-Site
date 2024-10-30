import React from 'react';
import Slider from 'react-slick';
import './ProductSlider.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const customerReviews = [
    {
        name: 'Alice Johnson',
        review: 'I am very impressed with the quality of the fruits and vegetables I received from this store. Everything was fresh and flavorful. I will definitely be ordering again!',
        stars: 5,
      },
      {
        name: 'Michael Smith',
        review: 'The variety of fruits and vegetables offered by this store is outstanding. I love being able to choose from a wide range of organic options. The order arrived on time and in great condition.',
        stars: 4,
      },
      {
        name: 'Emily Clark',
        review: 'I am a regular customer of this eCommerce site, and I can confidently say that their produce is consistently top-notch. The fruits and vegetables are always fresh, and the packaging is excellent.',
        stars: 3,
      },
      {
        name: 'David Martinez',
        review: 'I recently switched to buying my fruits and veggies online, and I am extremely satisfied with my decision. The quality is as good as or even better than what I used to get from local markets.',
        stars: 4,
      },
      {
        name: 'Sophia Nguyen',
        review: 'I have been a loyal customer for over a year now, and I have never been disappointed with my orders. The fruits and vegetables are handpicked and look just as good as they do in the pictures.',
        stars: 5,
      },
      {
        name: 'Daniel Brown',
        review: 'The convenience of having fresh produce delivered to my doorstep is amazing. The fruits and vegetables are always crisp and delicious. I highly recommend this online store to everyone.',
        stars: 3,
      },
      {
        name: 'Olivia Wilson',
        review: 'I was skeptical about ordering fresh items online, but this store exceeded my expectations. The quality is outstanding, and the customer service is very responsive and helpful.',
        stars: 4,
      },
  // Add more reviews here
];

const SliderPage = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,            // Auto-slide enabled
    autoplaySpeed: 3000, 
  };

  return (
    <div className="slider-page">
      {/* <h1>Customer Reviews</h1> */}
      <Slider {...settings}>
        {customerReviews.map((review, index) => (
          <div key={index} className="customer-review">
            <div className="stars">
              {Array.from({ length: review.stars }).map((_, index) => (
                <FontAwesomeIcon key={index} icon={faStar} className="star-icon" />
              ))}
            </div>
            <div className="review">{review.review}</div>
            <div className="name">- {review.name}</div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SliderPage;
