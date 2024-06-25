package com.yungyingzerza.calendar;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class StudentController {

    @GetMapping("/student")
    public Student hello() {
        return new Student("Yung", 20);
    }
}
