import React from "react";
import { Typography, Link } from "@material-ui/core";

const Copyright = () => {
  return (
    <div style={{width: '100%', position: 'relative', bottom: '-56px'}} className="what">
      <Typography variant="body1" color="textSecondary" align="center">
        {"Copyright © "}
        <Link href="https://github.com/AtticusFinchIPH" target="_blank">
          AtticusFinchIPH
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    </div>
  );
}

export default Copyright;