import React from 'react'
import { DataTable } from '../../layouts/DataTable'
import dataList from '../../utils/data.json'

const PointCategory = () => {
  return (
    <DataTable data={dataList} />
  )
}

export default PointCategory