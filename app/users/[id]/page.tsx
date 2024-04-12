import { Container, Typography, List, Link, Grid } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

async function getData(id: string) {
  const res = await fetch(`http://localhost:5001/home/${id}`, {
    next: { revalidate: 10 }
  });
  if (!res.ok) {
    throw new Error('Failed to fetch user data');
  }
  return res.json();
}

export default async function Page({ params: { id }, }: { params: { id: string } }) {
  const data = await getData(id)
  return (
    <>
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                sx={{ height: 340 }}
                image={data.users.thumbnail}
                title="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {data.users.fname} {data.users.lname}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {data.users.username}
                </Typography>
              </CardContent>
              <CardActions>
                <Stack key={data.users.posts.id} direction="row" spacing={2}>
                  {data.users.posts.map((item: any) => (
                    <Avatar key={item.id} alt={item.title} src={item.thumbnail} />
                  ))}
                </Stack>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Container>

    </>
  )
}