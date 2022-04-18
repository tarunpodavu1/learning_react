import React, { useEffect } from 'react';
import { MDBDataTableV5 } from 'mdbreact';

export default function InitialOrder({filData}) {

  console.log('Data in table',filData);
  useEffect(() => {}, [filData])


  const [datatable, setDatatable] = React.useState({
    columns: [
      {
        label: 'Title',
        field: 'title',
        width: 150,
        sort: 'asc',
        attributes: {
          'aria-controls': 'DataTable',
          'aria-label': 'Name',
        },
      },
      {
        label: 'Location',
        field: 'location',
        sort: 'asc',
        width: 270,
      },
      {
        label: 'Date Posted',
        field: 'datePosted',
        sort: 'asc',
        width: 200,
      },
     
    ],
    rows: filData
  });

  return <MDBDataTableV5 hover order={['datePosted', 'desc']} data={datatable} />;
}