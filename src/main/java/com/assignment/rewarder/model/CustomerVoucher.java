package com.assignment.rewarder.model;

import java.util.Date;

public class CustomerVoucher {

  private int customerId;
  private String customerFirstName;
  private double voucherAmount;
  private int daysValid;
  private long generatedOn;

  public CustomerVoucher(
    int customerId,
    String customerFirstName,
    double voucherAmount,
    int daysValid,
    long generatedOn
  ) {
    this.customerId = customerId;
    this.customerFirstName = customerFirstName;
    this.voucherAmount = voucherAmount;
    this.daysValid = daysValid;
    this.generatedOn = generatedOn;
  }

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

  public double getVoucherAmount() {
    return voucherAmount;
  }

  public void setVoucherAmount(double voucherAmount) {
    this.voucherAmount = voucherAmount;
  }

  public int getDaysValid() {
    return daysValid;
  }

  public void setDaysValid(int daysValid) {
    this.daysValid = daysValid;
  }

  public long getGeneratedOn() {
    return generatedOn;
  }

  public void setGeneratedOn(long generatedOn) {
    this.generatedOn = generatedOn;
  }



  public static class Builder {
    private int customerId;
    private String customerFirstName;
    private double voucherAmount;
    private int daysValid;
    private long generatedOn;

    public Builder() {}

    public Builder setCustomerId(int customerId) {
      this.customerId = customerId;
      return this;
    }

    public Builder setCustomerFirstName(String customerFirstName) {
      this.customerFirstName = customerFirstName;
      return this;
    }

    public Builder setVoucherAmount(double voucherAmount) {
      this.voucherAmount = voucherAmount;
      return this;
    }

    public Builder setDaysValid(int daysValid) {
      this.daysValid = daysValid;
      return this;
    }

    public Builder setGeneratedOn(long generatedOn) {
      this.generatedOn = generatedOn;
      return this;
    }

    public CustomerVoucher build() {
      return new CustomerVoucher(customerId, customerFirstName, voucherAmount,daysValid,generatedOn);
    }
  }

}
