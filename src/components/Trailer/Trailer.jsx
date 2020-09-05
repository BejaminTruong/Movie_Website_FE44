import React, { Component } from "react";
import { Modal, Button } from "antd";
import "./Trailer.scss";

export default class Trailer extends Component {
  state = { visible: false };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
    this.stopVideo();
  };

  stopVideo = () => {
    let iframes = document.querySelectorAll("iframe");
    Array.prototype.forEach.call(iframes, (iframe) => {
      if (iframe.tagName.toLowerCase() === "iframe") {
        var src = iframe.src;
        iframe.src = src;
      }
    });
  };
  render() {
    return (
      <>
        <button onClick={this.showModal}>
          <i className="fas fa-play-circle"></i>
        </button>
        <Modal
          visible={this.state.visible}
          onCancel={this.handleCancel}
          width="80%"
          footer={null}
        >
          <iframe frameBorder="0" allowFullScreen src={this.props.trailer} />
        </Modal>
      </>
    );
  }
}
