import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import useGameStore from "../Store/gameStore";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

export default function SimpleSlider() {
  const { id } = useParams();
  const navigate = useNavigate();

  const games = useGameStore((state) => state.games);
  const loading = useGameStore((state) => state.loading.games);
  const fetchedGames = useGameStore((state) => state.fetchedGames);

  console.log(games);

  useEffect(() => {
    fetchedGames();
  }, [fetchedGames]);

  const handleClick = (gameId) => {
    navigate(`/games/${gameId}`);
  };

  const visibleGames = games.filter((game) => game.visible === true);

  const settings = {
    dots: true,
    arrows: true,
    infinite: true,
    className: "center",
    centerPadding: "60px",
    centerMode: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
    // cssEase: "linear",
    draggable: false,
    swipe: false,
  };

  return (
    <>
      <div className="text-center text-white bg-gradient-to-b from-black to-gray-900 overflow-hidden mt-20">
        <style>{`
        .slick-dots {
          bottom: -40px;
        }
        .slick-dots li button:before {
          color: white;
          font-size: 10px;
          opacity: 0.5;
        }
        .slick-dots li.slick-active button:before {
          color: white;
          opacity: 1;
        }
        .slick-prev:before,
        .slick-next:before {
          color: white;
          font-size: 30px;
        }
        .slick-prev {
          left: 25px;
          z-index: 1;
        }
        .slick-next {
          right: 25px;
          z-index: 1;
        }
      `}</style>
        <Slider {...settings}>
          {visibleGames.map((game) => (
            <div
              className="px-10"
              onClick={() => handleClick(game.id)}
              key={game.id}
            >
              <div className="cursor-pointer">
                <img
                  className="w-full h-40 object-cover rounded-xl"
                  src={`https://cdn.cloudflare.steamstatic.com/steam/apps/${game.image}/header.jpg`}
                  alt={game.title}
                />
                <h1>{game.title}</h1>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
}
