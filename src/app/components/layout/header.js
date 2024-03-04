
import Link from 'next/link'
export default function header(){
    return (
    <header className='flex items-center py-4'>
        <Link href={'./'} className='text-primary font-bold flex justify-left text-2xl flex-1'>ST PIZZA</Link>
        <nav className='text-primary items-center flex gap-x-6 flex-1'>
        <Link href = {''}>Home</Link>
        <Link href = {''}>Home</Link>
        <Link href = {''}>Home</Link>
        <Link href = {''}>Home</Link>
        </nav>
        
        <nav className='text-primary items-center flex justify-end flex-1 gap-x-6 mx-auto'>
        <Link href = {'./login'} className='button'>Login</Link>
        <Link href = {'./register'}>Register</Link>
        </nav>
    </header>
    )
}