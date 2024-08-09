import { Box, Tab, Icon, Tabs, Divider } from "@mui/material";
import { itemList, iconList } from "./menu-data";
import profile from "../../assets/svg/profile.svg";

export const Panel = ({
  value,
  handleChange,
  username,
}: {
  value: number;
  handleChange: (_event: React.SyntheticEvent, val: number) => void;
  username: string;
}) => {
  return (
    <Box
      className="w-80 h-screen overscroll-none rounded-t-3xl bg-white border-gray-300 flex flex-col "
      display="flex"
      gap={2}
      sx={{ border: "2px solid " }}
    >
      <Tab
        className="gap-5 w-full flex justify-start p-2"
        icon={
          <Icon>
            <img src={profile} alt="profile picture" />
          </Icon>
        }
        iconPosition="start"
        label={username}
      />
      <Tabs
        className="w-full items-start h-full p-5 pb-20"
        orientation="vertical"
        value={value}
        onChange={handleChange}
        aria-label="basic tabs example"
        sx={{
          "& .MuiTabs-indicator": {
            display: "none",
          },
          "& .MuiTab-root": {
            color: "grey",
          },
          "& .Mui-selected": {
            backgroundColor: "lightgrey!important",
            color: "grey!important",
            borderRadius: "20px",
          },
        }}
      >
        {itemList.slice(0, 5).map((text, index) => {
          return (
            <Tab
              key={text + index}
              className="gap-5 w-full flex justify-start"
              icon={
                <Icon>
                  <img src={iconList[index]} className="opacity-100" alt="" />
                </Icon>
              }
              iconPosition="start"
              label={text}
            />
          );
        })}
        <Tab
          disabled
          label=""
          icon={<Divider className="bg-grey w-full p-0 m-0 h-1"></Divider>}
        />
        {itemList.slice(5, 7).map((text, index) => {
          return (
            <Tab
              key={text + index}
              className="gap-5 w-full flex justify-start"
              icon={
                <Icon>
                  <img
                    src={iconList[index + 5]}
                    className="opacity-100"
                    alt=""
                  />
                </Icon>
              }
              iconPosition="start"
              label={text}
            />
          );
        })}
        {itemList.slice(7).map((text, index) => {
          return (
            <Tab
              key={text + index}
              className="gap-5 w-full flex justify-start absolute bottom-10"
              icon={
                <Icon>
                  <img
                    src={iconList[index + 7]}
                    className="opacity-100"
                    alt=""
                  />
                </Icon>
              }
              iconPosition="start"
              label={text}
            />
          );
        })}
      </Tabs>
    </Box>
  );
};
