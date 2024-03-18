import { FaCircleInfo, FaPlus } from "react-icons/fa6";
import Image from "next/image";
import { addProduct } from "../../../redux/slice/counterSlice";

export const Items = ({ product, key, dispatch }) => (
    <div className="flex items-start gap-4 bg-white shadow-total p-4 rounded-lg text-center relative hover:shadow-inner transition-all" key={key}>
        <Image className='object-contain' src={product.img_url} alt={product.title} width={120} height={120} />
        <div className='flex flex-col items-start justify-start'>
            <h3 onClick={(ev) => console.log(ev.target.innerText)} className='cursor-pointer text-left text-lg'>{product.title}</h3>
            <p className='font-bold'>${product.price}</p>
            <FaCircleInfo className='info-icon absolute z-10 right-1 top-1 cursor-help' />
            <div className='absolute w-full h-full p-4 left-0 top-0 rounded-lg bg-white opacity-0 hidden transition-all delay-200 z-0'>
                <p className='text-sm text-left'>{product.des}</p>
            </div>
            <button onClick={() => {dispatch(addProduct(product))
            }}>
            <FaPlus className='absolute bottom-4 right-4 text-primary shadow-md p-2 w-[30px] h-auto rounded-lg cursor-pointer' />
            </button>
        </div>
    </div>
)