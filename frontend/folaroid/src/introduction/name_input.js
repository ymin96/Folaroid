import React, { useCallback, useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
// import InputLabel from '@mui/material/InputLabel';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import { TextField } from '@mui/material';

const NameInputModule = () => {
  const [name, setName] = useState('');

  const handleChangeName = useCallback((event) => {
    setName(event.target.value);
  }, '');


  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <Card style={{ width: '80%', margin: '10px' }}>
      <CardHeader
        title="이름"
      />
      <CardContent>
        <Box>
          <form style={{ margin: '10px' }}>
            <div
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                flexDirection: 'row',
              }}
            >
              <div style={{width: '100%'}}>
                <TextField
                  required
                  label="이름"
                  placeholder="이름"
                  value={name}
                  onChange={handleChangeName}
                  size="medium"
                  style={{width: '40%'}}
                />
              </div>
              <div>
                <Button type="submit" variant="contained" onSubmit={handleSubmit}>
                  제출
                </Button>
              </div>
            </div>
          </form>
        </Box>
        <Box>
          <h1>{name}</h1>
        </Box>
      </CardContent>
    </Card>
  );
};

export default NameInputModule;
