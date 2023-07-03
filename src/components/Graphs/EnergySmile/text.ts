
export default function  textForEnergySmile (energy: number){
    energy=energy*0.01
    let data:string = "";
    if (energy>0.5){
        data = "Достаточно зажигательное выступление"
    }
    if(energy<=0.5) {
        data = "Ваше выступление недостаточно энергичное"
    }
    return data;
}

