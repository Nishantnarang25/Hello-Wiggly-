import React from "react";

const moodConfigs = {
  happy: {
    tailSpeed: "0.4s",
    tailDegree: 35,
    earAnimation: "earPerk",
    eyeBlinkSpeed: 4,
    pupilMove: 6,
    mouth: "smile",
    bgColor: "#FFF7E6",   // Plain color instead of gradient
    message: "Yay! I'm happy too! 🐶",
    pawWave: true,
    extras: "hearts",
    bodyAnimation: "bounce",
  },
  sad: {
    tailSpeed: "3s",
    tailDegree: 8,
    earAnimation: "earDroop",
    eyeBlinkSpeed: 8,
    pupilMove: 1,
    mouth: "frown",
    bgColor: "#9BB9FF",   // Plain color instead of gradient
    message: "Oh no, don't be sad! 🐾",
    pawWave: false,
    extras: "tear",
    bodyAnimation: "slow-sway",
  },
  angry: {
    tailSpeed: "0.3s",
    tailDegree: 15,
    earAnimation: "earBack",
    eyeBlinkSpeed: 6,
    pupilMove: 8,
    mouth: "grrr",
    bgColor: "#FF8A8A",   // Plain color
    message: "Grr! Calm down please!",
    pawWave: false,
    extras: "anger",
    bodyAnimation: "shake",
  },
  surprised: {
    tailSpeed: "1s",
    tailDegree: 40,
    earAnimation: "earPerk",
    eyeBlinkSpeed: 1,
    pupilMove: 12,
    mouth: "open",
    bgColor: "#FFD1E6",   // Plain color
    message: "Wow! What surprised you?",
    pawWave: false,
    extras: "question",
    bodyAnimation: "bounce",
  },
  neutral: {
    tailSpeed: "1.5s",
    tailDegree: 15,
    earAnimation: "earIdle",
    eyeBlinkSpeed: 5,
    pupilMove: 3,
    mouth: "neutral",
  bgColor: "#ffffff",
      message: "Just chilling.",
    pawWave: false,
    extras: null,
    bodyAnimation: "idle",
  },
  fearful: {
    tailSpeed: "4s",
    tailDegree: 4,
    earAnimation: "earBack",
    eyeBlinkSpeed: 3,
    pupilMove: 1,
    mouth: "worried",
    bgColor: "#80DEEA",   // Plain color
    message: "I'm scared!",
    pawWave: false,
    extras: "sweat",
    bodyAnimation: "shake-slow",
  },
  disgusted: {
    tailSpeed: "4s",
    tailDegree: 5,
    earAnimation: "earDroop",
    eyeBlinkSpeed: 6,
    pupilMove: 2,
    mouth: "disgusted",
    bgColor: "#C1B3FF",   // Plain color
    message: "Yuck! That's gross.",
    pawWave: false,
    extras: "tongue",
    bodyAnimation: "idle",
  },
};


const ExtrasSVG = ({ type }) => {
  switch (type) {
    case "hearts":
      return (
        <>
          <circle className="heart1" cx="30" cy="30" r="6" fill="#FF5E6C" />
          <circle className="heart2" cx="50" cy="15" r="8" fill="#FF8AAE" />
          <circle className="heart3" cx="70" cy="35" r="5" fill="#FF5E6C" />
        </>
      );
    case "tear":
      return (
        <ellipse className="tear" cx="150" cy="130" rx="8" ry="12" fill="#5CC1F7" />
      );
    case "anger":
      return (
        <>
          <line className="anger-mark anger1" x1="140" y1="40" x2="160" y2="20" stroke="#FF3B3B" strokeWidth="4" />
          <line className="anger-mark anger2" x1="155" y1="40" x2="135" y2="20" stroke="#FF3B3B" strokeWidth="4" />
        </>
      );
    case "question":
      return (
        <text className="question-mark" x="160" y="40" fontSize="30" fill="#4A90E2" fontWeight="bold">?</text>
      );
    case "sweat":
      return (
        <ellipse className="sweat-drop" cx="150" cy="100" rx="7" ry="10" fill="#5CC1F7" />
      );
    case "tongue":
      return (
        <ellipse className="tongue" cx="100" cy="160" rx="15" ry="10" fill="#FF6B6B" />
      );
    default:
      return null;
  }
};

const Pet = ({ mood = "neutral" }) => {
  const m = mood.toLowerCase();
  const config = moodConfigs[m] || moodConfigs.neutral;

  return (
    <>
      <style>{`
        .dog-container {
          width: 280px;
          height: 320px;
          margin: auto;
          border-radius: 30px;
          padding: 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          user-select: none;
          animation: ${config.bodyAnimation} 2s ease-in-out infinite;
          transition: background 0s ease;
          position: relative;
          overflow: visible;
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        @keyframes slow-sway {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(3deg); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25%, 75% { transform: translateX(-6px); }
          50% { transform: translateX(6px); }
        }
        @keyframes shake-slow {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(-3px); }
        }
        @keyframes idle {
          0%, 100% { transform: translateY(0); }
        }

        svg {
          width: 400px;
          height: 400px;
          overflow: visible;
        }

        /* Tail wagging */
        .tail {
          transform-origin: left center;
          animation: wag ${config.tailSpeed} infinite ease-in-out;
        }
        @keyframes wag {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(${config.tailDegree}deg); }
        }

        /* Ear animations */
        .ear-left, .ear-right {
          transform-origin: bottom center;
          animation-iteration-count: infinite;
          animation-timing-function: ease-in-out;
          animation-name: earIdle;
          animation-duration: 1.5s;
        }
        .ear-right {
          animation-delay: 0.3s;
        }
        /* Specific ear animations */
        @keyframes earIdle {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(5deg); }
        }
        @keyframes earPerk {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(20deg); }
        }
        @keyframes earDroop {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(-15deg); }
        }
        @keyframes earBack {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(-25deg); }
        }

        /* Dynamic ear animation based on mood */
        .ear-left {
          animation-name: ${config.earAnimation};
          animation-duration: ${config.earAnimation === "earBack" ? "1s" : "1.5s"};
        }
        .ear-right {
          animation-name: ${config.earAnimation};
          animation-duration: ${config.earAnimation === "earBack" ? "1s" : "1.5s"};
          animation-delay: 0.3s;
        }

        /* Eye blinking */
        .eye-white {
          animation: blink ${config.eyeBlinkSpeed}s infinite;
          transform-origin: center;
        }
        @keyframes blink {
          0%, 3%, 97%, 100% { transform: scaleY(1); }
          4%, 6% { transform: scaleY(0.1); }
        }

        /* Pupils move left-right */
        .pupil {
          animation: eyeMove 4s infinite ease-in-out;
          animation-timing-function: cubic-bezier(.36,.07,.19,.97);
          transform-origin: center;
          transform-box: fill-box;
          animation-direction: alternate;
          animation-duration: ${4 - config.eyeBlinkSpeed / 2}s;
        }
        @keyframes eyeMove {
          0% { transform: translateX(-${config.pupilMove}px); }
          100% { transform: translateX(${config.pupilMove}px); }
        }

        /* Mouth shapes */
        .mouth-smile {
          stroke-dasharray: 40;
          stroke-dashoffset: 0;
          transition: stroke-dashoffset 0.3s;
        }
        .mouth-frown {
          stroke-dasharray: 40;
          stroke-dashoffset: 40;
          transition: stroke-dashoffset 0.3s;
        }
        .mouth-open {
          fill: #FF6B6B;
          transition: transform 0.3s;
          animation: mouthBounce 2s ease-in-out infinite;
          transform-origin: center;
        }
        @keyframes mouthBounce {
          0%, 100% { transform: scaleY(1); }
          50% { transform: scaleY(1.2); }
        }
        .mouth-grrr {
          stroke: #FF3B3B;
          stroke-width: 3;
          stroke-linejoin: round;
          animation: grrrShake 0.3s infinite alternate;
        }
        @keyframes grrrShake {
          0% { transform: translateX(0); }
          100% { transform: translateX(3px); }
        }
        .mouth-worried {
          stroke: #000;
          stroke-width: 2;
          fill: none;
        }
        .mouth-disgusted {
          stroke: none;
          fill: #C0FF99;
          transform-origin: center;
          animation: disgustedSlide 3s ease-in-out infinite;
        }
        @keyframes disgustedSlide {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(5px); }
        }

        /* Paw wave */
        .paw {
          position: absolute;
          bottom: 25px;
          right: 25px;
          width: 60px;
          height: 60px;
          background: #A5692D;
          border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
          transform-origin: center bottom;
          animation: pawWave 2s ease-in-out infinite;
          box-shadow: 0 2px 4px rgba(0,0,0,0.15);
        }
        @keyframes pawWave {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(20deg); }
        }

        /* Extras animations */
        .heart1, .heart2, .heart3 {
          animation: heartFloat 3s ease-in-out infinite;
          opacity: 0.9;
        }
        .heart2 {
          animation-delay: 1s;
          r: 8;
        }
        .heart3 {
          animation-delay: 2s;
          r: 5;
        }
        @keyframes heartFloat {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0.9; }
          50% { transform: translateY(-10px) scale(1.2); opacity: 0.7; }
        }
        .tear {
          animation: tearDrop 3s ease-in-out infinite;
          opacity: 0.9;
        }
        @keyframes tearDrop {
          0%, 100% { transform: translateY(0); opacity: 0.9; }
          50% { transform: translateY(8px); opacity: 0.6; }
        }
        .anger-mark {
          animation: angerShake 0.3s ease-in-out infinite alternate;
          stroke-linecap: round;
        }
        .anger1 {
          animation-delay: 0s;
        }
        .anger2 {
          animation-delay: 0.15s;
        }
        @keyframes angerShake {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(20deg); }
        }
        .question-mark {
          animation: questionBounce 2s ease-in-out infinite;
        }
        @keyframes questionBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .sweat-drop {
          animation: sweatDrip 2s ease-in-out infinite;
          opacity: 0.8;
        }
        @keyframes sweatDrip {
          0%, 100% { transform: translateY(0); opacity: 0.8; }
          50% { transform: translateY(10px); opacity: 0.5; }
        }
        .tongue {
          animation: tongueWiggle 1.5s ease-in-out infinite;
          transform-origin: center;
        }
        @keyframes tongueWiggle {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(20deg); }
        }

        /* Speech bubble */
        .message {
          margin-top: 18px;
          font-weight: 600;
          font-size: 1.15rem;
          color: #3b3054;
          max-width: 190px;
          padding: 12px 16px;
          border-radius: 22px;
          background: #fff;
          box-shadow: 0 2px 12px rgba(0,0,0,0.12);
          position: relative;
          opacity: 0;
          animation: fadeInOut 4s ease-in-out infinite;
          user-select: none;
          text-align: center;
        }
        @keyframes fadeInOut {
          0%, 20%, 80%, 100% { opacity: 0; }
          40%, 60% { opacity: 1; }
        }
      `}</style>

      <div className="dog-container" aria-label={`Dog pet with mood ${mood}`}>
        <svg viewBox="0 0 200 200" role="img" aria-hidden="true" >
          {/* Face */}
          <circle cx="100" cy="100" r="80" fill="#D19C66" stroke="#6B4F1D" strokeWidth="4" />

          {/* Ears */}
          <polygon className="ear-left" points="40,60 60,20 80,60" fill="#A5692D" />
          <polygon className="ear-right" points="160,60 140,20 120,60" fill="#A5692D" />

          {/* Eyes */}
          <ellipse className="eye-white" cx="70" cy="90" rx="10" ry="15" fill="#fff" stroke="#6B4F1D" strokeWidth="2" />
          <ellipse className="eye-white" cx="130" cy="90" rx="10" ry="15" fill="#fff" stroke="#6B4F1D" strokeWidth="2" />

          {/* Pupils */}
          <circle className="pupil" cx="70" cy="95" r="5" fill="#000" />
          <circle className="pupil" cx="130" cy="95" r="5" fill="#000" />

          {/* Nose */}
          <ellipse cx="100" cy="125" rx="10" ry="7" fill="#000" />

          {/* Mouth */}
          {m === "happy" && (
            <path className="mouth-smile" d="M70,140 Q100,170 130,140" stroke="#6B4F1D" strokeWidth="4" fill="none" strokeLinecap="round" />
          )}
          {m === "sad" && (
            <path className="mouth-frown" d="M70,160 Q100,130 130,160" stroke="#6B4F1D" strokeWidth="4" fill="none" strokeLinecap="round" />
          )}
          {m === "angry" && (
            <path className="mouth-grrr" d="M75,145 Q100,140 125,145" fill="none" stroke="#FF3B3B" strokeWidth="3" strokeLinejoin="round" />
          )}
          {m === "surprised" && (
            <ellipse className="mouth-open" cx="100" cy="150" rx="15" ry="10" />
          )}
          {m === "neutral" && (
            <line x1="70" y1="145" x2="130" y2="145" stroke="#6B4F1D" strokeWidth="4" strokeLinecap="round" />
          )}
                   {m === "fearful" && (
            <path className="mouth-worried" d="M70,150 Q100,160 130,150" stroke="#6B4F1D" strokeWidth="3" fill="none" strokeLinecap="round" />
          )}
          {m === "disgusted" && (
            <ellipse className="mouth-disgusted" cx="100" cy="150" rx="20" ry="12" />
          )}

          {/* Tail */}
          <rect className="tail" x="180" y="110" width="40" height="12" fill="#A5692D" rx="6" ry="6" />

          {/* Extras like hearts, tears, anger marks, etc. */}
          <ExtrasSVG type={config.extras} />
        </svg>

        {/* Paw wave if applicable */}
        {config.pawWave && <div className="paw" aria-label="Waving paw" />}

        {/* Mood message */}
        <div className="message" role="status" aria-live="polite">{config.message}</div>
      </div>
    </>
  );
};


export default Pet;
export { moodConfigs };