import { Box } from '@mui/material'

export default function Video({video}) {
  return (
    <Box sx={{
      position: 'relative',
      width: '100%',
      overflow: 'hidden',
      paddingTop: '56.25%', /* 16:9 Aspect Ratio */
      '& iframe': {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        width: '100%',
        height: '100%',
        border: 'none'
      }
    }}>
      <iframe
        sx
        width="1280"
        height="720"
        src={`https://www.youtube.com/embed/${video._id}?rel=00&autohide=1&showinfo=0&wmode=transparent`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen>
      </iframe>
    </Box>
  )
}


