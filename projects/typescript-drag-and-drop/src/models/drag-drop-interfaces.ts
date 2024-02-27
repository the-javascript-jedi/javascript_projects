// Drag and Drop Interfaces
//we need 2 event handlers
    export interface Draggable{
        dragStartHandler(event:DragEvent):void;
        dragEndHandler(event:DragEvent):void;
    }
    //three event handlers are required
    export interface DragTarget{
        dragOverHandler(event:DragEvent):void;
        dropHandler(event:DragEvent):void;
        dragLeaveHandler(event:DragEvent):void;
    }
