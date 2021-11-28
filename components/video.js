export default function Video({video}) {
  console.log(video)

  return (
    <iframe
      width="1280"
      height="720"
      src={`https://www.youtube.com/embed/${video._id}?rel=00&autohide=1&showinfo=0&wmode=transparent`}
      title="YouTube video player"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen>
    </iframe>
  )
}


