import React, { useState, useCallback } from 'react';
import { Alert, Button, Container, Form } from "react-bootstrap";
import rehypeSanitize from "rehype-sanitize";
import MdEditor from 'react-markdown-editor-lite';
import ReactMarkdown from 'react-markdown';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'

// Types
import { AppDispatch, RootState } from '../store';
// UI
import 'react-markdown-editor-lite/lib/index.css';

type Props = {}

const AddNote = (props: Props) => {

    const [value, setValue] = useState<string | undefined>('');
    const [title, setTitle] = useState<string>('');
    const [error, setError] = useState<string>('')

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const handleChange = useCallback((value: any | undefined): any => {
        setValue(value)
    }, [value]);


    const handleTitleChange = useCallback((e: any): void => {
        setTitle(e.target.value)
    }, [title]);


    const changeError = (value: string): void => {
        setError(value)
    };

    const getValue: any = value;

    const successClbk = () => {
        navigate('/')
    }

    const handleSubmit = (): void => {
        if (getValue.text && getValue.text.trim() !== '' && title.trim() !== '') {
            dispatch({
                type: 'CREATE_NOTE_INIT',
                payload: {
                    title,
                    body: getValue.text,
                },
                success: successClbk
            })
            changeError('')
        }

        else if (title.length > 40) {
            changeError('Title should be less than 40 characters');
        }
        else {
            changeError('Title and Content required')
        }
    }


    return (
        <Container className='my-4'>
            {error && (
                <Alert variant='danger'>
                    {error}
                </Alert>
            )}

            <Form.Group>

                <Form.Control
                    type='text' placeholder='Enter Title'
                    onChange={handleTitleChange}
                />
            </Form.Group>

            <div className="my-1">
                <MdEditor style={{ height: '500px' }}
                    allowPasteImage
                    value={getValue.text}
                    view={{ menu: true, md: false, html: true }}
                    renderHTML={text => (
                        <ReactMarkdown
                            children={text}
                            rehypePlugins={[
                                rehypeSanitize
                            ]}
                        />
                    )}
                    onChange={handleChange} />
            </div>

            <Button onClick={() => handleSubmit()} className='my-4'> Submit </Button>
        </Container>
    )
}

export default AddNote;