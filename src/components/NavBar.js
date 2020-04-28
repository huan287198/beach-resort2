import React, { Component } from 'react'
import {IoMdMenu} from 'react-icons/io'
import logo from '../images/logo.svg'
import {Link} from 'react-router-dom'

export default class NavBar extends Component {
    constructor(props){
        super(props);
        this.state={
            isOpen:false
        }
    }
    handleToggle() {
        this.setState(state=>{
            return {
                isOpen:!this.state.isOpen
            }
        })
    }
    render() {
        return (
            <nav className="navbar">
                <div className="nav-center">
                    <div className="nav-header">
                        <Link to='/'>
                            <img 
                            src={logo} 
                            alt="Resort">
                            </img>
                        </Link>
                        <button 
                        type='button' 
                        className='nav-btn' 
                        onClick={this.handleToggle.bind(this)}>
                            <IoMdMenu className="nav-icon"/>
                        </button>
                    </div>
                    <ul className={this.state.isOpen?'nav-links show-nav':'nav-links'}>
                        <li>
                            <Link to='/'>Home</Link>
                        </li>
                        <li>
                            <Link to='/rooms'>Rooms</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}
