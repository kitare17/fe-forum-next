import dynamic from 'next/dynamic'

const FormSubmit = dynamic(() => import('../component/FormSubmit'), {
    ssr: false,
})

const Page=()=>{
    return(
        <FormSubmit  />
    )
}
export default Page;