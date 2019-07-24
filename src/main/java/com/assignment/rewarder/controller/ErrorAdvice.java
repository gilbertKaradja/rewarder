package com.assignment.rewarder.controller;

import com.assignment.rewarder.exception.BadCsvException;
import org.apache.coyote.Response;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
@ResponseBody
public class ErrorAdvice {

  @ExceptionHandler(BadCsvException.class)
  @ResponseStatus(value = HttpStatus.BAD_REQUEST)
  @ResponseBody
  public Response handleInvalidInvoiceException(BadCsvException e) {

    Response response = new Response();
    response.setMessage(e.getMessage());

    return response;
  }
}
