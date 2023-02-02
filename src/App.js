import React, { Component, Fragment } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";


import {
  changeFruitBox,
  changeBoxShelf,
  sortFruits
} from "./Components/actions/actionCreator";

import HTML5Backend from "react-dnd-html5-backend";
import lodash from "lodash";

import lemon from "./images/lemon.png";
import apple from "./images/apple.png";
import orang from "./images/orang.png";

import css from "./app.module.css";

class App extends Component {
  
 
  nowBox=(shelf)=>{
//console.log('shelf '+shelf)
let box_namber = [];
let boxs=[...this.props.boxs]
let fruits=[...this.props.fruits]
    boxs.forEach(function(box, i) {
      if (fruits.find(fruit => fruit.box === box && fruit.іshelf === shelf)) {
        return;
      } else {
        box_namber.push(box);
      }
    });
    if (box_namber[0]) {
      box_namber = box_namber[0];
        //console.log('новій номер минимальній' + box_namber)
      return box_namber;
    } else {
      console.log(" полка маленькая");
    }
  }

  changeBox = (box, outshelf, shelf) => {
    const { changeBoxShelf } = this.props;
    //console.log(box, outshelf, shelf)
    const now_box=this.nowBox(shelf)
    if (now_box){    // проверям что есть место на полке
      changeBoxShelf(box, outshelf, shelf,now_box);
    }
    
  };

  changeFruit = (id, box, shelf) => {
    //console.log('qqqqqq  '+id)
    const { changeFruitBox } = this.props;
    
    changeFruitBox(id, box, shelf);
  };
  

  sortFruits_isBox=(shelf)=>{
    //console.log('sortirovka')
    let new_fruit_arraynt = [];
let fruits=[...this.props.fruits]
      fruits.forEach((fruit, i) => {
        if (fruit.іshelf === shelf) {
          new_fruit_arraynt.push(fruit);
        }
      });
  
    
      const data = lodash.orderBy(new_fruit_arraynt, "fruit");
      let fruit = []; //смотрим какие фрукті входят в массив
  
      data.forEach(item => {
        //coртируем
        fruit.push(item.fruit);
        //console.log('После сотрировки  ' + item._id + '   ' + item.fruit)
      });
  
      let unique = [...new Set(fruit)]; // оставили массив фруктов в одном єкземпляре
      // console.log('1остались фрукті   ' + unique)
      new_fruit_arraynt = [];
      unique.forEach((item, i) => {
        data.forEach(fruit => {
          if (fruit.fruit === item) {
            let box = i + 1; //проверку на то что ящиков не должно бить больше 5 нужно сделать по надобности тк фруктов пока 3 вида
            let fr = { ...fruit, box };
            new_fruit_arraynt.push(fr); //сортируем по ящикам отдельно фрукті
          }
        });
      });
 //console.log(new_fruit_arraynt)
 const {sortFruits} =this.props
 sortFruits(new_fruit_arraynt)

  }


  showFruits(shelf, box) {
    // console.log('полка ' + shelf + ' ящик ' + box)
    return (
      this.props.fruits
      .filter(fruit => fruit.box === box && fruit.іshelf === shelf)
      .map(fr => {
         return (
       
          <Fruits 
            key={fr._id}
            id={fr._id}
            box={fr.box}
            size={fr.size}
            shelf={fr.ishelf}
            fruit={fr.fruit}
          ></Fruits>
          
         )
      }))
  }

  showBoxs(shelf) {
    return this.props.boxs.map(box =>
      this.props.fruits.some(
        fruit => fruit.box === box && fruit.іshelf === shelf
      ) ? (
        <Boxs key={box} box={box} shelf={shelf} changeFruit={this.changeFruit}>
          <div className={css.boxs_text}>ящик{box}</div>
          {this.showFruits(shelf, box)}{" "}
        </Boxs>
        
      ) : null
    );
  
  }

  showShelfs() {
    return this.props.shelfs.map(shelf => {
      return (
        <Fragment key={shelf}>
        <Shelfs  shelf={shelf} changeBox={this.changeBox}>
          <div className={css.shelf_text}>{shelf}</div>
          {this.showBoxs(shelf)}{" "}
        </Shelfs>
        <button 
        className={css.sort}
        onClick={this.sortFruits_isBox.bind(null,shelf)}
      >
        Відсортувати фрукти по ящиках на {shelf} полиці
      </button>
      </Fragment>
      );
    });
  }
  render() {
    return (
      <div className={css.app}>
        <div className={css.text}>Fruit shop</div>
        <DndProvider backend={HTML5Backend}>{this.showShelfs()}</DndProvider>
      </div>
    );
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);

function mapStateToProps(state) {
  return {
    fruits: state.fruits,
    boxs: state.boxs,
    shelfs: state.shelfs
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ changeFruitBox,changeBoxShelf ,sortFruits }, dispatch)
}

const Shelfs = ({ shelf, changeBox, children }) => {

  const [{ isOver }, drop] = useDrop({
    accept: "boxs",
    drop(item) {
      if (item.shelf !== shelf) {
        changeBox(item.box, item.shelf, shelf);
      }
    },
    collect: monitor => ({
      isOver: !!monitor.isOver()
    })
  });

  return (
    <div
      className={css.shelf}
      ref={drop}
      style={{
        position: "relative",
        width: "100%"
        // height: '100%',
      }}
    >
      {children}
      {isOver && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            height: "100%",
            width: "100%",
            zIndex: 1,
            opacity: 0.5,
            backgroundColor: "green"
          }}
        />
      )}
    </div>
  );
};

const Boxs = ({ box, changeFruit, shelf, children }) => {
  
  const [{ isOver }, drop] = useDrop({
    accept: "fruit",
    drop(item) {
      changeFruit(item.id, box, shelf);
    
    },
    collect: monitor => ({
      isOver: !!monitor.isOver()
    })
  });

  const [{ isDragging }, drag] = useDrag({
    item: { type: "boxs", box, shelf },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  });

  return (
    
    <div
      className={css.boxs_fruits}
      ref={drag}
      style={{
        opacity: isDragging ? 0.3 : 1,
        cursor: "cell"
      }}
    >
      <div
        className={css.boxs}
        ref={drop}
        style={{
          position: "relative",
          width: "100%",
          height: "100%"
        }}
      >
        {children}
        {isOver && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              height: "100%",
              width: "100%",
              zIndex: 1,
              opacity: 0.5,
              backgroundColor: "yellow"
            }}
          />
        )}
      </div>
    </div>
  );
};

const Fruits = ({ id, fruit, size, children }) => {

  const [{ isDragging }, drag] = useDrag({
    item: { type: "fruit", id: id },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  });

  
  let classes = css;
  if (size === "1") {
    classes = css.fruits1;
  } else if (size === "2") {
    classes = css.fruits2;
  } else {
    classes = css.fruits3;
  }

  return (
   
    <div
      className={classes}
      ref={drag}
      style={{
        opacity: isDragging ? 0 : 1,
        cursor: "move"
      }}
    >
      <Fruit fruit={fruit}>{children}</Fruit>
    </div>
  );
  //
};
const Fruit = param => {
  const srcUl = srcPar(param.fruit);
  return (
    
    <img className={css.fruit} src={srcUl} alt={param.fruit} />
    
  ) 
};
function srcPar(param) {
  switch (param) {
    case "apple":
      return apple;

    case "lemon":
      return lemon;

    case "orang":
      return orang;

    default:
      return param;
  }
}
