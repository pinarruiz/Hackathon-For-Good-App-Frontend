import Webcam from "react-webcam";
import { geolocateClient } from "./location";

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: { exact: "environment" }
};

export function genWebcam(backAddress){
  return (
    <Webcam
      audio={false}
      height={720}
      screenshotFormat="image/jpeg"
      width={1280}
      mirrored={false}
      videoConstraints={videoConstraints}>
      {({ getScreenshot }) => (
        <button
          id="screenshotbutton"
          onClick={() => {
            document.getElementById("screenshotbutton").disabled = true
            document.getElementById("screenshotbutton").innerHTML = "Processing image...";
            geolocateClient(getScreenshot(), backAddress);
          }}
          >
          Capture photo
        </button>
      )}
    </Webcam>
  )
}
