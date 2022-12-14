import React, { useEffect, useState } from 'react';
import {
    Button,
    CardContent,
    TextField,
    TableRow,
    TableCell,
    TableContainer,
    Table,
    TableHead,
    TableBody,
    Paper,
    InputLabel,
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { useDispatch, useSelector, useStore } from 'react-redux';
import {
    createCareer,
    getCareer,
    deleteCareer,
} from '../../modules/intro/career';
import { useLocation } from 'react-router-dom';
import styled from '@emotion/styled';
import { introSelector } from '../../modules/intro/introSelector';

const IntroTextField = styled(TextField)`
    .MuiOutlinedInput-root {
        color: white;
        fieldset {
            border-color: white;
        }
        &:hover fieldset {
            border-color: white;
        }
        .Mui-focused fieldset {
            border-color: white;
        }
    }
`;

const IntroInputLabel = styled(InputLabel)`
    color: white;
    margin-bottom: 5px;
`;

const CardHeader = styled.div`
    border-radius: 10px 10px 0 0;
    background-color: rgba(140, 140, 140, 0.35);
    padding: 15px;
    font-size: 1.5rem;
    font-weight: bolder;
    color: white;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

const DeleteBtn = styled.button`
    border-radius: 50%;
    background-color: red;
    width: 18px;
    height: 18px;
    border: red;
`;

const IntroCardContent = styled(CardContent)`
    border-radius: 10px;
    background-color: rgba(44, 43, 43, 1);
    color: white;
    font-size: 1.1rem;
    padding: 20px 50px 20px 50px;
    border-radius: 0 0 10px 10px;
`;

const IntroBox = styled.div`
    width: 80%;
    margin: auto;
    margin-top: 10px;
    margin-bottom: 10px;
`;

const initialState = {
    careerComName: '',
    careerDate: null,
    careerDetail: '',
    careerJob: '',
    careerResult: '',
};
export function CareerInput() {
    const [box, setBox] = useState(initialState);
    const { pathname } = useLocation();
    const store = useStore();
    const dispatch = useDispatch();

    const intro_no =
        pathname === '/intro'
            ? store.getState().auth.user.intro_no
            : store.getState().portfolio.pf.introNo;

    useEffect(() => {
        dispatch(getCareer(intro_no));
    }, [dispatch, intro_no]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setBox({ ...box, [name]: value });
    };

    const onDeleteClick = () => {
        dispatch(introSelector.actions.outBoard('career'));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(
            createCareer({
                introNo: intro_no,
                careerComName: box.careerComName,
                careerDate: box.careerDate,
                careerJob: box.careerJob,
                careerResult: box.careerResult,
                careerDetail: box.careerDetail,
            })
        );
        setBox(initialState);
    };

    return (
        <IntroBox>
            <CardHeader>
                <div>????????????</div>
                <DeleteBtn onClick={() => onDeleteClick()}></DeleteBtn>
            </CardHeader>
            <IntroCardContent>
                <form onSubmit={handleSubmit} style={{ margin: '10px' }}>
                    <div
                        style={{
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'space-between',
                            flexDirection: 'column',
                        }}
                    >
                        <div style={{ width: '100%', margin: '20px' }}>
                            <IntroInputLabel>?????????</IntroInputLabel>
                            <IntroTextField
                                type="text"
                                placeholder="??????"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                style={{ width: '40%' }}
                                name="careerComName"
                                onChange={handleInputChange}
                                value={box.careerComName}
                            />
                        </div>
                        <div style={{ width: '100%', margin: '20px' }}>
                            <div style={{ width: '100%' }}>
                                <LocalizationProvider
                                    dateAdapter={AdapterDayjs}
                                    sx={{ width: '40%' }}
                                >
                                    <IntroInputLabel>????????????</IntroInputLabel>
                                    <DatePicker
                                        name="careerDate"
                                        value={box.careerDate}
                                        onChange={(newValue) => {
                                            setBox({
                                                ...box,
                                                careerDate:
                                                    dayjs(
                                                        newValue
                                                    ).toISOString(),
                                            });
                                        }}
                                        renderInput={(params) => (
                                            <IntroTextField {...params} />
                                        )}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </LocalizationProvider>
                            </div>
                        </div>
                        <div style={{ width: '100%', margin: '20px' }}>
                            <IntroInputLabel>??????</IntroInputLabel>
                            <IntroTextField
                                type="text"
                                placeholder="??????"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                style={{ width: '40%' }}
                                name="careerJob"
                                onChange={handleInputChange}
                                value={box.careerJob}
                            />
                        </div>
                        <div
                            style={{
                                width: '100%',
                                margin: '20px',
                            }}
                        >
                            <IntroInputLabel>???????????? ??? ??????</IntroInputLabel>
                            <IntroTextField
                                multiline
                                placeholder="??????????????? ?????? ????????? ???????????????."
                                style={{ width: '90%' }}
                                onChange={handleInputChange}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                name="careerResult"
                                rows={2}
                                maxRows={4}
                                value={box.careerResult}
                            />
                        </div>
                        <div
                            style={{
                                width: '100%',
                                margin: '20px',
                            }}
                        >
                            <IntroInputLabel>?????? ??????</IntroInputLabel>
                            <IntroTextField
                                multiline
                                placeholder="?????? ????????? ?????? ????????? ???????????????."
                                style={{ width: '90%' }}
                                onChange={handleInputChange}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                name="careerDetail"
                                rows={2}
                                maxRows={4}
                                value={box.careerDetail}
                            />
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                margin: '20px',
                                justifyContent: 'end',
                            }}
                        >
                            <Button
                                type="submit"
                                variant="contained"
                                color="neutral"
                                style={{ fontWeight: 'bolder' }}
                            >
                                ??????
                            </Button>
                        </div>
                    </div>
                </form>
            </IntroCardContent>
        </IntroBox>
    );
}

export function ReadCareer() {
    const dispatch = useDispatch();
    const career = useSelector((state) => state.career);
    const [mode, setMode] = useState('OFF');

    const onDeleteClick = (introCareerNo) => {
        dispatch(deleteCareer(introCareerNo));
    };

    if (career.length !== 0 && mode === 'OFF') {
        setMode('ON');
    } else if (Array.isArray(career) && career.length === 0 && mode === 'ON') {
        setMode('OFF');
    }

    let content = null;
    if (mode === 'ON') {
        content = (
            <IntroBox>
                <CardHeader>????????????</CardHeader>
                <IntroCardContent>
                    <TableContainer>
                        <Table
                            style={{
                                backgroundColor: ' rgba(44, 43, 43, 1)',
                            }}
                        >
                            <TableHead>
                                <TableRow>
                                    <TableCell
                                        align="center"
                                        style={{ color: 'white' }}
                                    >
                                        ?????????
                                    </TableCell>
                                    <TableCell
                                        align="center"
                                        style={{ color: 'white' }}
                                    >
                                        ????????????
                                    </TableCell>
                                    <TableCell
                                        align="center"
                                        style={{ color: 'white' }}
                                    >
                                        ??????
                                    </TableCell>
                                    <TableCell
                                        align="center"
                                        style={{ color: 'white' }}
                                    >
                                        ???????????? ??? ??????
                                    </TableCell>
                                    <TableCell
                                        align="center"
                                        style={{ color: 'white' }}
                                    >
                                        ?????? ??????
                                    </TableCell>
                                    <TableCell align="center"></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {career.map((item) => (
                                    <TableRow key={item.introCareerNo}>
                                        <TableCell
                                            align="center"
                                            style={{ color: 'white' }}
                                        >
                                            {item.careerComName}
                                        </TableCell>
                                        <TableCell
                                            align="center"
                                            style={{ color: 'white' }}
                                        >
                                            {item.careerDate}
                                        </TableCell>
                                        <TableCell
                                            align="center"
                                            style={{ color: 'white' }}
                                        >
                                            {item.careerJob}
                                        </TableCell>
                                        <TableCell
                                            align="center"
                                            style={{ color: 'white' }}
                                        >
                                            {item.careerResult}
                                        </TableCell>
                                        <TableCell
                                            align="center"
                                            style={{ color: 'white' }}
                                        >
                                            {item.careerDetail}
                                        </TableCell>
                                        <TableCell
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                            }}
                                            algin="center"
                                        >
                                            <Button
                                                size="small"
                                                style={{
                                                    color: 'white',
                                                }}
                                                onClick={() =>
                                                    onDeleteClick(
                                                        item.introCareerNo
                                                    )
                                                }
                                            >
                                                ??????
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </IntroCardContent>
            </IntroBox>
        );
    }

    return content;
}

export default CareerInput;
