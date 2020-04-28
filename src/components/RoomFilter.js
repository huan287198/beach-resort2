import React from 'react'
import { useContext } from 'react'
import { RoomContext } from '../context'
import Title from './Title'
//get all unique values
const getUnique = (item, value) => {
    return [...new Set(item.map(item => item[value]))]
}
export default function RoomsFilter({ rooms }) {
    const context = useContext(RoomContext);
    const {
        handleChange,
        type,
        capacity,
        price,
        minPrice,
        maxPrice,
        minSize,
        maxSize,
        breakfast,
        pets
    } = context;
    //get unique types
    let types = getUnique(rooms, 'type');
    //get all
    types = ['all', ...types];
    //map to jsx
    types = types.map((item, index) => {
        return <option value={item} key={index}>{item}</option>
    })

    let people = getUnique(rooms, 'capacity')
    people = people.map((item, index) => {
        return <option key={index} value={item}>{item}</option>
    })



    return (
        <div className='filter-container'>
            <Title title='search rooms' />
            <form className='filter-form'>
                {/* {types} */}
                <div className='form-group'>
                    <label htmlFor='type'>room type</label>
                    <select name='type'
                        id='type'
                        value={type}
                        className='form-control'
                        onChange={handleChange}>
                        {types}
                    </select>
                </div>
                {/* {end of types} */}
                {/* {guests} */}
                <div className='form-group'>
                    <label htmlFor='capacity'>Guests</label>
                    <select name='capacity'
                        id='capacity'
                        value={capacity}
                        className='form-control'
                        onChange={handleChange}>
                        {people}
                    </select>
                </div>
                {/* {end of guest} */}
                {/* {price} */}
                <div className='form-group'>
                    <label htmlFor='price'>Price ${price}</label>
                    <input type='range' name='price'
                        min={minPrice} max={maxPrice}
                        id='price' value={price} onChange={handleChange}
                        className='form-control'></input>
                </div>
                {/* {end of price} */}
                {/* {size} */}
                <div className='form-group'>
                    <label htmlFor='size'>Size</label>
                    <div className='size-input'>
                        <input type='number' name='minSize'
                            id='size' value={minSize} onChange={handleChange}
                            className='size-input'></input>
                        <input type='number' name='maxSize'
                            id='size' value={maxSize} onChange={handleChange}
                            className='size-input'></input>
                    </div>
                </div>
                {/* {end of size} */}
                {/* {extras} */}
                <div className='form-group'>
                    <div className='single-extras'>
                        <input
                            type='checkbox'
                            name='breakfast'
                            id='breakfast'
                            onChange={handleChange}
                            checked={breakfast}
                        >
                        </input>
                        <label
                            htmlFor='breakfast'
                        >
                            breakfast
                        </label>
                    </div>
                    <div className='single-extras'>
                        <input
                            type='checkbox'
                            name='pets'
                            id='pets'
                            onChange={handleChange}
                            checked={pets}
                        >
                        </input>
                        <label
                            htmlFor='pets'
                        >
                            pets
                        </label>
                    </div>
                </div>
                {/* {end of extras} */}

            </form>
        </div>
    )
}
