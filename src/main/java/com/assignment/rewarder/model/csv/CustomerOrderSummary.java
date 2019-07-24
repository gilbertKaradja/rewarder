package com.assignment.rewarder.model.csv;
import com.opencsv.bean.CsvBindByName;

public class CustomerOrderSummary {

  @CsvBindByName(column = "Customer Id")
  private int customerId;

  @CsvBindByName(column = "Customer First Name")
  private String customerFirstName;

  @CsvBindByName(column = "Order Value")
  private double orderValue;


  public int getCustomerId() {
    return customerId;
  }

  public void setCustomerId(int customerId) {
    this.customerId = customerId;
  }

  public String getCustomerFirstName() {
    return customerFirstName;
  }

  public void setCustomerFirstName(String customerFirstName) {
    this.customerFirstName = customerFirstName;
  }

  public double getOrderValue() {
    return orderValue;
  }

  public void setOrderValue(double orderValue) {
    this.orderValue = orderValue;
  }
}