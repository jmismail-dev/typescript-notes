import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

// Store
import { AppDispatch, RootState } from '../store'

type Props = {}

export default function Note({ }: Props) {

    const dispatch = useDispatch<AppDispatch>();
    const params = useParams();
    const isError: boolean | unknown = useSelector<RootState>(store => store.notes.isError);
    const errorMessage: string | unknown = useSelector<RootState>(store => store.notes.error);
    const { title, body, createdOn }: any = useSelector<RootState>(store => store.notes.note);

    // Params
    const noteId = params.noteId;

    // Get Initial Notes Data
    useEffect(() => {
        dispatch({
            type: 'FETCH_SINGLE_USER_NOTE',
            payload: noteId
        });
    }, [noteId]);


    return !isError ? (
        <div>
            <h2>{title}</h2>
            <p className="lead">{moment(createdOn).format('DD-MM-YYYY HH:mm')}</p>
            <p>{body}</p>
        </div>
    ) : (
        <>
            {errorMessage}
        </>
    )
}