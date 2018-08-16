import React from 'react';
import DataItem from './data_list_item';

const DataList = (props) => {
    
    const items = props.data.map((item) => {

        // I am aware that math.random is probably not the best key ever
        return (
           <DataItem key={Math.random()} item={item}/>
        )
    });

    return (
        <div>
            {props.children}
            {items}
        </div>
    )
}

export default DataList;