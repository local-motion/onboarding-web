import React, { Component } from "react";
import { Helmet } from "react-helmet";

import { titlePrefix } from "../../misc/WorkspaceHelpers";

class MyActies extends Component {
    render() {
        return (
          <div>
              <Helmet>
                  <title>{titlePrefix} | Mijn Acties</title>
              </Helmet>

              MyActies
          </div>
        );
    }
}

export default MyActies;