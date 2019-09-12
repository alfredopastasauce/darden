import React, {Component} from 'react';
import { connect } from "react-redux";
import DateTimePicker from 'react-datetime-picker';
import { fetchUser, makeUserProfile } from "../../actions";
import { Redirect } from "react-router-dom";
import waiter from "../../images/waiter.png"
import pet from "../../images/pet.png"
import cleaning from "../../images/cleaning.png"
import mental from "../../images/mental.png"
import laundry from "../../images/laundry.png"
import personalTrainer from "../../images/personalTrainer.png"
import dishwasher from "../../images/dishwasher.png"
import babysitting from "../../images/babysitting.png"
import moving from "../../images/moving.png"

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentJob: [],
            aboutYou: '',
            description: 0,
            skills: 0,
            status: 0,
            agreement: 0,
            date: null,
            justSkills: [],
        };
    }
    componentDidMount() {
        this.props.fetchUser()
    }
    onChange = date => {
        this.setState({ date })
    }
    currentJob = []
    currentSkill = []
    height = {
        height: "210px"
    }
    mySkills=(e)=>{
        if(this.currentJob.length < 3 ){
            this.currentJob.push(e)
            this.currentSkill.push(e.skillName)
            this.setState({currentJob: this.currentJob})
            this.setState({justSkills: this.currentSkill})
        }else{
            alert("You've entered the maximum number of skills, delete some if you want to add more")
        }
        console.log(this.state)
    }
    displayMySkills (){
        return this.state.currentJob.map(job=>{
            return(
                <div className='col-md-4 container'>
                    <div className='card'>
                        <img style={this.height} className='card-img-top' src={job.img} alt=""/>
                    </div>
                    <p key = {job}><button key = {job} onClick ={()=>{this.updateSkills({job})}} className="btn btn-outline-danger">X</button>  {job.skillName}</p>
                </div>
            )
        })
    }
    updateSkills(e){
        for (let i = 0; i <= this.currentJob.length; i ++){

            if (this.currentJob[i]===e.job){
                this.currentJob.splice(i, 1)
                this.currentSkill.splice(i, 1)
                this.setState({currentJob : this.currentJob})
            }
        }
    }
    setSkill(){
        this.setState({skills: 1});
    }
    setInterview(){
        this.setState({status: 1})
    }
    setAgreement(){
        this.setState({agreement: 1})
        const data = {
                    id: this.props.user._id,
                    firstname: this.props.user.firstname,
                    lastname: this.props.user.lastname,
                    phone: this.props.user.phone,
                    address: this.props.user.place,
                    email: this.props.user.email,
                    lat: this.props.user.lat,
                    lng: this.props.user.lng,
                    skills: this.state.justSkills,
                    agreement: this.state.agreement,
                    status: this.state.status,
                    aboutYou: this.state.aboutYou,
                    date: this.state.date,
                }
        console.log(data)
        this.props.makeUserProfile(data)
    }
    render() {
        console.log(this.props.user)
        const length = {
            width: '450px'
        }
        const height = {
            height: "210px"
        }
        if(this.state.skills=== 0 && this.state.agreement === 0 && this.state.status === 0){
            return (
                <div className='container'>
                    <div className='container'>
                        <h1>Welcome, {this.props.user.firstname}</h1>
                        <br/>
                        <h2 className='ml-auto'>Select Your Skills:</h2>
                        <div className='row'>
                            <div className='col-md-8'>
                                <div className='row'>
                                    <div className='col-md-4 container'>
                                        <div className='card' onClick={()=>{this.mySkills( {skillName: "Cleaning", img: "/static/media/cleaning.f15b51f4.png"})}}>
                                            <img style={height} className='card-img-top' src={cleaning} alt=""/>
                                        </div>
                                        <h4>Cleaning</h4>
                                    </div>
                                    <div className='col-md-4 container'>
                                        <div className='card' onClick={()=>{this.mySkills({skillName: "Waiter", img: '/static/media/waiter.c926a04c.png'})}}>
                                            <img style={height} className='card-img-top' src={waiter} alt=""/>
                                        </div>
                                        <h4>Waiter</h4>
                                    </div>
                                    <div className='col-md-4 container'>
                                        <div className='card' onClick={()=>{this.mySkills({skillName: "DishWasher", img: "/static/media/dishwasher.9132659f.png"})}}>
                                            <img style={height} className='card-img-top' src={dishwasher} alt=""/>
                                        </div>
                                        <h4>DishWasher</h4>
                                    </div>
                                </div>
                                <br/>
                                <div className='row'>
                                    <div className='col-md-4 container'>
                                        <div className='card' onClick={()=>{this.mySkills({skillName: "Laundry", img: "/static/media/laundry.6f097540.png"})}}>
                                            <img style={height} className='card-img-top' src={laundry} alt=""/>
                                        </div>
                                        <h4>Laundry</h4>
                                    </div>
                                    <div className='col-md-4 container'>
                                        <div className='card' onClick={()=>{this.mySkills({skillName: "Baby Sitting", img: "/static/media/babysitting.ffb982a2.png"})}}>
                                            <img style={height} className='card-img-top' src={babysitting} alt=""/>
                                        </div>
                                        <h4>Baby Sitting</h4>
                                    </div>
                                    <div className='col-md-4 container'>
                                        <div className='card' onClick={()=>{this.mySkills({skillName: "Pet Sitting", img: "/static/media/pet.4013a9b6.png"})}}>
                                            <img style={height} className='card-img-top' src={pet} alt=""/>
                                        </div>
                                        <h4>Pet Sitting</h4>
                                    </div>
                                </div>
                                <br/>
                                <div className='row'>
                                    <div className='col-md-4 container'>
                                        <div className='card' onClick={()=>{this.mySkills({skillName: "Moving & Assembly", img: "/static/media/moving.27e02986.png"})}}>
                                            <img style={height} className='card-img-top' src={moving} alt=""/>
                                        </div>
                                        <h4>Moving & Assembly</h4>
                                    </div>
                                    <div className='col-md-4 container'>
                                        <div className='card' onClick={()=>{this.mySkills({skillName: "Personal Trainer", img: "/static/media/personalTrainer.4f8096f0.png"})}}>
                                            <img style={height} className='card-img-top' src={personalTrainer} alt=""/>
                                        </div>
                                        <h4>Personal Trainer</h4>
                                    </div>
                                    <div className='col-md-4 container'>
                                        <div className='card' onClick={()=>{this.mySkills({skillName: "Mental Health Drama Airout", img: "/static/media/mental.e3d4af1a.png"})}}>
                                            <img style={height} className='card-img-top' src={mental} alt=""/>
                                        </div>
                                        <h4>Mental Health Drama Airout</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <br/>
                        <br/>
                        <br/>
                        <h2>Your Skills:</h2>
                        <div className='row'>
                            <div className='col-md-8'>
                                <div className='row'>
                                    {this.displayMySkills()}
                                </div>
                            </div>
                        </div>
                    </div>
                    <br/>
                    <br/>
                    <div className='container'>
                        <form action="">
                            <label >
                                <h3>Upload an Image Of Yourself</h3>
                                <input
                                    type="file"
                                    className="form-control-file"
                                    onChange={(e) => { this.setState({profileImg: e.target.value})}}
                                />
                            </label>
                            <br/>
                            <br/>
                            <label >
                                <h3>About You</h3>
                                <textarea
                                    placeholder='Write a little bit about yourself'
                                    style = {length}
                                    className="form-control"
                                    rows='3'
                                    value = {this.state.aboutYou}
                                    onChange={(e) => { this.setState({ aboutYou: e.target.value })}}
                                />
                            </label>
                        </form>
                    </div>
                    <button className="btn btn-success" onClick={()=>{this.setSkill()}}>Next</button>
                </div>
            );
        }
        else if(this.state.skills===1 && this.state.agreement === 0 && this.state.status === 0){
            return(
                <div className='container'>
                    <br/>
                    <br/>
                    <h5>Set up an interview!</h5>
                    <br/>
                    <br/>
                    <div className='container'>
                        <DateTimePicker
                            onChange={this.onChange}
                            value={this.state.date}
                        />
                    </div>

                    <br/>
                    <button className="btn btn-success" onClick={()=>{this.setInterview()}}>Next</button>
                </div>
            )
        }
        else if(this.state.skills===1 && this.state.agreement === 0 && this.state.status === 1){
            return(
                <div className='container'>
                    <button className="btn btn-success" onClick={()=>{this.setAgreement()}}>Accept Terms and conditions</button>
                </div>
            )
        }
        else{
            return(
                <Redirect to='/dashboard'/>
            )
        }
    }
}

const mapStateToProps = (state) => ({
    user: state.fetchUserReducer.user
})

export default connect(mapStateToProps, { fetchUser, makeUserProfile })(Index);