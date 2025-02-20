import { useEffect, useState } from 'react';
import TableDe from '../../TableDesign/TableDe'
import TablePaginater from '../../TableDesign/TableContent/Pagination'
import axios from 'axios';


const ListVouchers = () => {


  const [reloadControle, setReloadControle] = useState(0);
  const [maxContent, setMaxContent] = useState(0);
  const [currentPageBase, setCurrentPageBase] = useState(1);
  const [rowsPerPageBase, setRowsPerPageBase] = useState(5);
  const [transformedData, setTransformedData] = useState([]);

  const fetchData = async () => {

    try {
      const response = await axios.get(`${import.meta.env.VITE_LV_URL}/vouchers?page=${currentPageBase}&per_page=${rowsPerPageBase}`);

      const result = response.data;
      setMaxContent(response.data.total);
      
      const transformed = transformData(result.data);
      setTransformedData(transformed);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const transformData = (fetchedData) => {
    return fetchedData.map((item) => ({
      id: item.id,
      title: item.title,
      code: item.code,
      value: item.value,
      percentage: item.percentage,
      max_Value: item.max_value,
      max_Usage: item.max_usage,
      max_Usage_Per_User: item.max_usage_per_user,
      min_Order: item.min_order,
      status: item.status,
      start_Date: item.start_date,
      end_Date: item.end_date,
      description: item.description,
      terms: item.terms,
      created_By:item.created_by,
      created_At: item.created_at,
      updated_At: item.updated_at,
    }));
  };



  const columns = 
  [
    'voucher',
    'id.1',
    'title.1',
    'code.0',
    'value.0',
    'percentage.0',
    'max_Value.0',
    'max_Usage.0',
    'max_Usage_Per_User.0',
    'min_Order.0',
    'status.1',
    'start_Date.1',
    'created_At.1',
    'updated_At.1',
    'end_Date.1',
    'created_By.0',
    'description.0',
    'terms.0',
  ];

  useEffect(() => {
    fetchData();
  },[rowsPerPageBase, currentPageBase, reloadControle])

  useEffect(() => {
  }, [transformedData]);

  const controlerData = () => {
    setReloadControle(reloadControle + 1);
  }


  return (
    <>
      <TableDe columns={columns} data={transformedData} reloader={controlerData}/>
      {maxContent >= 5 && (
        <TablePaginater currentPageBase={currentPageBase} setCurrentPageBase={setCurrentPageBase} setRowsPerPageBase={setRowsPerPageBase} maxContent={maxContent} />
      )}

    </>
  );
};

export default ListVouchers;
