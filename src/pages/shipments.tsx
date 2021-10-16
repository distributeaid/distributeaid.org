//import DefaultLayout from '@layouts/Default'

import TableHeader from '@components/table/TableHeader'
import SimpleLayout from '@layouts/Simple'
import { PageContext } from '@types/site-types'
import { graphql, Link } from 'gatsby'
import React, { FunctionComponent, useMemo } from 'react'
import { useSortBy, useTable } from 'react-table'

interface Props {
  pageContext: PageContext
  data: {
    allContentfulDataImpactShipment
  }
}

const COLUMNS = [
  {
    Header: 'Name',
    accessor: 'name',
    Cell: ({ row }) => (
      <Link to={`/shipment/${row.original.slug}`}>{row.original.name}</Link>
    ),
  },
  {
    Header: 'Delivered On',
    accessor: (row) => row.deliveredOn,
  },
  {
    Header: 'Commercial Value (€)',
    accessor: (row) => row.totalCommercialValue,
  },
  {
    Header: 'Weight (kg)',
    accessor: (row) => row.totalWeight,
  },
  {
    Header: 'Distance (km)',
    accessor: (row) => row.totalDistance,
  },
  {
    Header: 'CO2 (tons)',
    accessor: (row) => row.totalC02,
  },
]

const ShipmentsPage: FunctionComponent<Props> = ({ data }) => {
  const pageContext = {
    pageTitle: 'TODO',
    siteTitle: 'TODO',
  }
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
    allColumns,
    getToggleHideAllColumnsProps,
    state,
  } = useTable(
    { columns: COLUMNS, data: shipments, initialState: { hiddenColumns: [] } },
    useSortBy,
  )

  return (
    <SimpleLayout pageContext={pageContext}>
      <div>
        {/* site level header / body / footer */}

        <div>
          <h1>Shipments</h1>
        </div>
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
    </SimpleLayout>
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
