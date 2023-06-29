import React from 'react';
import './styleText.scss'
function InformativeText() {
    return (
        <>
            <div className='blocText'>
                <div className='textInf'>
                    <b className="textInfTitle">Информативность </b>
                     - предоставление полной и точной информации, наличие в выступлении фактов и деталей,
                    которые помогут аудитории понять тему выступления и принять выдвинутые аргументы.
                </div>
                <div className='blocColor'>
                    <div className='Square'>
                        <div className='colorSquare' style={{background:"#410DAE"}}> </div>
                        <div className='textSquare'>слова-паразиты</div>
                    </div>
                    <div className='Square'>
                        <div className='colorSquare' style={{background:"#FE6972"}}> </div>
                        <div className='textSquare'>неречевые звуки</div>
                    </div>
                    <div className='Square'>
                        <div className='colorSquare'style={{background:"#FFB800"}}> </div>
                        <div className='textSquare'>пустые паузы</div>
                    </div>
                    <div className='Square'>
                        <div className='colorSquare' style={{background:"#ADB9D4"}}> </div>
                        <div className='textSquare'>информативная часть</div>
                    </div>

                </div>
            </div>
        </>
    );
}

export default InformativeText;