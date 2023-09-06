export type ParamItem ={
    title: string,
    description: string,
}

export enum AIM_PARAMETERS {
    consistency= "consistency",
    informative= "informative",
    unity_of_style= "unity-of-style",
    originality= "originality",
    borrowing= "borrowing",
    citation= "citation",
    clarity= "clarity",
    eloquence= "eloquence",
    expressiveness= "expressiveness",
    non_monotony= "non-monotony",
    emotionality= "emotionality",
    energy= "energy",
    congruence= "congruence",
    confidence= "confidence",
    emotional_arousal= "emotional-arousal",
    parasite_words= "parasite_words",
    cognitive_distortion= "cognitive_distortion",
    aggressiveness_coefficient= "aggressiveness_coefficient"
}


export type IAimParameters = Record<AIM_PARAMETERS, ParamItem>;

export interface ITaskItem {
    description: string,
    is_done: boolean,
    step: number
} 

export interface IAimItem {
    id?: string,
    title: string,
    is_done: boolean,
    progress: number,
    created_at: string,
    tasks: ITaskItem[],
    parameters: ParamItem[]
} 

export interface IAimFromBack {
    purposes:IAimItem[],
}

export interface ISendUserPurpose {
    title:string,
    params: AIM_PARAMETERS[],
}