import React, { Component } from 'react';
import image1 from './img/network1.jpg';
import image2 from './img/network2.jpg';
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
                <h1>Strona główna</h1>
                <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
                    <div class="carousel-inner">
                        <div class="carousel-item active">
                            Obrazek1
                            <img class="d-block w-100" src={image1} alt="First slide" />
                        </div>
                        <div class="carousel-item">
                            Obrazek2
                            <img class="d-block w-100" src={image2} alt="Second slide" />
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