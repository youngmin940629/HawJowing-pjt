package com.haejwoing.back.model.dto;

import lombok.Builder;
import lombok.Data;

import java.util.*;

@Data
@Builder
public class User {

    private int id;
    private String email;
    private String nickname;
    private int gender;
    private String birth;
    private String image;
    private String role;
    private int userStatus;
    private double point;

    public List<String> getRoleList(){
        if(this.role.length() > 0){
            return Arrays.asList(this.role.split(","));
        }
        return new ArrayList<>();
    }
}
