import { Menu } from "antd";
import {
    SettingOutlined,
    TeamOutlined,
    UserOutlined,
    CommentOutlined,
} from "@ant-design/icons";
import React from "react";
import { useRouter } from "next/router";

const { SubMenu } = Menu;

const menuList = [
    {
        url: "",
        name: "Главная",
        icon: <UserOutlined />,
    },
    {
        url: "organizations",
        name: "Кружки",
        icon: <CommentOutlined />,
    },
    {
        url: "employee",
        name: "Cотрудники",
        icon: <TeamOutlined />,
    },
    {
        url: "settings",
        name: "Настройки",
        icon: <SettingOutlined />,
    },
];

const MenuCustom = () => {
    const router = useRouter();
    return (
        <>
            <Menu
                style={{ paddingTop: "10px" }}
                theme="light"
                mode="inline"
                onClick={(e) => {
                    e.key === "group"
                        ? router.push(`/`)
                        : router.push(`/${e.key}`);
                }}
                selectedKeys={menuList
                    .map((el) => el.url)
                    .filter((el) =>
                        el === ""
                            ? router.asPath === "/"
                            : router.asPath.includes(el)
                    )}
            >
                {menuList.map((el) => (
                    <Menu.Item key={el.url} icon={el.icon}>
                        {el.name}
                    </Menu.Item>
                ))}
            </Menu>
        </>
    );
};

export default MenuCustom;
