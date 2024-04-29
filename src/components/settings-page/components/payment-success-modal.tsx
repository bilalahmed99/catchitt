import React from 'react'
import styles from './payment-success-modal.module.scss';
import { Box, IconButton, Modal } from '@mui/material';
 import paymentSuccess from '../../../assets/payment-success.png';
 

const PaymentSuccessModal = ({ openPaymentSuccessModal, onClosePaymentSuccessModal }: any) => {
 
  
  return (
    <Modal
                open={openPaymentSuccessModal}
                onClose={onClosePaymentSuccessModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={CustomSuccessPaymentModalStyle}>
                    

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

                        <div className={styles.paymentInstructions}>
                            <p className={styles.title}>Payment Successful</p>
                            <p style={{color:'#5448B2'}}>Your balance is 902 Cesium</p>
                             
                        </div>


                        <div className={styles.paymentMethods} style={{display:'flex', justifyContent:'center'}}>
                            <img src={paymentSuccess} alt='' style={{ width: '70%'}} />
 
                        </div>
                    </div>
                    {/* footer */}
                    <div style={{ display: 'flex', gap: '16px', flexDirection: 'column' }}>
                        <button onClick={onClosePaymentSuccessModal} className={styles.btnFullWidth}>
                            <p>Done</p>
                        </button>
                    </div>
                </Box>
            </Modal>
  )
}

export default PaymentSuccessModal



const CustomSuccessPaymentModalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: 'none', // Remove the border
    borderRadius: '8px',
    minWidth: 526,
    minHeight: 429,
    // maxWidth: '600px',
    // maxHeight: '549px',
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
}
