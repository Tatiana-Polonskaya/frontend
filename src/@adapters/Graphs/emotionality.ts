import {
    EmotionalityChannel,
    EmotionalityDataItem,
    EmotionalityItem,
} from "../../models/graph/emotionality";

const convertEmotionalityData = (
    items: EmotionalityDataItem[],
    channel: EmotionalityChannel,
    emotions: EmotionalityItem[]
) =>
    items.map((item) =>
        Object.fromEntries(
            /* Формируем новый объект из списка требуемых эмоций */
            emotions.map((emotion) => [emotion, item[channel][emotion]])
            /* [channel]: Берем значение только выбранного канала */
        )
    );

export default convertEmotionalityData;
