import React, {Component} from 'react';
import '../../styles/Hull.css';
import {Image} from "react-bootstrap";
import HelmPlayer from "./HelmPlayer";
const satellite_logo = require("../../assets/icons/satellite/satellite_pirate_logo.svg");


class Hull extends Component {
    render () {
        return (
            <div className={'hull-outer-container'}>
                Ahoy matey, ye've stumbled upon some buried treasure....

                <Image alt={'two crossed sabers below a satellite'} className={'glitch'} fluid src={satellite_logo}></Image>


                <HelmPlayer />
            </div>
        );
    }
}

export default Hull;

