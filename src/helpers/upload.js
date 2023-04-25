import axios from "axios";
import _ from "lodash";
import { v4 as uuid } from "uuid";
import { upload } from "@spheron/browser-upload";

export const uploadFiles = async (form) => {
  console.log({ form, files: form.files, bn: form.bucketName });
  const unique_id = uuid();
  const bName = form.bucketName ? `${form.bucketName}-${unique_id}` : unique_id;
  const url = `${process.env.REACT_APP_API_URL}/initiate-upload?bucket=${bName}`;

  const response = await axios.get(`${url}`); // from step 1
  const token = response.data.uploadToken;
  let files = _.get(form, "files", []);

  console.log({ token, files });

  let currentlyUploaded = 0;
  const uploadResult = await upload(files, {
    token,
    onChunkUploaded: (uploadedSize, totalSize) => {
      currentlyUploaded += uploadedSize;
      console.log(`Uploaded ${currentlyUploaded} of ${totalSize} Bytes.`);
    },
  });

  console.log({ uploadResult });

  return { data: uploadResult };
};
