import React, { useState } from "react";
import { FiUploadCloud } from "react-icons/fi";
const Upload = ({ dataFromUpload, file }) => {
  /* state hooks */
  const [error, setError] = useState(null);

  // file types
  const types = [
    "video/mov",
    "video/mp4",
    "vider/mkv",
    "application/x-mpegURL",
    "video/MP2T",
    "video/quicktime",
  ];

  /* onchange video function */
  const handleChange = (e) => {
    const selected = e.target.files[0];
    if (selected && types.includes(selected.type)) {
      dataFromUpload(selected);
      setError("");
    } else {
      dataFromUpload(null);
      setError("please select an video type of (mp4 or mov)");
    }
  };
  /* end of onchange video function */

  if (error) {
    setTimeout(() => {
      setError(null);
    }, 3000);
  }

  /* dragging video */
  const dragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.target.classList.add("drag");
  };

  const dragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const dragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.target.classList.remove("drag");
  };

  const fileDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const files = e.dataTransfer.files[0];
    dataFromUpload(files);
  };
  /* end of dragging video */

  return (
    <div className="upload-container">
      <div className="input">
        <label
          htmlFor="input"
          onDragOver={dragOver}
          onDragEnter={dragEnter}
          onDragLeave={dragLeave}
          onDrop={fileDrop}
        >
          <FiUploadCloud className="upload-icon" />
          <p>Drag or Upload</p>
        </label>
        <input
          id="input"
          type="file"
          name="video-inp"
          accept="video/*"
          onChange={handleChange}
        />
      </div>

      <div className="output">
        {error && <p className="upload-error">{error}</p>}
        {file && <p className="upload-name">{file.name}</p>}
      </div>
    </div>
  );
};

export default Upload;
