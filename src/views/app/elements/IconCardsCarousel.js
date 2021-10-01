/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect } from "react";
import IconCard from "components/cards/IconCard";
import GlideComponent from "components/carousel/GlideComponent";

const IconCardsCarousel = ({  carousel }) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    if (carousel) {
      let tempdata = [
        { title: "dashboards.pending-orders", icon: "iconsminds-clock", value: carousel.pending },
        {
          title: "dashboards.completed-orders",
          icon: "iconsminds-basket-coins",
          value: carousel.completed,
        },
        { title: "dashboards.sales", icon: "iconsminds-mail-read", value: carousel.sales },
      ];
      setData(tempdata);
    }
  }, [carousel]);

  return data.length > 0 ? (
    <div className="icon-cards-row">
      <GlideComponent
        settings={{
          gap: 5,
          perView: 4,
          type: "carousel",
          breakpoints: {
            320: { perView: 1 },
            576: { perView: 2 },
            1600: { perView: 3 },
            1800: { perView: 4 },
          },
          hideNav: true,
        }}
      >
        {data.map((item, index) => {
          return (
            <div key={`icon_card_${index}`}>
              <IconCard {...item} className="mb-4" />
            </div>
          );
        })}
      </GlideComponent>
    </div>
  ) : (
    ""
  );
};
export default IconCardsCarousel;
