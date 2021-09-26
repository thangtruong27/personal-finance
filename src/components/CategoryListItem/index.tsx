import React from 'react';
import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@material-ui/core';

export type CategoryListItemProps = {
  category: string;
  icon?: React.ReactElement;
  percentage?: string;
  value: string | number;
};
export default function CategoryListItem(props: CategoryListItemProps) {
  const { category, icon, percentage, value } = props;
  return (
    <ListItem>
      <ListItemAvatar>{<Avatar sizes="12px">{icon}</Avatar>}</ListItemAvatar>
      <ListItemText primary={category} secondary={percentage} />
      <Typography variant="body2">{value}</Typography>
    </ListItem>
  );
}
