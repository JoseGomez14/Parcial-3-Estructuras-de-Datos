import { addresses } from "./addresses.js";
import { getLocationInfo } from "./utils.js";

const parsedAddresses = [];

// Split the addresses into subsets of 30 and make a request for each subset to get the location info
for (let i = 0; i < Math.ceil(addresses.length / 30); i++) {
  const addressSubset = addresses.slice(i * 30, (i + 1) * 30);

  Promise.all(
    addressSubset.map((address) => {
      return getLocationInfo(address);
    })
  )
    .then((parsedSubset) => {
      parsedAddresses.push(...parsedSubset);
    })
    .catch((err) => {
      console.log(err);
    });
}
