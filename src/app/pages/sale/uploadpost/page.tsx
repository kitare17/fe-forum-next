"use client"

import dynamic from "next/dynamic";


const DynamicComponentWithNoSSR =
    dynamic(() => import('@/app/pages/sale/compoment/UploadPost'), { ssr: false }
)
export default DynamicComponentWithNoSSR