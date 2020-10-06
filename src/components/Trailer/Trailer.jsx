import React, { useState } from "react";
import { Modal } from "antd";
import "./Trailer.scss";

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
      <button className={props.className} onClick={showModal}>
        {props.children}
      </button>
      <Modal className="trailerModal"
        visible={visible}
        onCancel={handleCancel}
        width="70%"
        footer={null}
      >
        <iframe title={`trailer ${props.maPhim}`} frameBorder="0" allowFullScreen src={props.trailer} />
      </Modal>
    </>
  );
}
