package com.yungyingzerza.calendar.controller;

import com.yungyingzerza.calendar.service.userService;
import com.yungyingzerza.calendar.dto.userDTO;
import com.yungyingzerza.calendar.dto.userRegisterDTO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class userController {

    @Autowired
    private userService userService;

    @GetMapping
    public List<userDTO> findAll() {
        return userService.findAll();
    }

    @PostMapping("/register")
    public userDTO save(@RequestBody userRegisterDTO dto) {
        return userService.save(dto);
    }
}
