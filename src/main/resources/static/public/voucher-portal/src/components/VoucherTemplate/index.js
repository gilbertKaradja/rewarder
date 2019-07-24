import React, {Style} from 'react';
import { CustomerVoucher } from '../../api/service.types';




function VoucherTemplate(props) {

    return (
        <div className="voucher-template" style={styles.rootContainer}>


            <div className="description-container" style={styles.descriptionContainer}>

                <div className="title-message-container" style={styles.titleMessageContainer}>
                    <div className="title" style={styles.titleContainer}>
                        <span className="company-name" style={styles.companyName}>EvilCorp</span>
                        <span className="" style={styles.title}>Gift Voucher</span>
                    </div>

                    <div className="message" style={styles.message}>
                        Thanks for being such a loyal customer, <b>{props.customerFirstName}!</b><br />
                        Here's a voucher for your troubles :)
                    </div>
                </div>

                <div className="details-container" style={styles.detailsContainer}>
                    <span style={styles.detailsText}>Valid for {props.daysValid} days</span>
                    <span style={styles.detailsText}>REF: 789798798213</span>
                </div>
            </div>


            <div className="amount-container" style={styles.amountContainer}>
                <div className="amount" style={styles.amount}>
                    <span className="value" style={styles.amountValue}>{props.voucherAmount}</span>
                    <span className="currency" style={styles.amountCurrency}>&#8358;</span>
                </div>
                <div className="footer-text" style={styles.footerText}>value</div>
            </div>

        </div>
    );
}

const styles = {
    rootContainer: {
        marginTop: '20px',
        width: '450px',
        height: '180px',
        backgroundColor: '#f6f1eb',
        display: 'flex',
        flexDirection: 'row',
        border: '1px solid #ddd',
        WebkitPrintColorAdjust: 'exact'
    },
    descriptionContainer: {
        display: 'flex',
        flexDirection: 'column',
        width: 'calc(100% - 80px)',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: '20px',
        paddingRight: '20px',
    },
    titleMessageContainer: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        width: '100%'
    },
    titleContainer: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%'
    },
    companyName: {
        fontWeight: 'bold',
        fontSize: '14px',
        color: '#1eb82d',
        letterSpacing: '2px',
        marginBottom: '5px'
    },
    title: {
        fontSize: '30px',
        fontWeight: 'bold',
        color: 'red'
    },
    message: {
        marginTop: '10px',
        fontSize: '12px',
        lineHeight: '20px',
        color: '#444'
    },
    detailsContainer: {
        borderTop: '1px solid #e4dacd',
        marginLeft: '20px',
        marginRight: '20px',
        height: '27px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        alignItems: 'center'
    },
    detailsText: {
        color: '#444',
        fontSize: '10px'
    },
    amountContainer: {
        paddingTop: '10px',
        paddingBottom: '10px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#f93c41',
        width: '80px'
    },
    amount: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        flex: 1
    },
    amountValue: {
        writingMode: 'vertical-lr',
        transform: 'rotate(180deg)',
        fontSize: '45px',
        color: '#f6f1eb',
        fontFamily: 'sans-serif',
        lineHeight: '45px',
        fontWeight: 'bold'
    },
    amountCurrency: {
        writingMode: 'vertical-lr',
        transform: 'rotate(180deg)',
        color: '#f6f1eb',
        fontSize: '25px',
        fontFamily: 'sans-serif',
        lineHeight: '20px',
        marginTop: '5px'
    },
    footerText: {
        fontSize: '14px',
        color: '#f6f1eb'
    }

}

export default VoucherTemplate;