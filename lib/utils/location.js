import Script from "next/script";
import { sendtoback } from "./sendtoback";

export function geolocateClient(picture_data, backAddress){
  if ("geolocation" in navigator) {
    // check if geolocation is supported/enabled on current browser
    navigator.geolocation.getCurrentPosition(
      function success(position) {
        // for when getting location is a success
        console.log('latitude', position.coords.latitude, 
                    'longitude', position.coords.longitude);
        sendtoback([position.coords.latitude, position.coords.longitude], picture_data, backAddress)
      },
      function error(error_message) {
        // for when getting location results in an error
        console.error('An error has occured while retrieving location', error_message);
        geolocateClient(picture_data, backAddress);
      }
    )
  } else {
    // geolocation is not supported
    // get your location some other way
    console.log('geolocation is not enabled on this browser')
    return "unavailable"
  }
}

export function genLocation(){
  return (
    <Script
      id='locator'
      strategy='afterInteractive'>
        {`${geolocateClient}`}
    </Script>
  )
}