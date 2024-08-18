import { useState, useRef , useEffect } from "react";
import { toast } from "react-toastify";
import RecordRTC from "recordrtc";

const useScreenAudioRecorder = () => {
  const [status, setStatus] = useState("idle");
  const [mediaBlobUrl, setMediaBlobUrl] = useState(null);
  const [audioBlobUrl, setAudioBlobUrl] = useState(null);
  const screenVideoRef = useRef(null);
  const webcamVideoRef = useRef(null);
  const recorderRef = useRef(null);
  const audioRecorderRef = useRef(null);
  const streamsRef = useRef({
    displayStream: null,
    audioStream: null,
    webcamStream: null,
  });

  const getDisplayStream = async () => {
    try {
      const displayStream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: true,
      });
      console.log("Display stream obtained.");
      return displayStream;
    } catch (error) {
      console.error("Error getting display stream: ", error);
      throw new Error("Display permission denied.");
    }
  };

  const getAudioStream = async () => {
    try {
      const audioStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      console.log("Audio stream obtained.");
      return audioStream;
    } catch (error) {
      console.error("Error getting audio stream: ", error);
      throw new Error("Audio permission denied.");
    }
  };

  const getWebcamStream = async () => {
    try {
      const webcamStream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      console.log("Webcam stream obtained.");
      return webcamStream;
    } catch (error) {
      console.error("Error getting webcam stream: ", error);
      throw new Error("Webcam permission denied.");
    }
  };


  // const startRecording = async () => {
  //   console.log("Starting recording process...");
    
  //   setStatus("requesting_permissions");
    
  //   try {
  //     const displayStream = await getDisplayStream();
  //     const audioStream = await getAudioStream();
  //     const webcamStream = await getWebcamStream();
  
  //     // Save streams to ref
  //     streamsRef.current = { displayStream, audioStream, webcamStream };
  
  //     // Create combined stream
  //     const combinedStream = new MediaStream([
  //       ...displayStream.getVideoTracks(),
  //       ...audioStream.getAudioTracks(),
  //     ]);
  
  //     // Check if combined stream has audio tracks
  //     if (!combinedStream.getAudioTracks().length) {
  //       console.error("No audio tracks found in the combined stream.");
  //       toast.error("No audio tracks found. Ensure your microphone is enabled.", { autoClose: 1000 });
  //       setStatus("idle");
  //       return;
  //     }
  
  //     console.log("All permissions granted. Starting recording.");
  //     setStatus("recording");
  
  //     // Initialize and start recording
  //     recorderRef.current = new RecordRTC(combinedStream, {
  //       type: "video",
  //       mimeType: "video/webm",
  //       bitsPerSecond: 300000,
  //     });
  //     recorderRef.current.startRecording();
  
  //     audioRecorderRef.current = new RecordRTC(audioStream, {
  //       type: "audio",
  //       mimeType: "audio/webm",
  //     });
  //     audioRecorderRef.current.startRecording();
  
  //     // Set video sources if refs are available
  //     if (screenVideoRef.current) {
  //       screenVideoRef.current.srcObject = combinedStream;
  //       screenVideoRef.current.play();
  //     } else {
  //       console.error("screenVideoRef is not set.");
  //       toast.error("Screen video element is not available.", { autoClose: 1000 });
  //     }
  
  //     if (webcamVideoRef.current) {
  //       webcamVideoRef.current.srcObject = webcamStream;
  //       webcamVideoRef.current.play();
  //     } else {
  //       console.error("webcamVideoRef is not set.");
  //       toast.error("Webcam video element is not available.", { autoClose: 1000 });
  //     }
      
  //   } catch (error) {
  //     console.error("Error starting recording: ", error.message);
  //     setStatus("idle");
  //     toast.error(`Failed to start recording: ${error.message}`, { autoClose: 1000 });
  //   }
  // };
  


  // const startRecording = async () => {
  //   console.log("   ayaaaa   ");
    
  //   setStatus("requesting_permissions");
  //   console.log("   ayaaaa11   ");
  //   try {
  //     const displayStream = await getDisplayStream();
  //     const audioStream = await getAudioStream();
  //     const webcamStream = await getWebcamStream();
  //     console.log("   ayaaaa12   ");
      
  //     streamsRef.current = { displayStream, audioStream, webcamStream };
      
  //     const combinedStream = new MediaStream([
  //       ...displayStream.getVideoTracks(),
  //       ...audioStream.getAudioTracks(),
  //     ]);
      
  //     console.log("   ayaaaa13   ");
  //     if (!combinedStream.getAudioTracks().length) {
  //       console.error("No audio tracks found in the combined stream.");
  //       toast.error(
  //         "No audio tracks found. Ensure your microphone is enabled.",
  //         { autoClose: 1000 }
  //       );
  //       setStatus("idle");
  //       return;
  //     }
      
  //     console.log("   ayaaaa14   ");
  //     console.log("All permissions granted. Starting recording.");
  //     setStatus("recording");
  //     console.log("   ayaaaa15   ");
      
  //     // Start recording video
  //     recorderRef.current = new RecordRTC(combinedStream, {
  //       type: "video",
  //       mimeType: "video/webm",
  //       bitsPerSecond: 300000,
  //     });
  //     recorderRef.current.startRecording();
      
  //     console.log("   ayaaaa16   ");
  //     // Start recording audio separately
  //     audioRecorderRef.current = new RecordRTC(audioStream, {
  //       type: "audio",
  //       mimeType: "audio/webm",
  //     });
  //     audioRecorderRef.current.startRecording();
  //     console.log("   ayaaaa17   ");
  //     console.log(" combined stream is   " , combinedStream)
      

  //     screenVideoRef.current.srcObject = combinedStream;
  //     console.log("   ayaaaa18   ");
  //     // console.log("screenVidio current is   "  , screenVideoRef.current);
  //     console.log(" skdbf sjsbj  " , screenVideoRef.current.tagName);
  //     screenVideoRef.current.play();
  //     console.log("   ayaaaa19   ");
  //     webcamVideoRef.current.srcObject = webcamStream;
  //     console.log("   ayaaaa20   ");
  //     webcamVideoRef.current.play();
  //     console.log("   ayaaaa21   ");
  //   } catch (error) {
  //     console.error("Error starting recording: ", error.message);
  //     setStatus("idle");
  //     toast.error(`Failed to start recording: ${error.message}`, {
  //       autoClose: 1000,
  //     });
  //   }
  // };

  const statusRef = useRef(status);  // Persistent ref to track statu

 // useEffect to log the status whenever it changes
 useEffect(() => {
  statusRef.current = status;
  // console.log("Status updated:", status);
}, [status]);


// const updateStatus = (newStatus) => {
//   setStatus((prevStatus) => {
//       console.log(`Changing status from ${prevStatus} to ${newStatus}`);
//       return newStatus;
//   });
// };


const startRecording = async () => {
  console.log("Starting recording process...");

  if (!screenVideoRef.current || screenVideoRef.current.tagName !== 'VIDEO') {
      console.error("screenVideoRef is not correctly assigned to a video element.");
      return;
  }

  if (!webcamVideoRef.current || webcamVideoRef.current.tagName !== 'VIDEO') {
      console.error("webcamVideoRef is not correctly assigned to a video element.");
      return;
  }

  setStatus("requesting_permissions");

  try {
      const displayStream = await getDisplayStream();
      const audioStream = await getAudioStream();
      const webcamStream = await getWebcamStream();

      const combinedStream = new MediaStream([
          ...displayStream.getVideoTracks(),
          ...audioStream.getAudioTracks(),
      ]);

      if (!combinedStream.getAudioTracks().length) {
          console.error("No audio tracks found in the combined stream.");
          toast.error(
              "No audio tracks found. Ensure your microphone is enabled.",
              { autoClose: 1000 }
          );
          setStatus("idle");
          return;
      }

      // Ensure status is set to "recording"
      setStatus("recording");
      console.log("Recorder state changed: recording");

      // Start recording video
      recorderRef.current = new RecordRTC(combinedStream, {
          type: "video",
          mimeType: "video/webm",
          bitsPerSecond: 300000,
      });
      recorderRef.current.startRecording();

      // Start recording audio separately
      audioRecorderRef.current = new RecordRTC(audioStream, {
          type: "audio",
          mimeType: "audio/webm",
      });
      audioRecorderRef.current.startRecording();

      // Set and play combined stream on screenVideoRef
      if (screenVideoRef.current) {
          screenVideoRef.current.srcObject = combinedStream;
          screenVideoRef.current.play();
      }

      // Set and play webcam stream on webcamVideoRef
      if (webcamVideoRef.current) {
          webcamVideoRef.current.srcObject = webcamStream;
          webcamVideoRef.current.play();
      }

      // Log the status right after setting up the video
      console.log("Status after setting up webcam video:", status);

  } catch (error) {
      console.error("Error starting recording: ", error.message);
      setStatus("idle");
      toast.error(`Failed to start recording: ${error.message}`, {
          autoClose: 1000,
      });
  }
};








  const stopRecording = () => {
    setStatus("stopped");

    // Stop video recording
    recorderRef.current.stopRecording(() => {
      const blob = recorderRef.current.getBlob();
      const url = URL.createObjectURL(blob);
      setMediaBlobUrl(url);
    });

    // Stop audio recording
    audioRecorderRef.current.stopRecording(() => {
      const blob = audioRecorderRef.current.getBlob();
      const url = URL.createObjectURL(blob);
      setAudioBlobUrl(url);
    });

    // Stop and clear all streams
    const { displayStream, audioStream, webcamStream } = streamsRef.current;
    if (displayStream) {
      displayStream.getTracks().forEach((track) => track.stop());
    }
    if (audioStream) {
      audioStream.getTracks().forEach((track) => track.stop());
    }
    if (webcamStream) {
      webcamStream.getTracks().forEach((track) => track.stop());
    }

    screenVideoRef.current.srcObject = null;
    webcamVideoRef.current.srcObject = null;
  };

  const downloadVideo = () => {
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = mediaBlobUrl;
    a.download = "recorded-video.webm";
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(mediaBlobUrl);
    document.body.removeChild(a);
  };

  const downloadAudio = () => {
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = audioBlobUrl;
    a.download = "recorded-audio.webm";
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(audioBlobUrl);
    document.body.removeChild(a);
  };

  return {
    status,
    startRecording,
    stopRecording,
    mediaBlobUrl,
    audioBlobUrl,
    screenVideoRef,
    webcamVideoRef,
    downloadVideo,
    downloadAudio,
  };
};

export default useScreenAudioRecorder;
