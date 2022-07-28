import React, { useState } from "react";
import { Button, Form, Input } from "antd";
import styles from "./styles/CircleCreateForm.module.css";

const { TextArea } = Input;

export default function CircleCreateForm() {
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [description, setDescription] = useState("");
    const onFinish = () => {
        console.log(name, address, description);
    };
    return (
        <div className={styles.container}>
            <div className={styles.title}>Создание кружка</div>
            <Form onFinish={onFinish}>
                <Form.Item label="Название" name="Название">
                    <Input onChange={(event) => setName(event.target.value)} />
                </Form.Item>
                <Form.Item label="Адрес" name="Адрес">
                    <Input
                        onChange={(event) => setAddress(event.target.value)}
                    />
                </Form.Item>
                <Form.Item label="Описание" name="Описание">
                    <TextArea
                        rows={4}
                        onChange={(event) => setDescription(event.target.value)}
                    />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Опубликовать
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}
