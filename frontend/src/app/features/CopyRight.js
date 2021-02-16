import { makeStyles } from '@material-ui/styles';
import { Typography, Link } from "@material-ui/core";

const useStyle = makeStyles((theme) => ({
  root: {
    position: 'relative',
    width: '100%', 
    bottom: '-56px',
    color: theme.palette.text.main,
    backgroundColor: theme.palette.background.main,
  },
}));

const Copyright = () => {
  const classes = useStyle();
  return (
    <div className={classes.root}>
      <Typography variant="body1" align="center">
        {"Copyright © "}
        <Link href="https://github.com/AtticusFinchIPH" target="_blank" color='secondary'>
          AtticusFinchIPH
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    </div>
  );
}

export default Copyright;