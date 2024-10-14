import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";

import React from "react";
import { Link } from "react-router-dom";

export default function SidebarComp() {
  return (
    <Sidebar>
      <Menu>
        <SubMenu label="Users">
          <MenuItem component={<Link to="/all-users" />}> All Users </MenuItem>
          <MenuItem component={<Link to="/create-user" />}>
            {" "}
            Create User{" "}
          </MenuItem>
        </SubMenu>
      </Menu>
    </Sidebar>
  );
}
