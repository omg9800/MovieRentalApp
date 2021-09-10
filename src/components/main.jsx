import React, { useState } from "react";
import AddMovie from "./movieForm";
import Movies from "./movies";
const Index = () => {
  const [show, setShow] = useState(false);

  return (
    <div>
      <button onClick={() => setShow((prevState) => !prevState)}>toggle</button>
      {show ? <AddMovie /> : <Movies />}
    </div>
  );
};

export default Index;
