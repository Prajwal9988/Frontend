import React, {useContext, useState} from 'react';
import { Box } from '@mui/system';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { StateContext} from '../MyContext';
import { Skeleton } from '@mui/material';

export default function TableComponent() {
  const globalStateContext = useContext(StateContext);
  return (
    <div >
        <Box
        height='528px'
        width={"97%"}
        my={3}
        display="flex"
        gap={2}
        p={1}
        >
        {globalStateContext.isTableLoading ?
          (
            <>
              <Box sx={{ width: "100%" }}>
              <Skeleton width={"100%"} height={90} animation="wave" />
              <Skeleton width={"100%"} height={90} animation="wave" />
              <Skeleton width={"100%"} height={90} animation="wave" />
              <Skeleton width={"100%"} height={90} animation="wave" />
              </Box>
            </>
          ) :
          (
            <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Student Name</TableCell>
                  <TableCell align="right">Roll Number</TableCell>
                  <TableCell align="right"> CGPA </TableCell>
                  <TableCell align="right"> Class and Section </TableCell>
                  <TableCell align="right">Floor No</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {globalStateContext.tableData.map((row) => (
                  <TableRow
                    key={row.studentId}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.studentId}</TableCell>
                    <TableCell align="right">{row.totalMarks}</TableCell>
                    <TableCell align="right">{row.classRoom.name}</TableCell>
                    <TableCell align="right">{row.classRoom.floor}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          )}

      

    
        </Box>
    </div>
  );
}