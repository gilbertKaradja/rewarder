package com.assignment.rewarder.controller;

import com.assignment.rewarder.exception.BadCsvException;
import com.assignment.rewarder.model.csv.CustomerOrderSummary;
import com.assignment.rewarder.model.CustomerVoucher;
import com.assignment.rewarder.service.VouchersService;
import com.opencsv.CSVReader;
import com.opencsv.bean.CsvToBean;
import com.opencsv.bean.CsvToBeanBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.nio.charset.Charset;
import java.nio.file.Files;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

@Controller
@RequestMapping(value = "vouchers")
public class VouchersController {

  private VouchersService vouchersService;

  @Autowired
  public VouchersController(VouchersService vouchersService) {
    this.vouchersService = vouchersService;
  }


  @RequestMapping(
    value = "generate",
    method = RequestMethod.POST,
    consumes = MediaType.MULTIPART_FORM_DATA_VALUE,
    produces = MediaType.APPLICATION_JSON_VALUE
  )
  @ResponseBody
  public List<CustomerVoucher> generateVouchers(@RequestParam("customer_data") MultipartFile file) {

    List<CustomerOrderSummary> customerOrderSummaries = new ArrayList<>();

    try {

      File localFile = File.createTempFile("rwd", "csv");
      file.transferTo(localFile);

      Reader reader = Files.newBufferedReader(localFile.toPath(), Charset.forName("UTF-8"));
      customerOrderSummaries = new CsvToBeanBuilder<CustomerOrderSummary>(reader)
        .withType(CustomerOrderSummary.class).build().parse();
    } catch (Exception e) {
      System.out.println(e.getStackTrace());
      throw new BadCsvException(e.getMessage());
    }

    return this.vouchersService.generateVouchers(customerOrderSummaries);
  }


}
