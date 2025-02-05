export const latLonToPixel = (lat, lon, mapSetting) => {
  const { width, height, lonMin, lonMax, latMin, latMax } = mapSetting;
  function mercatorY(lat) {
    return Math.log(Math.tan(Math.PI / 4 + (lat * Math.PI) / 180 / 2));
  }

  const x = ((lon - lonMin) / (lonMax - lonMin)) * width;

  const top = mercatorY(latMax);
  const bottom = mercatorY(latMin);
  const y = ((top - mercatorY(lat)) / (top - bottom)) * height;
  return {
    x: Math.round(x),
    y: Math.round(y),
  };
};
