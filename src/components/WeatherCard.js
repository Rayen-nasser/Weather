import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';


export default function WeatherCard() {
  return (
    <Card sx={{
      background:'#00334e',
      color: 'white',
    }}
    maxWidth="sm"
    >
        <Typography  variant="h3" fontWeight={500}>
          الرياض  
        </Typography>
        <Typography variant="h4" fontWeight={100}>
          الرياض  
        </Typography>
        <Typography variant="body2">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}
