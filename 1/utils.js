const API_KEY = "AIzaSyBavEgJ2RBSja12HpsqO00eXwy9EuFbqNY";

export const calcDistance = (lat1, lon1, lat2, lon2) => {
  const latDistance = lat2 - lat1;
  const lonDistance = lon2 - lon1;

  return latDistance ** 2 + lonDistance ** 2;
};

export const getLocationInfo = (address) => {
  return fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${API_KEY}`
  )
    .then((res) => res.json())
    .then((res) => {
      return {
        ...res.results[0].geometry.location,
        address: res.results[0].formatted_address,
        postalCode: res.results[0].address_components[6].long_name,
      };
    })
    .catch((err) => {
      console.log(err);
      console.log(address);
    });
};
