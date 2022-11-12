import React from "react";

import "./AboutPage.css";

function AboutPage(): JSX.Element {
  return (
    <div className="AboutPage">
      <h1>What is this?</h1>
      <p>
        Ferrivore helps you find ideas that are interesting. Other services
        promise this, but their recommendation algorithms tend to show you
        things that you already agree with, from people you already follow.
        Ferrivore, on the other hand, has no user likes or follows; liking a
        post by a user does not automatically prioritize that user’s other
        posts. It also encourages you to like ideas{" "}
        <i>regardless of how much you agree with them</i>, so that the algorithm
        can recommend <i>all</i> interesting ideas and not just sort you into a
        filter bubble.
      </p>
      <p>
        Here are some additional features to help you focus on the quality of
        the ideas:
        <ul>
          <li>
            You can see what other users thought of an idea, but only after you
            submit your initial reaction.
          </li>
          <li>
            You can specifically request ideas that will probably interest you
            but that you will also probably disagree with.
          </li>
          <li>
            You can see what others thought of your posts, but you will not
            receive any notifications about it.
          </li>
          <li>
            There are no comment or discussion features. This website is just
            for discovering ideas; there are plenty of other places to talk
            about them.
          </li>
          <li>
            <i>Coming soon:</i> You can commend posts for being particularly
            rational in some way. This helps them in the recommendation system.
          </li>
        </ul>
      </p>
      <p>
        If you’re interested in the technical details,{" "}
        <a href="https://github.com/Lactantius/ferrivore">
          the source code and documentation is available here
        </a>
        .
      </p>
      <h2>About the name</h2>
      <p>
        An <i>omnivore</i> eats everything. A <i>ferrivore</i> eats{" "}
        <i>ferrum</i>: iron. So that seems an apt name for someone who seeks
        powerful ideas and arguments, whether agreeable or not. (
        <i>Chalybivore</i>, or <i>steel-eater</i>, would relate better to
        steel-manning, but it is an ugly word with a root that very few would
        recognize.)
      </p>
      <h2>Dedication</h2>
      <p className="AboutPage-centered">
        To Luke Burgis, whose writings on mimetic theory inspired this project.
      </p>
    </div>
  );
}

export default AboutPage;
