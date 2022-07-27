import React, { ReactNode, useState, useEffect } from "react";
import { Input, Table } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import {
    ColumnGroupType,
    ColumnsType,
    FilterConfirmProps,
    FilterDropdownProps,
} from "antd/lib/table/interface";

type TabteItem = {
    key: string;
    name: string;
    position: string;
    email: string;
    phone: string;
};
type TabteValues = "key" | "name" | "position" | "email" | "phone";

function StudentList({ findText }: { findText: string }) {
    const [search, setSearch] = useState<{
        searchText: React.Key;
        searchedColumn: string;
    }>({ searchText: 1, searchedColumn: "" });

    const handleSearch = (
        selectedKeys: React.Key[],
        confirm: (param?: FilterConfirmProps) => void,
        dataIndex: string
    ) => {
        confirm();
        setSearch({
            searchText: selectedKeys[0],
            searchedColumn: dataIndex,
        });
    };
    const getColumnSearchProps = (dataIndex: TabteValues, title: string) => ({
        filterDropdown: ({
            setSelectedKeys,
            selectedKeys,
            confirm,
            clearFilters,
        }: FilterDropdownProps): ReactNode => (
            <div style={{ padding: 8 }}>
                <Input
                    placeholder={`Поиск по ${title}`}
                    value={selectedKeys[0]}
                    onChange={(e) =>
                        setSelectedKeys(e.target.value ? [e.target.value] : [])
                    }
                    onPressEnter={() =>
                        handleSearch(selectedKeys, confirm, dataIndex)
                    }
                    style={{ marginBottom: 8, display: "block" }}
                />
            </div>
        ),
        filterIcon: (filtered: boolean): React.ReactNode => (
            <SearchOutlined
                style={{ color: filtered ? "#57BBCA" : undefined }}
            />
        ),
        onFilter: (
            value: string | number | boolean,
            record: TabteItem
        ): boolean =>
            !!(
                record[dataIndex] &&
                typeof value === "string" &&
                record[dataIndex]
                    .toString()
                    .toLowerCase()
                    .includes(value.toLowerCase())
            ),
    });

    const columns: ColumnsType<TabteItem> = [
        {
            title: "ФИО",
            dataIndex: "name",

            sorter: (a: { name: string }, b: { name: string }) =>
                a.name.localeCompare(b.name),
            width: "30%",
            ...getColumnSearchProps("name", "ФИО"),
        },
        {
            title: "Класс",
            dataIndex: "position",
            sorter: (a: { position: string }, b: { position: string }) =>
                a.position.localeCompare(b.position),
            width: "30%",
        },

        {
            title: "Телефон",
            dataIndex: "phone",
            ...getColumnSearchProps("phone", "Телефон"),
            sorter: (a: { phone: string }, b: { phone: string }) =>
                a.phone.localeCompare(b.phone),
            width: "30%",
        },
        {
            title: "Эл. почта",
            dataIndex: "email",
            ...getColumnSearchProps("email", "Эл. почта"),
            sorter: (a: { email: string }, b: { email: string }) =>
                a.email.localeCompare(b.email),
            width: "30%",
        },
    ];

    const dataMoc = [
        {
            key: "1",
            name: "Сергей Антипин",
            position: "11 класс",
            email: "antip.kazantip@yandex.ru",
            phone: "+79000285080",
        },
        {
            key: "2",
            name: "Андрей Лыкосов",
            position: "10 класс",
            email: "lisiy.dron@yandex.ru",
            phone: "+79567285020",
        },
        {
            key: "3",
            name: "Никита Коробкин",
            position: "5 класс",
            email: "korobka228@yandex.ru",
            phone: "+79065285084",
        },
        {
            key: "4",
            name: "Владимир Ульянов",
            position: "7 класс",
            email: "vova.ul@yandex.ru",
            phone: "+79230285081",
        },
    ];

    const [data, setData] = useState<Array<TabteItem>>([]);
    useEffect(() => {
        setData((el) =>
            dataMoc.filter((el) => {
                if (!findText) return true;
                let visible = false;
                let key: TabteValues;
                for (key in el) {
                    visible =
                        visible ||
                        el[key]
                            .toString()
                            .toLowerCase()
                            .includes(findText.toLowerCase());
                }
                return visible;
            })
        );
    }, [findText]);

    return (
        <>
            <Table
                columns={columns}
                dataSource={data}
                style={{ margin: "1rem" }}
            />
        </>
    );
}

export default StudentList;
