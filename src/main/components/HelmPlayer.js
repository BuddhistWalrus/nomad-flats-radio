import React, {Component} from 'react';
import '../../styles/HelmPlayer.css';
import {Image, Button} from "react-bootstrap";
import { FaPlay, FaPause, FaPlus, FaMinus, FaStepForward, FaStepBackward } from 'react-icons/fa';
const satellite_logo = require("../../assets/icons/satellite/satellite_pirate_logo.svg");
const satellite_logo_bw_jpg = require("../../assets/icons/satellite/satellite_logo_bw.jpg");
const playlistArr = [
    {
        title: 'the duke',
        artist: 'phogen',
        album: 'PHOGEN LP',
        ogg_path: null,
        wav_path: null,
        mp3_path: "https://t4.bcbits.com/stream/c2fbb44deb0f5583ee69b3a3f0876cd8/mp3-128/2261793501?p=0&ts=1586828605&t=c379714708a90da242ef512ba89119f3cde8f305&token=1586828605_58acb51ddcc58b9ca2486e07f52121587c2ea72e",
        image_path: 'https://f4.bcbits.com/img/a4256247474_16.jpg'
    },
    {
        title: 'Bach Choy',
        artist: 'Desert Rygon',
        album: 'Mice',
        ogg_path: "https://nfradio.s3-us-west-2.amazonaws.com/Bach+Choy.ogg",
        wav_path: "https://nfradio.s3-us-west-2.amazonaws.com/Bach+Choy.wav",
        mp3_path: "https://nfradio.s3-us-west-2.amazonaws.com/Bach+Choy.mp3",
        image_path: 'https://f4.bcbits.com/img/a2460780896_16.jpg'
    },
    {
        title: 'Fiendish Blind',
        artist: 'Carpetland Flux Collective',
        album: 'Carpetland',
        ogg_path: null,
        wav_path: null,
        mp3_path: "https://t4.bcbits.com/stream/2d490acd0ab7420a90b1b86d15091dd7/mp3-128/690665295?p=0&ts=1586821551&t=f1bad292fc49d6dbe9ed521cdec8055853df5120&token=1586821551_177c0408dcf8ae06ba5e3bcd3659c8b3924f1e22",
        image_path: 'https://f4.bcbits.com/img/a3317854254_16.jpg'
    },
    {
        title: 'A Cardinal\'s Waltz',
        artist: 'Crater and the Catalyst',
        album: 'The End Line',
        ogg_path: null,
        wav_path: null,
        mp3_path: "https://t4.bcbits.com/stream/072d84cfd76a96df8a3b8039e4e5a50b/mp3-128/1439349383?p=0&ts=1586825925&t=5829f48fc7a017955d7b03c0c4fdd5cc29ad0b06&token=1586825925_6288fc58558634a7b12791a60ad88df83713d01f",
        image_path: 'https://f4.bcbits.com/img/a3924819403_16.jpg'
    },
    {
        title: 'Hydrogen Jukebox',
        artist: 'Geophade',
        album: '(O_O)',
        ogg_path: null,
        wav_path: null,
        mp3_path: "https://t4.bcbits.com/stream/4c31b4967e07f5e4305b7e47b5e2a441/mp3-128/3518967595?p=0&ts=1586826167&t=a16ced45e8056b263b17afb7978e30d37aa59d03&token=1586826167_71fab106d0ca7fe9d43681d2a29663fa8042d336",
        image_path: 'https://f4.bcbits.com/img/a1554218515_16.jpg'
    },
    {
        title: 'The Picturesque Mountain\'s Remains Yield Dancing Monstrosities',
        artist: 'TEG',
        album: 'Pinklore',
        ogg_path: null,
        wav_path: null,
        mp3_path: "https://t4.bcbits.com/stream/ec1917c4875519eeaa8f1991a87ebaf9/mp3-128/2682799247?p=0&ts=1586830703&t=3b9897ef87f87429a5e98a7bab9a89c4919fe0bb&token=1586830703_a5df7835741ab8e8da3f2c80d02df7c4d1a407f3",
        image_path: 'https://f4.bcbits.com/img/a3107691983_16.jpg'
    },
    {
        title: 'Leaving the Comfort Zone',
        artist: 'Baucier ft. (Carpetland Flats Collective, Desert Rygon)',
        album: 'Leaving the Comfort Zone -- Single',
        ogg_path: null,
        wav_path: null,
        mp3_path: "https://nfradio.s3-us-west-2.amazonaws.com/Leaving+the+Comfort+Zone.mp3",
        image_path: 'https://i1.sndcdn.com/artworks-000508706229-8e54d2-t500x500.jpg'
    },
    {
        title: 'unicorns&dinosaurs',
        artist: 'Cosmicdopetron',
        album: 'FRANTIC OBLIVION',
        ogg_path: null,
        wav_path: null,
        mp3_path: "https://nfradio.s3-us-west-2.amazonaws.com/unicorns%26dinosaurs.mp3",
        image_path: 'https://nfradio.s3-us-west-2.amazonaws.com/album_art/FRANTIC_OBLIVION_ALBUM_ART.png'
    },
    {
        title: 'Bastard',
        artist: 'Baucier ft. (tumbleweed, TEG, Robotnik)',
        album: 'Original Six EP',
        ogg_path: null,
        wav_path: null,
        mp3_path: "https://nfradio.s3-us-west-2.amazonaws.com/Bastard.mp3",
        image_path: "https://i1.sndcdn.com/artworks-TeKYT0SO5nmbu2MW-pPbqlw-t200x200.jpg"
    }

];
class HelmPlayer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            duration: '0:00',
            current_time: '0:00',
            current_song_id: 0
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

    handleNext() {
        this.handlePause();
        var {current_song_id} = this.state;
        const playlist_length = playlistArr && playlistArr.length;

        //wrap if we are at the end of the playlist
        if(current_song_id===playlist_length-1) {
            this.setState({current_song_id: 0}, () => {

                //need to manually set the source attribute on previous and next changes
                document.getElementById('helm-player').src=playlistArr[this.state.current_song_id].mp3_path;

                this.handlePlay();
            })
        } else {
            this.setState({current_song_id: current_song_id+1}, () => {

                //need to manually set the source attribute on previous and next changes
                document.getElementById('helm-player').src=playlistArr[this.state.current_song_id].mp3_path;

                this.handlePlay();
            })
        }
    }

    handlePrevious() {
        this.handlePause();
        var {current_song_id} = this.state;
        const playlist_length = playlistArr && playlistArr.length;

        //wrap if we are at the end of the playlist
        if(current_song_id===0 && playlist_length) {
            this.setState({current_song_id: playlist_length-1}, () => {

                //need to manually set the source attribute on previous and next changes
                document.getElementById('helm-player').src=playlistArr[this.state.current_song_id].mp3_path;

                this.handlePlay()
            })
        } else {
            this.setState({current_song_id: current_song_id-1}, () => {

                //need to manually set the source attribute on previous and next changes
                document.getElementById('helm-player').src=playlistArr[this.state.current_song_id].mp3_path;

                this.handlePlay()
            })
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

        //gurantee that the song is loaded by setting the time and duration here
        document.getElementById('helm-player').play().then(() => {
            this.setDuration()
        });

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

        var {duration, current_time, current_song_id} = this.state;
        const {ogg_path, wav_path, mp3_path, title, artist, album, image_path} = playlistArr[current_song_id];

        if(current_time !== "0:00" &&
            duration !== "0:00" &&
            current_time===duration) {
            this.setState({duration: '0:00', current_time: '0:00'}, () => {
                this.handleNext();
            });
        }



        return (
            <div className={'helm-player-outer-container'}>
                <div className={'player-container'}>
                    <div className={'header'}>
                        <Image src={satellite_logo} style={{height: 30, width: 30}} />
                        <p className={'mb-0 mr-auto ml-2'}>Nomad Flats Radio - Now Playing</p>
                        <span>x</span>
                    </div>
                    <React.Fragment>
                        <div className={'center-container mt-5'}>
                            <Image style={{width: 200, height: 200}} src={image_path} />

                            <div className={'track-info-container'}>
                                <h2>{title}</h2>
                                <h2>{artist}</h2>
                                <h2>{album}</h2>
                                <div>
                                    <audio src={mp3_path} id={'helm-player'} className={'ml-auto'} controls>
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
                                        <Button onClick={() => {this.handlePrevious()}}>
                                            <FaStepBackward />
                                        </Button>
                                        <Button onClick={() => {this.handleNext()}}>
                                            <FaStepForward />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </React.Fragment>
                </div>
            </div>
        );
    }
}

export default HelmPlayer;

