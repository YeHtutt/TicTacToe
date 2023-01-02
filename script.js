let fields = [];

let currentShape ='cross';



function fillShape(id){
    if(currentShape == 'cross'){
       currentShape = 'circle'; 
    }else{
        currentShape = 'cross';
    }

    fields[id] = 'cross'; //Array wird hier mit den Strings gefüllt
    console.log(fields);
}