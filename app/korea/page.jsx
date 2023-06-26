import React from 'react'
import Forum from '../components/pages/Forum/Forum'

export default function page({ params, searchParams }) {
  console.log(searchParams.page)
  return (
    <>
    <Forum title="국내 가요/K-POP" page="korea"/>
    </>
  )
}
