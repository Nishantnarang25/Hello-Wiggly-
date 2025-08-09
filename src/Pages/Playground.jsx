import React, { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";
import * as tf from "@tensorflow/tfjs";
import Pet, { moodConfigs } from "../components/Pet"; // assuming you export moodConfigs too

const MODEL_URL = "/models";
const DETECTION_INTERVAL_MS = 200; // ~5 FPS
const EXPRESSION_CONFIDENCE_THRESHOLD = 0.5;
const HISTORY_LENGTH = 5; // number of frames to smooth over

const Playground = () => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const streamRef = useRef(null);
    const rafRef = useRef(null);
    const lastDetectRef = useRef(0);
    const predictionHistoryRef = useRef([]);

    const [expression, setExpression] = useState("neutral");
    const [loading, setLoading] = useState(true);
    const [cameraActive, setCameraActive] = useState(false);

    const startVideo = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            streamRef.current = stream;
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                videoRef.current.onloadedmetadata = () => {
                    videoRef.current.play().catch(() => { });
                    setCameraActive(true);
                };
            }
        } catch (err) {
            console.error("Error accessing webcam:", err);
            setExpression("Error");
            setLoading(false);
        }
    };

    useEffect(() => {
        let mounted = true;

        const init = async () => {
            try {
                await tf.setBackend("webgl").catch(() => { });
                await tf.ready();

                await Promise.all([
                    faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL),
                    faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
                    faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
                ]);

                if (!mounted) return;
                setLoading(false);
                await startVideo();
                startDetectLoop();
            } catch (err) {
                console.error("Initialization error:", err);
                setExpression("Failed");
                setLoading(false);
            }
        };

        const startDetectLoop = () => {
            const detect = async (now) => {
                if (!lastDetectRef.current) lastDetectRef.current = now;
                const elapsed = now - lastDetectRef.current;

                if (videoRef.current?.readyState === 4 && elapsed >= DETECTION_INTERVAL_MS) {
                    lastDetectRef.current = now;

                    try {
                        const detection = await faceapi
                            .detectSingleFace(videoRef.current, new faceapi.SsdMobilenetv1Options({ minConfidence: 0.5 }))
                            .withFaceLandmarks()
                            .withFaceExpressions();

                        const displaySize = {
                            width: videoRef.current.videoWidth,
                            height: videoRef.current.videoHeight,
                        };

                        if (canvasRef.current) {
                            canvasRef.current.width = displaySize.width;
                            canvasRef.current.height = displaySize.height;
                        }

                        let currentEmotion = "neutral"; // lowercase to match keys

                        if (detection) {
                            const resized = faceapi.resizeResults(detection, displaySize);
                            const ctx = canvasRef.current.getContext("2d");
                            ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
                            faceapi.draw.drawDetections(canvasRef.current, resized);
                            faceapi.draw.drawFaceLandmarks(canvasRef.current, resized);
                            faceapi.draw.drawFaceExpressions(canvasRef.current, resized);

                            const exp = detection.expressions;
                            const top = Object.entries(exp).reduce((a, b) => (a[1] > b[1] ? a : b));
                            const [expName, expScore] = top;

                            if (expScore >= EXPRESSION_CONFIDENCE_THRESHOLD) {
                                currentEmotion = expName.toLowerCase();
                            }
                        }

                        predictionHistoryRef.current.push(currentEmotion);
                        if (predictionHistoryRef.current.length > HISTORY_LENGTH) {
                            predictionHistoryRef.current.shift();
                        }

                        const freq = predictionHistoryRef.current.reduce((acc, emo) => {
                            acc[emo] = (acc[emo] || 0) + 1;
                            return acc;
                        }, {});
                        const mostFrequentEmotion = Object.entries(freq).sort((a, b) => b[1] - a[1])[0][0];
                        setExpression(mostFrequentEmotion);
                    } catch (err) {
                        console.error("Detection error:", err);
                    }
                }

                rafRef.current = requestAnimationFrame(detect);
            };

            rafRef.current = requestAnimationFrame(detect);
        };

        init();

        return () => {
            mounted = false;
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            streamRef.current?.getTracks().forEach((t) => t.stop());
        };
    }, []);

    // Get background style from moodConfigs or fallback
    const bgStyle = {
        background: moodConfigs[expression]?.bgColor || moodConfigs.neutral.bgColor,
transition: "background 0.3s ease-in-out",
        minHeight: "100vh",
    };


    return (
        <div
            style={bgStyle}
            className="w-screen flex flex-col items-center justify-center font-sans p-4 select-none"
        >
            {/* Heading */}
            <h1
                className={`text-5xl font-medium text-black/80 mb-24 select-none transition-opacity duration-700 ${cameraActive ? "opacity-100" : "opacity-0"
                    }`}
            >
                Hello Wiggly!      </h1>

            {/* Pet centered */}
            <div
                className={`transition-opacity duration-700 ${cameraActive ? "opacity-100" : "opacity-0"}`}
                aria-live="polite"
            >
                <Pet mood={expression} />
            </div>

            {/* Camera + canvas container */}
            <div
                className={`fixed bottom-6 right-6 w-[320px] h-[240px] rounded-3xl overflow-hidden shadow-2xl border-8 border-white transition-all duration-1000 ease-in-out
        ${cameraActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                aria-label="Camera preview"
            >
                <video
                    ref={videoRef}
                    autoPlay
                    muted
                    playsInline
                    width={320}
                    height={240}
                    className="absolute top-0 left-0 object-cover w-full h-full"
                />
                <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />
            </div>


            {/* Welcome before activation */}
            {!cameraActive && (
                <p className="max-w-xl text-center text-black/80 mt-6 px-4 transition-opacity duration-700 select-text">
                    Welcome! Please allow camera access to meet your pet friend.
                </p>
            )}
        </div>
    );
};

export default Playground;
