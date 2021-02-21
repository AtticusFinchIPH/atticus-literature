import { useDispatch, useSelector } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import useStyle_Catalogue from './Catalogue.styles';
import clsx from 'clsx';
import { Collapse, IconButton, Typography } from '@material-ui/core';
import MinusIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import { useEffect, useState } from 'react';
import { getBookGenres } from '../../../actions/productActions';

const Catalogue = () => {
    const classes = useStyle_Catalogue();
    const dispatch = useDispatch();
    const { genres } = useSelector(state => state.bookGenres);
    const [allbooksOpen, setAllbooksOpen] = useState(true);
    const [vietnameseOpen, setVietnameseOpen] = useState(false);
    const [asianOpen, setAsianOpen] = useState(false);
    const [westernOpen, setWesternOpen] = useState(false);
    const [genresOpen, setGenresOpen] = useState(false);
    useEffect(() => {
        dispatch(getBookGenres());
    }, []);
    const sellectAllBooks = (e) => {
        setAllbooksOpen(true);
        setVietnameseOpen(false);
        setAsianOpen(false);
        setWesternOpen(false);
        setGenresOpen(false);
    };
    const sellectVietnamese = (e) => {
        setAllbooksOpen(false);
        setVietnameseOpen(true);
        setAsianOpen(false);
        setWesternOpen(false);
        setGenresOpen(false);
    };
    const sellectAsian = (e) => {
        setAllbooksOpen(false);
        setVietnameseOpen(false);
        setAsianOpen(asianOpen ? false : true);
        setWesternOpen(false);
        setGenresOpen(false);
    };
    const sellectWestern = (e) => {
        setAllbooksOpen(false);
        setVietnameseOpen(false);
        setAsianOpen(false);
        setWesternOpen(westernOpen ? false : true);
        setGenresOpen(false);
    };
    const sellectGenres = (e) => {
        setAllbooksOpen(false);
        setVietnameseOpen(false);
        setAsianOpen(false);
        setWesternOpen(false);
        setGenresOpen(genresOpen ? false : true);
    };
    return(
        <div className={classes.container}>
            <div className={classes.section}>
                <IconButton 
                    className={clsx(classes.title, classes.buttonHover, allbooksOpen && classes.onSellected)}
                    onClick={sellectAllBooks}
                    >
                    <Typography variant='body1'>
                        <FormattedMessage id='all_books' defaultMessage='All Books' />
                    </Typography>
                </IconButton>
            </div>
            <div className={classes.section}>
                <IconButton 
                    className={clsx(classes.title, classes.buttonHover, genresOpen && classes.onSellected)}
                    onClick={sellectGenres}
                    >
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
                <Collapse in={genresOpen}>
                {
                    genres?.length > 0
                    &&
                    <div className={classes.subsection}>
                        {
                            genres.map((genre, i) => (
                                <IconButton
                                    key={i}
                                    className={clsx(classes.subtitle, classes.buttonHover)}
                                    >
                                    <Typography variant='body1'>
                                        <FormattedMessage id={genre._id} defaultMessage={genre._id} />
                                    </Typography>
                                </IconButton>
                            ))
                        }
                    </div>
                }
                </Collapse>
            </div>
            <div className={classes.section}>
                <IconButton 
                    className={clsx(classes.title, classes.buttonHover, vietnameseOpen && classes.onSellected)}
                    onClick={sellectVietnamese}
                    >
                    <Typography variant='body1'>
                        <FormattedMessage id='vi_literature' defaultMessage='Vietnamese Literature' />
                    </Typography>
                </IconButton>
            </div>
            <div className={classes.section}>
                <IconButton 
                    className={clsx(classes.title, classes.buttonHover, asianOpen && classes.onSellected)}
                    onClick={sellectAsian}
                    >
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
                <Collapse in={asianOpen}>
                    <div className={classes.subsection}>
                        <IconButton
                            className={clsx(classes.subtitle, classes.buttonHover)}
                            >
                            <Typography variant='body1'>
                                <FormattedMessage id='japanese' defaultMessage='Japanese' />
                            </Typography>
                        </IconButton>
                        <IconButton
                            className={clsx(classes.subtitle, classes.buttonHover)}
                            >
                            <Typography variant='body1'>
                                <FormattedMessage id='chinese' defaultMessage='Chinese' />
                            </Typography>
                        </IconButton>
                        <IconButton
                            className={clsx(classes.subtitle, classes.buttonHover)}
                            >
                            <Typography variant='body1'>
                                <FormattedMessage id='asian' defaultMessage='Other' />
                            </Typography>
                        </IconButton>
                    </div>
                </Collapse>
            </div>
            <div className={classes.section}>
                <IconButton 
                    className={clsx(classes.title, classes.buttonHover, westernOpen && classes.onSellected)}
                    onClick={sellectWestern}
                    >
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
                <Collapse in={westernOpen}>
                    <div className={classes.subsection}>
                        <IconButton
                            className={clsx(classes.subtitle, classes.buttonHover)}
                            >
                            <Typography variant='body1'>
                                <FormattedMessage id='american' defaultMessage='American' />
                            </Typography>
                        </IconButton>
                        <IconButton
                            className={clsx(classes.subtitle, classes.buttonHover)}
                            >
                            <Typography variant='body1'>
                                <FormattedMessage id='english' defaultMessage='English' />
                            </Typography>
                        </IconButton>
                        <IconButton
                            className={clsx(classes.subtitle, classes.buttonHover)}
                            >
                            <Typography variant='body1'>
                                <FormattedMessage id='russian' defaultMessage='Russian' />
                            </Typography>
                        </IconButton>
                        <IconButton
                            className={clsx(classes.subtitle, classes.buttonHover)}
                            >
                            <Typography variant='body1'>
                                <FormattedMessage id='western' defaultMessage='Other' />
                            </Typography>
                        </IconButton>
                    </div>
                </Collapse>
            </div>
        </div>
    )
}

export default Catalogue;