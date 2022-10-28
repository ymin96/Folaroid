import * as React from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import PersonIcon from '@mui/icons-material/Person';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import EventIcon from '@mui/icons-material/Event';
import EmailIcon from '@mui/icons-material/Email';
import GitHubIcon from '@mui/icons-material/GitHub';
import CreateIcon from '@mui/icons-material/Create';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import WebIcon from '@mui/icons-material/Web';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { ListItemSecondaryAction } from '@mui/material';
import Divider from '@mui/material/Divider';
const PortFolioItem = ({ num }) => {
  //보기 => router 포폴페이지
  //수정 => 제작페이지
  //복사 =? 같은 포폴페이지가 아래 추가됨
  //삭제 => 리스트에서 삭제
  return (
    <div>
      <Divider />
      <ListItem>
        <ListItemSecondaryAction>
          <IconButton edge="end">
            <VisibilityIcon />
          </IconButton>
          <IconButton edge="end">
            <CreateIcon />
          </IconButton>
          <IconButton edge="end">
            <ContentCopyIcon />
          </IconButton>
          <IconButton edge="end">
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
        <ListItemAvatar>
          <Avatar>
            <WebIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primaryTypographyProps={{ color: 'primary', fontWeight: 'bold' }}
          secondaryTypographyProps={{ fontWeight: 'bold' }}
          primary={`포트폴리오 ${num + 1}`}
          secondary={`작성날짜`}
        />
      </ListItem>
      <Divider />
    </div>
  );
};
const Intro = ({ icon, children }) => {
  return (
    <div>
      {children.icon}
      <TextField
        id="standard-read-only-input"
        label="Required*"
        defaultValue={children.value}
        InputProps={{
          readOnly: true,
        }}
        variant="standard"
      />
    </div>
  );
};

const MyPage = () => {
  const portfolios = [0, 1, 2];
  const icons = [
    { icon: <PersonIcon className="icon" fontSize="large" />, value: 'Name' },
    {
      icon: <PhoneAndroidIcon className="icon" fontSize="large" />,
      value: 'Tel',
    },
    { icon: <EventIcon className="icon" fontSize="large" />, value: 'Birth' },
    { icon: <EmailIcon className="icon" fontSize="large" />, value: 'Email' },
    {
      icon: <GitHubIcon className="icon" fontSize="large" />,
      value: 'GitHub Link',
    },
  ];
  const onClick = () => {
    alert('User Data 없으면 alert바를 통해 가게 해버릴까?');
  };
  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);

  return (
    <>
      <div className="react">마이페이지</div>
      {/* <div>
        <div className="info">
          최초 정보를 작성해주세요. <CreateIcon onClick={onClick}></CreateIcon>
        </div>
      </div> */}
      <div
        className="box"
        style={{
          margin: '30px',
          marginLeft: '10%',
          marginRight: '10%',
        }}
      >
        <Grid
          container
          spacing={2}
          style={{ marginTop: '0px', marginBottom: '30px' }}
        >
          <Grid item xs={12} md={12}>
            <CreateIcon
              onClick={onClick}
              edge="end"
              style={{ marginLeft: '80%' }}
            ></CreateIcon>
          </Grid>
          {icons.map((value, key) => {
            return (
              <Grid key={key} item xs={6} md={6}>
                <Intro>{value}</Intro>
              </Grid>
            );
          })}
        </Grid>
      </div>
      <div
        className="box"
        style={{
          margin: '30px',
          marginLeft: '10%',
          marginRight: '10%',
        }}
      >
        <Grid
          container
          spacing={2}
          style={{ marginLeft: '5%', marginRight: '5%' }}
        >
          <Grid item xs={12} md={12}>
            <List dense={dense}>
              {portfolios.map((key, value) => {
                return <PortFolioItem key={key} num={value} />;
              })}
            </List>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

MyPage.defaultProps = {
  name: 'MyPage',
};

export default MyPage;
