"use client"
import 'react-h5-audio-player/lib/styles.css';
import AudioPlayer, {RHAP_UI} from 'react-h5-audio-player';
import {useState} from 'react';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import RepeatIcon from '@mui/icons-material/Repeat';
import RepeatOnIcon from '@mui/icons-material/RepeatOn';
import RepeatSharpIcon from '@mui/icons-material/RepeatSharp';
const Music = () => {


    const [playlist, setPlaylist] = useState([
        "http://127.0.0.1:9000/music/Toi-Nay-Mot-Minh-Lou-Hoang.mp3",
        "http://127.0.0.1:9000/music/Them-Bao-Nhieu-Lau-Dat-G.mp3",
        "http://127.0.0.1:9000/music/Song-Gio-Jack-K-ICM.mp3",
        "http://127.0.0.1:9000/music/Tuy-Am-Xesi-Masew-Nhat-Nguyen.mp3",
        "http://127.0.0.1:9000/music/Suyt-Nua-Thi-Chuyen-Di-Cua-Thanh-Xuan-OST-Andiez.mp3",
        "http://127.0.0.1:9000/music/Tat-Ca-Tai-Anh-Karik-Emma.mp3"
    ])
    var [currentSong, setCurrentSong] = useState(0);
    var PREVIOUS_SONG = -1;


    const handleNextSong = () => {
        console.log("NEXT_SONG_FUNCTION")
        PREVIOUS_SONG = currentSong;
        var index = 0;
        if (currentSong < playlist.length - 1) {
            index = currentSong + 1;
        } else index = 0;
        console.log("Current song:" + playlist[index]);
        setCurrentSong(index);
    };

    const handlePerviousSong = () => {
        var index = 0;
        if (currentSong > 0) {
            index = currentSong - 1;
        } else index = 0;
        console.log("Current song:" + playlist[index]);

        console.log("PREVIOUS_SONG_FUNCTION");
        setCurrentSong(PREVIOUS_SONG);
    };


    const handleOnEnd = () => {
        console.log("ENDSONG_FUNCTION")
        handleNextSong();
    }
    const handleOnPause = () => {
        console.log("ON_PAUSE_FUNCTION")
    }
    const handleOnPlay = () => {
        console.log("ON_PLAY_FUNCTION")
    }
    const handleOnError = () => {
        console.log("ON_ERROR_FUNCTION")
    }
    const randomHanlde = () => {
        var randomArray = playlist;
        for (let i = randomArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [randomArray[i], randomArray[j]] = [randomArray[j], randomArray[i]];
        }
        setPlaylist([...randomArray]);
        setCurrentSong(0);
        console.log({randomArray});
    }
    const showHanlde = () => {

        console.log({playlist});
    }
    return (
        <div>

            <AudioPlayer
                // onAbort={action('onAbort')} onCanPlay={action('onCanPlay')} onCanPlayThrough={action('onCanPlayThrough')}
                // onEnded={action('onEnded')} onPlaying={action('onPlaying')} onSeeking={action('onSeeking')} onSeeked={action('onSeeked')}
                //  onLoadStart={action('onLoadStart')} onLoadedMetaData={action('onLoadedMetaData')} onLoadedData={action('onLoadedData')}
                //  onError={action('onError')} onListen={action('onListen')} onVolumeChange={action('onVolumeChange')} onPause={action('onPause')}
                //  onPlay={action('onPlay')} onClickPrevious={action('onClickPrevious')}
                src={playlist[currentSong]}
                onCanPlay={handleOnPlay}
                onLoadedMetaData={handleOnPlay}
                preload="auto"
                autoPlay={true}
                onPlayError={handleOnError}
                onLoadStart={handleOnPlay}
                onPlay={handleOnPlay}
                onPause={handleOnPause}
                onClickNext={handleNextSong}
                onClickPrevious={handlePerviousSong}
                onEnded={handleOnEnd}
                volume={1}
                onError={handleOnError}
                showSkipControls
                progressUpdateInterval={100}
                header={[
                    <img style={{width:"100%"}} src="https://img.freepik.com/free-photo/abstract-watercolor-guitar-exploding-with-colorful-motion-generated-by-ai_188544-19725.jpg" alt=""/>,
                    ]
                }
                customControlsSection={
                    [
                        <ShuffleIcon key="random" onClick={randomHanlde}></ShuffleIcon>,
                        RHAP_UI.ADDITIONAL_CONTROLS,
                        RHAP_UI.MAIN_CONTROLS,
                        RHAP_UI.VOLUME_CONTROLS,
                    ]
                }
                customIcons={{
                    loop:<RepeatOnIcon />,
                    loopOff: <RepeatSharpIcon/>
                }}
            />
            <button onClick={showHanlde}>Bam</button>


        </div>
    )
}
export default Music;