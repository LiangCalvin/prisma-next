import Image from "next/image";
import styles from "./page.module.css";
import { Container, Typography, List, Link, Grid } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';

async function getData() {
  const res = await fetch('http://localhost:5001/home')

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  const data = await res.json()
  return data
}

export default async function Home() {
  const data = await getData()

  return (
    <>
      <Typography variant="h4" gutterBottom align="center">
        Users
      </Typography>
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          {data.users.map((item: any) => (
            <Grid key={item.id} item xs={12} md={4}>
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                  sx={{ height: 340 }}
                  image={item.thumbnail}
                  title="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                  {item.fname} {item.lname}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                  {item.username}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Link href={`/users/${item.id}`}>
                  <Button size="small">Learn More</Button>
                  </Link>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container >
    </>
  );
}