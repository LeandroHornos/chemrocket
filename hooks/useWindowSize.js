/*
Este Hook permite conocer el tamaño de la ventana en todo momento, ya que crea un EventListener
para Resize. Esto puede ser útil para modificar el display en base a la orientación o tamaño de 
la ventana
*/

import React, { useLayoutEffect, useState } from "react";

export default function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size;
}

// EEjemplo de uso
export function ShowWindowDimensions() {
  const [width, height] = useWindowSize();
  return (
    <span>
      Window size: {width} x {height}
    </span>
  );
}
