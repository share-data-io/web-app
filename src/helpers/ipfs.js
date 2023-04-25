import axios from "axios";

export const getIpfs = async (hash) => {
  const url = `https://ipfs.io/ipfs/bafybeihqhz2ytlqbj7m6ol3ygcvrbcuz54vn6p6mlmk3zls73smnvgvxaa/`;

  const response = await axios.get(`${url}`); // from step 1

  return { data: response };
};
