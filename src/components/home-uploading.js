import React, { useEffect, useState } from "react";
import _ from "lodash";
import { useSelector } from "react-redux";
import { cancelUpload } from "../helpers/upload";
import { resetUpload } from "../modules/actions/Upload";
import {useDispatch} from 'react-redux'

const HomeUploading = (props) => {
  const totalFiles = _.get(props.data, "files", []).length;
  const uploadState = useSelector((s) => s.Upload);
  const [completedPercentage, setCompletedPercentage] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    const { data } = uploadState;

    if (!data) setCompletedPercentage(0);
    else if (!data?.total) setCompletedPercentage(0);
    else {
      let p = ((data.current / data.total) * 100).toFixed(0);
      if (isNaN(p)) setCompletedPercentage(0);
      else setCompletedPercentage(p);
    }
  }, [
    uploadState,
    uploadState.data,
    uploadState.loading,
    uploadState.error,
    uploadState.isCompleted,
  ]);

  return (
    <div className={"app-card app-card-uploading"}>
      <div className={"app-card-content"}>
        <div className={"app-card-content-inner"}>
          <div className={"app-home-uploading"}>
            <div className={"app-home-uploading-icon"}>
              <i className={"icon-upload"} />
              <h2>Uploading...</h2>
            </div>

            <div className={"app-upload-files-total"}>
              Uploading {totalFiles} files.
            </div>

            <div className={"app-progress-loader-div"}>
              <div className={"app-progress-loader"}>
                <div className={"app-progress-loader-text"}>
                  {completedPercentage} %
                </div>
              </div>
            </div>

            <div className={"app-form-actions"}>
              <button
                onClick={async () => {
                  await cancelUpload(uploadState.data.deploymentId);
                  if (props.onCancel) {
                    dispatch(resetUpload());
                    props.onCancel(true);
                  }
                }}
                className={"app-upload-cancel-button app-button"}
                type={"button"}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeUploading;
