import { Input, Cascader, Button, Form } from "antd";
import FormItem from "antd/lib/form/FormItem";
import React, { useState } from "react";

interface Option {
  value: string | number;
  label: string;
  children?: Option[];
}

const options: Option[] = [
  {
    value: "1 класс",
    label: "1 класс",
  },
  {
    value: "2 класс",
    label: "2 класс",
  },
  {
    value: "3 класс",
    label: "3 класс",
  },
  {
    value: "4 класс",
    label: "4 класс",
  },
  {
    value: "5 класс",
    label: "5 класс",
  },
  {
    value: "6 класс",
    label: "6 класс",
  },
  {
    value: "7 класс",
    label: "7 класс",
  },
  {
    value: "8 класс",
    label: "8 класс",
  },
  {
    value: "9 класс",
    label: "9 класс",
  },
  {
    value: "10 класс",
    label: "10 класс",
  },
  {
    value: "11 класс",
    label: "11 класс",
  },
];

export default function StudentForm() {
  const [name, setName] = useState("");
  const onChange = (value: string[]) => {
    console.log(name);
  };
  return (
    <Form onFinish={onChange}>
      <FormItem>
        <Cascader options={options} placeholder="Укажите класс" />
      </FormItem>
      <FormItem>
        <Input
          onChange={(event) => setName(event.target.value)}
          placeholder="Введите ваше имя"
        />
      </FormItem>
      <FormItem>
        <Input placeholder="Введите ваше отчество" />
      </FormItem>
      <FormItem>
        <Input placeholder="Введите вашу фамилию" />
      </FormItem>
      <FormItem>
        <Input placeholder="Введите номер телефона" />
      </FormItem>
      <FormItem>
        <Input placeholder="Введите электронную почту" />
      </FormItem>
      <FormItem>
        <Button htmlType="submit" type="primary">
          Добавить
        </Button>
      </FormItem>
    </Form>
  );
}
