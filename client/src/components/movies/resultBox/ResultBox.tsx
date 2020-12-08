import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination } from "swiper";
import "swiper/swiper-bundle.css";
import "./resultBox.css";
import { Data } from "../../../api/moveis";

SwiperCore.use([Navigation, Pagination]);
const ResultBox: React.FC = () => {
	const slides: any[] = [];
	const { movies } = Data;

	return (
		<Swiper
			tag="section"
			wrapperTag="ul"
			id="main"
			navigation
			spaceBetween={0}
			slidesPerView={6}
			loop={true}>
			{movies.map(movie => (
				<SwiperSlide key={movie.id} tag="li">
					<img
						src={movie.medium_cover_image}
						style={{ listStyle: "none" }}
						alt={movie.title}
					/>
				</SwiperSlide>
			))}
		</Swiper>
	);
};

export default ResultBox;