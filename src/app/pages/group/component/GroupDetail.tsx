import React, {Suspense} from 'react';


import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import GroupJob from "@/app/pages/group/component/GroupJob";
import MemberList from "@/app/pages/group/component/MemberList";
import NotificationGroup from "@/app/pages/group/component/NotificationGroup";
import {useSelector} from "react-redux";
import {RootState} from "@/app/store";


interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel(props: TabPanelProps) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{p: 3}}>{children}</Box>}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const GroupDetail = () => {

    const {groupDetail} = useSelector((state: RootState) => state.group);

    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    return (
        <div>
            <h3 style={{textAlign: "center"}}>Nhóm {groupDetail?.groupName} </h3>
            <Grid container spacing={2}>
                <Grid item xs={12} sx={{display: "flex", justifyContent: "center"}}>
                    <div style={{width: "90%"}}>
                        <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                <Tab label="Thông báo 📣 📣 📣" {...a11yProps(0)} />
                                <Tab label="Công việc 📚 📚 📚" {...a11yProps(1)} />
                                <Tab label="Thành viên 💼 💼 💼" {...a11yProps(2)} />
                            </Tabs>
                        </Box>
                        <CustomTabPanel value={value} index={0}>
                            <Suspense>
                                <NotificationGroup/>
                            </Suspense>
                        </CustomTabPanel>
                        <CustomTabPanel value={value} index={1}>
                            <GroupJob/>
                        </CustomTabPanel>
                        <CustomTabPanel value={value} index={2}>
                            <MemberList/>
                        </CustomTabPanel>

                    </div>

                </Grid>
            </Grid>

        </div>
    );
};
export default GroupDetail;