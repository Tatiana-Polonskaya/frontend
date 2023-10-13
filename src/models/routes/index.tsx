enum RoutesEnum {
    ROOT = "",
    ALL = "*",
    LANDING = "/landing",
    LOGIN = "/login",
    REGISTER = "/register",
    ACTIVATION = "/activation",
    RESTORE = "/restore",
    DIARY = "/diary",
    HOME = "/home",
    IMPROVISATION = "/improvisation",
    LEARNING = "/learning",
    REPETITION = "/repetition",
    SETUP_REPETITION = "/setup",

    SETTINGS = "/settings",
    RECODING = "/recoding",
    REPORT = "/report",
    PAY = "/pay",
    TARIFF = "/tarrif",

    TEST_GRAPH = "/test-graph",

    SURVEY = "/survey",

    // CONNECTEDNESS = "/repetition/connectedness",
    // ARGUMENTATION = "/repetition/argumentation",
    CLARITY = "/repetition/clarity",
    // DYNAMISM = "/repetition/dynamism",
    // PERSUASIVENESS = "/repetition/persuasiveness",
    // COMMUNICATION = "/repetition/communication",
}

export enum NestedRepetition {
    SETUP = "setup",
}

export default RoutesEnum;
