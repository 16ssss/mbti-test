import {useDispatch, useSelector} from "react-redux";
import {useEffect, useMemo} from "react";
import Typography from "@mui/material/Typography";
import {Button, Chip, Grid} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {DONE_MBTI_TEST, SET_MBTI_TEST_RESULT} from "../../services/reduces/mbtiReducer";

const personalitiesUrl = {
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
            return navigate("/");
        }
        dispatch({type: DONE_MBTI_TEST});
        dispatch({type: SET_MBTI_TEST_RESULT});
    }, [])
    return (
        <Grid container={true} rowSpacing={3} columnSpacing={4}>
            <Grid item xs={12}>
                <Typography variant="h6" align="center">
                    너의 MBTI
                </Typography>
            </Grid>
            <Grid item xs={12} display="flex" justifyContent="center">
                <Chip size="medium"
                      label={mbti.testResult.personality}
                      color={"primary"}
                      sx={{fontSize: 30}}
                />
            </Grid>
            <Grid item xs={12}>
                <Typography variant="body1" align="center">
                    이전에 검사했던 (혹은 예상했던) 유형은{" "}
                    {mbti.result}
                    {" "}입니다.
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Button fullWidth
                        size="large"
                        variant="outlined"
                        onClick={() => window.open(personalitiesUrl[mbti.testResult.personality], "_blank", "noopener, noreferrer")}
                >
                    나의 성격 유형에 대한 설명 보러가기
                </Button>
            </Grid>
            <Grid item xs={12}>
                <Button fullWidth size="large"
                        variant="contained"
                        onClick={() => {
                            navigate("/");
                            // dispatch(CallGetMBTIQuestionAPI());
                        }}>
                    재검사하기
                </Button>
            </Grid>
        </Grid>
    )
        ;
};