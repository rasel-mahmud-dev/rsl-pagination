import {useEffect, useState} from "react";
// import RsPagination from 'rsl-pagination';
// import "rsl-pagination/dist/index.css"

import RsPagination from 'rsl-pagination/src/RsPagination';
import "rsl-pagination/src/style.scss"



import data from "./data.json"

import "./App.css"

function fetchDataWithPagination(page, pageSize) {
    return {
        items: data.slice(pageSize * (page - 1), pageSize * page),
        totalItem: data.length,
    }
}

export default function Index() {

    const [items, setItems] = useState({
        items: [],
        totalItem: 0
    })

    const [state, setState] = useState({
        pageSize: 10,
        page: 1
    });

    function handlePageChange({currentPage}) {
        setState(prevState => ({
            ...prevState,
            page: currentPage
        }))
    }

    useEffect(() => {
        fetchPosts(state.page, state.pageSize)
    }, [state.page]);

    function fetchPosts(page, pageSize){
        const response = fetchDataWithPagination(page, pageSize)
        setItems(prev=>({
            ...prev,
            ...response
        }))
    }

    return (
        <>
            <div>

                <h1>Rs Pagination {data.length}</h1>

                <table>
                    <tr>
                        <th>SL</th>
                        <th>User ID</th>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Body</th>
                    </tr>
                    {items?.items?.map((item, i) => (
                        <tr key={item.id}>
                            <td>{(i + 1) + (state.pageSize * (state.page - 1))}</td>
                            <td>{item.id}</td>
                            <td>{item.userId}</td>
                            <td>{item.title}</td>
                            <td>{item.body.substring(0, 50)}
                            </td>
                        </tr>
                    ))}
                </table>

                <br/>

                <RsPagination
                    className="pagination"
                    currentPage={state.page}
                    onChange={handlePageChange}
                    perPageRow={state.pageSize}
                    totalItem={items.totalItem ?? 0}
                />
            </div>
        </>
    );
}
