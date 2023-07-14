import * as React from "react"
import Tabs from "@mui/material/Tabs"
import Tab from "@mui/material/Tab"
import Box from "@mui/material/Box"
import UsePassword from "./usePassword"
import UsePhoneCode from "./usePhoneCode"
interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}
const TABS_WITH_PASSWORD = 0
const TABS_WITH_PHONECODE = 1
function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  )
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  }
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="密码登录" {...a11yProps(TABS_WITH_PASSWORD)} />
          <Tab label="短信登录" {...a11yProps(TABS_WITH_PHONECODE)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={TABS_WITH_PASSWORD}>
        <UsePassword></UsePassword>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={TABS_WITH_PHONECODE}>
        <UsePhoneCode></UsePhoneCode>
      </CustomTabPanel>
    </Box>
  )
}
