import { Fragment, useEffect, useRef, useState } from "react";
import CheckboxQuestion from "../../components/CheckboxQuestion";
import RadioBtnQuestion from "../../components/RadioBtnQuestion";
import SurveyLayout from "../../layouts/SurveyLayout";
import "./style.scss";
import { cn } from "@bem-react/classname";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";

import { updateChoiceAnswers } from "../../store/slices/survey";

import TarifPage from "./TarifPage";
import { useNavigate } from "react-router-dom";
import {
    useGetSurveyQuery,
    useSendAnswersMutation,
} from "../../store/api/survey";
import { IAnswer, IQuestion } from "../../models/survey";
import { UUID } from "crypto";


// ПЕРЕДЕЛАТЬ ВСЮ ПРОВЕРКУ НА ПРАВИЛЬНОТЬ ОТВЕТОВ ПО СТАРОМУ ОБРАЗЦУ ОТВЕТОВ, ЗАТЕМ ИЗМЕНИТЬ ФУНКЦИЮ ДОБАВЛЕНИЯ ПОЛЯ ДРУГОЕ

export default function SurveyPage() {
    // const { name, lastName, birthday } = useAppSelector(
    //     (state) => state.register.personal
    // );

    const ALL_STEP = 2;
    const QUESTIONS_FOR_STEP = [2, 3, 2];

    // const sendd = useSendAnswersMutation();

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const storeChoiceAnswers = useAppSelector((state) => state.survey.answers);

    enum typeQuestion {
        checkbox = "checkbox",
        radio = "radio",
    }
    enum typeStyleAnswers {
        row = "block-answers",
        column = "col-answers",
        icon_row = "icon-rows",
    }

    const question = [
        {
            id: 1,
            title: "Укажите ваш вид деятельности",
            type: typeQuestion.radio,
            icons: true,
            block_another: true,
            placeholder_another: "Введите тип деятельности",
            type_answer: typeStyleAnswers.icon_row,
            answers: [
                {
                    id: 0,
                    title: "Предпринимательство",
                    icon: "./components/Menu/icons/book.svg",
                },
                {
                    id: 1,
                    title: "Управление",
                    icon: "",
                },
                {
                    id: 2,
                    title: "Медиа",
                    icon: "",
                },
                {
                    id: 3,
                    title: "Маркетинг",
                    icon: "",
                },
                {
                    id: 4,
                    title: "Политика",
                    icon: "",
                },
                {
                    id: 5,
                    title: "Учеба",
                    icon: "",
                },
                {
                    id: 6,
                    title: "Творчество",
                    icon: "",
                },
                {
                    id: 7,
                    title: "Адвокатура",
                    icon: "",
                },
                {
                    id: 8,
                    title: "Журналистика",
                    icon: "",
                },
                {
                    id: 9,
                    title: "Актерское мастерство",
                    icon: "",
                },
                {
                    id: 10,
                    title: "Преподавание",
                    icon: "",
                },
            ],
        },
        {
            id: 2,
            title: "Для каких целей вы хотите использовать наш сервис?",
            type: typeQuestion.checkbox,
            icons: false,
            block_another: true,
            placeholder_another: "Опишите цель использования сервиса",
            type_answer: typeStyleAnswers.row,
            answers: [
                {
                    id: 0,
                    title: "Повысить уверенность в себе и в своих навыках публичного выступления",
                },
                {
                    id: 1,
                    title: "Улучшить качество презентаций в рамках учебных и профессиональных мероприятий",
                },
                {
                    id: 2,
                    title: "Подготовиться к важному профессиональному или личному мероприятию, такому как конференция, выставка, презентация проекта",
                },
            ],
        },
        {
            id: 3,
            title: "Выберите ключевые навыки, которые вы хотите развить",
            type: typeQuestion.checkbox,
            icons: false,
            block_another: true,

            placeholder_another: "Укажите желаемые для освоения навыки",
            type_answer: typeStyleAnswers.column,
            answers: [
                {
                    id: 0,
                    title: "Поработать над темпом речи",
                },
                {
                    id: 1,
                    title: "Уменьшить число слов-паразитов",
                },
                {
                    id: 2,
                    title: "Научиться уверенно говорить",
                },
                {
                    id: 3,
                    title: "Сделать речь более эмоциональной",
                },
                {
                    id: 4,
                    title: "Улучшить произношение",
                },
                {
                    id: 5,
                    title: "Избавиться от страха выступлений",
                },
                {
                    id: 6,
                    title: "Научиться красиво строить фразы",
                },
            ],
        },
        {
            id: 4,
            title: "Как вы планируете использовать наш сервис?",
            type: typeQuestion.radio,
            icons: false,
            block_another: false,
            placeholder_another: "",
            type_answer: typeStyleAnswers.row,
            answers: [
                {
                    id: 0,
                    title: "На регулярной основе",
                },
                {
                    id: 1,
                    title: "Для подготовки к конкретному выступлению",
                },
            ],
        },
        {
            id: 5,
            title: "Сколько времени вы готовы уделять подготовке?",
            type: typeQuestion.radio,
            icons: false,
            block_another: false,
            placeholder_another: "",
            type_answer: typeStyleAnswers.column,
            answers: [
                {
                    id: 0,
                    title: "Менее 30 минут в неделю",
                },
                {
                    id: 1,
                    title: "От 2 до 3 часов в неделю",
                },
                {
                    id: 2,
                    title: "От 30 минут до 1 часа в неделю",
                },
                {
                    id: 3,
                    title: "Более 3 часов в неделю",
                },
                {
                    id: 4,
                    title: "От 1 до 2 часов в неделю",
                },
            ],
        },
        {
            id: 6,
            title: "Когда вы ожидаете увидеть ощутимые результаты?",
            type: typeQuestion.radio,
            icons: false,
            block_another: false,
            placeholder_another: "",
            type_answer: typeStyleAnswers.column,
            answers: [
                {
                    id: 0,
                    title: "В течение месяца",
                },
                {
                    id: 1,
                    title: "Через полгода",
                },
                {
                    id: 2,
                    title: "Через месяц",
                },
                {
                    id: 3,
                    title: "В течение года",
                },
                {
                    id: 4,
                    title: "Через 3 месяца",
                },
            ],
        },
        {
            id: 7,
            title: "Откуда вы о нас узнали?",
            type: typeQuestion.checkbox,
            icons: false,
            block_another: true,
            placeholder_another: "Укажите  источник информации",
            type_answer: typeStyleAnswers.row,
            answers: [
                {
                    id: 0,
                    title: "Рекомендация от друга/коллеги",
                },
                {
                    id: 1,
                    title: "Из социальной сети ВКонтакте",
                },
                {
                    id: 2,
                    title: "Реклама в Яндексе",
                },
                {
                    id: 3,
                    title: "По поисковому запросу",
                },
                {
                    id: 4,
                    title: "Е-mail рассылка",
                },
                {
                    id: 5,
                    title: "СМИ",
                },
            ],
        },
    ];

    const { data } = useGetSurveyQuery("anketa");
    const questions = data?.data?.questions as IQuestion[];

    useEffect(() => {
        console.log(questions);

        if (questions) {
            setCurrentQuestions(
                questions.slice(firstIndex, QUESTIONS_FOR_STEP[step])
            );
        }
    }, [questions]);

    const [canMoved, setCanMoved] = useState(false);
    const [step, setStep] = useState(0);

    // let counts = questions.length;
    let firstIndex = 0;

    // const [currentQuestions, setCurrentQuestions] = useState(
    //     Array.isArray(questions) ? Array(questions[0]).slice(firstIndex, QUESTIONS_FOR_STEP[step]) : []
    // );

    // const [currentQuestions, setCurrentQuestions] = useState(
    //     questions.slice(firstIndex, QUESTIONS_FOR_STEP[step])
    // );
    const [currentQuestions, setCurrentQuestions] = useState<IQuestion[]>();

    let answers: IAnswer[] = [];
    let anotherAnswers: string[] = [];

    for (let i = 0; i < questions?.length; i++) {
        if (questions[i].type === typeQuestion.radio) {
            answers.push(-1);
        } else {
            let temp: boolean[] = [];
            for (let j = 0; j < question[i].answers.length; j++) {
                temp.push(false);
            }
            if (question[i].block_another) {
                temp.push(false);
            }
            answers.push(temp);
        }
        anotherAnswers.push("");
    }

    const addAnswers = (newAnswer: IAnswer) => {
        // взять из стора и проверить есть ли там уже ответы
        answers =
            storeChoiceAnswers.length > 0 ? [...storeChoiceAnswers] : answers;

        let count_matches = 0;

        answers.forEach((el) => {
            if (typeof el.choice_id !== null && el.choice_id === newAnswer.choice_id) {
                el.text = newAnswer.text;
                count_matches++;
            }
        });
        console.log("count_matches", count_matches);
        if (count_matches === 0) answers.push(newAnswer);
        dispatch(updateChoiceAnswers(answers));

        // let firstIndexQuestion = currentQuestions ? currentQuestions[0] : 0;
        // console.log("firstIndexQuestion", firstIndexQuestion);
        // let lastIndex = QUESTIONS_FOR_STEP[step];

        // let flag = 0;

        // for (let i = firstIndexQuestion; i < lastIndex; i++) {
        //     if (typeof answers[i] === "number") {
        //         if (answers[i] !== -1) {
        //             flag++;
        //         }
        //     } else if (Array.isArray(answers[i])) {
        //         let temp = answers[i] as Array<boolean>;
        //         if (temp.indexOf(true) !== -1) {
        //             flag++;
        //         }
        //     }
        // }
        // setCanMoved(lastIndex - firstIndexQuestion === flag ? true : false);
    };

    const addAnotherAnswers = (
        question_id: UUID,
        choice_id: UUID,
        text: string
    ) => {
        answers =
            storeChoiceAnswers.length > 0 ? [...storeChoiceAnswers] : answers;

        let count_matches = 0;
        answers.forEach((el) => {
            if (typeof el.choice_id !== null && el.choice_id === choice_id) {
                el.text = text;
                count_matches++;
            }
        });
        console.log("count_matches", count_matches);
        if (count_matches === 0) answers.push({ question_id, choice_id, text });
        console.log("answers", answers);
        dispatch(updateChoiceAnswers(answers));
    };

    const changeStep = () => {
        if (canMoved) {
            let firstIndex = QUESTIONS_FOR_STEP.slice(0, step + 1).reduce(
                (sum, elem) => sum + elem,
                0
            );
            setStep((prev) => ++prev);

            // if (step < ALL_STEP) {
            //     setCurrentQuestions(
            //         question.slice(
            //             firstIndex,
            //             firstIndex + QUESTIONS_FOR_STEP[step] + 1
            //         )
            //     );
            //     setCanMoved(false);
            // }
        }
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
                                            question={el}
                                            addAnswers={addAnswers}
                                            addAnotherAnswers={
                                                addAnotherAnswers
                                            }
                                        />
                                    )}
                                    {el.type === typeQuestion.radio && (
                                        <RadioBtnQuestion
                                            key={el.id}
                                            question={el}
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
        </SurveyLayout>
    );
}
