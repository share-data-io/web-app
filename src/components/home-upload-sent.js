import React, { useState } from "react";
import _ from "lodash";
import { CopyToClipboard } from "react-copy-to-clipboard";

const HomeUploadSent = (props) => {
  const { data } = props;
  const [copyDate, setCopyData] = useState({ idx: -1, isCopied: false });

  const to = _.get(data, "to");
  const postId = _.get(data, "_id");
  return (
    <div className={"app-card app-card-upload-sent"}>
      <div className={"app-card-content"}>
        <div className={"app-card-content-inner"}>
          <div className={"app-home-uploading"}>
            <div className={"app-home-upload-sent-icon"}>
              <i className={"icon-paperplane"} />
            </div>

            <div className={"app-upload-sent-message app-text-center"}>
              <h2>Files sent!</h2>
              <p>
                We're sent an email to {to} with a download link. The link will
                expire in 30 days.
              </p>
            </div>

            <div className={"app-upload-sent-actions app-form-actions"}>
              {data?.dynamicLinks?.map((link, key) => (
                <div className="app-upload-link-div">
                  <div className="app-upload-link">{link}</div>
                  <CopyToClipboard
                    text={link}
                    onCopy={() => setCopyData({ idx: key, isCopied: true })}
                  >
                    <div className="app-upload-link-copy">
                    {copyDate.idx === key && copyDate.isCopied ? (
                      <ion-icon name="checkmark-outline"></ion-icon>
                    ) : (
                      <ion-icon name="copy-outline"></ion-icon>
                    )}</div>
                  </CopyToClipboard>
                </div>
              ))}

              <button
                onClick={() => {
                  if (props.onSendAnotherFile) {
                    props.onSendAnotherFile(true);
                  }
                }}
                className={"app-button"}
                type={"button"}
              >
                Send another file
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeUploadSent;
