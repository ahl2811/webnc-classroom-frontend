import { Card, Container } from "react-bootstrap";
import styled from "styled-components";
import { PageContainer } from "../../../components/style";

export const RoomDetailsStyle = styled(PageContainer)`
  max-width: 1000px;

  .banner {
    height: 240px;
    background-image: url("https://www.gstatic.com/classroom/themes/img_concert.jpg");
  }

  .notify-item {
    margin-bottom: 24px;
    border-radius: 8px;
  }

  @media screen and (max-width: 425px) {
    .notify-item {
      margin-bottom: 8px;
    }
    .banner {
      height: 180px;
      .class-name {
        font-size: 24px;
      }
      .class-description {
        font-size: 18px;
      }
    }
  } ;
`;

export const MembersListStyle = styled(Container)`
  max-width: 760px;
  padding-left: 0;
  padding-right: 0;

  .member-title {
    font-size: 32px;
    color: teal;
    border-bottom: solid 1px teal;
    padding: 0 16px 8px;
    margin: 8px 0;

    @media screen and (max-width: 375px) {
      padding: 0 4px 8px;

      .member-type {
        font-size: 28px;
      }

      .member-count {
        font-size: 14px;
      }

      .member-add {
        margin-left: 8px !important;
      }
    }
  }

  .member-person {
    padding: 10px;
    height: 60px;
    margin-top: 8px;
    border-bottom: solid 1px #ddd;

    &:last-child {
      border: 0;
      margin-bottom: 12px;
    }
  }

  .avatar {
    width: 52px;
    height: 100%;
  }
`;

export const JoinClassPageStyle = styled(PageContainer)`
  .join-class-container {
    max-width: 760px;
    padding: 0;
    border: solid 1px #ccc;
    border-radius: 8px;
    margin: 0 auto;
  }

  .join-class-banner {
    border-radius: 8px 8px 0 0;
    background-color: #f8f8f8;
    text-align: center;
    padding: 20px;
  }

  .join-class-footer {
    font-size: 14px;
  }
`;

export const InfoNotifyCard = styled(Card)`
  .code {
    font-size: 18px;
    color: teal;
    font-weight: 500;
    letter-spacing: 1px;
  }
  .text-content {
    font-size: 15px;
  }
`;

export const PostNotifyCard = styled(Card)`
  height: 72px;
  box-shadow: 0 0 8px #ccc;
  display: flex;
  cursor: pointer;

  .avatar {
    width: 72px;
  }

  .notify-intro {
    font-size: 14px;
    color: #555;
  }

  &:hover {
    .notify-intro {
      color: teal;
    }
  }
`;
