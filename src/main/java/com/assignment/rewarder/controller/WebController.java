package com.assignment.rewarder.controller;

import org.springframework.boot.autoconfigure.web.servlet.error.BasicErrorController;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping(value = {"/", "/home"})
public class WebController {

  @RequestMapping(method = RequestMethod.GET)
  public String index() {
    //BasicErrorController
    return "index";
  }
}
