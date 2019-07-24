import React from 'react';
import { CustomerVoucher } from '../../api/service.types';

interface Props {
    customerVouchers: CustomerVoucher[];
}

function VoucherTable(props: Props) {

    const { customerVouchers } = props;

    return (
        <table>
            <thead>
                <tr>
                    <td>First Name</td>
                    <td className="align_center">Voucher Amount</td>
                    <td className="align_center">Days Valid</td>
                    <td className="align_center">Generated On</td>
                </tr>
            </thead>


            <tbody>
                {customerVouchers.map(customerVoucher => {
                    return (
                        <tr key={customerVoucher.customerId}>
                            <td>{customerVoucher.customerFirstName}</td>
                            <td className="align_center">{customerVoucher.voucherAmount}</td>
                            <td className="align_center">{customerVoucher.daysValid}</td>
                            <td className="align_center">{customerVoucher.generatedOn}</td>
                        </tr>
                    );
                })}
            </tbody>


        </table>
    );
}

export default VoucherTable;