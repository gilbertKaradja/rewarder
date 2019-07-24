import React, { Component, SyntheticEvent, RefObject } from 'react';

export interface TablePaginatorProps {
    currentPage: number;
    totalEntries: number;
    entriesPerPage: number;
    previousButtonHandler: any;
    nextButtonHandler: any;
}


function TalePaginator(props: TablePaginatorProps) {
    let {
        currentPage,
        totalEntries,
        entriesPerPage,
        previousButtonHandler,
        nextButtonHandler
    } = props;

    let previousButtonDisabled = currentPage == 0;
    let nextButtonDisabled = (totalEntries - (currentPage * entriesPerPage )) <= entriesPerPage;

    return (
        <div className="table-paginator">

            <button disabled={previousButtonDisabled} onClick={previousButtonHandler}>Previous</button>

            <button disabled={nextButtonDisabled} onClick={nextButtonHandler}>Next</button>

        </div>
    )
}

export default TalePaginator;