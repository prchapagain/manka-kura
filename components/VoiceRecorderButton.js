import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import MicrophoneIcon from './icons/MicrophoneIcon';
const VoiceRecorderButton = ({ onRecordingComplete, onRecordingError }) => {
    const { translate } = useLanguage();
    const [isRecording, setIsRecording] = useState(false);
    const [isMicAllowed, setIsMicAllowed] = useState(null);
    const [countdown, setCountdown] = useState(0);
    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);
    // Fix: Changed NodeJS.Timeout to number for browser compatibility.
    const timerRef = useRef(null);
    const recordingStartTimeRef = useRef(0);
    useEffect(() => {
        // Check initial permission status without prompting
        navigator.permissions?.query({ name: 'microphone' }).then(permissionStatus => {
            setIsMicAllowed(permissionStatus.state === 'granted');
            permissionStatus.onchange = () => {
                setIsMicAllowed(permissionStatus.state === 'granted');
            };
        }).catch(() => setIsMicAllowed(false)); // Assume denied if query fails
    }, []);
    const startRecording = async () => {
        if (isMicAllowed === false) {
            alert("Microphone access is denied. Please enable it in your browser settings.");
            onRecordingError("Microphone access denied.");
            return;
        }
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            setIsMicAllowed(true);
            mediaRecorderRef.current = new MediaRecorder(stream);
            audioChunksRef.current = [];
            mediaRecorderRef.current.ondataavailable = (event) => {
                audioChunksRef.current.push(event.data);
            };
            mediaRecorderRef.current.onstop = () => {
                const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
                const audioUrl = URL.createObjectURL(audioBlob);
                const duration = (Date.now() - recordingStartTimeRef.current) / 1000;
                onRecordingComplete(audioUrl, duration);
                // Clean up stream tracks
                stream.getTracks().forEach(track => track.stop());
            };
            recordingStartTimeRef.current = Date.now();
            mediaRecorderRef.current.start();
            setIsRecording(true);
            setCountdown(60); // Max 60 seconds recording
            timerRef.current = window.setInterval(() => {
                setCountdown(prev => {
                    if (prev <= 1) {
                        stopRecording();
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        catch (err) {
            console.error("Error accessing microphone:", err);
            setIsMicAllowed(false);
            onRecordingError("Could not access microphone. Please ensure it's enabled and not in use.");
        }
    };
    const stopRecording = () => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
            mediaRecorderRef.current.stop();
        }
        setIsRecording(false);
        if (timerRef.current)
            clearInterval(timerRef.current);
        setCountdown(0);
    };
    const handleButtonClick = () => {
        if (isRecording) {
            stopRecording();
        }
        else {
            startRecording();
        }
    };
    return (_jsxs("button", { type: "button", onClick: handleButtonClick, className: `flex items-center justify-center space-x-2 px-4 py-2 border rounded-lg transition-colors
                  ${isRecording ? 'bg-red-500 hover:bg-red-600 text-white border-red-500'
            : 'bg-transparent border-primary text-primary hover:bg-primary-light hover:text-primary-dark dark:hover:bg-primary-dark dark:hover:text-primary-light'}`, children: [_jsx(MicrophoneIcon, { className: "w-5 h-5" }), _jsx("span", { children: isRecording ? `${translate('recording')} (${countdown}s)` : translate('recordVoice') })] }));
};
export default VoiceRecorderButton;
