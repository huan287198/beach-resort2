import React, { Component } from 'react'
import items from './data'
const RoomContext = React.createContext();

class RoomProvider extends Component {
    state = {
        rooms: [],
        sortedRooms: [],
        featuredRooms: [],
        loading: true,
        type: 'all',
        capacity: 1,
        price: 0,
        minPrice: 0,
        maxPrice: 0,
        minSize: 0,
        maxSize: 0,
        breakfast: false,
        pets: false
    }
    //getData
    componentDidMount() {
        let rooms = this.formatData(items);
        //console.log(rooms);
        let featuredRooms = rooms.filter(room => room.featured === true);
        let maxPrice = Math.max(...rooms.map(item => item.price));
        let maxSize = Math.max(...rooms.map(item => item.size));

        this.setState(state => {
            return {
                rooms,
                featuredRooms,
                sortedRooms: rooms,
                loading: false,
                price: maxPrice,
                maxPrice,
                maxSize
            }
        })
    }
    formatData(items) {
        let tempItems = items.map(item => {
            let id = item.sys.id;
            let images = item.fields.images.map(image =>
                image.fields.file.url
            );
            let room = { ...item.fields, images, id }
            return room;
        })
        return tempItems;
    }

    getRoom = (slug) => {
        let tempRooms = [...this.state.rooms];
        const room = tempRooms.find(room => room.slug === slug);
        return room
    }
    handleChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ?
            target.checked : target.value;
        const name = event.target.name;
        this.setState({
            [name]: value
        },
            this.filterRooms
        )
    }
    filterRooms = () => {
        let {
            rooms, type, capacity, price, minSize, maxSize,
            breakfast, pets
        } = this.state;
        //get all room
        let tempRooms = [...rooms];
        //tranform value
        capacity = parseInt(capacity);
        price = parseInt(price);


        //filter bay types
        if (type !== 'all') {
            tempRooms = tempRooms.filter(room => {
                return room.type === type
            })
        }
        //filter by capacity
        if (capacity !== 1) {
            tempRooms = tempRooms.filter(room => {
                return room.capacity >= capacity
            })
        }
        //filter by price
        tempRooms = tempRooms.filter(room =>{
            return room.price <= price
        })
        //filter by size
        tempRooms = tempRooms.filter(room =>{
            return room.size <=maxSize && room.size >=minSize
        })
        //filter by breakfast
        if(breakfast){
            tempRooms = tempRooms.filter(room=>{
                return room.breakfast === true;
            })
        }
        //filter by pets
        if(pets){
            tempRooms = tempRooms.filter(room=>{
                return room.pets === true;
            })
        }
        //change state
        this.setState({
            sortedRooms: tempRooms
        })

    }
    render() {
        return (
            <RoomContext.Provider value={{
                ...this.state,
                getRoom: this.getRoom,
                handleChange: this.handleChange,
                filterRooms: this.filterRooms
            }}>
                {this.props.children}
            </RoomContext.Provider>
        )
    }
}

const RoomConsumer = RoomContext.Consumer;
export function withRoomConsumer(Component) {
    return function ConsumerWapper(props) {
        return <RoomConsumer>
            {
                value => {
                    return <Component {...props} context={value} />
                }
            }
        </RoomConsumer>
    }
}
export { RoomProvider, RoomConsumer, RoomContext }