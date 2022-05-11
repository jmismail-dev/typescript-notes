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

// UI
import "./Note.scss"

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

    const toggleHistory = () => {
        setShow(!show);
        setInProp(!setInProp)
    }

    const duration = 300;


    const defaultStyle = {
        transition: `opacity ${duration}ms ease-in-out`,
        opacity: 0,
    }

    const transitionStyles = {
        entering: { opacity: 1 },
        entered: { opacity: 1 },
        exiting: { opacity: 0 },
        exited: { opacity: 0 },
    };


    return !isError ? (
        <Container className='my-4'>
            <Row>
                <Col>
                    <div className="d-flex justify-content-between align-items-center">
                        <h2>{title}</h2>
                        <Button variant='warning' onClick={toggleHistory}> History </Button>
                    </div>
                    <p className="lead">{moment(createdOn).format('DD-MM-YYYY HH:mm')}</p>
                    <div className='content'>
                        <ReactMarkdown
                            children={body}
                            remarkPlugins={[remarkGfm]}
                        />
                    </div>
                </Col>

                {show && (
                    <Col>
                        <Transition in={inProp} timeout={duration}>
                            <ListGroup>
                                {history.map((history: any, index: number) => (
                                    <ListGroupItem key={index}>{history.id}</ListGroupItem>
                                ))}
                            </ListGroup>
                        </Transition>

                    </Col>
                )}
            </Row>
        </Container>

    ) : (
        <>
            {errorMessage}
        </>
    )
}