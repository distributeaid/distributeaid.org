//import DefaultLayout from '../layouts/Default'
import { graphql } from 'gatsby'
import { FunctionComponent, useMemo } from 'react'
import { useSortBy, useTable } from 'react-table'
import TableHeader from '../components/table/TableHeader'

const COLUMNS = [
  {
    Header: 'Name',
    accessor: (row) => row.name,
  },
  {
    Header: 'Delivered On',
    accessor: (row) => row.deliveredOn,
  },
  {
    Header: 'Commercial Value',
    accessor: (row) => row.totalCommercialValue,
  },
  {
    Header: 'Weight',
    accessor: (row) => row.totalWeight,
  },
  {
    Header: 'Distance',
    accessor: (row) => row.totalDistance,
  },
  {
    Header: 'CO2',
    accessor: (row) => row.totalC02,
  },
]

interface Props {
  data: {
    allContentfulDataImpactShipment
  }
}

const ShipmentsPage: FunctionComponent<Props> = ({ data }) => {
  // We must memoize the data for react-table to function properly
  const shipments = useMemo(
    () => data?.allContentfulDataImpactShipment.nodes || [],
    [data],
  )
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns: COLUMNS, data: shipments }, useSortBy)

  return (
    <div>
      <header>
        <h1>Shipments</h1>
      </header>
      <section>
        <table>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <TableHeader
                    canSort={column.canSort}
                    isSorted={column.isSorted}
                    isSortedDesc={column.isSortedDesc}
                    title={column.canSort ? 'Sort rows' : ''}
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                  >
                    {column.render('Header')}
                  </TableHeader>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row)
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  ))}
                </tr>
              )
            })}
          </tbody>
        </table>
      </section>
      <footer></footer>
    </div>
  )
}

export default ShipmentsPage

export const pageQuery = graphql`
  query Shipments {
    allContentfulDataImpactShipment {
      nodes {
        contentful_id
        deliveredOn
        name
        slug
        numPickups
        numDropoffs
        totalCommercialValue
        totalDistance
        totalWeight
        totalC02
        fromSubregions {
          contentful_id
          name
          slug
          region {
            name
            slug
            contentful_id
          }
        }
        toSubregions {
          contentful_id
          name
          slug
          region {
            name
            slug
            contentful_id
          }
        }
      }
    }
  }
`
