import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons"; 


class Note extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    handleRemove = (id) => {
        console.log(id)
        fetch(process.env.REACT_APP_CURRENCY_URL + '/' + id, {
            method: 'DELETE',
        }).then(response => response.json())
        this.props.onRemove(id)
    }
    render() { 
        return ( 
            <div className="notes-block">
                {this.props.allNotes.map(note => ( 
                    <div className="note" key={note.id} onClick={() => this.handleRemove(note.id)}>
                        <div className="note-remove" ><FontAwesomeIcon icon={faTimesCircle} /></div>
                        {note.content}
                    </div>)
                )
    }
            </div>
        );
    }
}
 
export default Note;