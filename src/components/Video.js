import React, { useEffect, useState, useRef } from "react";

// react icons
import { FiPlay, FiPause, FiVolume2 } from "react-icons/fi";
import { RiFullscreenLine } from "react-icons/ri";
import { AiFillForward, AiFillBackward } from "react-icons/ai";

const Video = ({ source }) => {
  const [url, setUrl] = useState("");
  const [loadend, setLoadend] = useState(false);
  const [progressbar, setProgressbar] = useState(null);

  useEffect(() => {
    let reader = new FileReader();
    if (source) {
      /*  on error */
      reader.onerror = (e) => {
        alert("an error occured ");
      };
      /*  end of on error */

      /* on loadstart and end */
      reader.onloadstart = () => {
        setLoadend(false);
      };
      reader.onloadend = () => {
        setLoadend(true);
        window.scrollTo({
          left: 0,
          top: 900,
          behavior: "smooth",
        });
      };
      /* end of on loadstart */

      /* onprogress */
      reader.onprogress = (e) => {
        if (e.lengthComputable) {
          let percentLoaded = Math.round((e.loaded / e.total) * 100);
          setProgressbar(percentLoaded);
        }
      };
      /* end of onprogress */
      /* on load */
      reader.onload = (e) => {
        setUrl(e.target.result);
      };
      /* end of on load */

      reader.readAsDataURL(source);
    }
  }, [source]);

  /* hide progressbar on 100% */

  if (progressbar === 100) {
    setTimeout(() => {
      setProgressbar(null);
    }, 2000);
  }

  /* end of hide progressbar on 100% */

  /* custom controls */

  const videoRef = useRef(null);
  // let toggleBtn =
  const [toggle, setToggle] = useState("pause");

  // play pause
  const handleClickToggle = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  };

  const seekF = () => {
    videoRef.current.currentTime += 10;
  };
  const seekB = () => {
    videoRef.current.currentTime -= 10;
  };

  //console.log(videoRef?.current?.duration);

  const [totalTime, setTotalTime] = useState("");
  const [currentMediaTime, setCurrentMediaTime] = useState("");
  const [progress, setProgress] = useState(0);
  const [volRange, setVolRange] = useState(1);
  // video event on time update
  const setMediaTime = () => {
    /* total time */
    let duration = videoRef.current.duration;

    let hours = duration / 3600;
    duration %= 3600;

    let min = parseInt(duration / 60);
    duration %= 60;

    let sec = parseInt(duration);

    if (sec < 10) {
      sec = `0${sec}`;
    }
    if (min <= 10) {
      min = `0${min}`;
    }

    let mediaTotalTime;

    if (parseInt(hours, 10) > 0) {
      mediaTotalTime = `${parseInt(hours, 10)}: ${min}: ${sec}`;
    } else if (min === 0) {
      mediaTotalTime = `${sec}`;
    } else {
      mediaTotalTime = `${min}: ${sec}`;
    }

    setTotalTime(mediaTotalTime);
    /* end of total time */

    /* current time */

    let duration2 = videoRef.current.currentTime;

    let hours2 = duration2 / 3600;
    duration2 %= 3600;

    let min2 = parseInt(duration2 / 60);
    duration2 %= 60;

    let sec2 = parseInt(duration2);

    if (sec2 < 10) {
      sec2 = `0${sec2}`;
    }
    if (min2 <= 10) {
      min2 = `0${min2}`;
    }

    let mediaCurrentTime;

    if (parseInt(hours2, 10) > 0) {
      mediaCurrentTime = `${parseInt(hours2, 10)}: ${min2}: ${sec2}`;
    } else if (min2 === 0) {
      mediaCurrentTime = `${sec2}`;
    } else {
      mediaCurrentTime = `${min2}: ${sec2}`;
    }

    setCurrentMediaTime(mediaCurrentTime);

    /* end of current time */

    /* progress bar */

    let progress =
      (videoRef.current.currentTime / videoRef.current.duration) * 100;
    setProgress(progress);
    /* end of progress bar */
  };

  const fullScreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      videoRef.current.parentElement.requestFullscreen();
    }
  };

  const handleRangeChange = (e) => {
    videoRef.current[e.target.name] = e.target.value;
    setVolRange(e.target.value);
  };

  const handlePress = (e) => {
    // for play pause toggle (space)
    if (e.keyCode === 32) {
      handleClickToggle();
    } else if (e.keyCode === 70) {
      fullScreen();
    } else if (e.keyCode === 37) {
      seekB();
    } else if (e.keyCode === 39) {
      seekF();
    }
  };

  useEffect(() => {
    setToggle("pause");
    window.addEventListener("keydown", handlePress);

    return () => window.removeEventListener("keydown", handlePress);
  }, [source]);

  /* end of custom controls */

  return (
    <div className="video-container">
      {progressbar && (
        <div className="progress-bar" style={{ width: progressbar + "%" }}>
          {progressbar}%
        </div>
      )}

      {loadend && (
        <div className="video">
          <video
            onClick={handleClickToggle}
            onPlay={() => setToggle("play")}
            onPause={() => setToggle("pause")}
            src={url}
            className="player"
            ref={videoRef}
            onTimeUpdate={setMediaTime}
            onDoubleClick={fullScreen}
          ></video>
          <div className="controls">
            <div className="progress">
              <p
                className="inner-progress"
                style={{ width: progress + "%" }}
              ></p>
            </div>
            <div className="buttons">
              <div className="left">
                <button
                  className="play-toggle"
                  onClick={(e) => handleClickToggle(e)}
                >
                  {toggle === "play" ? <FiPause /> : <FiPlay />}
                </button>
                <button className="volume">
                  <FiVolume2 />
                  <input
                    type="range"
                    className="range"
                    value={volRange}
                    min="0"
                    max="1"
                    step=".1"
                    name="volume"
                    onChange={handleRangeChange}
                  />
                </button>

                <p className="time">
                  {currentMediaTime} / {totalTime}
                </p>
              </div>
              <div className="right">
                <button className="seekb" onClick={seekB}>
                  <AiFillBackward />
                  10s
                </button>
                <button className="seekf" onClick={seekF}>
                  <AiFillForward />
                  10s
                </button>
                <button className="fullscreen" onClick={fullScreen}>
                  <RiFullscreenLine />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Video;
