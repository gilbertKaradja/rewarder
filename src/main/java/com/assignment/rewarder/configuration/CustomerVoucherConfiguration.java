package com.assignment.rewarder.configuration;

import com.assignment.rewarder.model.CustomerVoucherRule;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.type.CollectionType;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Configuration
public class CustomerVoucherConfiguration {

  @Value("${customervoucher.rules}")
  private String customerVoucherRuleValues;

  @Bean
  public List<CustomerVoucherRule> getCustomerVoucherRules() {

    ObjectMapper mapper = new ObjectMapper();
    List<CustomerVoucherRule> customerVoucherRules = new ArrayList<>();

    try {
      CollectionType collectionType = mapper
        .getTypeFactory()
        .constructCollectionType(List.class, CustomerVoucherRule.class);

      customerVoucherRules = mapper.readValue(customerVoucherRuleValues, collectionType);

    } catch (IOException e) {
      e.printStackTrace();
    }

    return customerVoucherRules;
  }
}
