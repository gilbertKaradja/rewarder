package com.assignment.rewarder;


import com.assignment.rewarder.model.CustomerVoucher;
import com.assignment.rewarder.model.CustomerVoucherRule;
import com.assignment.rewarder.model.csv.CustomerOrderSummary;
import com.assignment.rewarder.service.VouchersService;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.ArrayList;
import java.util.List;


@RunWith(SpringRunner.class)
@SpringBootTest
public class VoucherServiceTest {

  @Autowired
  VouchersService vouchersService;


  @Test
  public void generateVouchers_EmptyInput_NoVouchers() {
    List<CustomerOrderSummary> orderSummaries = new ArrayList<>();
    List<CustomerVoucher> vouchers = vouchersService.generateVouchers(orderSummaries);

    Assert.assertEquals(vouchers.size(), 0);
  }



  @Test
  public void generateVouchers_ZeroOrderAmount_NoVaucher() {

    List<CustomerOrderSummary> orderSummaries = new ArrayList<>();

    CustomerOrderSummary orderSummary = new CustomerOrderSummary();
    orderSummary.setCustomerId(1);
    orderSummary.setCustomerFirstName("John");
    orderSummary.setOrderValue(0);

    orderSummaries.add(orderSummary);

    List<CustomerVoucher> vouchers = vouchersService.generateVouchers(orderSummaries);

    Assert.assertEquals(vouchers.size(), 0);
  }



  @Test
  public void generateVouchers_OrderAmountsOutsideVoucherRange_NoVouchers() {

    CustomerVoucherRule rule = new CustomerVoucherRule();
    rule.setOrderMinimum(50);
    rule.setOrderMaximum(100);
    rule.setDaysValid(10);
    rule.setVoucherAmount(1000);

    List<CustomerVoucherRule> rules = new ArrayList<>();
    rules.add(rule);

    VouchersService vouchersService = new VouchersService(rules);


    List<CustomerOrderSummary> orderSummaries = new ArrayList<>();

    long[] orderAmounts = {-10, 0, 20, 49, 100 , 102, 10500};

    for(int i = 0; i < orderAmounts.length;  i++) {
      CustomerOrderSummary orderSummary = new CustomerOrderSummary();
      orderSummary.setCustomerId(i);
      orderSummary.setCustomerFirstName("");
      orderSummary.setOrderValue(orderAmounts[i]);

      orderSummaries.add(orderSummary);
    }


    List<CustomerVoucher> vouchers = vouchersService.generateVouchers(orderSummaries);

    Assert.assertEquals(vouchers.size(), 0);
  }



  @Test
  public void generateVouchers_OrderAmountsWithinVoucherRange_VouchersGenerated() {

    CustomerVoucherRule firstCategory = new CustomerVoucherRule();
    firstCategory.setOrderMinimum(500);
    firstCategory.setOrderMaximum(1000);
    firstCategory.setDaysValid(10);
    firstCategory.setVoucherAmount(1000);

    CustomerVoucherRule secondCategory = new CustomerVoucherRule();
    secondCategory.setOrderMinimum(1000);
    secondCategory.setOrderMaximum(2000);
    secondCategory.setDaysValid(10);
    secondCategory.setVoucherAmount(1000);

    CustomerVoucherRule thirdCategory = new CustomerVoucherRule();
    thirdCategory.setOrderMinimum(2500);
    thirdCategory.setOrderMaximum(-1);
    thirdCategory.setDaysValid(10);
    thirdCategory.setVoucherAmount(1000);


    List<CustomerVoucherRule> rules = new ArrayList<>();
    rules.add(firstCategory);
    rules.add(secondCategory);
    rules.add(thirdCategory);



    VouchersService vouchersService = new VouchersService(rules);


    List<CustomerOrderSummary> orderSummaries = new ArrayList<>();

    long[] orderAmounts = {-100, 500, 430, 1200, 2200 , 4000, 60000};

    for(int i = 0; i < orderAmounts.length;  i++) {
      CustomerOrderSummary orderSummary = new CustomerOrderSummary();
      orderSummary.setCustomerId(i);
      orderSummary.setCustomerFirstName("");
      orderSummary.setOrderValue(orderAmounts[i]);

      orderSummaries.add(orderSummary);
    }


    List<CustomerVoucher> vouchers = vouchersService.generateVouchers(orderSummaries);

    Assert.assertEquals(vouchers.size(), 4);
  }

}
