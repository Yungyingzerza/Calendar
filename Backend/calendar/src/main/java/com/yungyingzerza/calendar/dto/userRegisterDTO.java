package com.yungyingzerza.calendar.dto;

import lombok.Data;
import lombok.experimental.Accessors;

import java.util.UUID;

@Accessors(chain = true)
@Data
public class userRegisterDTO {
    private UUID id;
    private String username;
    private String password;
}
