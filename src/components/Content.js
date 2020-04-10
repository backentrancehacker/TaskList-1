import React, {Component} from 'react';
import './Content.css';
import Header from './Header';
import Input from './Input.js'

const getTime = () => {
	const date = new Date();
	const hours = date.getHours();

	if(hours < 12){
		return 'Morning';
	}
	else if (hours >= 12 && hours < 17){
		return 'Afternoon';
	}
	else{
		return 'Evening';
	}
}
class Content extends Component{
	constructor(props){
		super(props);
		this.state = {
			tasks: JSON.parse(localStorage.getItem('tasks')) || []
		}
		this.add = this.add.bind(this);
		this.purge = this.purge.bind(this);

	}
	add(event){
		if(event.key !== 'Enter') return;
		let toAdd = document.getElementById('add').value;

		if(toAdd === '') return;
		this.setState((prevState) => {
			let array = prevState.tasks;
			array.push({
				name: toAdd,
				checked: false
			})
			document.getElementById('add').value = ''
			localStorage.setItem('tasks', JSON.stringify(array))
			return {
				tasks: array
			}
		})
	}
	purge(){
		localStorage.setItem('tasks', '[]')
		this.setState({tasks: []})
	}
	render(){
		let time = getTime();
		let tasks = this.state.tasks;
		let components = tasks.map((task) => {
			return  (<Input name={task.name} checked={task.checked} />)
		})
		return(
			<div>
				<main>
					<Header />
					<div>
						<h3 className="time">Good {time}!</h3>
						<input id="add" onKeyPress={this.add} placeholder="Input a Task" autoComplete="off" type="text"/>

						<div className="inputField">
							{components}
						</div>
						<button onClick={this.purge}>Purge Tasks</button>

					</div>
				</main>
			</div>
		)
	}
}

export default Content;