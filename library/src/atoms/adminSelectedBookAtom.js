import { atom } from "recoil";

export const selectedBookState = atom({
    key: "selectedBookState",
    default: {
        bookId: 0,
        isbn: "",
        bookTypeId: 0,
        bookTypeName:"",
        categoryId: 0,
        categoryName: "",
        bookName: "",
        authorName: "",
        publisherName: "",
        coverImgUrl: ""
    }
})