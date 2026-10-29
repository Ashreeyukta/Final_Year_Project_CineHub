import React, { Component } from "react";
import { Carousel } from "react-bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "../css/Home.css";
import poster1 from "../img/spider-man-no-way-home-imax-poster.png";
import poster2 from "../img/spider-man-no-way-home-posters.jpg";
import poster3 from "../img/spider-man-no-way-home-promotions-has-already-started-in-the-theatres-using-unofficial-posters001.jpg";
import { NowShowing } from "../pages/home/home.component";

export default function Home() {
    console.log("Here");
    return (
        <>
            <NowShowing></NowShowing>
        </>
    );

}
