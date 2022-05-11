import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store'

type Props = {}

export default function Notes({ }: Props) {

    const dispatch = useDispatch<AppDispatch>();
    const notes: any = useSelector<RootState>(store => store.notes.notes);

    // Get Initial Notes Data
    useEffect(() => {
        dispatch({
            type: 'FETCH_ALL_USER_NOTES'
        });
    }, []);

    return (
        <div>
            {/* <h2 className="text-primary">All </h2> */}
            {notes?.map((note: any, index: number) => (
                <Card key={index}>
                    <Card.Body>
                        <Card.Title>{note.title}</Card.Title>
                        <p>{note.body}</p>
                    </Card.Body>
                </Card>
            ))}
        </div>
    )
}