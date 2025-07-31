import React, { useRef, useState, useEffect, useLayoutEffect} from 'react';
import { useNavigate } from 'react-router-dom'; 
import { Box, Typography } from '@mui/material';
import Tree from 'react-d3-tree';

import NavBar from '../components/navbar'; 
import { hash, getEmplOverview } from '../requests/read';
import BuildTree from '../components/buildTree';

export default function HierarchyView() {
  const navigate = useNavigate();
  const treeContainer = useRef(null);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const [treeData, setTreeData] = useState(null);

  useLayoutEffect(() => {
    if (treeContainer.current) {
      const dimensions = treeContainer.current.getBoundingClientRect();
      setTranslate({
        x: dimensions.width / 2,
        y: 30,
      });
    }
  }, []);

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

    const fetchEmployees = async () => {
      try {
        const data = await getEmplOverview(email);
        const tree = BuildTree(data, 'name'); 
        setTreeData(tree);
      } 
      catch (error) {
        console.error('Failed to fetch employees:', error);
      }
    };

    authenticate();
    fetchEmployees();
  }, [navigate]);

  // console.log("treeData", treeData);
  const renderNode = ({ nodeDatum, toggleNode }) => (
    <g>
      <circle r={12} fill={nodeDatum.children ? '#05344aff' : '#cb9043'} onClick={toggleNode} />
      <text
        fill="#000"
        x={20}       
        y={10}        
        style={{ fontSize: '14px', userSelect: 'none', letterSpacing: '1px' }}
        onClick={toggleNode}
      >
        {nodeDatum.name}
      </text>
    </g>
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', width: '100vw' }}>
      <NavBar />

      <Box ref={treeContainer} sx={{ width: '95%', mt: 5, mx: 'auto', height: '76vh', backgroundColor: 'white', p: 1,  boxShadow: 1 }}>
          <Typography variant="h6" color='primary' sx={{ textAlign: 'center', width: '100%' }}>Organisation Hierarchy</Typography>
          <Box component="hr" sx={{ width: '50%', borderTop: '3px solid #cb9043', mx: 'auto', my: 2 }} />
          {treeData ? (
            <Tree
              data={treeData}
              orientation="vertical"
              pathFunc="step"
              translate={translate}
              nodeSize={{ x: 200, y: 100 }}
              renderCustomNodeElement={renderNode}
            />
          ) : (
            <Typography sx={{ textAlign: 'center', mt: 4 }}>
              Loading Hierarchy...
            </Typography>
          )}
        </Box>
        <Typography variant="body2" sx={{ textAlign: 'center', mt: 1, color: 'primary.main', fontStyle: 'italic' }}>
          Use your mouse or touchpad to move or zoom in and out of the hierarchy tree for a better view.
        </Typography>
        <Typography variant="body2" sx={{ textAlign: 'center', color: 'primary.main', fontStyle: 'italic' }}>
          Click a node to expand or collapse its children.
        </Typography>
    </Box>
  );
}