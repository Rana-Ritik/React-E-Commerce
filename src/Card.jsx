import React from 'react'
import products from './data';

function Card({data}){
  return(
      <div style={{height:"800px",width:"20%",border:"2px solid black",borderRadius:"12px",backgroundColor:"lightsalmon",overflow:"hidden"}}>
           <img className='h-[150px] w-[30%]' src={data.thumbnail}></img>
          <h2>{data.title}</h2>
          <p>{data.description}</p>
          {
              data.reviews.map((review)=>{
                  return(
                      <div className='m-3 bg-green-200 p-3'> <p className='font-bold text-sm'>rating-{data.reviews[0].rating}</p>
                      <p className='font-bold text-base'>{data.reviews[0].comment}</p></div>
                   
                  )
              })
          }
         
      </div>
  )
}


function Application(){

    let productCard=[];
    // for( let i=0;i<products.length;i++){
    //   productCard.push( <Caard data={products[i]}></Caard>)
     
    // }
    products.map((ele)=>{
      productCard.push(<Card data={ele}></Card>)
    })
    
    return(
      <div style={{display:"flex",flexWrap:"wrap"}}>
    {
      productCard
    }
    
      </div>
    )
    
    }

export {Card,Application}
