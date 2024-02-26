/** @jsxImportSource @emotion/react */

import { FaCaretDown, FaCaretUp  } from "react-icons/fa";
import * as S from "./stylePractice";

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MENUS } from "../../constants/menu";

function SideBarPractice(props) {
    const [ isShow, setShow ] = useState(false);

    // const menus = useMemo(() => [
    //     {
    //         id: 1,
    //         path:"/mypage",
    //         name: "마이페이지"
    //     },
    //     {
    //         id: 2,
    //         path:"/board",
    //         name: "게시글"
    //     },
    //     {
    //         id: 3,
    //         path:"/notice",
    //         name: "공지사항"
    //     },
    // ],[]);





    return (
        <aside css={S.layout(isShow)}>
            <button css={S.toggleButton} onClick={() => setShow(!isShow)}>
                {isShow ? <FaCaretUp/>  : <FaCaretDown/>}
            </button>
            <ul css={S.menuList}>
                {MENUS.map(menu => 
                    <Link css={S.menuItem} to={menu.path} key={menu.id} onClick={() => setShow(false)}>
                        <li>{menu.name}</li>
                    </Link>)
                }
            </ul>
        </aside>
    );
}

export default SideBarPractice;