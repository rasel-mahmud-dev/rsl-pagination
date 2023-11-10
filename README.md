# Rs-Pagination

A simple powerful pagination, can be handled billions data.

![Screenshot from 2023-11-10 19-48-31.png](public%2FScreenshot%20from%202023-11-10%2019-48-31.png)

[Screencast from 11-10-2023 07:48:02 PM.webm](public%2FScreencast%20from%2011-10-2023%2007%3A48%3A02%20PM.webm)

[![NPM](https://nodei.co/npm/rsl-pagination.png?downloads=true)](https://nodei.co/npm/rsl-pagination/)

## Installation

Install `rsl-pagination` with [npm](https://www.npmjs.com/):

```
npm install rsl-pagination
```

## Usage

Very easy to use. Just provide props

```jsx
import {useEffect, useState} from "react";

// import this
import RsPagination from 'rsl-pagination';
import "rsl-pagination/dist/index.css"
import data from "./data.json"

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

    function fetchPosts(page, pageSize) {
        const response = fetchDataWithPagination(page, pageSize)
        setItems(prev => ({
            ...prev,
            ...response
        }))
    }

    return (
        <>
            <div>
                <h1>Rs Pagination</h1>
                <table>
                    <tr>
                        <th>User ID</th>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Body</th>
                    </tr>
                    {items?.items?.map(item => (
                        <tr key={item.id}>
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
```

### JSON Data file

[data.json](https://raw.githubusercontent.com/rasel-mahmud-dev/rsl-pagination/main/example/src/data.json)

Check Example [Live example]

## Params

| Name          | Type                                                                 | Default | Description                                |
|---------------|----------------------------------------------------------------------|---------|--------------------------------------------|
| `className`   | String                                                               | ""      | **Optional.** apply class in  root element |
| `currentPage` | number                                                               | false   | **Required.** current page number          |
| `pageSize`    | number                                                               | 5       | **Optional.**                              |
| `totalItems`  | number                                                               | 0       | **Required.**  Total items                 |
| `onChange`    | onChange: (arg: { currentPage: number, perPageRow: number }) => void |         | **Required.**                              | 

