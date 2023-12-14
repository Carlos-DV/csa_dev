import { Card, CardContent, Typography, CardActions, Button, CardMedia } from '@mui/material'
import { BaseConocimiento, MainLayout } from '../../components'
import imagecard from '../../assets/image/ida-herramientassistemasdiseno-blog-655x470.png';
import { CardActionArea } from '@mui/material';
import { useEffect, useState } from 'react';
import { baseConomientoAPI } from "../../server";

const baseConocmiento = () => {

  const [list, setList] = useState('');
  const [departament, setDepartament] = useState<
    { pkDepartment: number, name: string, description: string }[]
  >([]);


  const handlerDepartament = () => {
    baseConomientoAPI.getDepartament().then((res) => {
      const creadores = res.map((item: any) => ({
        name: item.name || '',
        description: item.description || '',
      }));
      setDepartament(creadores);
    })
  }


  useEffect(() => {
    handlerDepartament();
  }, []);


  return (
    <MainLayout>
      <BaseConocimiento>
      </BaseConocimiento>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
        {departament.map((creador, index) => (
          <Card key={index} sx={{ maxWidth: 345, marginTop: '50px', flex: '0 0 30%' }}>
            <CardActionArea>
              <CardMedia
                component="img"
                style={{ height: 'auto' }}
                {...imagecard}
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {creador.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {creador.description}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </div>
    </MainLayout>
  )
  
}

export default baseConocmiento