import { Request, Response } from 'express';

// Connection
import connection from '../lib/db';

// Lib
import { getTimeStamp } from '../lib/mysql';


export const getNotes = (req: Request, res: Response) => {
    connection.connect(() => {
        const QUERY = 'SELECT * FROM notes ORDER BY createdOn DESC'
        connection.query(QUERY, (error, results) => {
            if (error) throw error;
            if (results.length > 0) {
                return res.status(200).send({ message: "Notes Fetched", status: "OK", results: results })
            }
            else {
                return res.status(200).send({ message: "Notes Fetched", status: "OK", results: [] })
            }
        })
    })
}

export const getNote = (req: Request, res: Response) => {
    connection.connect(() => {
        const QUERY = 'SELECT * FROM notes WHERE id=?'
        connection.query(QUERY, [req.params.noteId], (error, results) => {
            if (error) throw error;
            if (results.length > 0) {
                return res.status(200).send({ message: "Note Fetched", status: "OK", result: results[0] })
            }
            else {
                return res.status(200).send({ message: "No such note found", status: "FAILED", })
            }
        })
    })
}

export const createNote = (req: Request, res: Response) => {
    const { title, body } = req.body;

    connection.connect(() => {

        const createdOn = getTimeStamp();
        const updatedOn = getTimeStamp();

        const SQL = 'INSERT INTO notes(title, body, createdOn, updatedOn) VALUES(?,?,?,?)';

        connection.query(SQL, [title, body, createdOn, updatedOn], function (error, results) {
            if (error) throw error;
            const noteId = results.insertId

            // Create  Note History 
            const HISTORY = 'INSERT INTO notes_history(title, body, createdOn, updatedOn, noteId) VALUES(?,?,?,?,?)';
            connection.query(HISTORY, [title, body, createdOn, updatedOn, noteId], function (note_error, notes_history) {
                if (note_error) throw note_error;
                console.log('The solution is: ', notes_history.insertId);
                return res.status(200).send({ message: "Note Created", status: "OK" })
            });
        });

    })

}

export const updateNote = (req: Request, res: Response) => {
    const { title, body } = req.body;
    const { noteId } = req.params;

    connection.connect(() => {

        const createdOn = getTimeStamp();
        const updatedOn = getTimeStamp();

        const UPDATE_SQL = 'UPDATE notes SET title=?, body=?, updatedOn=? WHERE id=?';

        connection.query(UPDATE_SQL, [title, body, updatedOn, noteId, body], function (error, results) {
            if (error) throw error;
            // Create  Note History 
            if (results.affectedRows > 0) {

                // Delete Except last 10 records
                const DELETE_LAST_TEN = `
                    DELETE FROM notes_history 
                    WHERE noteId = ? AND id NOT IN (
                    SELECT id
                    FROM (
                        SELECT id
                        FROM notes_history 
                        where noteId = ?
                        ORDER BY createdOn DESC
                        LIMIT 10 -- keep this many records
                    ) foo
                    );
                `;

                connection.query(DELETE_LAST_TEN, [noteId, noteId], function (delete_error, delete_info) {
                    if (delete_error) throw delete_error;
                    const HISTORY = 'INSERT INTO notes_history(title, body, createdOn, updatedOn, noteId) VALUES(?,?,?,?,?)';
                    connection.query(HISTORY, [title, body, createdOn, updatedOn, noteId], function (note_error, notes_history) {
                        if (note_error) throw note_error;
                        console.log('Notes Updated: ', notes_history.insertId);
                        return res.status(200).send({ message: "Note Updated", status: "OK" })
                    });
                });
            }
            else {
                return res.status(400).send({ message: "No History" })
            }
        });
    })
}

export const restoreHistory = (req: Request, res: Response) => {
    const { historyId } = req.params;
    connection.connect(() => {
        const QUERY = 'SELECT * FROM notes_history WHERE id= ?'
        connection.query(QUERY, [historyId], (error, results) => {
            if (error) throw error;
            console.log('results', results);
            if (results.length > 0) {
                const { noteId, body, title } = results[0];
                const QUERY = 'UPDATE notes SET title=?, body=? WHERE id= ?'
                connection.query(QUERY, [title, body, noteId], (update_error, update_info) => {
                    if (update_error) throw update_error;
                    console.log('update_info', update_info);
                    if (update_info.affectedRows > 0) {
                        return res.status(200).send({ message: "History Restored" })
                    }
                    else {
                        return res.status(400).send({ message: "No matching notes found" })
                    }
                });
            }
            else {
                return res.status(400).send({ message: "No history exists" })
            }
        })
    })
}

export const getHistoryForNotes = (req: Request, res: Response) => {
    const { noteId } = req.params;
    connection.connect(() => {
        const QUERY = 'SELECT * FROM notes_history WHERE noteId= ?'
        connection.query(QUERY, [noteId], (error, results) => {
            if (error) throw error;
            if (results.length > 0) {
                return res.status(200).send({ message: "History Fetched", status: "OK", results: results })
            }
            else {
                return res.status(200).send({ message: "History Fetched", status: "OK", results: [] })
            }
        })
    })

}

export const deleteNote = (req: Request, res: Response) => {
    const { noteId } = req.params;
    connection.connect(() => {
        const QUERY = 'SELECT * FROM notes WHERE id= ?'
        connection.query(QUERY, [noteId], (error, results) => {
            if (error) throw error;
            if (results.length > 0) {

                const DELETE_NOTE = 'DELETE FROM notes WHERE id=?';
                connection.query(DELETE_NOTE, [noteId], (delete_error, delete_info) => {
                    if (delete_error) throw delete_error;
                    console.log(delete_info)
                    if (delete_info.affectedRows > 0) {

                        const DELETE_HISTORY = 'DELETE FROM notes_history WHERE noteId=?';
                        connection.query(DELETE_HISTORY, [noteId], (delete_h_error, delete_h_info) => {
                            if (delete_h_error) throw delete_h_error;
                            return res.status(200).send({ message: "Note Removed", status: "OK" })
                        });

                    }
                });
            }
            else {
                return res.status(200).send({ message: "Not not found", status: "FAILED" })
            }
        })
    })
}