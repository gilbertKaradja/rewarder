import React, { Component, SyntheticEvent } from 'react';

import FilePickerArea from './components/FilePickerArea/index';
import './styles/main.scss';
import { createServiceInstance } from './api/service';
import VoucherTable from './components/VoucherTable';
import { CustomerVoucher } from './api/service.types';
import TablePaginator, { TablePaginatorProps } from './components/TablePaginator/index';
import VoucherTemplate from './components/VoucherTemplate';
import NotificationBox, { notificationTypes } from './components/NotificationBox';

const fileType: string = '.csv';
const buttonText: string = 'Select a file';
const entriesPerPage: number = 6;


interface State {
  notification: {
    show: boolean;
    notificationType: string;
    message: string;
  },
  orderSummariesFile: File | null;
  customerVouchers: CustomerVoucher[] | null,
  pagination: {
    currentPage: number;
    totalEntries: number;
    entriesPerPage: number;
  }
}

class App extends Component<{}, State> {

  service = createServiceInstance();

  constructor(props: any) {
    super(props)

    this.state = {
      notification: {
        show: false,
        notificationType: 'error',
        message: 'sds'
      },
      orderSummariesFile: null,
      customerVouchers: null,

      pagination: {
        currentPage: 0,
        totalEntries: 0,
        entriesPerPage: entriesPerPage
      }
    }

    this.generateVouchers = this.generateVouchers.bind(this);
  }

  render() {
    const { customerVouchers, notification, pagination } = this.state;

    let customerVouchersPage: CustomerVoucher[] = [];

    if (customerVouchers != null) {
      const { currentPage, entriesPerPage, totalEntries } = pagination;

      const start = currentPage * entriesPerPage;
      let end = start + entriesPerPage;

      if (end > customerVouchers.length) {
        end = customerVouchers.length;
      }

      customerVouchersPage = customerVouchers.slice(start, end);
    }

    return (
      <div className="application-root"
        onDrop={this.onDropHandler}
        onDragOver={this.onDropHandler}
      >

      <NotificationBox {...notification} />

        <h1>Voucher Portal</h1>

        <div className="">
          <FilePickerArea
            fileType={fileType}
            buttonText={buttonText}
            onFileSelect={this.onFileSelectHandler}
          />
        </div>

        <div className="generate-control-area">
          <button onClick={this.generateVouchers}>Generate Vouchers</button>
        </div>

        {customerVouchers != null && (
          <div className="result-area">

            <div id="print-area">

              {customerVouchers.map(customerVoucher => {
                return (
                  <VoucherTemplate
                    key={customerVoucher.customerId}
                    {...customerVoucher} />
                );
              })}
            </div>

            <div className="download-controls">
              <button onClick={this.printVouchers}>Print Vouchers</button>
            </div>

            <VoucherTable customerVouchers={customerVouchersPage} />

            <div className="table-controls">

              <div className="voucher-number">Total vouchers generated: {pagination.totalEntries}</div>

              <TablePaginator
                {...pagination}
                previousButtonHandler={this.previousPage}
                nextButtonHandler={this.nextPage}
              />

            </div>

          </div>
        )}

      </div>
    );
  }

  onFileSelectHandler = (file: File) => {
    this.setState({ orderSummariesFile: file });
  }

  async generateVouchers() {
    let { orderSummariesFile } = this.state;

    let file: string | Blob = '';

    if (orderSummariesFile != null) {
      file = orderSummariesFile;
    }

    let formData = new FormData();
    formData.append("customer_data", file);

    let generateVouchersResponse: CustomerVoucher[] | null = null;

    try {

      let response = await this.service
        .customerVoucher
        .generateCustomerVouchers(formData);

      generateVouchersResponse = response.data;
    } catch (err) {
      this.showNotification('Error generating vouchers', notificationTypes.ERROR);
      return;
    }

    const totalEntries = generateVouchersResponse != null ? generateVouchersResponse.length : 0;

    const pagination = {
      currentPage: 0,
      entriesPerPage: entriesPerPage,
      totalEntries: totalEntries
    }

    this.setState({
      customerVouchers: generateVouchersResponse,
      pagination: pagination
    });
  }

  previousPage = () => {
    let newPagination = { ...this.state.pagination };
    newPagination.currentPage -= 1;

    this.setState({ pagination: newPagination });
  }

  nextPage = () => {
    let newPagination = { ...this.state.pagination };
    newPagination.currentPage += 1;

    this.setState({ pagination: newPagination });
  }


  printVouchers = () => {
    let printArea = document.getElementById('print-area');

    if (printArea == null) {
      return;
    }

    let printContent = printArea.innerHTML;

    let newwindow = window.open('', 'new div', 'height=700,width=1000');

    if (newwindow == null) {
      return;
    }
    newwindow.document.write('<html><head><title></title>');
    newwindow.document.write('</head><body style="font-family: sans-serif;" >');
    newwindow.document.write(printContent);
    newwindow.document.write('</body></html>');
    newwindow.print();
    newwindow.close();

  }

  showNotification = (message: string, notificationType: string) => {
    let notificationState = {
      message: message,
      notificationType: notificationType,
      show: true
    }


    this.setState({notification: notificationState} ,() => {
      
      setTimeout(() => {
        let notificationState = {
          message: '',
          notificationType: '',
          show: false
        }
  
        this.setState({notification: notificationState})
      }, 5000);
    });
  }
}


export default App;
