import React from 'react'
import { useTitle } from './Exports'

const NotFounded = () => {
    useTitle('Not Founded !')
    return (
        <>
            <div>
                <div className='container max-w-[142rem] gap-3'>
                    <div className='flex justify-center my-24'>
                        <p className='text-7xl underline font-semibold'>Page not Founded Or it may Changed to anthor URL</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NotFounded
