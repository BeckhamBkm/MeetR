import React, { useEffect, useRef, useState } from 'react';

const Webcam: React.FC = () => {

  const videoRef = useRef<HTMLVideoElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getWebcamStream = async () => {
      try {
        const constraints = {
          video: {
            width: { ideal: 1280 }, 
            height: { ideal: 720 },
            frameRate: { ideal: 30 }
          },
        };

        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        setError('Error accessing webcam');
        console.error(err);
      }
    };

    getWebcamStream();

    return () => {
      if (videoRef.current?.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, []); 

  return (
    <div>
      {error ? <p>{error}</p> : null}
      <video ref={videoRef} autoPlay playsInline width="100%" height="auto" />
    </div>
  );
};

export default Webcam;
