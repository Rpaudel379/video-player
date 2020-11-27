import React, { useState } from "react";
import Upload from "./components/Upload";
import Video from "./components/Video";

function App() {
  /* state hooks */
  const [file, setFile] = useState(null);

  const dataFromUpload = (data) => {
    setFile(data);
  };

  return (
    <div className="app">
      <h1>react video player</h1>

      <Upload dataFromUpload={dataFromUpload} file={file} />
      <Video source={file} />
    </div>
  );
}

export default App;
