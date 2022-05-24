import React from "react";
import Image from "next/image";
import Link from "next/link";
import LondonImage from "../public/images/london.jpg";

const places = [
  {
    name: "London",
    image: LondonImage,
    url: "/location/london-2643743",
  },
];

const FavouritePlaces = () => {
  return (
    <div className="places">
      <div className="places__row">
        {places.length > 0 &&
          places.map((place, index) => (
            <div className="places__box" key={index}>
              <Link href={place.url}>
                <a>
                  <div className="places__image-wrapper">
                    <Image
                      src={place.image}
                      alt={`${place.name} Image`}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <span>{place.name}</span>
                </a>
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
};

export default FavouritePlaces;
