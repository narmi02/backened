
import { useState } from "react";
import notecontext from "./Notecontext";

const Notestate=(props)=>{
    const noteinitial=
        [
            {
              "_id": "65c4d699f42f6f7a34538f14",
              "userid": "65c4cb871a7f22fa3f41a057",
              "title": "doosri  shayari 3",
              "desc": "dekhu toh hoor ho tum,sochu toh alfaz ho tum",
              "tag": "shayari 3",
              "date": "2024-02-08T13:26:49.063Z",
              "__v": 0
            }
    ]
    const[notes,setnotes]=useState(noteinitial)

    return(
        <notecontext.Provider value={{notes,setnotes}}>
            {props.children}
        </notecontext.Provider>
    )
}

export default Notestate