import React from 'react';
import styled from 'styled-components';


const FeedBox = styled.div`
  border: 3px solid #d3d3d3;
  margin: 5px;
`

const ProfileBox = styled.div`
    display: flex;
    margin-top: 5px;
    margin-left: 5px;
    align-items: center;
`

const ProfileName = styled.div`
    margin-left: 5px;
    text-align: left;
    font-weight: bold;
`

const ProfileImg = styled.img`
    width: 35px;
    height: 35px;
    border-radius: 70%;
`

const WriteTime = styled.div`
    font-size: 12px;
    margin: auto 5px auto auto;
`

const ContentImgBox = styled.div`
    width: 100%;
    text-align: end;

`

const ContentBox = styled.div`
`

const ContentImg = styled.img`
    width: inherit;

`

const Content = styled.div`
    text-align: left;
    margin: 0 10px 10px 10px; 
`

export default function FeedItem({feedimg, feedcontent, profileimg, profilename, writetime}) {
  return (
      <FeedBox>
          <ProfileBox>
            <ProfileImg src='/images/baseprofile.jpg' alt='프사'/>
            <ProfileName>{profilename}</ProfileName>
            <WriteTime>{writetime}분 전</WriteTime>
          </ProfileBox>
          <hr />
          <ContentBox>
            <ContentImgBox>
                <ContentImg src='/images/1.jpg' alt='글 사진' />
            </ContentImgBox>
            <hr />
            <Content>{feedcontent}</Content>
          </ContentBox>
      </FeedBox>
  )
}