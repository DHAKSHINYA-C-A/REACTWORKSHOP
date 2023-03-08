import React, { Component } from 'react'
import EmployeeService from '../services/EmployeeService';

class UpdateEmployeeComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            passengerName: '',
            trainName: '',
            seatNo: '',
            cost:'',
            img:''
        }
        this.changePassengerNameHandler = this.changePassengerNameHandler.bind(this);
        this.changeTrainNameHandler = this.changeTrainNameHandler.bind(this);
        this.changeSeatNoHandler = this.changeSeatNoHandler.bind(this);
        this.changeCostHandler = this.changeCostHandler.bind(this);
        this.changeImgHandler = this.changeImgHandler.bind(this);
        this.updateEmployee = this.updateEmployee.bind(this);
    }

    componentDidMount(){
        EmployeeService.getEmployeeById(this.state.id).then( (res) =>{
            let employee = res.data;
            this.setState({
                passengerName: employee.passengerName,
                trainName: employee.trainName,
                seatNo : employee.seatNo,
                cost : employee.cost,
                img : employee.img
            });
        });
    }

    updateEmployee = (e) => {
        e.preventDefault();
        let employee = {passengerName: this.state.passengerName, trainName: this.state.trainName, seatNo: this.state.seatNo, cost: this.state.cost,img: this.state.img};
        console.log('employee => ' + JSON.stringify(employee));
        console.log('id => ' + JSON.stringify(this.state.id));
        EmployeeService.updateEmployee(employee, this.state.id).then( res => {
            this.props.history.push('/employees');
        });
    }
    
    changePassengerNameHandler= (event) => {
        this.setState({passengerName: event.target.value});
    }

    changeTrainNameHandler= (event) => {
        this.setState({trainName: event.target.value});
    }

    changeSeatNoHandler= (event) => {
        this.setState({seatNo: event.target.value});
    }
    changeCostHandler= (event) => {
        this.setState({cost: event.target.value});
    }
    changeImgHandler= (event) => {
        this.setState({img: event.target.value});
    }

    cancel(){
        this.props.history.push('/employees');
    }

    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3 cardshadow3">
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> Passenger Name: </label>
                                            <input placeholder="Passenger Name" name="passengerName" className="form-control" 
                                                value={this.state.passengerName} onChange={this.changePassengerNameHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Train Name: </label>
                                            <input placeholder="Train Name" name="trainName" className="form-control" 
                                                value={this.state.trainName} onChange={this.changeTrainNameHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label>Seat No: </label>
                                            <input placeholder="Seat No" name="seatNo" className="form-control" 
                                                value={this.state.seatNo} onChange={this.changeSeatNoHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label>Cost: </label>
                                            <input placeholder="Cost" name="cost" className="form-control" 
                                                value={this.state.cost} onChange={this.changeCostHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Img Url: </label>
                                            <input placeholder="Img Url" name="Img" className="form-control" 
                                                value={this.state.img} onChange={this.changeImgHandler}/>
                                        </div>

                                        <button className="btn btn-success" onClick={this.updateEmployee}>Save</button>
                                        <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>
                                    </form>
                                </div>
                            </div>
                        </div>

                   </div>
            </div>
        )
    }
}

export default UpdateEmployeeComponent
