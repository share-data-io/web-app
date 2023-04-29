import React, { useState } from "react";
import _ from "lodash";
import classNames from "classnames";
import { uploadFiles } from "../helpers/upload";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import {
  uploadUpdate,
  uploadStart,
  failureUploading,
  successUploading,
} from "../modules/actions/Upload";

const HomeForm = (props) => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    files: [],
    bucketName: "",
    deploymentId: null,
  });

  const [errors, setErrors] = useState({
    files: null,
    bucketName: null,
  });

  const _onFileRemove = (key) => {
    let { files } = form;

    files.splice(key, 1);

    setForm({
      ...form,
      files: files,
    });
  };

  const _onFileAdded = (event) => {
    let files = _.get(form, "files", []);

    _.each(_.get(event, "target.files", []), (file) => {
      files.push(file);
    });

    setForm({
      ...form,
      files: files,
    });
  };

  const _formValidation = (fields = [], callback = () => {}) => {
    const validations = {
      files: [
        {
          errorMessage: "File is required.",
          isValid: () => {
            return form.files?.length;
          },
        },
      ],
    };

    let localErrors = errors;

    _.each(fields, (field) => {
      let fieldValidations = _.get(validations, field, []); // validations[field];

      localErrors[field] = null;

      _.each(fieldValidations, (fieldValidation) => {
        const isValid = fieldValidation.isValid();

        if (!isValid) {
          localErrors[field] = fieldValidation.errorMessage;
        }
      });
    });

    setErrors(localErrors);

    let isValid = true;
    _.each(localErrors, (err) => {
      if (err !== null) {
        isValid = false;
      }
    });
    return callback(isValid);
  };

  const _onSubmit = (event) => {
    try {
      event.preventDefault();

      _formValidation(["files"], async (isValid) => {
        try {
          if (isValid) {
            // the form is valid and ready to submit.

            const data = form;

            if (props.onUploadBegin) {
              props.onUploadBegin(data);
            }

            const response = await uploadFiles(data, (data) => {
              if ((data.deploymentId || data.token) && !data.current && !data.total)
                dispatch(uploadStart({ deploymentId: data.deploymentId, token: data.token }));
              else
                dispatch(
                  uploadUpdate({
                    current: data.current,
                    total: data.total,
                    deploymentId: data.deploymentId,
                    token: data.token
                  })
                );
            });

            if (props.onUploadEvent) {
              toast.success("Data uploaded successfully!", {
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
              });
              props.onUploadEvent({
                type: "success",
                payload: { response: response.data, files: response.files },
              });
            }

            dispatch(successUploading());
          }
        } catch (e) {
          dispatch(failureUploading(e));
          toast.error("Error while uploading docs. Try again!", {
            position: "bottom-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          props.onFail(true);
        }
      });
    } catch (e) {
      toast.error("Error while uploading docs. Try again!", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      props.onFail(true);
    }
  };

  const _onTextChange = (event) => {
    const fieldName = event.target.name;
    const fieldValue = event.target.value;

    let localForm = form;

    localForm[fieldName] = fieldValue;
    // setState({ form: form });

    setForm({
      ...form,
      [`${event.target.name}`]: event.target.value,
    });
  };

  const { files } = form;

  return (
    <div className={"app-card"}>
      <ToastContainer />
      <form onSubmit={_onSubmit}>
        <div className={"app-card-header"}>
          <div className={"app-card-header-inner"}>
            {files && files?.length ? (
              <div className={"app-files-selected"}>
                {files.map((file, index) => {
                  return (
                    <div key={index} className={"app-files-selected-item"}>
                      <div className={"filename"}>{file.name}</div>
                      <div className={"file-action"}>
                        <button
                          onClick={() => _onFileRemove(index)}
                          type={"button"}
                          className={"app-file-remove"}
                        >
                          &#9587;
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : null}

            <div
              className={classNames("app-file-select-zone", {
                error: _.get(errors, "files"),
              })}
            >
              <label htmlFor={"input-file"}>
                <input
                  onChange={_onFileAdded}
                  id={"input-file"}
                  type="file"
                  multiple={true}
                />
                {files && files?.length ? (
                  <span className={"app-upload-description text-uppercase"}>
                    Add more files
                  </span>
                ) : (
                  <span>
                    <span className={"app-upload-icon"}>
                      <i className={"icon-picture-streamline"} />{" "}
                    </span>
                    <span className={"app-upload-description"}>
                      Click here to upload your file.
                    </span>
                  </span>
                )}
              </label>
            </div>
          </div>
        </div>
        <div className={"app-card-content"}>
          <div className={"app-card-content-inner"}>
            <div
              className={classNames("app-form-item", {
                error: _.get(errors, "bucketName"),
              })}
            >
              <label htmlFor={"input-bucket-name"}>Bucket label</label>
              <input
                onChange={_onTextChange}
                value={form.bucketName}
                name={"bucketName"}
                placeholder={
                  _.get(errors, "bucketName")
                    ? _.get(errors, "bucketName")
                    : form.bucketName
                    ? form.bucketName
                    : "Label for your shared data URL"
                }
                type={"text"}
                id={"bucketName"}
              />
            </div>

            <div className={"app-form-actions"}>
              <button type={"submit"} className={"app-button primary"}>
                Send
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default HomeForm;
