import React, {Component} from 'react';
import axios from 'axios';
import './forms.css';

class Forms extends Component{
    constructor(props){
        super(props);

        this.state={
            urlname:'',
        };
        
    };
    handleSubmit = e =>{
        e.preventDefault();

        const {urlname}=this.state;

        const namesurl = {urlname,};

        axios
        .post('http://localhost:3001/',namesurl)
        .then(() => console.log('name created'))
        .catch(err =>{
            console.error(err);
        });
    };

    handleInputChange = e =>{
        this.setState({
            [e.target.name]:e.target.value,
        });

    };
    render () {
        return (
            <div>
                <p>Enter the folder path of your images to rename.</p>
                <form onSubmit={this.handleSubmit}>
                    <p><input type='text' placeholder='--Folder Path--' name='urlname' onChange={this.handleInputChange}/></p>
                    <p><button>RENAME</button></p>
                </form>
            </div>
        )
    }
}

export default Forms 