import {
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  List,
  Typography,
} from "@material-ui/core";
import {
  AlertCircle as AlertCircleIcon,
  BarChart as BarChartIcon,
  Upload as UploadIcon
} from "react-feather";
import { makeStyles } from "@material-ui/core/styles";
import NavItem from "./NavItem";

interface User {
  avatar: string;
  jobTitle: string;
  name: string;
}
const user: User = {
  avatar: "/static/images/avatars/avatar_6.png",
  jobTitle: "Senior Developer",
  name: "Andy Nguyen",
};

const items = [
  {
    href: "/dashboard",
    icon: BarChartIcon,
    title: "Dashboard",
  },
  {
    href: "/import",
    icon: UploadIcon,
    title: "Import Data",
  },
];

const useStyles = makeStyles((theme) => ({
  drawer: {
    height: "calc(100% - 64px)",
    width: "256px",
    top: "64px",
  },
  root: {
    display: "flex",
    flexDirection: "column",
  },
  profileContainer: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(2),
  },
  avatar: {
    width: 64,
    height: 64,
  },
  navContainer: {
    padding: theme.spacing(2),
  },
}));

const DashboardSidebar = () => {
  const classes = useStyles();
  const content = (
    <Box className={classes.root}>
      <Box className={classes.profileContainer}>
        <Avatar src={user.avatar} className={classes.avatar} />
        <Typography color="textPrimary" variant="h5">
          {user.name}
        </Typography>
        <Typography color="textSecondary" variant="body2">
          {user.jobTitle}
        </Typography>
      </Box>
      <Divider />
      <Box className={classes.navContainer}>
        <List>
          {items.map((item) => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
          ))}
        </List>
      </Box>
    </Box>
  );
  return (
    <Drawer
      anchor="left"
      open
      variant="persistent"
      PaperProps={{
        classes: {
          root: classes.drawer,
        },
      }}
    >
      {content}
    </Drawer>
  );
};

export default DashboardSidebar;
