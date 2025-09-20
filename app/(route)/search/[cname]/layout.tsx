

import React from 'react'
import CategoryList from '../_components/CategoryList'

function layout({children}: {children: React.ReactNode}) {
  return (
    <div className='grid grid-cols-4'>
        <div className=''>
            <CategoryList />
        </div>
        <div className='col-span-3'>
        {children}
        </div>

    </div>
  )
}

export default layout