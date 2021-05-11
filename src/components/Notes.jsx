import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSyncAlt, faPaperPlane} from "@fortawesome/free-solid-svg-icons"; 
import Note from './Note';

class Notes extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            newNote: "",
            allNotes: []
         }
    }

    sendNewNote = (note) => {
        fetch(process.env.REACT_APP_CURRENCY_URL, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: 0,
                content: note
            }),
          })
    }
    componentWillUnmount() {
        clearInterval(this.timeout)
    }
    getAllNotes = () => {
        fetch(process.env.REACT_APP_CURRENCY_URL, {
                headers : { 
                  'Content-Type': 'application/json',
                  'Accept': 'application/json'
                 }
                })
            .then(response => response.json())
            .then(allNotes => {
                this.setState({allNotes})
            })
    }
    handleNote = (evt) => {
        console.log(evt.target.value)
        this.setState({
           [evt.target.name]: evt.target.value
        })
    }
    handleSubmit = (evt) => {
        evt.preventDefault();
        this.state.newNote && this.sendNewNote(this.state.newNote)
        this.setState({
            newNote: ""
         })
        this.timeout = setTimeout(() => {this.getAllNotes()},200)
    }
    onRemove = (id) => {
        console.log(id)
        this.timeout = setTimeout(() => {this.getAllNotes()},200)
    }
    handleUpdate = () => {
        this.getAllNotes()
    }
    render() { 
        return ( 
            <>
                <div className="reload-block-container">
                    <div className="reload-block-title">Notes</div>
                    <button onClick={this.handleUpdate}><FontAwesomeIcon icon={faSyncAlt} /></button>
                </div> 

                <Note allNotes={this.state.allNotes} onRemove={this.onRemove}/>  

                <form className="new-block-add" onSubmit={this.handleSubmit}>
                    <div className="new-block-title">New note</div>
                    <div className="new-block-field">
                        <textarea value={this.state.newNote} name="newNote" onChange={this.handleNote}/>
                        <button className="new-block-btn"><FontAwesomeIcon icon={faPaperPlane} /></button>
                    </div>
                </form>  
            </>
         );
    }
}
 
export default Notes;