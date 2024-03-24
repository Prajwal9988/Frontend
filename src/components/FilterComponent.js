import React, {useContext, useState} from 'react';
import { Box } from '@mui/system';
import { TextField, Button, InputLabel } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { StateContext, DispatchContext } from '../MyContext';

export const FilterComponent = () => {
  const globalStateContext = useContext(StateContext);
  const globalDispatchContext = useContext(DispatchContext);

  const [formData, setFormData] = useState({
    studentName : "",
    className : "",
    rollNumber : "",
    pageSize : "",
    sortBy : "studentId",
    direction : "ASC"
  })

  const handleChange = (event) => {
    const {name, value} = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  };

  const applyFilter = (e) => {
    const query = new URLSearchParams();
    if(formData.pageSize) query.append("pageSize", formData.pageSize);
    if(formData.className) query.append("className", formData.className);
    if(formData.rollNumber) query.append("searchByRollNumber", formData.rollNumber);
    if(formData.studentName) query.append("searchByName", formData.studentName);
    if(formData.direction) query.append("sortDirection", formData.direction);
    if(formData.sortBy) query.append("sortBy", formData.sortBy);
    globalDispatchContext({type: "QUERY_PARAM_UPDATE", value: query});
  }

  return (
    <Box
      height='30px'
      width={"95%"}
      my={5}
      display="flex"
      alignItems={"center"}
      justifyContent={"center"}
      gap={4}
      p={1}

    >
      <TextField onChange={handleChange} id="standard-basic" name="studentName" label="Student Name" variant="standard" />
      <TextField onChange={handleChange} id="standard-basic" name="className" label="Class Name" variant="standard" />
      <TextField onChange={handleChange} id="standard-basic" name="rollNumber" label="Student Roll Number" variant="standard" />
      <TextField onChange={handleChange} id="standard-basic" name="pageSize" label="Page Size" variant="standard" />
      <FormControl sx={{ minWidth: 160 }}>
        <InputLabel id="demo-simple-select-label">Sort</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          name = "sortBy"
          value={formData.sortBy}
          label="Sort"
          onChange={handleChange}
        >
          <MenuItem value={"studentId"}>Roll Number</MenuItem>
          <MenuItem value={"name"}>Student Name</MenuItem>
          <MenuItem value={"totalMarks"}>CGPA</MenuItem>
        </Select>
      </FormControl>
      <FormControl sx={{ minWidth: 140 }}>
        <InputLabel id="Direction">Direction</InputLabel>
        <Select
          labelId="Direction"
          id="direction"
          name = "direction"
          value={formData.direction}
          label="Direction"
          onChange={handleChange}
        >
          <MenuItem value={"ASC"}>Ascending</MenuItem>
          <MenuItem value={"DSC"}>Descending</MenuItem>
        </Select>
      </FormControl>
      <Button variant="outlined" onClick={applyFilter}>Apply Filter</Button>
    </Box>
  )
}
