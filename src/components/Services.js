import React, { Component } from 'react'
import {DiNodejsSmall,DiReact,DiMongodb,DiJavascript} from 'react-icons/di'
import Title from './Title'
export default class Services extends Component {
    constructor(props){
        super(props);
        this.state={
            services:[
                {
                    icon:<DiJavascript/>,
                    title:'javascript',
                    info: 'js'
                },
                {
                    icon:<DiMongodb/>,
                    title:'mongodb',
                    info: 'DB'
                },
                {
                    icon:<DiNodejsSmall/>,
                    title:'nodejs',
                    info: 'Node'
                },
                {
                    icon:<DiReact/>,
                    title:'React',
                    info: 'React js'
                }
            ]
            
        }
    }
    render() {
        return (
            <section className='services'>
                <Title title='services'></Title>
                <div className='services-center'>
                    {
                        this.state.services.map((item,index)=>{
                            return <article key={index} className="service">
                                <span>{item.icon}</span>
                                <h6>{item.title}</h6>
                                <p>{item.info}</p>
                            </article>
                        })
                    }
                </div>

            </section>
            
        )
    }
}
