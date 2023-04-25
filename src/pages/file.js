import React, { useEffect, useState } from "react";
import Header from "../components/header";
import {getIpfs} from "../helpers/ipfs";
import _ from "lodash";
import { useLocation } from "react-router-dom";

const File = () => {
  let location = useLocation();

  const [componentName, setComponentName] = useState("HomeForm");
  const [data, setData] = useState(null);
  const [uploadEvent, setUploadEvent] = useState(null);

  // useEffect(() => {
  //   async function getData() {
  //     const r = await getIpfs();
  //   }

  //   getData();
  // });

  const _renderComponent = () => {
    return <div>
      
      File page
      <iframe src={`https://ipfs.io/ipfs${location.pathname}`}></iframe>
      </div>;
    // switch (componentName) {
    //   case "HomeUploading":
    //     return (
    //       <HomeUploading
    //         onCancel={() => {
    //           setComponentName("HomeForm");
    //           setData(null);
    //           setUploadEvent(null);
    //         }}
    //         event={uploadEvent}
    //         data={data}
    //       />
    //     );

    //   case "HomeUploadSent":
    //     return (
    //       <HomeUploadSent
    //         history={history}
    //         onSendAnotherFile={() => {
    //           setComponentName("HomeForm");
    //         }}
    //         data={data}
    //       />
    //     );

    //   default:
    //     return (
    //       <HomeForm
    //         onUploadEvent={(respEvent) => {
    //           let localData;
    //           if (_.get(respEvent, "type") === "success") {
    //             localData = _.get(respEvent, "payload");
    //           }

    //           setComponentName(
    //             _.get(respEvent, "type") === "success"
    //               ? "HomeUploadSent"
    //               : componentName
    //           );
    //           setData(localData);
    //           setUploadEvent(respEvent);
    //         }}
    //         onUploadBegin={(respData) => {
    //           setComponentName("HomeUploading");
    //           setData(respData);
    //         }}
    //       />
    //     );
    // }
  };

  return (
    <div className={"app-container"}>
      <Header />
      {/* <img src="../assets/background.svg" /> */}
      <div className={"app-content"}>{_renderComponent()}</div>
    </div>
  );
};

export default File;
