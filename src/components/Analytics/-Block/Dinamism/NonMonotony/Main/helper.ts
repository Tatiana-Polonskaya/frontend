type NonMonotonyHelper = {
    subtitle: string;
    result: string;
};

export function NonMonotonyTempHelper(value: number): NonMonotonyHelper {
    return value < 100
        ? {
              subtitle: "слишком размеренно, к Вам могут потерять интерес",
              result: "НИЗКИЙ",
          }
        : value > 140
        ? {
              subtitle: "трудно уследить за Вашими мыслями",
              result: "ВЫСОКИЙ",
          }
        : {
              subtitle: "средний, ровный и без пауз",
              result: "НОРМА",
          };
}
export function NonMonotonyVolumeHelper(value: number): NonMonotonyHelper {
    return value < 40
        ? {
              subtitle: "может быть Вы не уверены в том, что говорите?",
              result: "СЛИШКОМ ТИХО",
          }
        : value > 60
        ? {
              subtitle: "выглядит так, как будто Вы проявляете агрессию",
              result: "СЛИШКОМ ГРОМКО",
          }
        : {
              subtitle: "оптимальна для выступающего",
              result: "НОРМА",
          };
}
export function NonMonotonyToneHelper(value: number): NonMonotonyHelper {
    return value < 0.34
        ? {
              subtitle: "однообразие звучания притупляет восприятие",
              result: "МАЛЕНЬКИЙ",
          }
        : value > 0.6
        ? {
              subtitle: "так Вы оказываете сильное воздействие на аудиторию",
              result: "БОЛЬШОЙ",
          }
        : {
              subtitle: "Вас приятно слушать ",
              result: "НОРМА",
          };
}
