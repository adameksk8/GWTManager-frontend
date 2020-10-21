import React, { Component } from 'react';
import image1 from './img/Java_logo_icon.png';
import image2 from './img/spring.png';
import image3 from './img/JS.png';
import image4 from './img/bootstrap.png';
import image5 from './img/react.png';
import $ from 'jquery';
import Loading from './Loading.js';

export class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    componentDidMount() {
    }
    render() {
        return (
            <div>
                <h1>Witaj,</h1>

                <h5>Strona powstała w ramach pracy końcowej na studiach podyplomowych "Technologie internetowe".</h5>
                <p>Aplikacja ma na celu wsparcie administratora w zarządzaniu sprzętem komputerowym, który znajduje się w przedsiębiorstwie.</p>
                <p>Technologie wykorzystane podczas realizacji aplikacji to:</p>
                <div id="carousel" class="carousel slide" data-ride="carousel">
                    <div class="carousel-inner">
                        <div class="carousel-item active ">
                            <img class="d-block h-50 w-75" src={image1} alt="Java" />
                        </div>
                        <div class="carousel-item">
                            <img class="d-block h-50 w-75" src={image2} alt="Spring" />
                        </div>
                        <div class="carousel-item">
                            <img class="d-block h-50 w-75" src={image3} alt="JavaScript" />
                        </div>
                        <div class="carousel-item">
                            <img class="d-block h-50 w-75" src={image4} alt="Bootstrap" />
                        </div>
                        <div class="carousel-item">
                            <img class="d-block h-50 w-75" src={image5} alt="React" />
                        </div>
                        <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="sr-only">Previous</span>
                        </a>
                        <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="sr-only">Next</span>
                        </a>
                    </div>
                </div >
            </div>
        );
    }
}
export default Home