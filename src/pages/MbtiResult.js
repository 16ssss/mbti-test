import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {RESET_MBTI_TEST, SET_MBTI_TEST_RESULT} from "../modules/MbtiReducer";
import Typography from "@mui/material/Typography";
import {Button, Grid} from "@mui/material";
import {useNavigate} from "react-router-dom";

const personalitiesUrl ={
    INTJ: "https://www.16personalities.com/ko/%EC%84%B1%EA%B2%A9%EC%9C%A0%ED%98%95-intj",
    INTP: "https://www.16personalities.com/ko/%EC%84%B1%EA%B2%A9%EC%9C%A0%ED%98%95-intp",
    ENTJ: "https://www.16personalities.com/ko/%EC%84%B1%EA%B2%A9%EC%9C%A0%ED%98%95-entj",
    ENTP: "https://www.16personalities.com/ko/%EC%84%B1%EA%B2%A9%EC%9C%A0%ED%98%95-entp",
    INFJ: "https://www.16personalities.com/ko/%EC%84%B1%EA%B2%A9%EC%9C%A0%ED%98%95-infj",
    INFP: "https://www.16personalities.com/ko/%EC%84%B1%EA%B2%A9%EC%9C%A0%ED%98%95-infp",
    ENFJ: "https://www.16personalities.com/ko/%EC%84%B1%EA%B2%A9%EC%9C%A0%ED%98%95-enfj",
    ENFP: "https://www.16personalities.com/ko/%EC%84%B1%EA%B2%A9%EC%9C%A0%ED%98%95-enfp",
    ISTJ: "https://www.16personalities.com/ko/%EC%84%B1%EA%B2%A9%EC%9C%A0%ED%98%95-istj",
    ISFJ: "https://www.16personalities.com/ko/%EC%84%B1%EA%B2%A9%EC%9C%A0%ED%98%95-isfj",
    ESTJ: "https://www.16personalities.com/ko/%EC%84%B1%EA%B2%A9%EC%9C%A0%ED%98%95-estj",
    ESFJ: "https://www.16personalities.com/ko/%EC%84%B1%EA%B2%A9%EC%9C%A0%ED%98%95-esfj",
    ISTP: "https://www.16personalities.com/ko/%EC%84%B1%EA%B2%A9%EC%9C%A0%ED%98%95-istp",
    ISFP: "https://www.16personalities.com/ko/%EC%84%B1%EA%B2%A9%EC%9C%A0%ED%98%95-isfp",
    ESTP: "https://www.16personalities.com/ko/%EC%84%B1%EA%B2%A9%EC%9C%A0%ED%98%95-estp",
    ESFP: "https://www.16personalities.com/ko/%EC%84%B1%EA%B2%A9%EC%9C%A0%ED%98%95-esfp",

}

export default function () {
    const mbti = useSelector(state => state.mbtiReducer);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        const filterChoice = mbti.choices.filter(f => f.seq === -1);
        if (filterChoice.length > 0 || !mbti.result || !mbti.username) {
            // window.location.href = "/mbti-test";
            return navigate("/");
        }
    })
    useEffect(() => {
        dispatch({type: SET_MBTI_TEST_RESULT});
    }, []);
    return (
        <Grid container={true} rowSpacing={5} columnSpacing={10}>
            <Grid item xs={12}>
                <Typography variant="h2" align="center">
                    ????????? ?????? MBTI???
                    <span>
                        <Typography variant="h1" fontWeight="bold">
                            {mbti.testResult.personality}
                        </Typography>
                        ?????????.
                    </span>
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="h6" align="center">
                    ????????? ???????????? (?????? ????????????) ????????? {mbti.result} ?????????.
                </Typography>
            </Grid>
            <Grid item xs={6} marginTop={5}>
                <Button fullWidth
                        size="large"
                        variant="outlined"
                        onClick={() => window.open(personalitiesUrl[mbti.testResult.personality],"_blank", "noopener, noreferrer")}
                >
                    ?????? ?????? ????????? ?????? ?????? ????????????
                </Button>
            </Grid>
            <Grid item xs={6} marginTop={5}>
                <Button fullWidth size="large"
                        variant="contained"
                        onClick={() => {
                            window.localStorage.clear();
                            dispatch({type: RESET_MBTI_TEST});
                            return window.location.href = "/mbti-test";
                        }}>
                    ???????????????
                </Button>
            </Grid>
        </Grid>
    );
};