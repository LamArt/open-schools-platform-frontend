//Отвечает за отрисовку и логику списка кружков, которые можно будет выбрать на странице organizations.
//Используется loading для отрисовки заглушек в ожидании ответа от сервера.

import React, { useEffect, useState } from "react";
import { Empty, Card } from "antd";

import style from "./styles/OtherCircles.module.css";

const mockData = [
    {
        id: 0,
        title: "Название кружка",
        description: "Описание кружка",
    },
    {
        id: 1,
        title: "Название кружка",
        description: "Описание кружка",
    },
    {
        id: 2,
        title: "Название кружка",
        description: "Описание кружка",
    },
];

const { Meta } = Card;

export default function OtherCircles() {
    const [data, setData] = useState(mockData);
    const [loading, setLoading] = useState(true);

    //Потом удалить
    useEffect(() => {
        const loaded = () => {
            setLoading(false);
        };
        setTimeout(loaded, 3000);
    });

    return (
        <>
            <span className={style.title}>Список кружков</span>
            {data.length === 0 ? (
                <Empty
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    description="Пусто"
                />
            ) : (
                <>
                    {data.map((circle) => (
                        <Card
                            style={{
                                width: 300,
                                marginTop: 16,
                            }}
                            loading={loading}
                            key={circle.id}
                        >
                            <Meta
                                title={circle.title}
                                description={circle.description}
                            />
                        </Card>
                    ))}
                </>
            )}
        </>
    );
}
