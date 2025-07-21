const API_KEY = "AIzaSyBmcJe-I2kBz6-OzgaxOSceU1sxMwBIwE0";

export const value_converter = (value) => {
  if (value > 1000000) {
    return Math.floor(value / 1000000) + "M";
  } else if (value >= 10001000) {
    return Math.floor(value / 1000) + "K";
  } else {
    return value;
  }
};

export default API_KEY;