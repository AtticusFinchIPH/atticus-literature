import { useSelector } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Container, Typography } from '@material-ui/core';
import useStyle from './styles';
import Catalogue from './Catalogue';

const Bookstore = () => {
    const classes = useStyle();
    const language = useSelector(state => state.language);
    return (
        <div className={classes.root}>
            <Container className={classes.container} maxWidth='xl'>
                <div className={classes.title}>
                {
                    language === 'vi'
                    ?
                    <>
                    <Typography variant='h3' component='h1'>
                        Hiệu sách
                    </Typography>
                    <Typography variant='h5' component='h1'>
                        của Atticus
                    </Typography>
                    </>
                    :
                    <>
                    <Typography variant='h5' component='h1'>
                        Atticus's
                    </Typography>
                    <Typography variant='h3' component='h1'>
                        Bookstore
                    </Typography>
                    </>
                }
                </div>
                <div className={classes.content}>
                    <div className={classes.catalogue}>
                        <Catalogue />
                    </div>
                    <div className={classes.products}>
                        List
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default Bookstore;