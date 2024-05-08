import dynamic from 'next/dynamic'

const FormSubmit = dynamic(() => import('./formSubmit'), {
    ssr: false,
})

const Page=()=>{
    return(
        <FormSubmit  />
    )
}
export default Page;