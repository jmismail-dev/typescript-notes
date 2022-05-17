import React, { useState, useEffect } from 'react';
import { Card, Container, Button, Row, Col, ListGroup, ListGroupItem } from 'react-bootstrap';
import { Transition } from 'react-transition-group';
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import moment from 'moment';

// Store
import { AppDispatch, RootState } from '../store';

// Layouts 
import Layout from '../includes/Layout'

// UI
import "./Note.scss";

// Types 
import { Post } from '../types/post'

type Props = {}

export default function Note({ }: Props) {

    const dispatch = useDispatch<AppDispatch>();
    const [show, setShow] = useState<boolean>(false)
    const [inProp, setInProp] = useState<boolean>(false);
    const params = useParams();
    const isError: boolean | unknown = useSelector<RootState>(store => store.notes.isError);
    const errorMessage: string | unknown = useSelector<RootState>(store => store.notes.error);
    const { title, body, createdOn }: any = useSelector<RootState>(store => store.notes.note);
    const history: any = useSelector<RootState>(store => store.notes.history);

    const [tempTitle, setTempTitle] = useState<string>('');
    const [tempBody, setTempBody] = useState<string>('');

    // Params
    const noteId = params.noteId;

    // Get Initial Notes Data
    useEffect(() => {
        dispatch({
            type: 'FETCH_SINGLE_USER_NOTE',
            payload: noteId
        });

        dispatch({
            type: 'GET_NOTE_HISTORY_INIT',
            payload: noteId
        });
    }, [noteId]);

    useEffect(() => {
        setTempTitle(title);
        setTempBody(body);
    }, [title, body])

    const toggleHistory = () => {
        setShow(!show);
        setInProp(!setInProp)
    }

    const handleVersionClick = (versionId: number): void => {
        const foundItem = history.find((post: { id: number; }) => post.id === versionId);
        setTempTitle(foundItem.title);
        setTempBody(foundItem.body);
    }

    const handleRestoreNote = (versionId: number): void => {
        dispatch({
            type: 'SET_RESTORE_NOTE_INIT',
            payload: versionId
        });
    }

    const largeView: number = show ? 8 : 12;
    const smallView: number = show ? 4 : 6;

    return (!isError) ? (
        <Layout>
            <Row>
                <Col md={largeView} lg={largeView}>
                    <div className="d-flex justify-content-between align-items-center">
                        <h2>{tempTitle}</h2>
                        <Button variant='warning' onClick={toggleHistory}> History </Button>
                    </div>
                    <p className="lead">{moment(createdOn).format('DD-MM-YYYY HH:mm')}</p>
                    <div className='content'>
                        <ReactMarkdown
                            children={tempBody}
                            remarkPlugins={[remarkGfm]}
                        />
                    </div>
                </Col>


                {show && (
                    <Col md={smallView} lg={smallView}>
                        <div>
                            <ListGroup style={{ cursor: 'pointer' }}>
                                {history.map((history: any, index: number) => (
                                    <ListGroupItem key={index} onClick={() => handleVersionClick(history.id)}>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <p>{history.id}</p>
                                            <Button onClick={() => handleRestoreNote(history.id)}> Restore </Button>
                                        </div>
                                    </ListGroupItem>
                                ))}
                            </ListGroup>
                        </div>

                    </Col>
                )}
            </Row>
        </Layout>

    ) : (
        <>
            {errorMessage}
        </>
    )
}