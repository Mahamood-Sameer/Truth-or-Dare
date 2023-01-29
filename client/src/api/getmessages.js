import axios from "./axios";

export const getmessages = async (group) => {
  const data = await axios.get("/getmessages", {
    headers: {
      "Content-Type": "application/json",
      Authorization: group?._id,
    },
  });
  return data?.data;
};
