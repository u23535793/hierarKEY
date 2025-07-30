import React, { useRef, useState, useLayoutEffect} from 'react';
import { Typography, Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Tree from 'react-d3-tree';

import NavBar from '../components/navbar'; 

const data = {
  name: 'Organization',
  children: [
    {
      name: 'Employees',
      children: [{ name: 'Alice' }, { name: 'Bob' }],
    },
    {
      name: 'Managers',
      children: [{ name: 'Carol' }],
    },
    {
      name: 'Editors',
      children: [{ name: 'Dave' }],
    },
  ],
};

const employees = [
  { name: 'Alice', surname: 'Smith', position: 'Developer' },
  { name: 'Bob', surname: 'Johnson', position: 'Designer' },
  { name: 'Carol', surname: 'Williams', position: 'Manager' },
  { name: 'Alice', surname: 'Smith', position: 'Developer' },
  { name: 'Bob', surname: 'Johnson', position: 'Designer' },
  { name: 'Carol', surname: 'Williams', position: 'Manager' },
  { name: 'Alice', surname: 'Smith', position: 'Developer' },
  { name: 'Bob', surname: 'Johnson', position: 'Designer' },
  // { name: 'Carol', surname: 'Williams', position: 'Manager' },
  // { name: 'Alice', surname: 'Smith', position: 'Developer' },
  // { name: 'Bob', surname: 'Johnson', position: 'Designer' },
  // { name: 'Carol', surname: 'Williams', position: 'Manager' },
  // { name: 'Alice', surname: 'Smith', position: 'Developer' },
  // { name: 'Bob', surname: 'Johnson', position: 'Designer' },
  // { name: 'Carol', surname: 'Williams', position: 'Manager' },
];

export default function Dashboard() {
  const treeContainer = useRef(null);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });

  useLayoutEffect(() => {
    if (treeContainer.current) {
      const dimensions = treeContainer.current.getBoundingClientRect();
      setTranslate({
        x: dimensions.width / 2,
        y: 30,
      });
    }
  }, []);

  return (
    <>
      <NavBar />

      <Box sx={{ padding: 4, display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
        <Box sx={{ width: '15%', height: '82vh', display: 'flex', flexDirection: 'column', gap: 2, backgroundColor: 'background.default', justifyContent: 'space-between' }}>
          {['Employees', 'Managers', 'Editors'].map((title) => (
            <Paper key={title} elevation={2} sx={{ height: '33.33%',flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 10, flexDirection: 'column' }}>
              <Typography variant="h2" color='primary'>16</Typography>
              <Typography variant="h6">{title}</Typography>
            </Paper>
          ))}
        </Box>

        <TableContainer component={Paper} sx={{ width: '30%', height: '82vh', boxShadow: 4, borderRadius: 4, backgroundColor: 'white', p: 1 }}>
          <Typography variant="h6" color='primary' sx={{ textAlign: 'center', width: '100%' }}>Employee Overview</Typography>
          <Box component="hr" sx={{ width: '60%', borderTop: '3px solid #cb9043', mx: 'auto', my: 2 }} />
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Name</strong></TableCell>
                <TableCell><strong>Surname</strong></TableCell>
                <TableCell><strong>Position</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {employees.map((emp, index) => (
                <TableRow key={index}>
                  <TableCell>{emp.name}</TableCell>
                  <TableCell>{emp.surname}</TableCell>
                  <TableCell>{emp.position}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Box ref={treeContainer} sx={{ width: '50%', height: '82vh', backgroundColor: 'white', p: 1,  boxShadow: 4, borderRadius: 4 }}>
          <Typography variant="h6" color='primary' sx={{ textAlign: 'center', width: '100%' }}>Organisation Overview</Typography>
          <Box component="hr" sx={{ width: '60%', borderTop: '3px solid #cb9043', mx: 'auto', my: 2 }} />
          <Tree
            data={data}
            orientation="vertical"
            pathFunc="elbow"
            translate={translate}
            nodeSize={{ x: 150, y: 60 }}
            styles={{
              nodes: {
                node: {
                  circle: { fill: '#1976d2' },
                  name: { stroke: 'none', fill: '#fff' },
                },
                leafNode: {
                  circle: { fill: '#388e3c' },
                  name: { stroke: 'none', fill: '#fff' },
                },
              },
            }}
          />
        </Box>
      </Box>
    </>
  );
}