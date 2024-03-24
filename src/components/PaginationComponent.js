import React, { useState, useEffect, useContext, memo } from 'react'
import { Box } from '@mui/system'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { ENDPOINTS } from '../constants';
import { StateContext, DispatchContext } from '../MyContext';



const PaginationComponent = () => {

  const globalStateContext = useContext(StateContext);
  const globalDispatchContext = useContext(DispatchContext);

  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);

  const handleChange = (event, value) => {
    setPage(value);
  };

  const callGetApi = async () => {
    try{
        //-------------- Fire loading event ---------------
        globalDispatchContext({type: "TABLE_LOADING", value : true})

        //-------------- Get query params from globalStateContext and build the URL based on current page --------------
        const query = new URLSearchParams(globalStateContext.queryParam);
        query.append("pageNumber" , page-1);
        let url = `${ENDPOINTS.GET_STUDENTS}?${query.toString()}`

        //-------------- API call to /api/students --------------
        let apiResponse = await fetch(url);
        apiResponse = await apiResponse.json();

        //-------------- Set the total page number based on the count property in the response --------------
        setPageCount(apiResponse.count);

        //-------------- Only if the api response is of the current selected page dispatch a TABLE_DATA event --------------
        if(page-1 == query.get("pageNumber")){
           globalDispatchContext({type: "TABLE_DATA", value : apiResponse.students})
        }
        //-------------- Fire loading event ---------------
        globalDispatchContext({type: "TABLE_LOADING", value : false})
    }catch(err){
        console.log(err);
    }

    
  }

  useEffect(()=>{
    console.log("Why", page);
   callGetApi();
  }, [page, globalStateContext.queryParam]);

    return (
        <Box
        height='18px'
        width={"95%"}
        my={5}
        display="flex"
        alignItems="center"
        justifyContent={"center"}
        alignContent="center"
        gap={4}
        p={1}
    >
    <Stack spacing={2}>
      <Pagination count={pageCount} page={page} onChange={handleChange} />
    </Stack>
  </Box>
  )
}

export default memo(PaginationComponent);
