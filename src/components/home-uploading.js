import React from "react";
import _ from "lodash";
const HomeUploading = (props) => {
  const totalFiles = _.get(props.data, "files", []).length;

  return (
    <div className={"app-card app-card-uploading"}>
      <div className={"app-card-content"}>
        <div className={"app-card-content-inner"}>
          <div className={"app-home-uploading"}>
            <div className={"app-home-uploading-icon"}>
              <i className={"icon-upload"} />
              <h2>Sending...</h2>
            </div>

            <div className={"app-upload-files-total"}>
              Uploading {totalFiles} files.
            </div>

            <div className={"app-progress-loader-div"}>
              <div className={"app-progress-loader"}></div>
            </div>

            <div className={"app-form-actions"}>
              <button
                onClick={() => {
                  if (props.onCancel) {
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
