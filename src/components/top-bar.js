import React, { Component } from "react";

export default class TopBar extends Component {
  render() {
    return (
      <div className="app-top-bar">
        <div className="app-top-bar-inner">
          <div className="app-top-bar-left">
            <div className="site-name">
              <i className="icon-paper-plane" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
