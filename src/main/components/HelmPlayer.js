import React, {Component} from 'react';
import '../../styles/HelmPlayer.css';
import {Image, Button} from "react-bootstrap";
import { FaPlay, FaPause, FaPlus, FaMinus } from 'react-icons/fa';
const satellite_logo = require("../../assets/icons/satellite/satellite_pirate_logo.svg");
const satellite_logo_bw_jpg = require("../../assets/icons/satellite/satellite_logo_bw.jpg");
const playlistArr = [
    {
        title: 'Bach Choy',
        artist: 'Desert Rygon',
        album: 'Mice',
        ogg_path: "https://nfradio.s3-us-west-2.amazonaws.com/Bach+Choy.ogg",
        wav_path: "https://nfradio.s3-us-west-2.amazonaws.com/Bach+Choy.wav",
        mp3_path: "https://nfradio.s3-us-west-2.amazonaws.com/Bach+Choy.mp3",
        image_path: 'http://placeimg.com/640/640/any'
    }
];
class HelmPlayer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            duration: '0:00',
            current_time: '0:00'
        };

        this.formatDuration = (duration) => {
            //format the minutes if over 60

            let minutes = '0';
            let seconds = '00';
            if(duration >= 60) {
                minutes = Math.trunc(duration / 60);
                seconds = Math.trunc(duration % 60);

                //add the leading zero if needed
                if (seconds < 10) {
                    seconds = `0${seconds}`
                }
            } else {
                seconds = Math.trunc(duration);
                //add the leading zero if needed
                if (seconds < 10) {
                    seconds = `0${seconds}`
                }
            }

            return `${minutes}:${seconds}`
        }
    }

    handleVolumeUp() {
        //can't raise the volume past 1, volume must be within [0, 1]
        let volume = document.getElementById('helm-player').volume;
        if(volume <= 0.9)
            return document.getElementById('helm-player').volume += 0.1;
    }
    handleVolumeDown() {
        //can't lower the volume below 0, volume must be within [0, 1]
        let volume = document.getElementById('helm-player').volume;
        if(volume >= 0.1)
            return document.getElementById('helm-player').volume -= 0.1;
    }
    handlePlay() {
        //clear any intervals counting the current time
        clearInterval();
        document.getElementById('helm-player').play();

        //gurantee that the song is loaded by setting the time and duration here
        this.setDuration();

        //check the time every half second
        setInterval(() => {
            let current_time = '0:00';
            current_time = document.getElementById('helm-player') &&
            document.getElementById('helm-player').currentTime ?
                (this.formatDuration(document.getElementById('helm-player').currentTime)) :
                current_time;
            this.setState({current_time});
        }, 500);

    }
    handlePause() {
        document.getElementById('helm-player').pause()
    }
    setDuration() {
        let duration = '0:00';
        duration = document.getElementById('helm-player') &&
                    document.getElementById('helm-player').duration ?
                        (this.formatDuration(document.getElementById('helm-player').duration)) :
                        duration;
        this.setState({duration});
    }
    render () {

        var {duration, current_time} = this.state;
        return (
            <div className={'helm-player-outer-container'}>
                <div className={'player-container'}>
                    <div className={'header'}>
                        <Image src={satellite_logo} style={{height: 30, width: 30}} />
                        <p className={'mb-0 mr-auto ml-2'}>Nomad Flats Radio - Now Playing</p>
                        <span>x</span>
                    </div>

                    {playlistArr && playlistArr.map(song => {
                        const {ogg_path, wav_path, mp3_path, title, artist, album, image_path} = song;

                        return (
                        <React.Fragment>
                            <div className={'center-container mt-5'}>
                                <Image style={{width: 200, height: 200}} src={image_path} />

                                <div className={'track-info-container'}>
                                    <h2>{title}</h2>
                                    <h2>{artist}</h2>
                                    <h2>{album}</h2>
                                    <div>
                                        <audio id={'helm-player'} className={'ml-auto'} controls>
                                            <source src={ogg_path} type="audio/ogg"/>
                                            <source src={wav_path} type="audio/wav"/>
                                            <source src={mp3_path} type="audio/mpeg"/>
                                            Your browser does not support the audio element.
                                        </audio>
                                        <div className={'duration'}>
                                            <span>{current_time} - {duration}</span>
                                        </div>
                                        <div className={'controls'}>
                                            <Button onClick={() => {this.handlePlay()}}>
                                                <FaPlay/>
                                            </Button>
                                            <Button onClick={() => {this.handlePause()}}>
                                                <FaPause/>
                                            </Button>
                                            <Button onClick={() => {this.handleVolumeUp()}}>
                                                <FaPlus/>
                                            </Button>
                                            <Button onClick={() => {this.handleVolumeDown()}}>
                                                <FaMinus/>
                                            </Button>
                                        </div>
                                    </div>
                                    {/*<div>*/}
                                    {/*    <iframe src="https://open.spotify.com/embed/track/46VWy0dH76vid4HdXClo9f"*/}
                                    {/*            width="300" height="380" frameBorder="0" allowTransparency="true"*/}
                                    {/*            allow="encrypted-media"></iframe>*/}
                                    {/*</div>*/}
                                </div>
                            </div>

                        </React.Fragment>
                        )
                    })}

                </div>
            </div>
        );
    }
}

export default HelmPlayer;

