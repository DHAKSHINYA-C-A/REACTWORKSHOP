import React, { Component } from 'react'
import EmployeeService from '../services/EmployeeService';
import { BsCheckCircleFill,BsFillXCircleFill } from "react-icons/bs";

class CreateEmployeeComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // step 2
            id: this.props.match.params.id,
            passengerName: '',
            trainName: '',
            seatNo: '',
            cost:'',
            img: ''
        }
        this.changePassengerNameHandler = this.changePassengerNameHandler.bind(this);
        this.changeTrainNameHandler = this.changeTrainNameHandler.bind(this);
        this.changeSeatNoHandler = this.changeSeatNoHandler.bind(this);
        this.changeCostHandler = this.changeCostHandler.bind(this);
        this.changeImgHandler = this.changeImgHandler.bind(this);
        this.saveOrUpdateEmployee = this.saveOrUpdateEmployee.bind(this);
    }

    // step 3
    componentDidMount(){

        // step 4
        if(this.state.id === '_add'){
            return
        }else{
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
    }
    saveOrUpdateEmployee = (e) => {
        e.preventDefault();
        let employee = {passengerName: this.state.passengerName, trainName: this.state.trainName, seatNo: this.state.seatNo,cost: this.state.cost, img: this.state.img};
        console.log('employee => ' + JSON.stringify(employee));

        // step 5
        if(this.state.id === '_add'){
            EmployeeService.createEmployee(employee).then(res =>{
                this.props.history.push('/employees');
            });
        }else{
            EmployeeService.updateEmployee(employee, this.state.id).then( res => {
                this.props.history.push('/employees');
            });
        }
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

    getTitle(){
        if(this.state.id === '_add'){
            return <h3 className="text-center p-4 m-2 text-info">Add</h3>
        }else{
            return <h3 className="text-center p-4 m-2 text-info">Update</h3>
        }
    }
    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3 cardshadow3">
                                
                                {
                                    this.getTitle()
                                }
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> Passenger Name: </label>
                                            <input placeholder="PassengerName" name="passengername" className="form-control" 
                                                value={this.state.passengername} onChange={this.changePassengerNameHandler} />
                                        </div>
                                        <div className = "form-group">
                                            <label> Train Name: </label>
                                            <input placeholder="Train Name" name="trainName" className="form-control" 
                                                value={this.state.trainName} onChange={this.changeTrainNameHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Seat No: </label>
                                            <input placeholder="seat No" name="seatNo" className="form-control" 
                                                value={this.state.seatNo} onChange={this.changeSeatNoHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Cost: </label>
                                            <input placeholder="cost" name="cost" className="form-control" 
                                                value={this.state.cost} onChange={this.changeCostHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Img Url: </label>
                                            <input placeholder="Img Url" name="img" className="form-control" 
                                                value={this.state.img} onChange={this.changeImgHandler}/>
                                        </div>
                                        <div className='btn-group'>
                                        <button className="btn btn-success w-auto" onClick={this.saveOrUpdateEmployee}><BsCheckCircleFill/> Save</button>
                                        <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}><BsFillXCircleFill/> Cancel</button>
                                        </div> 
                                    </form>
                                </div>
                            </div>
                        </div>

                   </div>
            </div>
        )
    }
}

export default CreateEmployeeComponent
