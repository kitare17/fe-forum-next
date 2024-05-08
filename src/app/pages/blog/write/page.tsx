import dynamic from 'next/dynamic'

const DynamicHeader = dynamic(() => import('./formSubmit'), {
    ssr: false,
})

const Page=()=>{
    return(

        <DynamicHeader  />
    )
}
export default Page;