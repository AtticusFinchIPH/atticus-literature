import { useSelector } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import useStyle_Catalogue from './Catalogue.styles';
import { IconButton, Typography } from '@material-ui/core';
import MinusIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import { useState } from 'react';

const Catalogue = () => {
    const classes = useStyle_Catalogue();
    const { genres } = useSelector(state => state.bookGenres);
    const [viOpen, setViOpen] = useState(false);
    const [asianOpen, setAsianOpen] = useState(false);
    const [westernOpen, setWesternOpen] = useState(false);
    const [genresOpen, setGenresOpen] = useState(true);
    return(
        <div className={classes.container}>
            <div className={classes.section}>
                <div className={classes.title}>
                    <IconButton className={classes.noBorderRadius}>
                        <Typography variant='body1'>
                            <FormattedMessage id='all_categories' defaultMessage='All Categories' />
                        </Typography>
                    </IconButton>
                </div>
            </div>
            <div className={classes.section}>
                <div className={classes.title}>
                    <IconButton className={classes.noBorderRadius}>
                        <Typography variant='body1'>
                            <FormattedMessage id='vi_literature' defaultMessage='Vietnamese Literature' />
                        </Typography>
                    </IconButton>
                </div>
            </div>
            <div className={classes.section}>
                <div className={classes.title}>
                    <IconButton className={classes.noBorderRadius}>
                    <Typography variant='body1'>
                        <FormattedMessage id='asian_literature' defaultMessage='Asian Literature' />
                    </Typography>
                    </IconButton>
                    <IconButton>
                        {
                            asianOpen
                            ?
                            <MinusIcon />
                            :
                            <AddIcon />
                        }
                    </IconButton>
                </div>
            </div>
            <div className={classes.section}>
                <div className={classes.title}>
                    <IconButton className={classes.noBorderRadius}>
                    <Typography variant='body1'>
                        <FormattedMessage id='western_literature' defaultMessage='Western Literature' />
                    </Typography>
                    </IconButton>
                    <IconButton>
                        {
                            westernOpen
                            ?
                            <MinusIcon />
                            :
                            <AddIcon />
                        }
                    </IconButton>
                </div>
            </div>
            <div className={classes.section}>
                <div className={classes.title}>
                    <IconButton className={classes.noBorderRadius}>
                    <Typography variant='body1'>
                        <FormattedMessage id='genres' defaultMessage='Genres' />
                    </Typography>
                    </IconButton>
                    <IconButton>
                        {
                            genresOpen
                            ?
                            <MinusIcon />
                            :
                            <AddIcon />
                        }
                    </IconButton>
                </div>
                <div className={classes.subSection}>
                    {
                        // genres.map(genre => (
                        //     <Typography variant='body2'>
                        //         {genre}
                        //     </Typography>
                        // ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Catalogue;