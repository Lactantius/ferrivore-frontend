import React, { useState, useEffect } from "react";

import { disagreeableReq } from "./api";

function IdeaContainer({ user, token }: IdeaContainerProps): JSX.Element {
  const [idea, setIdea] = useState({} as Idea);

  useEffect(() => {
    const disagreeable = disagreeableReq(token);
    disagreeable.then((data) => setIdea(data));
  });

  return (
    <div className="IdeaContainer">
      <p>What do you think?</p>
    </div>
  );
}

export default IdeaContainer;
