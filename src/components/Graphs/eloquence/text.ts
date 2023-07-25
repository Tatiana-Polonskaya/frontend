export default function AddTextEloquence (
    Nparaz:number,
    Nvst:number,
    Nkpredl:number,
    Npredl:number,
    Nzpredl:number,
    Napredl:number){
    let str=""
    if(0.05 < (Nparaz/Nvst) &&(Nparaz/Nvst) <0.1){
        str += "Обнаружено незначительное число слов-паразитов. "
    }
    if ((Nparaz/Nvst) >=0.1){
        str += "Обнаружено значительное число слов-паразитов. "
    }
    if (Nkpredl/Npredl<0.2){
        str += "Очень мало коротких предложений. "
    }
    if (0.2<= Nkpredl/Npredl && Nkpredl/Npredl<0.5){
        str += "Мало коротких предложений. "
    }
    if (Nzpredl/Npredl < 0.4){
        str += "Очень мало коротких слов, знакомых слушателю. "
    }
    if (0.4 <= Nkpredl/Npredl && Nkpredl/Npredl <0.7){
        str += "Мало коротких слов, знакомых слушателю. "
    }
    if ( Napredl/Npredl <0.4){
        str += "Очень мало активных слов, требующих действия. "
    }
    if (0.4 <= Napredl/Npredl && Napredl/Npredl <0.7){
        str += "Мало коротких слов, требующих действия. "
    }
    return str;
}