import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { useSelector, useDispatch } from 'react-redux'
import { IoCloseOutline } from "react-icons/io5";
import axios from 'axios'
import { modalStatusChange } from '../redux/slices/modalSlice';
import styles from './KeepMountedModal.module.scss'
import { Axios } from 'axios';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 300,

    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 3,
};

export default function KeepMountedModal(props) {

    const { name, status, episode, origin, species, type, location, gender, image } = props;
    console.log(episode[0]);
    const dispatch = useDispatch()
    const modalStatus = useSelector((state) => state.modal.modalWindow)
    const [open, setOpen] = React.useState(modalStatus);
    const handleClose = () => dispatch(modalStatusChange());
    const [firstEpis, setFirstEpis] = React.useState('')
    async function firstEpisode() {
        const res = await axios(episode[0])
        console.log(res);
        return setFirstEpis(res.data.episode)
    }
    firstEpisode()

    return (
        <div>
            <Modal

                keepMounted
                open={open}
                onClose={handleClose}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description"
            >
                <Box sx={style}>
                    <IoCloseOutline onClick={handleClose} className={styles.closeModalX} />
                    <img className={styles.imgCurrentPersonage} src={image} alt={name} />
                    <br />
                    <Typography id="keep-mounted-modal-description" sx={{ mt: 40 }}>
                        <h3>name:{` ${name}`}</h3>
                        <h4>gender: {`${gender}`}</h4>
                        <h4>status: {`${status}`}</h4>
                        <h4> species: {`${species}`}</h4>
                        <h4>  type: {`${type == '' ? 'unknow' : type}`}</h4>
                        <h4> location: {`${location.name}`}</h4>
                        <h4> origin: {`${origin.name}`}</h4>
                        <h4> First episode: {`${firstEpis}`}</h4>




                    </Typography>
                </Box>
            </Modal>
        </div>
    );
}