import {
  CHANGE_FRUIT_BOX,
  CHANGE_BOX_SHELF,
  SORT_FRUITS_IS_BOX
} from "../../constans";
import { compose } from "redux";

const FRUITS = [
  { _id: 1, fruit: "apple", іshelf: "1", box: 1, size: "2" },
  { _id: 2, fruit: "apple", іshelf: "2", box: 2, size: "1" },
  { _id: 3, fruit: "lemon", іshelf: "3", box: 2, size: "2" },
  { _id: 4, fruit: "orang", іshelf: "1", box: 1, size: "3" },
  { _id: 5, fruit: "lemon", іshelf: "2", box: 2, size: "2" },
  { _id: 6, fruit: "lemon", іshelf: "1", box: 3, size: "1" },
  { _id: 7, fruit: "orang", іshelf: "2", box: 2, size: "2" },
  { _id: 8, fruit: "apple", іshelf: "2", box: 2, size: "3" },
  { _id: 9, fruit: "apple", іshelf: "3", box: 1, size: "2" },
  { _id: 10, fruit: "orang", іshelf: "1", box: 1, size: "1" },
  { _id: 11, fruit: "lemon", іshelf: "2", box: 2, size: "2" },
  { _id: 12, fruit: "lemon", іshelf: "3", box: 3, size: "3" },
  { _id: 13, fruit: "apple", іshelf: "3", box: 3, size: "2" },
  { _id: 14, fruit: "apple", іshelf: "2", box: 2, size: "1" },
  { _id: 15, fruit: "orang", іshelf: "2", box: 1, size: "2" },
  { _id: 16, fruit: "lemon", іshelf: "1", box: 2, size: "3" },
  { _id: 17, fruit: "orang", іshelf: "1", box: 1, size: "2" },
  { _id: 18, fruit: "orang", іshelf: "1", box: 1, size: "3" },
  { _id: 19, fruit: "lemon", іshelf: "3", box: 3, size: "2" },
  { _id: 20, fruit: "lemon", іshelf: "2", box: 2, size: "1" },
  { _id: 21, fruit: "orang", іshelf: "1", box: 2, size: "2" },
  { _id: 22, fruit: "apple", іshelf: "3", box: 2, size: "3" },
  { _id: 23, fruit: "apple", іshelf: "1", box: 2, size: "2" },
  { _id: 24, fruit: "apple", іshelf: "2", box: 1, size: "1" },
  { _id: 25, fruit: "lemon", іshelf: "3", box: 1, size: "2" },
  { _id: 26, fruit: "orang", іshelf: "1", box: 3, size: "3" },
  { _id: 27, fruit: "lemon", іshelf: "2", box: 1, size: "2" },
  { _id: 28, fruit: "orang", іshelf: "3", box: 2, size: "2" },
  { _id: 29, fruit: "apple", іshelf: "3", box: 3, size: "2" },
  { _id: 30, fruit: "orang", іshelf: "1", box: 3, size: "1" },
  { _id: 31, fruit: "lemon", іshelf: "3", box: 2, size: "2" },
  { _id: 32, fruit: "lemon", іshelf: "1", box: 1, size: "3" },
  { _id: 33, fruit: "apple", іshelf: "2", box: 2, size: "2" },
  { _id: 34, fruit: "apple", іshelf: "3", box: 2, size: "1" },
  { _id: 35, fruit: "orang", іshelf: "2", box: 2, size: "2" }
];

const fruits = (state = FRUITS, action) => {
  switch (action.type) {
    case CHANGE_FRUIT_BOX: {
      const states = [...state];
      states.splice(action.id - 1, 1, {
        _id: action.id,
        fruit: states[action.id - 1].fruit,
        іshelf: action.shelf,
        box: action.box,
        size: states[action.id - 1].size
      });
      return states;
    }
    case CHANGE_BOX_SHELF: {
      // находи свободній номер ящика на полке куда перемещаем ящик
      const states = [...state];
      states.map(st => {
        if (st.box === action.box && st.іshelf === action.outshelf) {
          states.splice(st._id - 1, 1, {
            _id: st._id,
            fruit: st.fruit,
            іshelf: action.shelf,
            box: action.now_box,
            size: st.size
          });
        }
      });
      return states;
    }
    case SORT_FRUITS_IS_BOX: {
      const states = [...state];
      action.new_fruit_arraynt.forEach(fruit =>
        states.find(fr => {
          if (fr._id === fruit._id) {
            states.splice(fr._id - 1, 1, {
              _id: fr._id,
              fruit: fr.fruit,
              іshelf: fruit.іshelf,
              box: fruit.box,
              size: fr.size
            });
          }
        })
      );
      return states;
    }
    default:
      return state;
  }
};
export default fruits;
