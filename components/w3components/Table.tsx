import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const W3Table = <T,>({ tableList, headers, keyMap }: { tableList: T[], headers: string[], keyMap: Record<string, string> }) => {
  return (
    <Table className='border border-black-2 text-[15px] text-nowrap'>
      <TableHeader>
        <TableRow>
          {headers.map((header, index) => (
            <TableHead key={index} className='text-gray-2 bg-darkGreen-1 font-semibold'>{header}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {tableList.map((item, index) => {
          return (
            <TableRow key={index}>
              {headers.map((header, i) => {
                const key = keyMap[header];
                const value = (item as Record<string, any>)[key];
                return (
                  <TableCell key={i}>
                    {value}
                  </TableCell>
                )
              })}
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}

export default W3Table