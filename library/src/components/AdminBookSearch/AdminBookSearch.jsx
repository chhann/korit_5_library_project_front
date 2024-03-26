/** @jsxImportSource @emotion/react */
import Select from "react-select";
import * as s from "./style";
import { useQuery, useQueryClient } from "react-query";
import { useState } from "react";
import { useReactSelect } from "../../hooks/useReactSelect";
import { useBookRegisterInput } from "../../hooks/useBookRegisterInput";
import { searchBooksRequest } from "../../apis/api/bookApi";
import { useSearchParams } from "react-router-dom";



function AdminBookSearch({ selectStyle, bookTypeOptions, categoryOptions}) {

    const [ searchParams ] = useSearchParams();
    const searchCount = 20;
    

    const searchBooksQuery = useQuery(
        ["searchBooksQuery", searchParams.get("page")],
        async () => await searchBooksRequest({
            page: searchParams.get("page"),
            count: searchCount,
            bookTypeId: selectedBookType.option.value,
            categoryId: selectedCategory.option.value,
            searchTypeId: selectedSearchType.option.value,
            searchText: searchText.value
        }),
        {
            refetchOnWindowFocus: false,
            onSuccess: response => {
                console.log(response);
            },

        }
    )

    const searchSubmit = () => {
        searchBooksQuery.refetch();
        
    }
    const selectedBookType = useReactSelect({value: 0, lavel: "전체"});
    const selectedCategory = useReactSelect({value: 0, lavel: "전체"});
    const selectedSearchType = useReactSelect({value: 0, lavel: "전체"});
    const searchText = useBookRegisterInput(searchSubmit);



    const searchTypeOptions = [
        {value: 0, label: "전체"},
        {value: 1, label: "도서명"},
        {value: 2, label: "저자명"},
        {value: 3, label: "출판사"},
        {value: 4, label: "ISBN"},
    ];

    const selectStyle2 = {
        control: baseStyles => ({
            ...baseStyles,
            borderRadius: "0px",
            border: "none",
            borderRight: "1px solid #dbdbdb",
            outline: "none",
            boxShadow: "none"
        })
    }

    return (
        <div>
            <div css={s.searchBar}>
                <Select 
                    styles={selectStyle2}
                    options={[{value: 0, label: "전체"}, ...bookTypeOptions]}
                    defaultValue={selectedBookType.defalutValue}
                    value={selectedBookType.option}
                    onChange={selectedBookType.handleOnChange}
                />
                    
                <Select 
                    tyles={selectStyle} 
                    options={[{value: 0, label: "전체"}, ...categoryOptions]}
                    defaultValue={selectedCategory.defalutValue}
                    value={selectedCategory.option}
                    onChange={selectedCategory.handleOnChange}
                />
                <Select 
                    tyles={selectStyle} 
                    options={searchTypeOptions}
                    defaultValue={selectedSearchType.defalutValue}
                    value={selectedSearchType.option}
                    onChange={selectedSearchType.handleOnChange}
                />
                <input 
                    css={s.searchInput} 
                    type="text" 
                    value={searchText.value}
                    onChange={searchText.handleOnChange}
                    onKeyDown={searchText.handleonkeyDown}
                />
                <button css={s.searchButton} onClick={() => searchSubmit}>검색</button>
            </div>
            <div css={s.tableLayout}>
                <table css={s.table}>
                    <thead css={s.theadTr}>
                        <tr>
                            <th><input type="checkbox"/></th>
                            <th>코드번호</th>
                            <th>도서명</th>
                            <th>저자명</th>
                            <th>출판사명</th>
                            <th>ISBN</th>
                            <th>도서형식</th>
                            <th>카테고리</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><input type="checkbox"/></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div>

            </div>
        </div>
    );
}

export default AdminBookSearch;