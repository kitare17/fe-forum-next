"use client"
import React, {useEffect} from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import {getXDaysAgoDate} from "@/app/constant/Fomart";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/app/store";
import {getBlog7Day} from "@/app/store/action/dashboard";
const ChartBlogInMonth = () => {
    const {blog7Months} = useSelector((state:RootState) => state.dashboard);

    var arrayDate=[];

    for(var i=0;i<7;i++){
        arrayDate.push(getXDaysAgoDate(i));
    }

    const dispatch=useDispatch();
    useEffect(() => {
        //@ts-ignore
        dispatch(getBlog7Day())
    }, []);


    return (
        <LineChart
            width={800}
            height={400}
            series={[
                { data: blog7Months, label: 'Bài viết' },
            ]}
            xAxis={[{ scaleType: 'point', data: arrayDate.reverse() }]}
        />
    );
};

export default ChartBlogInMonth;