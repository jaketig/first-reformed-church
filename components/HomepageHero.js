import {Box, Container, Typography} from "@mui/material";
import Image from "next/image";

export default function HomepageHero() {
  const styles = {
    wrapper: {
      display: "flex",
      position: "relative",
      flex: "0 0 100%",
      height: "300px",
      minHeight: "450px",
      maxHeight: "100vh"
    },
    backgroundImage: {
      zIndex: 0
    },
    overlay: {
      display: "flex",
      backgroundColor: "rgba(0,0,0,0.35)",
      flexGrow: 1,
      zIndex: 1
    },
    content: {
      paddingTop: "68.5px", // todo set to navbar height
      margin: "auto",
      color: 'primary.contrastText',
      textAlign: "center"
    }
  }

  return (
    <Box sx={styles.wrapper}>
      <Image
        css={styles.backgroundImage}
        src={"/images/main_hero.jpg"}
        alt={"First Reformed Church"}
        layout={"fill"}
        objectFit={"cover"}
        objectPosition={"center bottom"}
      />
      <Box sx={styles.overlay}>
        <Container sx={styles.content}>
          <Typography variant={"overline"}>Welcome to</Typography>
          <Typography variant={"h3"} component={"h1"}>First Reformed Church</Typography>
          Next Service: <strong>Sunday January 1st 10:00 AM</strong>
        </Container>
      </Box>
    </Box>
  )


}
