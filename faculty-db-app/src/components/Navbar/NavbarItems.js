import React from "react";
import * as FaIcons from "react-icons/fa"
import * as GiIcons from "react-icons/gi"
import * as ImIcons from "react-icons/im"

export const NavbarItems = [
    {
        title: 'Университет',
        path: '/',
        icon: <FaIcons.FaFeatherAlt/>,
        cName: 'nav-text'
    },
    {
        title: 'Факультеты',
        path: '/faculties',
        icon: <FaIcons.FaUniversity/>,
        cName: 'nav-text'
    },

    {
        title: 'Преподаватели',
        path: '/teachers',
        icon: <GiIcons.GiTeacher/>,
        cName: 'nav-text'
    },

    {
        title: 'Студенты',
        path: '/students',
        icon: <ImIcons.ImUsers/>,
        cName: 'nav-text'
    }
]