import React, {FC, useEffect, useState} from "react";
import {VscChevronLeft, VscChevronRight} from "react-icons/vsc";

import "./style.scss"

interface PaginationProps {
    perPageRow: number,
    totalItem: number,
    currentPage: number
    className?: string
    onChange: (args: { currentPage: number, perPageRow: number }) => void
}


function range(len: number, cb: (i: number) => void) {
    for (let i = 0; i < len; i++) {
        cb(i)
    }
}


function rangeNegative(len: number, cb: (i: number) => void) {
    for (let i = len; i > 0; i--) {
        cb(i)
    }
}

interface StateType {
    perPageRow: number,
    currentPage: number,
    showPageItems: number[]
    showNumberOfItem: number
    displayPageBtn: number
    totalPage: number
}

const Pagination: FC<PaginationProps> = (props) => {

    const {perPageRow = 20, className = "", currentPage = 1, totalItem = 0, onChange} = props

    const [state, setState] = useState<StateType>({
        perPageRow: 0,
        currentPage: 1,
        showPageItems: [],
        showNumberOfItem: 1,
        displayPageBtn: 10,
        totalPage: 0
    })


    useEffect(() => {
        calcPaginationView(totalItem, state.perPageRow)
    }, [totalItem, perPageRow])


    useEffect(() => {
        setState(prev => ({
            ...prev,
            perPageRow,
            currentPage
        }))

    }, [perPageRow, currentPage])

    function calcPaginationView(totalItem: number, perPageRow: number) {
        let arr: number[] = []
        let showNumberOfItem = Math.ceil(totalItem / perPageRow)
        // let pageView = showNumberOfItem >= 5 ? 5 : showNumberOfItem
        range(state.displayPageBtn, (i) => {
            arr.push(i + 1)
        })

        setState(prev => ({
            ...prev,
            showPageItems: arr,
            totalPage: Math.round(totalItem / state.perPageRow),
            showNumberOfItem: state.displayPageBtn
        }))
    }

    function getLastItem(arr) {
        return arr[arr.length - 1]
    }

    function jumpLastPage(totalPage: number, displayPageBtn: number) {
        const showPageItems = []
        rangeNegative(displayPageBtn, (i) => {
            showPageItems.push(totalPage - (i - 1))
        })
        showPageItems.sort()
        return showPageItems
    }

    function changePage(pageNumber: number) {

        let showNumberOfItem = state.showNumberOfItem
        let showNumberOfPage = state.displayPageBtn

        setState(prev => {
            let updatedPaginationState = {...prev}
            let displayPageBtn = updatedPaginationState.displayPageBtn
            let totalPage = updatedPaginationState.totalPage

            if (pageNumber === totalPage) {
                return {
                    ...updatedPaginationState,
                    currentPage: pageNumber,
                    showPageItems: jumpLastPage(totalPage, displayPageBtn)
                }
            }

            let lastNoOfCurrentShowPageBtn = getLastItem(updatedPaginationState.showPageItems)
            const isFirst = pageNumber === 1
            const isLastPage = pageNumber === lastNoOfCurrentShowPageBtn


            if (isFirst) {
                updatedPaginationState.showPageItems = []
                range(displayPageBtn, (i) => {
                    updatedPaginationState.showPageItems.push(i + 1)
                })
                updatedPaginationState.currentPage = 1




            } else if (isLastPage) {

                updatedPaginationState.showPageItems = []

                let remain = totalPage - (displayPageBtn + lastNoOfCurrentShowPageBtn)
                let low = Math.abs(remain) + lastNoOfCurrentShowPageBtn
                let high = displayPageBtn - Math.abs(remain)
                if (remain < 0) {
                    rangeNegative(Math.abs(remain), (i) => {
                        let nextPageBtnNo = lastNoOfCurrentShowPageBtn - (i - 1)
                        updatedPaginationState.showPageItems.push(nextPageBtnNo)
                    })


                    if (high) {
                        range(high, (i) => {
                            let nextPageBtnNo = lastNoOfCurrentShowPageBtn + (i + 1)
                            updatedPaginationState.showPageItems.push(nextPageBtnNo)
                        })
                    }


                } else {
                    range(displayPageBtn, (i) => {
                        let nextPageBtnNo = lastNoOfCurrentShowPageBtn + (i)
                        if (nextPageBtnNo <= totalPage) {
                            updatedPaginationState.showPageItems.push(nextPageBtnNo)
                        }
                    })
                }
                // updatedPaginationState.showPageItems
                updatedPaginationState.currentPage = lastNoOfCurrentShowPageBtn

            } else {
                updatedPaginationState.currentPage = pageNumber
            }

            return updatedPaginationState


            // const isFirstClick = updatedPaginationState.showPageItems[0] === pageNumber
            // const isLastElClick = updatedPaginationState.showPageItems.length === pageNumber
            //
            // const maxLimitPage = updatedPaginationState.totalPage
            //
            //
            // if (isLastElClick) {
            //     let lastEl = getLastItem( updatedPaginationState.showPageItems)
            //
            //     if (maxLimitPage < pageNumber + showNumberOfPage) {
            //         updatedPaginationState.showPageItems = []
            //         range(showNumberOfPage, (i) => {
            //             updatedPaginationState.showPageItems.push(lastEl  + (i + 1))
            //         })
            //         updatedPaginationState.showPageItems.reverse()
            //     } else {
            //         updatedPaginationState.showPageItems = []
            //         range(showNumberOfItem, (i) => {
            //             updatedPaginationState.showPageItems.push(lastEl  + i)
            //         })
            //     }
            //
            //     if (pageNumber >= maxLimitPage) {
            //         updatedPaginationState.currentPage = maxLimitPage
            //     } else {
            //         updatedPaginationState.currentPage = pageNumber
            //     }
            //
            //
            // } else if (isFirstClick) {
            //
            //     // start from previous 5 from currentPage
            //     if (pageNumber - showNumberOfItem >= 1) {
            //         updatedPaginationState.showPageItems = []
            //         range(showNumberOfItem, (i) => {
            //             updatedPaginationState.showPageItems.push(pageNumber - i)
            //         })
            //         updatedPaginationState.showPageItems.reverse()
            //         updatedPaginationState.currentPage = pageNumber
            //     } else {
            //         // start from 1
            //         updatedPaginationState.showPageItems = []
            //         range(showNumberOfItem, (i) => {
            //             updatedPaginationState.showPageItems.push(i + 1)
            //         })
            //         updatedPaginationState.currentPage = 1
            //     }
            // } else {
            //     // change page number for all case.
            //
            //     if (pageNumber >= maxLimitPage) {
            //         updatedPaginationState.currentPage = maxLimitPage
            //     } else {
            //         updatedPaginationState.currentPage = pageNumber
            //     }
            // }
            //
            //
            // onChange(updatedPaginationState)
            // return updatedPaginationState

        })
    }


    function handleChangePerPage(perPageRow: string) {
        setState(prev => {
            const updatedPaginateState = {
                ...prev,
                perPageRow: Number(perPageRow),
                currentPage: 1
            }
            // per page change input debounce for haft second

            onChange(updatedPaginateState)
            return updatedPaginateState
        })
    }

    return (
        <div className={`${className ?? ""} rs-pagination`}>
            {/*{!perPageRow && <div>*/}
            {/*    <span className="text-sm">Row Per Page</span>*/}
            {/*    <input*/}
            {/*        type="number"*/}
            {/*        min="1"*/}
            {/*        step="1"*/}
            {/*        className="border-gray per-page-input"*/}
            {/*        onChange={(e) => handleChangePerPage(*/}
            {/*            Number(e.target.value || 0) === 0*/}
            {/*                ? "1"*/}
            {/*                : e.target.value*/}
            {/*        )}*/}
            {/*        value={state.perPageRow}*/}
            {/*    />*/}
            {/*</div> }*/}

            <div className="column-gap-2">
                <span className="pagination-end-start-button" onClick={() => changePage(1)}>Start</span>
                <span>|</span>
            </div>

            <div className="">
                <button className={`paginationArrow ${state.currentPage === 1 ? "disable-paginationArrow" : ""}`}
                        onClick={() => changePage(Number(state.currentPage - 1))}>
                    <VscChevronLeft/>
                    <span>Previous</span>
                </button>

                <div className="pagination-items">
                    {state.showPageItems.length > 0 ? state.showPageItems.map((pageNumber) => (
                        <div key={pageNumber}
                             onClick={() => changePage(Number(pageNumber))}
                             className={`pagination-item ${pageNumber === state.currentPage ? "active" : ""}`}>
                            {pageNumber}
                        </div>
                    )) : (
                        <div
                            className={`pagination-item no-page`}>
                            No page
                        </div>
                    )}
                </div>

                <button
                    className={`paginationArrow ${(state.currentPage === state.showPageItems[state.showPageItems.length - 1] || !state.showPageItems.length) ? "disable-paginationArrow" : ""}`}
                    onClick={() => changePage(Number(state.currentPage + 1))}>
                    <span>Next</span>
                    <VscChevronRight/>
                </button>
            </div>

            <div>
                <span>|</span>
                <span className="pagination-end-start-button"
                      onClick={() => changePage(Number(state.totalPage))}>End</span>
            </div>

            <div className="page-of">
                <span>Page</span>
                <span>{currentPage}</span>
                <span>of</span>
                <span>{state.totalPage}</span>
            </div>
        </div>
    );
};

export default Pagination;



