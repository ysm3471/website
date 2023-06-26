import React from 'react'
import Forum from '../components/pages/Forum/Forum'

export default function page({ params, searchParams }) {
  return (
    <>
    <Forum title="전체" page="all" searchParams={searchParams}/>
    </>
  )
}
