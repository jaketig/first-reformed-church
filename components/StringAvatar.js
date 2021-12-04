import { Avatar } from "@mui/material";
import PropTypes from 'prop-types';

function StringAvatar ({name}) {
  function stringAvatar(name) {
    return {
      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
  }

  return (
    <Avatar {...stringAvatar(name)}></Avatar>
  )
}

StringAvatar.propTypes = {
  name: PropTypes.string
}

export default StringAvatar