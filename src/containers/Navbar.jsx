import React, { Component } from "react";
import { Menu, Image } from "semantic-ui-react";
import logo from "../assets/BKwai.png";
import Clock from "../components/clock";

class NavBar extends Component {
  state = {};
  render() {
    return (
      <Menu style={{ backgroundColor: "#ffaaab}" }}>
        <Menu.Item>
          <Image src={logo} size="mini" />
        </Menu.Item>

        <Menu.Item>Abdirizak Home Test</Menu.Item>
        <Menu.Item position="right">
          <Clock />
        </Menu.Item>
      </Menu>
    );
  }
}

export default NavBar;
