import React, { useContext } from "react";
// css
import "./Body.css";
// Carousel
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
// Carousel settings
import { settings } from "../utils/carousel";
// Images
import truthordare from "../Images/Truth_or_dare_Images.png";
import offlinemeet from "../Images/Offline_Meet_Image.png";
import Meeting from "../Images/Meeting_Image.png";
// User
import { UserContext } from "../App";
import { Button } from "@mui/material";
// Addition Icon
import AddIcon from "@mui/icons-material/Add";

function Body() {
  const user = useContext(UserContext);
  return (
    <div className="body_container">
      <div className="body_carousel">
        <Slider {...settings}>
          <div className="slider_container">
            <img
              src={truthordare}
              alt="Truth or dare"
              className="carousel_images"
            />
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam
              temporibus sit molestias rerum quia accusamus praesentium magnam
              est recusandae delectus. Lorem ipsum dolor sit amet, consectetur
              adipisicing elit. Aperiam temporibus sit molestias rerum quia
              accusamus praesentium magnam est recusandae delectus.
            </p>
          </div>
          <div className="slider_container">
            <img src={offlinemeet} alt="Offline" className="carousel_images" />
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam
              temporibus sit molestias rerum quia accusamus praesentium magnam
              est recusandae delectus. Lorem ipsum dolor sit amet, consectetur
              adipisicing elit. Aperiam temporibus sit molestias rerum quia
              accusamus praesentium magnam est recusandae delectus.
            </p>
          </div>
          <div className="slider_container">
            <img src={Meeting} alt="online" className="carousel_images" />
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam
              temporibus sit molestias rerum quia accusamus praesentium magnam
              est recusandae delectus. Lorem ipsum dolor sit amet, consectetur
              adipisicing elit. Aperiam temporibus sit molestias rerum quia
              accusamus praesentium magnam est recusandae delectus.
            </p>
          </div>
        </Slider>
      </div>
      <div className="text_container">
        {user[0] ? (
          <div>
            Create the meet and enjoy with your friends
            <br />
            <br />
            <center>
              <Button className="btns" >
                {" "}
                <AddIcon /> New Meet
              </Button>
            </center>
          </div>
        ) : (
          <>Signin/SignUp to create the meet and enjoy with your friends</>
        )}
      </div>
    </div>
  );
}

export default Body;
