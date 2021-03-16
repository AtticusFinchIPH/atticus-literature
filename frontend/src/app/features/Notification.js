
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { useIntl } from 'react-intl';
import { Slide } from '@material-ui/core';
import { ERROR, INFO, REMOVE_NOTIS, SUCCESS, WARNING } from '../../constants/globalConstants';

const Notification = () => {
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const intl = useIntl();
    const notis = useSelector(state => state.notis);
    useEffect(() => {
        if (notis.length > 0) {
            notis.forEach(noti => {
                if(!noti.id || !noti.type ||
                    !(
                        noti.type === ERROR ||
                        noti.type === WARNING ||
                        noti.type === INFO ||
                        noti.type === SUCCESS
                    )
                ) return;
                const msgTransl = intl.formatMessage({ id: noti.id, defaultMessage: noti.id });
                enqueueSnackbar(msgTransl, {
                    variant: noti.type,
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'center',
                    },
                    TransitionComponent: Slide,
                })
            })
            dispatch({
                type: REMOVE_NOTIS
            })
        }
    }, [notis])
    return (
        <></>
    )
}

export default Notification