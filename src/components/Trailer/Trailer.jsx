import React, { useState } from "react";
import { Modal } from "antd";
import "./_trailer.scss";

export const Trailer = (props) => {

  let [visible,setVisible] = useState(false)

  const showModal = () => {
    setVisible(true)
  };

  const handleCancel = (e) => {
    setVisible(false)
    stopVideo();
  };

  const stopVideo = () => {
    let iframes = document.querySelectorAll("iframe");
    Array.prototype.forEach.call(iframes, (iframe) => {
      if (iframe.tagName.toLowerCase() === "iframe") {
        var src = iframe.src;
        iframe.src = src;
      }
    });
  };

  return (
    <>
      <button className="btn-trailer" onClick={showModal}>
        <i className="fas fa-play-circle"></i>
      </button>
      <Modal
        visible={visible}
        onCancel={handleCancel}
        width="80%"
        footer={null}
      >
        <iframe frameBorder="0" allowFullScreen src={props.trailer} />
      </Modal>
    </>
  );
}
