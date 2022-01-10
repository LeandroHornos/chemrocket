/*
Este Hook permite conocer el estado de fullscreen
*/

import { useLayoutEffect, useState } from "react";

export default function useFullScreen() {
  const [fullScreen, setFullScreen] = useState(false);
  useLayoutEffect(() => {
    function updateFullScreen() {
      if (
        document.fullscreenElement ||
        document.mozFullScreenElement ||
        document.webkitFullscreenElement ||
        document.msFullscreenElement ||
        document.fullscreen ||
        document.mozFullScreen ||
        document.webkitIsFullScreene ||
        document.fullScreenMode
      ) {
        setFullScreen(true);
      } else {
        setFullScreen(false);
      }
    }
    document.addEventListener("webkitfullscreenchange", updateFullScreen);
    document.addEventListener("mozfullscreenchange", updateFullScreen);
    document.addEventListener("msfullscreenchange", updateFullScreen);
    document.addEventListener("MSFullscreenChange", updateFullScreen); //IE11
    document.addEventListener("fullscreenchange", updateFullScreen);

    return () => {
      document.removeEventListener("webkitfullscreenchange", updateFullScreen);
      document.removeEventListener("mozfullscreenchange", updateFullScreen);
      document.removeEventListener("msfullscreenchange", updateFullScreen);
      document.removeEventListener("MSFullscreenChange", updateFullScreen);
      document.removeEventListener("fullscreenchange", updateFullScreen);
    };
    
  }, []);
  return fullScreen;
}
