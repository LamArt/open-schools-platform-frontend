//Показывает список кружков пользователя. Перед отрисовкой проверяет наличие данных, чтобы решить что показывать

import React, { useState } from "react";
import { Empty } from "antd";

import style from './styles/MyCircles.module.css'

export default function MyCircles() {
    const [data, setData] = useState([]);
    return (
        <>
            <div>
                <span className={style.title}>Мои кружки</span>
                {data.length === 0 ? (
                    <Empty
                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                        description="Пусто"
                    />
                ) : (
                    <></>
                )}
            </div>
        </>
    );
}
