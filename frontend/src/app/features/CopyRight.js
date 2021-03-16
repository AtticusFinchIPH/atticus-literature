
import { Typography, Link } from "@material-ui/core";
import { makeStyles } from '@material-ui/styles';

const useStyle = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    zIndex: "999",
    width: '100%', 
    bottom: '0px',
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
        {" - version 1.0.2"}
      </Typography>
    </div>
  );
}

export default Copyright;