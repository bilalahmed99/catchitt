import React from 'react'
import styles from './coins-cart-modal.module.scss';
import { Modal } from "@mui/material";
import { Box, IconButton } from '@mui/material';
import closeIcon from '../../../assets/closeIcon.png';
 import coin from '../svg-components/coin.svg';
const CoinsCartModal = ({ openCartModal, onCloseCartModal, next }: any) => {
    return (
         
            <Modal
                open={openCartModal}
                onClose={onCloseCartModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={CustomCartModalStyle}>
                    <div className={styles.rechargeModalHeader}>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                width: '60%',
                            }}
                        >
                            <p>900 Cesium</p>
                            <div  style={{width: '40px !important'}}>

                            <IconButton onClick={onCloseCartModal}>
                                    <img src={closeIcon} alt='' style={{ width: '20px', height: '20px' }} />
                                </IconButton>
                            </div>
                        </div>
                    </div>

                    <div
                        className="modal-content-container"
                        style={{
                            width: '100%',
                            flex:'1',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent:'space-around',
                            padding: '10px'
                            
                           
                        }}
                    >
                        <div className={styles.cartItemsContainer}>
                            <div className={styles.cartItem}>
                                <div className={styles.itemDetails}>
                                     <img src={coin} alt=''  style={{ width: '40px', height: '40px', marginRight: '5px' }}  />
                                    <p>700 Cesium</p>
                                </div>
                                <div className={styles.itemPrice}>
                                    <p>QAR 17.90</p>
                                </div>
                            </div>
                            
                            <div className={styles.cartItem}>
                                <div className={styles.itemDetails}>
                                    <img src={coin} alt='' style={{ width: '40px', height: '40px', marginRight: '5px' }} />
                                    <p>200 Cesium</p>
                                </div>
                                <div className={styles.itemPrice}>
                                    <p>Free</p>
                                </div>
                            </div>


                        </div>

                        <hr />


                        <div className={styles.cartSubItemsContainer}>
                            <div className={styles.cartItem}>
                                <div className={styles.itemDetails}>
                                     
                                    <p>Subtotal</p>
                                </div>
                                <div className={styles.itemPrice}>
                                    <p>QAR 17.90</p>
                                </div>
                            </div>
                            
                            <div className={styles.cartItem}>
                                <div className={styles.itemDetails}>
                                    
                                    <p>Tax</p>
                                </div>
                                <div className={styles.itemPrice}>
                                    <p>QAR 0</p>
                                </div>
                            </div>


                        </div>



                         <div className={styles.cartTotalContainer}>
                            <div className={styles.cartItem}>
                                <div className={styles.itemDetails}>
                                     
                                    <p>Subtotal</p>
                                </div>
                                <div className={styles.itemPrice}>
                                    <p>QAR 17.90</p>
                                </div>
                            </div>
                            


                        </div>

                         

                    </div>

                    {/* footer */}
                    <div style={{ display: 'flex', gap: '16px', flexDirection: 'column' }}>
                        <button onClick={next} className={styles.btnFullWidth}>
                            <p>Proceed To Payment Method</p>
                        </button>
                    </div>
                </Box>
            </Modal>
        
    );
};

export default CoinsCartModal

const CustomCartModalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: 'none', // Remove the border
    borderRadius: '8px',
    minWidth: 430,
    minHeight: 509,
    // maxWidth: '600px',
    // maxHeight: '549px',
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
}
