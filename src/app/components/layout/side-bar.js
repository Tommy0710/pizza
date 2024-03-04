import Link from "next/link";
import { FaBurger, FaUser } from "react-icons/fa6";
export default function Side_bar(){
    // const test_TEXT = react.createElement('h1', {
    //     class: 'test',
    //     style: 'color: red; font-size: 2rem;'
    // },'Thank')
    return(
        <div className='basis-1/12  pr-4'>
            <div className="drop-shadow-sm flex items-center flex-col gap-12 p-4 ">
            <Link href={''}><FaBurger size={'2rem'} color="#b4bccf"/></Link>
            <Link href={''}><FaUser size={'2rem'} color="#b4bccf"/></Link>
            </div>
        </div>
    )
}