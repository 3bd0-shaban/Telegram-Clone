import { ImSpinner7 } from 'react-icons/im';
import { FiPlus } from 'react-icons/fi';
import { IoIosImages } from 'react-icons/io';

const UplaodIcon = ({ Loading, icon, setIcon }) => {
    const loadFile = (e) => {
        for (const file of e.target.files) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                setIcon(reader.result);
            };
        }
    };

    return (
        <div className='flex justify-center p-5'>
            <label className={`block cursor-pointer text-white font-medium focus:bg-gray-500 group relative ${Loading && 'cursor-not-allowed'}`}>
                <div className="w-32 h-32 bg-blue-400 shadow shadow-blue-500 rounded-full flex justify-center object-cover overflow-hidden items-center">
                    {icon ? <img src={icon} alt='' /> : <IoIosImages size={50} />}
                </div>
                {Loading ?
                    <div className='rounded-full flex text-white items-center justify-center absolute p-2 inset-0 animate-spin bg-black/20'>
                        <ImSpinner7 size={25} />
                    </div> :
                    <div className='hidden rounded-full group-hover:flex text-white items-center justify-center absolute p-2 inset-0 hover:bg-black/20'>
                        <FiPlus />
                    </div>
                }
                <input
                    onChange={loadFile}
                    disabled={Loading}
                    id="dropzone-file"
                    type="file"
                    multiple
                    className="hidden"
                />
            </label>
        </div>
    )
}

export default UplaodIcon
