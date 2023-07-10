export default function AddTextUnityOfStyle(scientific: number,
                                            official: number,
                                            publicistic: number,
                                            colloquial: number,
                                            artistic: number){
    let max = 0;
    let styles: number[] = [scientific, official, publicistic, colloquial, artistic]
    let strings: string[] = [` научный`,` официально-деловой`,` публицистический`,` разговорный`,` художественный`]
    let str  = ``;
    let str1 = ``;
    for (let i = 0; i <= styles.length - 1; i++) {
        if (styles[i] > max)
        {
            max = styles[i];
        }
    }
    let count = 0
    let str2 =``;
    if (max > 50){
        str = `Ярко выражен `+ strings[styles.indexOf(max)];
        for (let i = 0; i <= styles.length - 1; i++) {
            if (styles[i] > 20 && styles[i]<max)
            {
                ++count;
                str1 = `но также преобладает ` + strings[i];
                if (count>=1){
                    str2 = str2+` `+strings[i];
                }

            }
        }
        if (count >= 3){
            str = str + `, но наблюдается преобладание и других стилей`
        }else if (count === 0){
            str = str + ` стиль.` ;
        }else if (count == 2){
            str= str+ `, но также преобладают ` + str2 +` стили.`;
        }
        else {
            str = str + `, ` + str1+` стиль.`;
        }
    }
    else {
        str = `Отсутствует единство стиля.`
    }
    return str
}