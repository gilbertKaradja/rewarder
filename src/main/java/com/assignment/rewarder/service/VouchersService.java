package com.assignment.rewarder.service;

import com.assignment.rewarder.model.CustomerVoucherRule;
import com.assignment.rewarder.model.csv.CustomerOrderSummary;
import com.assignment.rewarder.model.CustomerVoucher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class VouchersService {

  private List<CustomerVoucherRule> customerVoucherRules;

  @Autowired
  public VouchersService(List<CustomerVoucherRule> customerVoucherRules) {
    this.customerVoucherRules = customerVoucherRules;
  }

  public List<CustomerVoucher> generateVouchers(List<CustomerOrderSummary> customerOrderSummaries) {

    List<CustomerVoucher> customerVouchers = new ArrayList<>();

    customerOrderSummaries.forEach(orderSummary -> {

      for (CustomerVoucherRule rule : customerVoucherRules) {

        if (rule.eligibleForVoucher(orderSummary.getOrderValue())) {
          CustomerVoucher voucher = new CustomerVoucher.Builder()
            .setCustomerId(orderSummary.getCustomerId())
            .setCustomerFirstName(orderSummary.getCustomerFirstName())
            .setVoucherAmount(rule.getVoucherAmount())
            .setDaysValid(rule.getDaysValid())
            .setGeneratedOn(new Date().getTime())
            .build();

          customerVouchers.add(voucher);
          break;
        }
      }
    });

    return customerVouchers;
    
  }
}
