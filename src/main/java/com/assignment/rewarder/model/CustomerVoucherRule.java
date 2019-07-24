package com.assignment.rewarder.model;

public class CustomerVoucherRule {

  private float voucherAmount;
  private float orderMinimum;
  private float orderMaximum;
  private int daysValid;

  public float getVoucherAmount() {
    return voucherAmount;
  }

  public void setVoucherAmount(float voucherAmount) {
    this.voucherAmount = voucherAmount;
  }

  public float getOrderMinimum() {
    return orderMinimum;
  }

  public void setOrderMinimum(float orderMinimum) {
    this.orderMinimum = orderMinimum;
  }

  public float getOrderMaximum() {
    return orderMaximum;
  }

  public void setOrderMaximum(float orderMaximum) {
    this.orderMaximum = orderMaximum;
  }

  public int getDaysValid() {
    return daysValid;
  }

  public void setDaysValid(int daysValid) {
    this.daysValid = daysValid;
  }

  public boolean eligibleForVoucher(double totalOrderValue) {

    if (orderMinimum != -1 && orderMinimum > totalOrderValue) {
      return false;
    }

    if (orderMaximum != -1 && orderMaximum <= totalOrderValue) {
      return false;
    }

    return true;

  }
}
