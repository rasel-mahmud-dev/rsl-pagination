import React, { useEffect, useState } from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import RsPagination from 'rsl-pagination';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import data from "./data.json";

import "./App.css";

interface Post {
    id: string;
    title: string;
    content: string;
    userId: string;
    body: string;
}

interface FetchDataResponse {
    items: Post[];
    totalItem: number;
}

function fetchDataWithPagination(page: number, pageSize: number): FetchDataResponse {
    return {
        items: data.slice(pageSize * (page - 1), pageSize * page) as unknown as Post[],
        totalItem: data.length,
    };
}

export default function Index() {
    const [items, setItems] = useState<FetchDataResponse>({
        items: [],
        totalItem: 0,
    });

    const [state, setState] = useState({
        pageSize: 10,
        page: 1,
    });

    function handlePageChange({ currentPage }: any) {
        setState((prevState) => ({
            ...prevState,
            page: parseInt(currentPage, 10),
        }));
    }

    useEffect(() => {
        fetchPosts(state.page, state.pageSize);
    }, [state.page]);

    function fetchPosts(page: number, pageSize: number) {
        const response = fetchDataWithPagination(page, pageSize);
        setItems((prev) => ({
            ...prev,
            ...response,
        }));
    }

    return (
        <>
            <div>

                <h1>Rs Pagination</h1>

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
                    buttonSize={20}
                    totalItem={items.totalItem ?? 0}
                />
            </div>
        </>
    );
}