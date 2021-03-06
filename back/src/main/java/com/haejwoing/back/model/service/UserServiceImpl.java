package com.haejwoing.back.model.service;



import com.haejwoing.back.model.dto.User;
import com.haejwoing.back.model.mapper.UserMapper;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;


@Service
public class UserServiceImpl implements UserService{

    @Autowired
    private SqlSession sqlSession;


    @Override
    public void insertUser(User user) {
        sqlSession.getMapper(UserMapper.class).insertUser(user);
    }

    @Override
    public List<User> listAllUser() {
        return sqlSession.getMapper(UserMapper.class).listAllUser();
    }

    @Override
    public User searchByEmail(String email) {
        return sqlSession.getMapper(UserMapper.class).searchByEmail(email);
    }

    @Override
    public void withdrawUser(int id) {
        sqlSession.getMapper(UserMapper.class).withdrawUser(id);
    }

    @Override
    public List<User> listFollower(int id) {
        return sqlSession.getMapper(UserMapper.class).listFollower(id);
    }

    @Override
    public List<User> listFollow(int id) {
        return sqlSession.getMapper(UserMapper.class).listFollow(id);
    }

    @Override
    public void setPoint(Map<String, Object> map) {
        sqlSession.getMapper(UserMapper.class).setPoint(map);
    }

    @Override
    public int getUserId(String email) {
        return sqlSession.getMapper(UserMapper.class).getUserId(email);
    }

    @Override
    public User searchById(int id) {
        return sqlSession.getMapper(UserMapper.class).userInfo(id);
    }

    @Override
    public void updateProfile(User user) {
        sqlSession.getMapper(UserMapper.class).updateProfile(user);
    }

    @Override
    public Boolean checkNickname(String nickname) {
        return sqlSession.getMapper(UserMapper.class).checkNickname(nickname)==1;
    }

    @Override
    public Boolean addFollow(int id, int toUser) {
        return sqlSession.getMapper(UserMapper.class).addFollow(id, toUser) == 1;
    }

    @Override
    public Boolean checkFollow(int id, int loginedId) {
        return sqlSession.getMapper(UserMapper.class).checkFollow(id, loginedId) == 1;
    }

    @Override
    public Boolean unFollow(int toUser, int fromUser) {
        return sqlSession.getMapper(UserMapper.class).unFollow(toUser, fromUser) == 1;
    }

    @Override
    public List<User> findByNickname(String nickname) {
        return sqlSession.getMapper(UserMapper.class).findByNickname(nickname);
    }

    @Override
    public List<Map<String, Object>> getfollowerId(int id) {
        return sqlSession.getMapper(UserMapper.class).getFollowerId(id);
    }

    @Override
    public double getPercentage(int id) {
        return sqlSession.getMapper(UserMapper.class).getPercentage(id);
    }

    @Override
    public User getUserByNickname(String nickname) {
        return sqlSession.getMapper(UserMapper.class).getUserByNickname(nickname);
    }

    @Override
    public void updateByEmail(Map<String, Object> userMap) {
        sqlSession.getMapper(UserMapper.class).updateByEmail(userMap);
    }
}
