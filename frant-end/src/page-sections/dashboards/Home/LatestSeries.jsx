import { useState } from "react";
import { Navigation, Pagination, A11y, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { styled, Box, alpha, Card } from "@mui/material";
import { FlexBetween } from "@/components/flexbox"; 
import ChevronRight from "@/icons/ChevronRight";
import ChevronLeft from "@/icons/ChevronLeft";
import { Paragraph } from "@/components/typography";

const SwiperContainer = styled(Box)(({
  theme
}) => ({
    overflow: "hidden",
    position: "relative",
    "& .swiper:has(+ .swiper-controls .swiper-pagination)": {
        marginBottom: 40
    },
    "& .swiper-controls": {
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    ".swiper-pagination": {
        bottom: 0,
        ".swiper-pagination-bullet": {
            width: 8,
            height: 8,
            backgroundColor: theme.palette.grey[400],
            "&.swiper-pagination-bullet-active": {
            backgroundColor: theme.palette.primary.main,
            boxShadow: `${alpha(theme.palette.primary.main, 0.1)} 0px 0px 0px 4px`
            }
        }
    },
    ".swiper-navigation": {
        pointerEvents: "all",
        ".swiper-button": {
            width: 50,
            height: 50,
            borderRadius: "50%",
            "::after": {
            display: "none"
            },
            ".MuiSvgIcon-root": {
            color: theme.palette.text.primary, // Change the color of navigation arrows
            fontSize: 25
            },
            "&.swiper-button-disabled": {
            opacity: 0.6
            }
        }
    }
  }
}));

const images = [
    {
        id: 1,
        link: '/static/latestMovies/latestMovies01.jpg'
    },
    {
        id: 2,
        link: '/static/latestMovies/latestMovies02.jpg'
    },
    {
        id: 3,
        link: '/static/latestMovies/latestMovies03.jpg'
    },
    {
        id: 4,
        link: '/static/latestMovies/latestMovies04.jpg'
    },
    {
        id: 5,
        link: '/static/latestMovies/latestMovies05.jpg'
    },
]

const LatestSeries = ({
    navigation,
    pagination,
    ...props
    }) => {
    const [prevEl, setPrevEl] = useState(null);
    const [nextEl, setNextEl] = useState(null);
    const [paginationEl, setPaginationEl] = useState(null);

  return (
    <Card sx={{ p: 3, height: "100%" }}>
        <FlexBetween mb={4}>
            <Box>
                <Paragraph ellipsis lineHeight={1.3} fontSize={18} fontWeight={500}>
                    Latest Series
                </Paragraph>
            </Box>
    
        </FlexBetween>
        <SwiperContainer>
            <Swiper
            spaceBetween={0}
            autoplay={{ delay: 2500 }}
            modules={[Navigation, Pagination, Autoplay, A11y]}
            navigation={navigation ? { prevEl, nextEl } : false}
            pagination={pagination ? { clickable: true, el: paginationEl } : false}
            {...props}
            >
            {images.map((img) => (
                <SwiperSlide key={img.id}>
                <img src={img.link} alt={`Slide ${img.link}`} />
                </SwiperSlide>
            ))}
            </Swiper>

            <div className="swiper-controls">
            {/* Custom navigation */}
            {navigation && (
                <div className="swiper-navigation">
                <div role="button" ref={(node) => setPrevEl(node)} className="swiper-button swiper-button-prev">
                    <ChevronLeft />
                </div>

                <div role="button" ref={(node) => setNextEl(node)} className="swiper-button swiper-button-next">
                    <ChevronRight />
                </div>
                </div>
            )}

            {/* Custom pagination */}
            {pagination && <div className="swiper-pagination" ref={(node) => setPaginationEl(node)} />}
            </div>
        </SwiperContainer>
    </Card>
  );
}

export default LatestSeries;
