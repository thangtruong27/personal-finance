import React from "react";
import {
  NavLink as RouterLink,
  matchPath,
  useLocation,
} from "react-router-dom";
import { Icon } from "react-feather";

import { Button, ListItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
const muiStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    padding: 0,
  },
  item: {
    color: theme.palette.text.secondary,
    fontWeight: theme.typography.fontWeightMedium,
    justifyContent: "flex-start",
    letterSpacing: 0,
    padding: "10px 8px",
    textTransform: "none",
    width: "100%",
    "& svg": {
      marginRight: "8px",
    },
  },
  activeItem: {
    color: theme.palette.primary.main,
  },
}));

type NavItemProps = {
  href: string;
  icon: Icon;
  title: string;
};
const NavItem = ({ href, icon: NavIcon, title, ...rest }: NavItemProps) => {
  const location = useLocation();
  const classes = muiStyles();
  const active = href
    ? !!matchPath(location.pathname, {
        path: href,
        exact: true,
      })
    : false;

  return (
    <ListItem disableGutters {...rest} className={classes.container}>
      <Button href={href} className={classes.item}>
        {NavIcon && <NavIcon size="20" />}
        <span>{title}</span>
      </Button>
    </ListItem>
  );
};

export default NavItem;
