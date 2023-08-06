export interface IMessageItem {
    created_at: string;
    from_user: string;
    id: number;
    is_mine: boolean;
    reply_to: number | null;
    text: string;
    to_user: null;
}

// {
//     senderName: "Команда поддержки SpeechUp",
//     senderDescription: "Специалист Юлия",
//     time: "12:34",
//     message: "Какая у тебя цель выступления?",
//     mine: false,
// },
