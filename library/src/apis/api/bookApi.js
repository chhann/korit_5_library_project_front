import instance from "../utils/instance"

export const registerBook = async (data) => {
    return await instance.post("/admin/book", data);
} 

export const searchBooksRequest = async (params) => {
    return await instance.get("/admin/books", {params}) 
}