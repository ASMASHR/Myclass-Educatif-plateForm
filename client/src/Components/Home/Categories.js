import React from 'react'
import './Home.css'
function Categories({categorie, setCategorie}) {
    return (
        <div className="Categories">
            <div >
            <h4 className='CategoriesName'> Courses Categories</h4>
            </div>
            
                <div className="CategoriesDiv" style={{display:"flex",justifyContent:"space-between", flexWrap:"wrap"}}>
        <button onClick={()=>setCategorie("Science")}>
            <div className='cateCard'>
           Science 
            </div>
        </button>
        <button onClick={()=>setCategorie("Business")}>
            <div className='cateCard'>
                    Business
            </div> 
        </button>
        <button onClick={()=>setCategorie("Developement")}>
        <div className='cateCard'>
            Developement
            
        </div>
        </button>
        <button onClick={()=>setCategorie("Soft Skills")}>
        <div className='cateCard'>
            Soft Skills
        </div></button>
   </div>
        </div>

    )
}

export default Categories
