import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  Icon,
  ListItemText,
} from "@mui/material";
import { itemList, iconList } from "./menu-data";

export const DrawerMenu = ({
  isOpen,
  toggleDrawer,
  handleItemClick,
}: {
  isOpen: boolean;
  toggleDrawer: () => void;
  handleItemClick: (item: string) => void;
}) => {
  return (
    <Drawer
      anchor="bottom"
      open={isOpen}
      onClose={toggleDrawer}
      PaperProps={{
        sx: {
          width: "375px",
          height: "40%",
          margin: "auto",
          paddingInline: "30px",
          borderTopLeftRadius: "26px",
          borderTopRightRadius: "26px",
          boxShadow:
            "0 -4px 6px -1px rgba(0, 0, 0, 0.1), 0 -2px 4px -1px rgba(0, 0, 0, 0.06)",
        },
      }}
      ModalProps={{
        BackdropProps: {
          sx: {
            backgroundColor: "transparent",
          },
        },
      }}
    >
      <List>
        {itemList
          .slice(0, 5)
          .concat(itemList.slice(7))
          .map((text, index) => (
            <ListItem
              key={text}
              onClick={() => {
                handleItemClick(text);
              }}
              sx={{ justifyContent: "flex-end" }}
            >
              <ListItemIcon
                sx={{
                  minWidth: "auto",
                  marginLeft: 2,
                  justifyContent: "flex-end",
                  borderRadius: "8px",
                  mb: 1,
                  "&:hover": {
                    backgroundColor: "rgba(0, 0, 0, 0.04)",
                  },
                  "&:active": {
                    backgroundColor: "rgba(0, 0, 0, 0.08)",
                  },
                }}
              >
                <Icon>
                  <img
                    src={iconList.slice(0, 5).concat(iconList.slice(7))[index]}
                    alt=""
                  />
                </Icon>
              </ListItemIcon>
              <ListItemText primary={text} sx={{ textAlign: "right" }} />
            </ListItem>
          ))}
      </List>
    </Drawer>
  );
};
