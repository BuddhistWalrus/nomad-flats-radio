import React, {Component} from 'react';
import '../../styles/HelmPlayer.css';
import {Image} from "react-bootstrap";
const satellite_logo = require("../../assets/icons/satellite/satellite_pirate_logo.svg");
const bachChoyPath = "https://nfradio.s3-us-west-2.amazonaws.com/Bach+Choy.ogg";
class HelmPlayer extends Component {
    render () {
        return (
            <div className={'helm-player-outer-container'}>
                <div className={'player-container'}>
                    <p className={'mb-0 mr-auto'}>This is the helm player</p>
                    <audio className={'ml-auto'} controls>
                        <source src={bachChoyPath} type="audio/ogg"/>
                        {/*<source src="horse.mp3" type="audio/mpeg"/>*/}
                        Your browser does not support the audio element.
                    </audio>
                </div>


            </div>
        );
    }
}

export default HelmPlayer;

