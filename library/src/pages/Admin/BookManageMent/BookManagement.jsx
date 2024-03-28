/** @jsxImportSource @emotion/react */
import * as s from "./style";

import Select from "react-select";
import BookRegisterInput from "../../../components/BookRegisterInput/BookRegisterInput";
import { useMutation, useQuery } from "react-query";
import { getAllBookTypeRequest, getAllCategoryRequest } from "../../../apis/api/options";
import { useEffect, useRef, useState } from "react";
import { CiSquarePlus } from "react-icons/ci";
import { useBookRegisterInput } from "../../../hooks/useBookRegisterInput";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../../apis/firebase/config/firebaseConfig";
import { v4 as uuid} from "uuid";
import RightTopButton from "../../../components/RightTopButton/RightTopButton";
import { registerBook, updateBookRequest } from "../../../apis/api/bookApi";
import AdminBookSearch from "../../../components/AdminBookSearch/AdminBookSearch";
import { useRecoilState } from "recoil";
import { selectedBookState } from "../../../atoms/adminSelectedBookAtom";



function BookManagement() {
    const [ bookTypeOptions, setBookTypeOptions ] = useState([]);
    const [ categoryOptions, setCategoryOptions ] = useState([]);
    const [ actionStatus, setActionStatus ] = useState(0);  // 0 = 선택, 1 = 추가, 2 = 수정, 3 = 삭제
    const [ isDelete, setDelete] = useState(false);
    const fileRef = useRef();
    const inputRefs  = [
        useRef(),   // 0 bookId
        useRef(),   // 1 isbn
        useRef(),   // 2 도서형식
        useRef(),   // 3 카테고리
        useRef(),   // 4 도서명
        useRef(),   // 5 저자명
        useRef(),   // 6 출판사
        useRef()    // 7 URL
    ];

    
    

    const bookTypeQuery = useQuery(
        ["bookTypeQuery"], 
        getAllBookTypeRequest,
        {
            onSuccess: response => {
                setBookTypeOptions(() => response.data.map(bookType => {
                    return {
                        value: bookType.bookTypeId,
                        label: bookType.bookTypeName
                    }
                }));
            },
            retry: 0,
            refetchOnWindowFocus: false
        }
    );

    const categoryQuery = useQuery(
        ["categoryQuery"], 
        getAllCategoryRequest,
        {
            onSuccess: response => {
                setCategoryOptions(() => response.data.map(category => {
                    return {
                        value: category.categoryId,
                        label: category.categoryName
                    }
                }));
            },
            retry: 0,
            refetchOnWindowFocus: false
        }
    );

    const registerBookMutation = useMutation({
        mutationKey: "registerBookMutation",
        mutationFn: registerBook,
        onSuccess: response => {
            alert("추가완료.");
            window.location.replace("/admin/book/management?page=1");
        },
        onError: error => {
            
        }
    })

    const updateBookMutation = useMutation({
        mutationKey: "updateBookMutation",
        mutationFn: updateBookRequest,
        onSuccess: response => {
            alert("수정완료.");
            window.location.reload();
        }
    })

    const nextInput = (ref) => {
        ref.current.focus();
    }

    const submit = () => {
        if(actionStatus === 1) {
            registerBookMutation.mutate({
                isbn: isbn.value,
                bookTypeId: bookTypeId.value.value,
                categoryId: categoryId.value.value,
                bookName: bookName.value,
                authorName: authorName.value,
                publisherName: publisherName.value,
                coverImgUrl: imgUrl.value
            });
        } else if(actionStatus === 2) {
            updateBookMutation.mutate({
                bookId: bookId.value,
                isbn: isbn.value,
                bookTypeId: bookTypeId.value.value,
                categoryId: categoryId.value.value,
                bookName: bookName.value,
                authorName: authorName.value,
                publisherName: publisherName.value,
                coverImgUrl: imgUrl.value
            })
        } else if (actionStatus === 3) {
            setDelete(() => true);
        }
    }

    const cancel = () => {
        bookId.setValue(() => 0);
        isbn.setValue(() => "");
        bookTypeId.setValue(() => null);
        categoryId.setValue(() => null);
        bookName.setValue(() => "");
        authorName.setValue(() => "");
        publisherName.setValue(() => "");
        imgUrl.setValue(() => "");
        
        setActionStatus(() => 0);
    }

    const bookId = useBookRegisterInput(nextInput, inputRefs[1]);
    const isbn = useBookRegisterInput(nextInput, inputRefs[2]);
    const bookTypeId = useBookRegisterInput(nextInput, inputRefs[3]);
    const categoryId = useBookRegisterInput(nextInput, inputRefs[4]);
    const bookName = useBookRegisterInput(nextInput, inputRefs[5]);
    const authorName = useBookRegisterInput(nextInput, inputRefs[6]);
    const publisherName = useBookRegisterInput(nextInput, inputRefs[7]);
    const imgUrl = useBookRegisterInput(submit);
    const [ selectedBook ] = useRecoilState(selectedBookState);

    useEffect(() => {
        bookId.setValue(() => selectedBook.bookId);
        isbn.setValue(() => selectedBook.isbn);
        bookTypeId.setValue(() => ({value: selectedBook.bookTypeId, label: selectedBook.bookTypeName}));
        categoryId.setValue(() => ({value: selectedBook.categoryId, label: selectedBook.categoryName}));
        bookName.setValue(() => selectedBook.bookName);
        authorName.setValue(() => selectedBook.authorName);
        publisherName.setValue(() => selectedBook.publisherName);
        imgUrl.setValue(() => selectedBook.coverImgUrl);
    },[selectedBook])


    

    const selectStyle = {
        control: baseStyles => ({
            ...baseStyles,
            borderRadius: "0px",
            border: "none",
            outline: "none",
            boxShadow: "none"
        })
    }

    const handleFileChange = (e) => {
        
        const files = Array.from(e.target.files)
        
        if(files.length === 0) {
            e.target.value = "";
            return;
        }

        if(!window.confirm("파일을 업로드 하시겠습니까?")){
            e.target.value = "";
            return
        }

        const storageRef = ref(storage, `library/book/cover/${uuid()}_${files[0].name}`);
        const uploadTask = uploadBytesResumable(storageRef, files[0]);
        
        uploadTask.on(
            "state_changed",
            Snapshot => {},
            error => {},
            () => {
                alert("업로드를 완료하셨습니다.")
                getDownloadURL(storageRef)
                .then(url => {
                    imgUrl.setValue(() => url);
                });
            }
        )

    }


    return (
        <div css={s.layout}>
            <div css={s.header}>
                <h1>도서 관리</h1>
                <div>
                    {
                        actionStatus === 0 
                        ? 
                        <>
                            <RightTopButton onClick={() => setActionStatus(1)}>추가</RightTopButton>
                            <RightTopButton onClick={() => setActionStatus(2)}>수정</RightTopButton>
                            <RightTopButton onClick={() => setActionStatus(3)}>삭제</RightTopButton>
                        </>
                        :
                        <>
                            <RightTopButton onClick={submit}>확인</RightTopButton>
                            <RightTopButton onClick={cancel}>취소</RightTopButton>
                        </>
                    }

                </div>
            </div>
            <div css={s.topLayout}>
                <table css={s.registerTable}>
                    <tbody>
                        <tr>
                            <th css={s.registerTh}>도서코드</th>
                            <td>
                                <BookRegisterInput 
                                    value={bookId.value} 
                                    bookref={inputRefs[0]}
                                    onChange={bookId.handleOnChange}
                                    onkeyDown={bookId.handleonkeyDown}
                                    isDisabled={true}
                                />
                            </td>
                            <th css={s.registerTh}>ISBN</th>
                            <td>
                                <BookRegisterInput 
                                    value={isbn.value} 
                                    bookref={inputRefs[1]}
                                    onChange={isbn.handleOnChange}
                                    onkeyDown={isbn.handleonkeyDown}
                                    isDisabled={![1, 2].includes(actionStatus)}
                                />
                            </td>
                            <td rowSpan={6} css={s.preview}>
                                <div css={s.imageBox}>
                                    <img 
                                        src={
                                            !imgUrl.value 
                                            ? "https://www.shutterstock.com/image-vector/default-ui-image-placeholder-wireframes-600nw-1037719192.jpg"
                                            : imgUrl.value
                                        }       
                                        alt="" 
                                    />
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th css={s.registerTh}>도서형식</th>
                            <td>
                                <Select 
                                    styles={selectStyle} 
                                    options={bookTypeOptions}
                                    value={bookTypeId.value}
                                    onKeyDown={bookTypeId.handleonkeyDown}
                                    onChange={bookTypeId.handleOnChange}
                                    ref={inputRefs[2]}
                                    isDisabled={![1, 2].includes(actionStatus)}
                                />
                            </td>
                            <th css={s.registerTh}>카테고리</th>
                            <td>
                                <Select 
                                    styles={selectStyle} 
                                    options={categoryOptions}
                                    value={categoryId.value}
                                    onKeyDown={categoryId.handleonkeyDown}
                                    onChange={categoryId.handleOnChange}
                                    ref={inputRefs[3]}
                                    isDisabled={![1, 2].includes(actionStatus)}
                                />
                            </td>
                        </tr>
                        <tr>
                            <th css={s.registerTh}>도서명</th>
                            <td colSpan={3}>
                                <BookRegisterInput 
                                    value={bookName.value} 
                                    bookref={inputRefs[4]}
                                    onChange={bookName.handleOnChange}
                                    onkeyDown={bookName.handleonkeyDown}
                                    isDisabled={![1, 2].includes(actionStatus)}
                                />
                            </td>
                        </tr>
                        <tr>
                            <th css={s.registerTh}>저자명</th>
                            <td>
                                <BookRegisterInput 
                                    value={authorName.value} 
                                    bookref={inputRefs[5]}
                                    onChange={authorName.handleOnChange}
                                    onkeyDown={authorName.handleonkeyDown}
                                    isDisabled={![1, 2].includes(actionStatus)}
                                />
                            </td>
                            <th css={s.registerTh}>출판사</th>
                            <td>
                                <BookRegisterInput 
                                    value={publisherName.value} 
                                    bookref={inputRefs[6]}
                                    onChange={publisherName.handleOnChange}
                                    onkeyDown={publisherName.handleonkeyDown}
                                    isDisabled={![1, 2].includes(actionStatus)}
                                />
                            </td>
                        </tr>
                        <tr>
                            <th css={s.registerTh}>표지URL</th>
                            <td colSpan={3}>
                                <div css={s.imgUrl}>
                                    <span css={s.imgUrlBox}>
                                        <BookRegisterInput 
                                            value={imgUrl.value} 
                                            bookref={inputRefs[7]}
                                            onChange={imgUrl.handleOnChange}
                                            onkeyDown={imgUrl.handleonkeyDown}
                                            isDisabled={![1, 2].includes(actionStatus)}
                                        />
                                    </span>
                                    <input 
                                        type="file" 
                                        style={{
                                            display: "none"
                                        }}
                                        onChange={handleFileChange}
                                        ref={fileRef}
                                    />
                                    <button css={s.imgAddButton} disabled={![1, 2].includes(actionStatus)} onClick={() => fileRef.current.click()}>
                                        <CiSquarePlus />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
                <AdminBookSearch
                    selectStyle={selectStyle}
                    bookTypeOptions={bookTypeOptions}
                    categoryOptions={categoryOptions}
                    isDelete={isDelete}
                    setDelete={setDelete}
                />
        </div>
    );
}

export default BookManagement;