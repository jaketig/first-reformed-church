import {AppBar, Container, Typography} from "@mui/material";

export default function MissionStatement() {
  return (
    <AppBar position={"relative"} color={"secondary"} sx={{mb: 2}}>
      <Container sx={{textAlign: "center", my: 2}}>
        <Typography><b>Our Mission:</b> To Encourage, Equip, and Engage members as they follow Jesus</Typography>
      </Container>
    </AppBar>
  )
}