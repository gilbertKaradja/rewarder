import React, { Component, SyntheticEvent } from 'react';

import FilePickerArea from './components/FilePickerArea/index';
import './styles/main.scss';
import { createServiceInstance } from './api/service';
import VoucherTable from './components/VoucherTable';
import { CustomerVoucher } from './api/service.types';
import TablePaginator, { TablePaginatorProps } from './components/TablePaginator/index';
import VoucherTemplate from './components/VoucherTemplate';

const fileType: string = '.csv';
const buttonText: string = 'Select a file';
const entriesPerPage: number = 6;


interface State {
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
    const { customerVouchers, pagination } = this.state;

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

  onDropHandler = (event: SyntheticEvent) => {
    event.preventDefault();
    event.stopPropagation();
  }
}


export default App;
