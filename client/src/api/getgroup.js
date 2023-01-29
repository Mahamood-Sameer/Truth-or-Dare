import axios from "./axios";

export const getgroup = async (docid) => {
  const response = await axios.get("/group", {
    headers: {
      "Content-Type": "application/json",
      Authorization: docid,
    },
  });

  return response.data.group;
};
