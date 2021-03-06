import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import { Button, ProgressBar } from 'react-bootstrap';
import AWS from 'aws-sdk';
import {
  AiOutlineArrowLeft,
  AiOutlineMenu,
  AiOutlineInfoCircle,
  AiFillStar,
} from 'react-icons/ai';
import { BsPersonCircle } from 'react-icons/bs';
import { useHistory } from 'react-router-dom';
import styles from './profile.module.css';
import { useParams } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';

const Profile = props => {
  const history = useHistory();

  const [followCheck, setFollowCheck] = useState(false);
  const imgRef = useRef(null);

  if (sessionStorage.getItem('loginedUser') === null) {
    history.push('/');
  }
  let { id } = useParams();
  const loginedId = JSON.parse(sessionStorage.getItem('loginedUser')).userId;
  const jwtToken = JSON.parse(sessionStorage.getItem('loginedUser')).jwtToken;
  const [userData, setUserData] = useState({
    info: {
      point: 0,
      nickname: 'tmp',
    },
  });

  useEffect(() => {
    axios({
      method: 'get',
      url: `http://i6c103.p.ssafy.io/api/user/${id}`,
      // url: 'http://i6c103.p.ssafy.io/api/jwt/google',
      headers: {
        Authorization : 'Bearer ' + jwtToken,
      }
    })
      .then(response => {
        setUserData(response.data);
      })
      .catch(error => {})
      .finally(() => {});

    axios({
      method: 'get',
      url: `http://i6c103.p.ssafy.io/api/follow/check/${id}`,
      params: { loginedId: loginedId },
      headers: {
        Authorization : 'Bearer ' + jwtToken,
      }
    })
      .then(response => {
        setFollowCheck(response.data);
      })
      .catch(error => {})
      .finally(() => {});
  }, []);

  const doFollow = () => {
    axios({
      method: 'post',
      url: `http://i6c103.p.ssafy.io/api/follow`,
      data: { loginedId: loginedId, followId: id },
      headers: {
        Authorization : 'Bearer ' + jwtToken,
      }
    })
      .then(response => {
        setFollowCheck(true);
      })
      .catch(error => {})
      .finally(() => {});
  };

  const unFollow = () => {
    axios({
      method: 'delete',
      url: `http://i6c103.p.ssafy.io/api/follow`,
      // url: 'http://i6c103.p.ssafy.io/api/jwt/google',
      params: { loginedId: loginedId, followId: id },
      headers: {
        Authorization : 'Bearer ' + jwtToken,
      }
    })
      .then(response => {
        setFollowCheck(false);
      })
      .catch(error => {})
      .finally(() => {});
  };

  AWS.config.update({
    region: 'ap-northeast-2', // ????????? ???????????? ????????? ???????????? ???????????????. (Ex. "ap-northeast-2")
    credentials: new AWS.CognitoIdentityCredentials({
      IdentityPoolId: process.env.REACT_APP_S3, // cognito ?????? ????????? ????????? ?????? ???????????? ???????????????. (Ex. "ap-northeast-2...")
    }),
  });

  const now = 60;
  const progressInstance = (
    <ProgressBar
      className={styles.progress}
      animated
      now={100 - userData.info.point * 0.9}
    />
  );
  return (
    <>
      <h1 style={{ marginTop: '100px' }}>
        <b>?????????</b>
      </h1>
      <section className={styles.section}>
        <div className={styles.body}>
          <div className={styles.box1}>
            <div
              style={{
                width: '150px',
                height: '150px',
                borderRadius: '50%',
                margin: 'auto',
              }}
            >
              <img
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                }}
                src={
                  userData.info.image
                    ? 'https://haejwoing.s3.ap-northeast-2.amazonaws.com/' +
                      userData.info.image +
                      '.jpg'
                    : '/images/baseprofile.jpg'
                }
                alt=""
                onError={() => {
                  return (imgRef.current.src =
                    'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png%27');
                }}
              />
            </div>
            <div style={{ marginTop: '10px'}}>
              <div style={{ fontWeight:'bold' }}>{userData.info.nickname}</div>
            </div>
          </div>
          <div className={styles.box2}>
            {(() => {
              if (id == loginedId)
                return (
                  <Button
                    className={styles.button}
                    variant=""
                    style={{ color: 'white' }}
                    onClick={() => {
                      history.push(`/user/${id}/mdProfile`);
                    }}
                  >
                    ????????? ??????
                  </Button>
                );
              else if (id != loginedId && followCheck == false)
                return (
                  <Button
                    className={styles.button}
                    style={{ color: 'white' }}
                    variant=""
                    onClick={doFollow}
                  >
                    ????????? ??????
                  </Button>
                );
              else if (id != loginedId && followCheck == true)
                return (
                  <Button
                    className={styles.button3}
                    style={{ color: "white", backgroundColor: "rgb(100, 105, 111)" }}
                    onClick={unFollow}
                  >
                    ????????? ??????
                  </Button>
                );
            })()}
          </div>
          <div className={styles.box3}>
            <div>
              <div className={styles.title1}>
                ????????????
                <span data-tip data-for="tooltip">
                  <AiOutlineInfoCircle className={styles.info} />
                </span>
                <ReactTooltip
                  id="tooltip"
                  effect="solid"
                  place="bottom"
                  type="dark"
                >
                  <div>
                    <p>
                      ??????????????? ??????, ??????, ?????? ?????? ???????????? ?????? ???????????????.
                    </p>
                    <div>
                      <div>
                        <span>?????? :</span>{' '}
                        <AiFillStar style={{ color: 'green' }} />
                      </div>
                      <div>
                        <span>?????? :</span>{' '}
                        <AiFillStar style={{ color: 'silver' }} />
                      </div>
                      <div>
                        <span>?????? : </span>{' '}
                        <AiFillStar style={{ color: 'gold' }} />
                      </div>
                      <div>
                        <span>????????? :</span>{' '}
                        <AiFillStar style={{ color: 'red' }} />
                      </div>
                      <div>
                        <span>????????? :</span>{' '}
                        <AiFillStar style={{ color: 'purple' }} />
                      </div>
                    </div>
                  </div>
                </ReactTooltip>
              </div>
            </div>
            <div>
              <div className={styles.grade}>
                {(() => {
                  if (userData.info.point < 5)
                    return (
                      <>
                        <AiFillStar className={styles.vip} />
                        <div style={{ fontWeight: 'bold' }}>?????????</div>
                      </>
                    );
                  else if (userData.info.point < 20)
                    return (
                      <>
                        <AiFillStar className={styles.red} />
                        <div style={{ fontWeight: 'bold' }}>?????????</div>
                      </>
                    );
                  else if (userData.info.point < 50)
                    return (
                      <>
                        <AiFillStar className={styles.gold} />
                        <div style={{ fontWeight: 'bold' }}>??????</div>
                      </>
                    );
                  else if (userData.info.point < 85)
                    return (
                      <>
                        <AiFillStar className={styles.silver} />
                        <div style={{ fontWeight: 'bold' }}>??????</div>
                      </>
                    );
                  else
                    return (
                      <>
                        <AiFillStar className={styles.newbee} />
                        <div style={{ fontWeight: 'bold' }}>??????</div>
                      </>
                    );
                })()}
              </div>
              {progressInstance}
            </div>
          </div>
          <div className={styles.box4}>
            <div className="d-grid gap-2">
              <Button
                className={styles.button}
                variant=""
                style={{ color: 'white' }}
                onClick={() => {
                  history.push(`/board/user/${id}/postList`);
                }}
              >
                ??? ?????? ??????
              </Button>
              <Button
                className={styles.button}
                variant=""
                style={{ color: 'white' }}
                onClick={() => {
                  history.push(`/user/${id}/followlist`);
                }}
              >
                ????????? ??????
              </Button>
              <Button
                className={styles.button}
                variant=""
                style={{ color: 'white' }}
                onClick={() => {
                  history.push(`/user/${id}/followerlist`);
                }}
              >
                ????????? ??????
              </Button>
              {id == loginedId ? (
                <Button
                  variant="secondary"
                  size="md"
                  onClick={() => {
                    history.push(`/user/${id}/withdraw`);
                  }}
                >
                  ????????????
                </Button>
              ) : null}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Profile;
