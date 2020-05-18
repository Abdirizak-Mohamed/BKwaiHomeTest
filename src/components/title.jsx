import React, { Component } from "react";

import { Header, Icon } from "semantic-ui-react";

class Title extends Component {
  state = {};
  render() {
    const { iconName, title } = this.props;
    return (
      <Header as="h2" icon>
        <Icon name={iconName} />
        {title}
      </Header>
    );
  }
}

export default Title;
