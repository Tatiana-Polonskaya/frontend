import { Fragment, useEffect, useState } from "react";
import CheckboxQuestion from "../../components/CheckboxQuestion";
import RadioBtnQuestion from "../../components/RadioBtnQuestion";
import SurveyLayout from "../../layouts/SurveyLayout";
import "./style.scss";
import { cn } from "@bem-react/classname";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";

import {
    LocalAnswer,
    setStepAnswers,
    updateChoiceAnswers,
} from "../../store/slices/survey";

import TarifPage from "./TarifPage";
// import { useNavigate } from "react-router-dom";
import {
    useGetSurveyQuery,
    useSendAnswersMutation,
} from "../../store/api/survey";
import { IAnswer, IQuestion, typeQuestion } from "../../models/survey";

// TO DO: SEND ANSWERS CORRECTLY
// TO DO:  добавить степ в стор

export default function SurveyPage() {
    const [sendAnswersRequest, sendAnswersResponse] = useSendAnswersMutation();
    const { isSuccess, isError } = sendAnswersResponse;

    const dispatch = useAppDispatch();
    // const navigate = useNavigate();
    const TITLE_ANKETA = "anketa";

    /* --------------------------------- STEPS BLOCK --------------------------------- */

    const ALL_STEP = 2;
    const QUESTIONS_FOR_STEP = [2, 3, 2];
    const step = useAppSelector((state) => state.survey.step);
    const [canMoved, setCanMoved] = useState(false);

    /* --------------------------------- QUESTION BLOCK --------------------------------- */

    const { data } = useGetSurveyQuery(TITLE_ANKETA);
    const questions = data?.data?.questions as IQuestion[];
    const [currentQuestions, setCurrentQuestions] = useState<IQuestion[]>();

    const [firstIndex, setFirstIndex] = useState(0);

    useEffect(() => {
        if (questions) {
            const lastIndex = QUESTIONS_FOR_STEP.slice(0, step + 1).reduce(
                (sum, elem) => sum + elem,
                0
            );
            setCurrentQuestions(questions.slice(firstIndex, lastIndex));
        }
    }, [firstIndex, questions, step]);

    /* --------------------------------- ANSWER BLOCK --------------------------------- */

    const [answers, setAnswers] = useState<LocalAnswer[]>([]);
    // const storeChoiceAnswers = useAppSelector((state) => state.survey.answers);

    useEffect(() => {
        if (questions) {
            setAnswers(
                questions.map((el) => {
                    return {
                        id_question: el.id,
                        type_question: el.type,
                        id_choices: [],
                        another_choices: "",
                    };
                })
            );
        }
    }, [questions]);

    const addAnswers = (newAnswer: LocalAnswer) => {
        // взять из стора и проверить есть ли там уже ответы

        const currentAnswers = answers.map((el) => {
            if (el.id_question === newAnswer.id_question) {
                return {
                    ...el,
                    id_choices: newAnswer.id_choices,
                    another_choices: newAnswer.another_choices,
                };
            }
            return el;
        });

        setAnswers(currentAnswers);
        dispatch(updateChoiceAnswers(answers));
    };

    useEffect(() => {
        if (answers && answers[0]) {
            const lastIndex = QUESTIONS_FOR_STEP.slice(0, step + 1).reduce(
                (sum, elem) => sum + elem,
                0
            );
            let flag = 0;
            for (let i = firstIndex; i < lastIndex; i++) {
                if (answers[i].id_choices.length > 0) flag++;
            }
            setCanMoved(lastIndex - firstIndex === flag ? true : false);
        }
    }, [answers]);

    const changeStep = async () => {
        if (canMoved) {
            setFirstIndex(
                QUESTIONS_FOR_STEP.slice(0, step + 1).reduce(
                    (sum, elem) => sum + elem,
                    0
                )
            );
            dispatch(setStepAnswers(step + 1));

            if (step + 1 > ALL_STEP) {
                const body: IAnswer[] = convertAnswersForServerFormat(answers);
                // console.log("ended", body);
                if (body)
                    await sendAnswersRequest({
                        questionnaire_title: TITLE_ANKETA,
                        answers: body,
                    });
            }
        }
    };

    useEffect(() => {
        if (isSuccess) console.log(sendAnswersResponse);
    }, [isSuccess]);

    useEffect(() => {
        if (isError) console.log(sendAnswersResponse.error);
    }, [isError]);

    // id
    // "63cdf876-01ae-482d-bc98-2de6b541246b"

    const convertAnswersForServerFormat = (currentAnswers: LocalAnswer[]) => {
        if (questions) {
            const finalArray = currentAnswers.map((el) => {
                const current_question = questions.filter(
                    (q) => q.id === el.id_question
                )[0];
                const current_another = current_question.choices.filter(
                    (ch) => ch.another
                )[0];
                return el.id_choices.map((choice) => {
                    return {
                        question_id: current_question.id,
                        choice_id: choice,
                        text:
                            current_another && current_another.id === choice
                                ? el.another_choices
                                : "",
                    };
                });
            });
            return finalArray.flat(1);
        } else return [];
    };

    const cnMain = cn("survey");

    return (
        <SurveyLayout>
            {step <= ALL_STEP && (
                <div className={cnMain()}>
                    <div className={cnMain("title")}>
                        Speech Up - один сервис для многих целей
                    </div>
                    <div className={cnMain("description")}>
                        Пожалуйста, поделитесь своими ожиданиями по
                        использованию сервиса. Это позволит предлагать вам
                        персонализированные возможности среди обновлений.
                    </div>
                    <div className={cnMain("questions")}>
                        {currentQuestions &&
                            currentQuestions.map((el, idx) => (
                                <Fragment key={idx}>
                                    {el.type === typeQuestion.checkbox && (
                                        <CheckboxQuestion
                                            key={el.id}
                                            question={{
                                                ...el,
                                                title: `${
                                                    idx +
                                                    1 +
                                                    (step > 0
                                                        ? QUESTIONS_FOR_STEP.slice(
                                                              0,
                                                              step
                                                          ).reduce(
                                                              (sum, elem) =>
                                                                  sum + elem,
                                                              0
                                                          )
                                                        : 0)
                                                }. ${el.title}`,
                                            }}
                                            addAnswers={addAnswers}
                                        />
                                    )}
                                    {el.type === typeQuestion.radio && (
                                        <RadioBtnQuestion
                                            key={el.id}
                                            question={{
                                                ...el,
                                                title: `${
                                                    idx +
                                                    1 +
                                                    (step > 0
                                                        ? QUESTIONS_FOR_STEP.slice(
                                                              0,
                                                              step
                                                          ).reduce(
                                                              (sum, elem1) =>
                                                                  sum + elem1,
                                                              0
                                                          )
                                                        : 0)
                                                }. ${el.title}`,
                                            }}
                                            addAnswers={addAnswers}
                                        />
                                    )}
                                </Fragment>
                            ))}
                    </div>
                    <div className={cnMain("footer")}>
                        <div className={cnMain("footer-block-btn")}>
                            <button
                                disabled={!canMoved}
                                onClick={changeStep}
                                className={cnMain("btn", {
                                    disabled: !canMoved,
                                })}
                            >
                                {step === ALL_STEP && <>Завершить</>}
                                {step !== ALL_STEP && <>Далее</>}
                            </button>
                        </div>

                        <div>
                            <b className={cnMain("footer-current-step")}>
                                {step + 1}
                            </b>{" "}
                            <b className={cnMain("footer-all-step")}>
                                / {ALL_STEP + 1}
                            </b>
                        </div>
                    </div>
                </div>
            )}
            {step > ALL_STEP && <TarifPage></TarifPage>}
            {/* <TarifPage></TarifPage> */}
        </SurveyLayout>
    );
}
