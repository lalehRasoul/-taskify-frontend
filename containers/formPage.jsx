import { Grid } from "@mui/material";
import { Box, Container } from "@mui/system";

function FormPage({children}) {
  return (
    <Box
      sx={{
        background: `url('/images/bg.svg') no-repeat`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        backgroundAttachment: "fixed",
      }}
      width={"100vw"}
      height={"100vh"}
    >
      <Container maxWidth="xl" sx={{ height: "100%" }}>
        <Grid
          container={true}
          height="100%"
          width="100%"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item={true} xl={3} lg={4} md={5} sm={7} xs={12}>
            {children}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default FormPage;
