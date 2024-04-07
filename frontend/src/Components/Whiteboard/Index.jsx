import React, { useEffect, useState , useLayoutEffect} from 'react'
import rough from 'roughjs';
import { RoughCanvas } from 'roughjs/bin/canvas';

const roughGenerator=rough.generator();


const WhiteBoard = ({canvasRef, contextsRef,elements, setElements, tool, color}) => {

    const [isDrawing, setIsDrawing]=useState(false);

    useEffect(()=>{
        const canvas=canvasRef.current;
        canvas.height=window.innerHeight*2;
        canvas.width=window.innerWidth*2;
        const contexts=canvas.getContext("2d");
             
        contexts.strokeStyle=color;
        contexts.lineWidth=2;
        contexts.lineCap="round";

        contextsRef.current=contexts;

    },[]);

    useEffect(()=>{
        contextsRef.current.strokeStyle=color;
    },[color])

    useLayoutEffect(() => {
        const roughCanvas = rough.canvas(canvasRef.current);

        if(elements.length>0){
            contextsRef.current.clearRect(
                0,0,canvasRef.current.width,canvasRef.current.height
            );
        }
        
        elements.forEach((element) => {
            if(element.type==="rectangle"){
                roughCanvas.draw(roughGenerator.rectangle(element.offsetX,element.offsetY,element.width,element.height, {stroke:element.stroke, strokeWidth:5, roughness:0}));
            }
            else if (element.type === "line") {
            roughCanvas.draw(
              roughGenerator.line(element.offsetX, element.offsetY, element.width, element.height,  {stroke:element.stroke, strokeWidth:5, roughness:0})
            );
          } else if (element.type === "pencil") {
            roughCanvas.linearPath(element.path,  {stroke:element.stroke, strokeWidth:5, roughness:0});
          }
        });
        
      }, [elements]);
  

    
    const handleMouseDown = (e) =>{
       // console.log("Mouse down", e)
       const {offsetX, offsetY }=e.nativeEvent;

       if(tool==="pencil"){
        setElements((prevElements)=>[
            ...prevElements,{type:"pencil", offsetX,offsetY, path:[[offsetX,offsetY]],  stroke:color,},
           ]);
        } else if(tool==="line"){
            setElements((prevElements)=>[
                ...prevElements,
                {
                    type:"line",
                    offsetX,
                    offsetY,
                    width:offsetX,
                    height:offsetY,
                    stroke:color,
                },
            ]);
        }
       else if(tool==="rectangle"){
        setElements((prevElements)=>[...prevElements,{
            type:"rectangle",
            offsetX,
            offsetY,
            width:0,
            height:0,
            stroke:color,
        }])
       }
       setIsDrawing(true);
    }

    const handleMouseMove = (e)=>{
       // console.log("mouse move", e)
       const {offsetX, offsetY }=e.nativeEvent;
       
       if(isDrawing){
         if(tool==="pencil"){
            const {path}=elements[elements.length-1];
            const newPath=[...path, [offsetX,offsetY]];
            setElements((prevElements)=>
            prevElements.map((ele,index)=>{
                if(index===elements.length-1){
                    return{
                        ...ele,
                        path:newPath,
                    };
                }
                else{
                    return ele;
                }
            })
        );
        } 
        else if(tool==="line"){
            setElements((prevElements)=>prevElements.map((ele,index)=>{
                if(index===elements.length-1){
                    return{
                        ...ele, width:offsetX,height:offsetY,
                    };
                } else{
                    return ele;
                }
            }))
        }
        else if (tool="rectangle"){
            setElements((prevElements)=>prevElements.map((ele,index)=>{
                if(index===elements.length-1){
                    return{
                        ...ele,width:offsetX-ele.offsetX,height:offsetY-ele.offsetY,
                    };
                }else{
                    return ele;
                }
            }))
        }
       }
    }

    const handleMouseUp = (e)=>{
        //console.log("Mouse up", e)
        setIsDrawing(false)
    }

    
    
  return (
    <div onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} className='border border-dark border-3 h-100 w-100 overflow-hidden'>
    
    <canvas ref={canvasRef}></canvas>
    </div>
    
  )
}

export default WhiteBoard;
