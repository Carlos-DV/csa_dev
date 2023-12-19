import { Card, CardContent, Typography, CardActions, Button, CardMedia } from '@mui/material'
import { BaseConocimientoPublico, MainLayout } from '../../components'
import imagecard from '../../assets/image/Base.svg';
import { CardActionArea } from '@mui/material';
import { useEffect, useState } from 'react';
import { baseConomientoAPI } from "../../server";
import { useRouter } from 'next/router';

const baseConocimientoPublico = () => {
  const [departament, setDepartament] = useState<
    { pkDepartment: number, name: string, description: string }[]
  >([]);

  const router = useRouter();

  const handleButtonClick = (pkDepartment : any) => {
    if (pkDepartment !== null) {
      router.push({
        pathname: '/base-conocimiento-publico/[pkDepartment]',
        query: { pkDepartment: pkDepartment },
      });
    } else {
      console.error('Error: No se ha seleccionado ningún pkDepartment.');
      // Puedes manejar este caso de error según tus necesidades
    }
  };

  const handlerDepartament = () => {
    baseConomientoAPI.getDepartament().then((res) => {
      const creadores = res.map((item: any) => ({
        pkDepartment: item.pkDepartment || 0,
        name: item.name || '',
        description: item.description || '',
      }));
      console.log(creadores);
      setDepartament(creadores);
    });
  };

  useEffect(() => {
    handlerDepartament();
  }, []);

  return (
    <MainLayout>
      <BaseConocimientoPublico>
      </BaseConocimientoPublico>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
        {departament.map((creador, index) => (
          <Card key={index} sx={{ maxWidth: 345, marginTop: '50px', flex: '0 0 30%' }}>
            <CardActionArea onClick={() => handleButtonClick(creador.pkDepartment)}>
              <CardMedia
                component="img"
                style={{ height: 'auto' }}
                {...imagecard}
                alt="Card"
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
  );
};

export default baseConocimientoPublico;
