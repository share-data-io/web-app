import React, { useState } from "react";
import Header from "../components/header";
import HomeForm from "../components/home-form";
import HomeUploading from "../components/home-uploading";
import HomeUploadSent from "../components/home-upload-sent";
import _ from "lodash";
import { useNavigate } from "react-router-dom";

const Home = () => {
  let history = useNavigate();

  const [componentName, setComponentName] = useState("HomeForm");
  const [data, setData] = useState(null);
  const [uploadEvent, setUploadEvent] = useState(null);

  const _renderComponent = () => {
    switch (componentName) {
      case "HomeUploading":
        return (
          <HomeUploading
            onCancel={() => {
              setComponentName("HomeForm");
              setData(null);
              setUploadEvent(null);
            }}
            event={uploadEvent}
            data={data}
          />
        );

      case "HomeUploadSent":
        return (
          <HomeUploadSent
            history={history}
            onSendAnotherFile={() => {
              setComponentName("HomeForm");
            }}
            data={data}
          />
        );

      default:
        return (
          <HomeForm
            onUploadEvent={(respEvent) => {
              let localData;
              if (_.get(respEvent, "type") === "success") {
                localData = _.get(respEvent, "payload");
              }

              setComponentName(
                _.get(respEvent, "type") === "success"
                  ? "HomeUploadSent"
                  : componentName
              );
              setData(localData);
              setUploadEvent(respEvent);
            }}
            onUploadBegin={(respData) => {
              setComponentName("HomeUploading");
              setData(respData);
            }}
          />
        );
    }
  };

  return (
    <div className={"app-container"}>
      <Header />
      {/* <img src="../assets/background.svg" /> */}
      <div className={"app-content"}>{_renderComponent()}</div>
    </div>
  );
};

export default Home;
