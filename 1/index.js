import { calcDistance, getLocationInfo } from "./utils.js";

import { mergeSort } from "./mergeSort.js";
import { parsedAddresses } from "./parsedAddresses.js";
import { writeFileSync } from "fs";

// Locations of main office
const BASE_ADDRESS = "1300 Montgomery Highway, Vestavia Hills AL 35216";
// Get the lat and lng of the base address
const parsedBaseAddress = getLocationInfo(BASE_ADDRESS);

parsedBaseAddress.then((baseAddress) => {
  // Calculate the distance between the base address and each address in the array
  const distances = parsedAddresses.map((address) => {
    return {
      ...address,
      distance: calcDistance(
        baseAddress.lat,
        baseAddress.lng,
        address.lat,
        address.lng
      ),
    };
  });

  // Sort the array by distance
  mergeSort(distances, 0, distances.length - 1, "distance");

  // Write the sorted array to a file
  writeFileSync("./1/sortedAddresses.json", JSON.stringify(distances));

  // Sort the array by postal code after sorting by distance
  mergeSort(distances, 0, distances.length - 1, "postalCode");

  // Write the sorted array to a file
  writeFileSync("./1/sortedAddressesByPostalCode.json", JSON.stringify(distances));
});
