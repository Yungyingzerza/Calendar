package com.yungyingzerza.calendar.service;

import com.yungyingzerza.calendar.model.User;
import com.yungyingzerza.calendar.repository.userRepository;
import com.yungyingzerza.calendar.dto.userDTO;
import com.yungyingzerza.calendar.dto.userRegisterDTO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class userService {
    @Autowired
    private userRepository repository;

    public List<userDTO> findAll() {
        return repository.findAll().stream()
                .map(user -> {
                    userDTO tempDTO = new userDTO();
                    tempDTO.setId(user.getId());
                    tempDTO.setUsername(user.getUsername());
                    return tempDTO;
                })
                .collect(Collectors.toList());
    }

    public userDTO save(userRegisterDTO dto) {

        User tempUser = new User();
        tempUser.setUsername(dto.getUsername());
        tempUser.setPassword(dto.getPassword());
        tempUser = repository.save(tempUser);


        userDTO userDTO = new userDTO();
        userDTO.setId(tempUser.getId());
        userDTO.setUsername(tempUser.getUsername());

        return userDTO;

    }
}
