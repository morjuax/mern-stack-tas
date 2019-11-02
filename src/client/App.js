import React, {Component} from 'react';
import axios from 'axios';

class App extends Component {
    state = {
        title: '',
        description: '',
        tasks: [],
        _id: ''
    };

    addTask = async (e) => {
        e.preventDefault();
        console.log(this.state._id);
        if (this.state._id) { // update
            let response = await axios.put(`/api/tasks/${this.state._id}`, this.state);
            M.toast({html: response.data.message});
        } else { //save
            let response = await axios.post('/api/tasks', this.state);
            M.toast({html: response.data.message});
        }


        this.setState({title: '', description: '', _id: ''});
        this.fetchTasks();
    };

    handleInput = (e) => {
        let {value, name} = e.target;
        this.setState({
            [name]: value
        });
    };

    fetchTasks = async () => {
        let response = await axios.get('/api/tasks');

        this.setState({tasks: response.data});
    };

    deleteTask = async (id) => {
        if (confirm("Are you sure you want to delete it?")) {
            let response = await axios.delete(`/api/tasks/${id}`);
            M.toast({html: response.data.message});
            this.fetchTasks();
        }
    };

    editTask = async (id) => {
        let response = await axios.get(`/api/tasks/${id}`);
        this.setState({
            title: response.data.title,
            description: response.data.description,
            _id: response.data._id,
        })
    };


    componentDidMount() {
        this.fetchTasks();
    }

    render() {
        return (
            <div>
                {/*NAVIGATION*/}
                <nav className='light-blue darken-4'>
                    <div className="container">
                        <a className="brand-logo" href='/'>MERN Stack</a>
                    </div>
                </nav>
                <div className="container">
                    <div className="row">
                        <div className="col s5">
                            <div className="card">
                                <div className="card-content">
                                    <form onSubmit={this.addTask}>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input name="title" type="text" placeholder='Task Title'
                                                       onChange={this.handleInput} value={this.state.title}/>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <textarea name="description" className="materialize-textarea"
                                                          placeholder='Task Description'
                                                          onChange={this.handleInput}
                                                          value={this.state.description}></textarea>
                                            </div>
                                        </div>
                                        <button type="submit" className="btn light-blue darken-4">
                                            Send
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col s7">
                            <table className="">
                                <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Title</th>
                                    <th>Description</th>
                                    <th>Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.state.tasks.map((task, i) => {
                                    return (
                                        <tr key={i}>
                                            <td>{i + 1}</td>
                                            <td>{task.title}</td>
                                            <td>{task.description}</td>
                                            <td>
                                                <button onClick={() => this.editTask(task._id)}
                                                        className="btn light-blue darken-4">
                                                    <i className="material-icons">edit</i>
                                                </button>
                                                <button onClick={() => this.deleteTask(task._id)}
                                                        className="btn light-blue darken-4" style={{margin: '4px'}}>
                                                    <i className="material-icons">delete</i>
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }


}

export default App;
