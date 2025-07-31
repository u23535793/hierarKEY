import React, { useRef, useState, useEffect, useLayoutEffect} from 'react';
import { useNavigate } from 'react-router-dom'; 
import { Typography, Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Tree from 'react-d3-tree';

import NavBar from '../components/navbar'; 
import { hash, getNumEmployees, getNumManagers, getNumEditors, getEmplOverview } from '../requests/read';
import BuildTree from '../components/buildTree';

export default function Dashboard() {
  const [numEmployees, setNumEmployees] = useState(null);
  const [numManagers, setNumManagers] = useState(null);
  const [numEditors, setNumEditors] = useState(null);
  const [employees, setEmployees] = useState([]);
  const treeContainer = useRef(null);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const [treeData, setTreeData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const email = sessionStorage.getItem('email');
    const access = sessionStorage.getItem('access');

    const authenticate = async () => { 
      if (!email || !access) {
        sessionStorage.clear();
        navigate('/');
        return;
      }

      try {
        const check = await hash(email); 
        if (access !== check) {
          sessionStorage.clear();
          navigate('/');
          return; 
        } 
      }
      catch (error) {
        console.error('Authentication failed:', error);
      }
    }

    const fetchNumEmployees = async () => {
      try {
        const count = await getNumEmployees(email);
        setNumEmployees(count.data);
      } 
      catch (error) {
        console.error('Failed to fetch number of employees:', error);
      }
    };

    const fetchNumManagers = async () => {
      try {
        const count = await getNumManagers(email);
        setNumManagers(count.data);
      } 
      catch (error) {
        console.error('Failed to fetch number of managers:', error);
      }
    };

    const fetchNumEditors = async () => {
      try {
        const count = await getNumEditors(email);
        setNumEditors(count.data);
      } 
      catch (error) {
        console.error('Failed to fetch number of editors:', error);
      }
    };

    const fetchEmployees = async () => {
      try {
        const data = await getEmplOverview(email);
        const tree = BuildTree(data, 'position'); 
        setTreeData(tree);
        setEmployees(data);
      } 
      catch (error) {
        console.error('Failed to fetch employees:', error);
      }
    };

    authenticate(); 
    fetchNumEmployees();
    fetchNumManagers();
    fetchNumEditors();
    fetchEmployees();
  }, [navigate]);

  useLayoutEffect(() => {
    if (treeContainer.current) {
      const dimensions = treeContainer.current.getBoundingClientRect();
      setTranslate({
        x: dimensions.width / 2,
        y: 30,
      });
    }
  }, []);

  const renderNode = ({ nodeDatum, toggleNode }) => (
    <g>
      <circle r={8} fill={nodeDatum.children ? '#05344aff' : '#cb9043'} onClick={toggleNode} />
      <text
        fill="#000"
        x={20}       
        y={10}        
        style={{ fontSize: '10px', userSelect: 'none', letterSpacing: '1px' }}
        onClick={toggleNode}
      >
        {nodeDatum.name}
      </text>
    </g>
  );

  return (
    <>
      <NavBar />

      <Box sx={{ padding: 4, display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
        <Box sx={{ width: '15%', height: '82vh', display: 'flex', flexDirection: 'column', gap: 2, backgroundColor: 'background.default', justifyContent: 'space-between' }}>
            <Paper key='Employees' elevation={2} sx={{ height: '33.33%',flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 10, flexDirection: 'column' }}>
              <Typography variant="h2" color='primary'>{numEmployees}</Typography>
              <Typography variant="h6">Employees</Typography>
            </Paper>
            <Paper key='Managers' elevation={2} sx={{ height: '33.33%',flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 10, flexDirection: 'column' }}>
              <Typography variant="h2" color='primary'>{numManagers}</Typography>
              <Typography variant="h6">Managers</Typography>
            </Paper>
            <Paper key='Editors' elevation={2} sx={{ height: '33.33%',flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 10, flexDirection: 'column' }}>
              <Typography variant="h2" color='primary'>{numEditors}</Typography>
              <Typography variant="h6">Editors</Typography>
            </Paper>
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
          {treeData ? (
            <Tree
              data={treeData}
              orientation="vertical"
              pathFunc="step"
              translate={translate}
              nodeSize={{ x: 140, y: 80 }}
              renderCustomNodeElement={renderNode}
            />
          ) : (
            <Typography sx={{ textAlign: 'center', mt: 4 }}>
              Loading Hierarchy...
            </Typography>
          )}
        </Box>
      </Box>
    </>
  );
}