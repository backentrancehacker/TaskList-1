import React, {Component }from 'react';
import './Input.css';

class Input extends Component{
	constructor(props){
		super(props);
		this.state = {
			checked: this.props.checked
		}
		this.handle = this.handle.bind(this);
		this.update = this.update.bind(this);
	}
	update(){
		let inputs = document.querySelectorAll('input');

		let altered = [];
		for(let i = 1; i < inputs.length; i++){
			let input = inputs[i];
			altered.push({
				name: input.name,
				checked: input.checked
			})
		}
		localStorage.setItem('tasks', JSON.stringify(altered))
	}
	handle(){
		this.setState((prevState) => {
			let toSend = {}
			if(prevState.checked){
				toSend.checked = false
			}
			else toSend.checked = true;
			return toSend;
		})
		this.update()
	}
	render(){
		return(
			<div className="item">
				<label className="checkbox">
					<input name={this.props.name} onChange={this.handle} type="checkbox" checked={this.state.checked}/>
					<span>{this.props.name}</span>
				</label>
			</div>
		)
	}
}
export default Input;