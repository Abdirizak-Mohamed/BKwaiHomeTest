import React, { Component } from "react";
import { List, Icon } from "semantic-ui-react";

class AlertList extends Component {
  state = {};
  render() {
    const { alerts } = this.props;

    let alertList;
    if (alerts) {
      alertList = alerts.map(alert => {
        const {
          alertColour,
          datetime,
          percentageChange,
          dangerInAxis,
          name
          //tilt_x,
          //tilt_y,
          //tilt_z
        } = alert;
        let warningLevel;
        warningLevel = alertColour === "orange" ? "Amber Alert" : "Red Alert";

        return (
          <List.Item>
            <Icon name="alarm" color={alertColour} />
            <List.Content>
              <List.Header>{warningLevel}</List.Header>
              <List.Description>
                There has been a {percentageChange.toFixed(2)}% change detected
                in {name} ({dangerInAxis}) at {datetime}.
              </List.Description>
            </List.Content>
          </List.Item>
        );
      });
    }

    return <List divided>{alertList}</List>;
  }
}

export default AlertList;
