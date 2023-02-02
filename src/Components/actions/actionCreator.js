import{CHANGE_FRUIT_BOX,CHANGE_BOX_SHELF,SORT_FRUITS_IS_BOX} from '../../constans'

export const changeFruitBox=(id,box,shelf)=>({
    
    type:CHANGE_FRUIT_BOX,
    id,
    box,
    shelf
})

export const changeBoxShelf=(box, outshelf, shelf,now_box)=>({
    type:CHANGE_BOX_SHELF,
    box, 
    outshelf, 
    shelf,
    now_box
})
export const sortFruits=(new_fruit_arraynt)=>({
    type: SORT_FRUITS_IS_BOX,
    new_fruit_arraynt
})
