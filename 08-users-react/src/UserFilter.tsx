import React from "react";
import { UserStatus } from "./user.model";
import { FilterChangeListener, FilterType } from "./App";
import './userFilter.css'

interface UserFilterProps {
    filter: FilterType;
    onFilterChange : FilterChangeListener
}

export default function todoFilter({filter, onFilterChange}: UserFilterProps)
 {
    function handleFilterChange(event: React.ChangeEvent<HTMLSelectElement>){
        onFilterChange(event.target.value === '0'? undefined : parseInt(event.target.value))
    }

    return (
        <select className='UserFilter' value={filter} onChange={handleFilterChange}>
            <option value='0'>ALL</option>
            <option value={UserStatus.ACTIVE}>Active</option> 
            <option value={UserStatus.DEACTIVATED}>Deactivated</option>
            <option value={UserStatus.SUSPENDED}>Suspended</option>
        </select>
    )
}