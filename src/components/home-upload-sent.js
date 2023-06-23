import React, { useEffect, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useDispatch } from "react-redux";
import { resetUpload } from "../modules/actions/Upload";
import { ToastContainer } from "react-toastify";

const HomeUploadSent = (props) => {
  const { data: propsData } = props;
  const { response: data, files } = propsData;
  const [copyData, setCopyData] = useState({ idx: -1, isCopied: false });

  const dispatch = useDispatch();

  useEffect(() => {
    if (copyData.idx !== -1 && copyData.isCopied) {
      setTimeout(() => {
        setCopyData({ idx: -1, isCopied: false });
      }, 5000);
    }
  }, [copyData.idx, copyData.isCopied]);

  return (
    <div className={"app-card app-card-upload-sent"}>
      <ToastContainer />
      <div className={"app-card-content"}>
        <div className={"app-card-content-inner"}>
          <div className={"app-home-uploading"}>
            <div className={"app-home-upload-sent-icon"}>
              <i className={"icon-paperplane"} />
            </div>

            <div className={"app-upload-sent-message app-text-center"}>
              <h2>Files sent!</h2>
              <p>Copy and share the below URL to access your files.</p>
            </div>

            <div className={"app-upload-sent-actions app-form-actions"}>
              {data?.dynamicLinks.length ? (
                data?.dynamicLinks?.map((link, key) => (
                  <div className="app-upload-link-div">
                    {files.length === 1 ? (
                      <a
                        href={`https://${link}/${files[0].name.replaceAll(
                          " ",
                          "%20"
                        )}`}
                        target="_blank"
                        className="app-upload-link"
                        rel="noreferrer"
                      >{`${link}/${files[0].name}`}</a>
                    ) : (
                      <a
                        href={`https://${link}`}
                        target="_blank"
                        className="app-upload-link"
                        rel="noreferrer"
                      >
                        {link}
                      </a>
                    )}
                    <CopyToClipboard
                      text={
                        files.length === 1
                          ? `https://${link}/${files[0].name.replaceAll(" ", "%20")}`
                          : `https://${link}`
                      }
                      onCopy={() => setCopyData({ idx: key, isCopied: true })}
                    >
                      <div className="app-upload-link-copy">
                        {copyData.idx === key && copyData.isCopied ? (
                          <ion-icon name="checkmark-outline"></ion-icon>
                        ) : (
                          <ion-icon name="copy-outline"></ion-icon>
                        )}
                      </div>
                    </CopyToClipboard>
                  </div>
                ))
              ) : (
                <div className="app-upload-link-div">
                  {files.length === 1 ? (
                    <a
                      href={`${data?.protocolLink}/${files[0].name.replaceAll(
                        " ",
                        "%20"
                      )}`}
                      target="_blank"
                      className="app-upload-link"
                      rel="noreferrer"
                    >{`${data?.protocolLink}/${files[0].name}`}</a>
                  ) : (
                    <a
                      href={`${data?.protocolLink}`}
                      target="_blank"
                      className="app-upload-link"
                      rel="noreferrer"
                    >
                      {data?.protocolLink}
                    </a>
                  )}
                  <CopyToClipboard
                    text={
                      files.length === 1
                        ? `${data?.protocolLink}/${files[0].name.replaceAll(
                            " ",
                            "%20"
                          )}`
                        : data?.protocolLink
                    }
                    onCopy={() => setCopyData({ idx: -2, isCopied: true })}
                  >
                    <div className="app-upload-link-copy">
                      {copyData.idx === -2 && copyData.isCopied ? (
                        <ion-icon name="checkmark-outline"></ion-icon>
                      ) : (
                        <ion-icon name="copy-outline"></ion-icon>
                      )}
                    </div>
                  </CopyToClipboard>
                </div>
              )}

              <button
                onClick={() => {
                  dispatch(resetUpload());
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
