import {AppBar, Container, Typography} from "@mui/material";

export default function MissionStatement() {
  const styles = {
    appbar: {
      mb: 2
    },
    container: {
      textAlign: "center",
      my: 2
    }
  }

  return (
    <AppBar position={"relative"} color={"secondary"} sx={styles.appbar}>
      <Container sx={styles.container}>
        <Typography><b>Our Mission:</b> To Encourage, Equip, and Engage members as they follow Jesus</Typography>
      </Container>
    </AppBar>
  )
}