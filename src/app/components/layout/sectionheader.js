export default function SectionHeaders({subHeader, mainHeader}){
    return(
        <>
        <h6 className="sub-title text-center">{subHeader}</h6>
        <h2 className='h2-title'>{mainHeader}</h2>
        </>
    )
}