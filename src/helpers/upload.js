import axios from "axios";
import _ from "lodash";
import { v4 as uuid } from "uuid";
import { upload } from "@spheron/browser-upload";

export const uploadFiles = async (form, callback = () => {}) => {
  try {
    const unique_id = uuid();
    const bName = form.bucketName
      ? `${form.bucketName}-${unique_id}`
      : unique_id;
    const url = `${process.env.REACT_APP_API_URL}/initiate-upload?bucket=${bName}`;

    const response = await axios.get(`${url}`); // from step 1
    const token = response.data.uploadToken;
    const deploymentId = response.data.deploymentId;
    let files = _.get(form, "files", []);

    const realTotalSize = files.reduce(
      (partialSum, a) => partialSum + a.size,
      0
    );

    let currentlyUploaded = 0;
    callback({ deploymentId });
    const uploadResult = await upload(files, {
      token,
      onChunkUploaded: (uploadedSize, totalSize) => {
        currentlyUploaded += uploadedSize;

        callback({
          current: currentlyUploaded,
          total: realTotalSize,
          deploymentId,
        });
      },
    });

    return { data: uploadResult, files };
  } catch (e) {
    throw e;
  }
};

export const cancelUpload = async (deploymentId) => {
  try {
    const url = `${process.env.REACT_APP_API_URL}/cancel-upload`;

    const response = await axios.post(`${url}`, { deploymentId });
    return response;
  } catch (e) {
    // throw e;
    return true
  }
};
