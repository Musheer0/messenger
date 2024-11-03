import SearchResults from '@/components/users/search-results'
import SearchUsers from '@/components/users/search-user'
import React from 'react'

const page = () => {
  return (
    <div className='flex-1 h-full flex items-center flex-col justify-start'>
      <SearchUsers/>
      <SearchResults/>
      <div className="friend text-start w-full p-2 border-t">
        <h2 className='text-start font-semibold'>Your friends</h2>
        <p className='text-xs text-muted-foreground'>no friends yet,start by sending friend request </p>
      </div>
    </div>
  )
}

export default page