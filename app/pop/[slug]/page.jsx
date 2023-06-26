import React from 'react'
import Detail from '../../components/pages/Detail/Detail'

export default function page({ params, searchParams }) {

  return (
    <Detail params={params} searchParams={searchParams}/>
  )
}
