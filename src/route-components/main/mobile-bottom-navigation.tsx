import { BottomNavigation, BottomNavigationAction, Icon } from "@mui/material";
import React from "react";
import explore from "../../assets/svg/explore.svg";
import search from "../../assets/svg/search.svg";
export default function MobileBottomNavigation({
  handleItemClick,
}: {
  handleItemClick: (item: string) => void;
}) {
  const [value, setValue] = React.useState("recents");

  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <BottomNavigation
      className="flex justify-stretch w-80 mx-7 rounded-full bg-white-200 absolute bottom-4"
      sx={{ border: "2px solid lightgrey " }}
      value={value}
      onChange={handleChange}
    >
      <BottomNavigationAction
        value="nearby"
        icon={
          <Icon>
            <img src={search} alt="" />
          </Icon>
        }
      />
      <BottomNavigationAction
        value="recents"
        onClick={() => {
          handleItemClick("اکسپلور");
        }}
        icon={
          <Icon>
            <img src={explore} alt="" />
          </Icon>
        }
      />
    </BottomNavigation>
  );
}
