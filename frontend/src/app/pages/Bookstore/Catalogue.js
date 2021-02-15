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
                <IconButton className={classes.title}>
                    <Typography variant='body1'>
                        <FormattedMessage id='all_books' defaultMessage='All Books' />
                    </Typography>
                </IconButton>
            </div>
            <div className={classes.section}>
                <IconButton className={classes.title}>
                    <Typography variant='body1'>
                        <FormattedMessage id='vi_literature' defaultMessage='Vietnamese Literature' />
                    </Typography>
                </IconButton>
            </div>
            <div className={classes.section}>
                <IconButton className={classes.title}>
                    <Typography variant='body1'>
                        <FormattedMessage id='asian_literature' defaultMessage='Asian Literature' />
                    </Typography>
                    {
                        asianOpen
                        ?
                        <MinusIcon />
                        :
                        <AddIcon />
                    }
                </IconButton>
            </div>
            <div className={classes.section}>
                <IconButton className={classes.title}>
                    <Typography variant='body1'>
                        <FormattedMessage id='western_literature' defaultMessage='Western Literature' />
                    </Typography>
                    {
                        westernOpen
                        ?
                        <MinusIcon />
                        :
                        <AddIcon />
                    }
                </IconButton>
            </div>
            <div className={classes.section}>
                <IconButton className={classes.title}>
                    <Typography variant='body1'>
                        <FormattedMessage id='genres' defaultMessage='Genres' />
                    </Typography>
                    {
                        genresOpen
                        ?
                        <MinusIcon />
                        :
                        <AddIcon />
                    }
                </IconButton>
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