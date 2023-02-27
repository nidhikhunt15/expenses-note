import React, { useState, useRef, useEffect } from 'react'

const Expenses = () => {

    const [note, setNote] = useState({ category: "", dateTime: "", description: "", amount: "" })
    
    const [allNote, setAllNote] = useState([])
    const [isEdit, setIsEdit] = useState(false)

    const ref = useRef(null)
    const refClose = useRef(null)

    const handleChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    const addData = (e) => {
        ref.current.click();
        setNote({ category: "", dateTime: "", description: "", amount: "" })
        setIsEdit(false)
    }

    const updateData = (currentValue,index)=>{
         ref.current.click();
         setNote({index, category:currentValue.category, dateTime:currentValue.dateTime, description:currentValue.description, amount:currentValue.amount})
         setIsEdit(true)
    }

    const deleteData = (index)=>{
       allNote.splice(index,1)
       localStorage.setItem('ExpNote',JSON.stringify(allNote))
       setAllNote (JSON.parse(localStorage.getItem('ExpNote')))
    }

    const saveData = ()=>{
        if(isEdit){
            let update = (JSON.parse(localStorage.getItem('ExpNote')))
            for (let index = 0; index < update.length; index++) {
                if(index===note.index){
                    update[index].category = note.category;
                    update[index].dateTime = note.dateTime;
                    update[index].description = note.description;
                    update[index].amount = note.amount;
                }
       localStorage.setItem('ExpNote',JSON.stringify(update))
       setAllNote(update)
         } 
         }
         else{
            setNote({ category: "", dateTime: "", description: "" , amount:"" })
            let details = [...allNote, note];
            localStorage.setItem('ExpNote', JSON.stringify(details));
            setAllNote(details)
         }
        ref.current.click()
    }

    const getData=()=>{
        const lsData =JSON.parse(localStorage.getItem('ExpNote'))
        if(lsData!= null){
            setAllNote(lsData)
        }
    }

    useEffect(()=>{
      getData()
    },[])

    return (
        <div>
            <div className="container">
                <h1 className='text-center my-3'>Expenses Note</h1>
                <button type='button' className='btn btn-warning my-2' onClick={addData}><i className="fa-solid fa-plus"></i></button>
                <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Launch demo modal
                </button>

                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">{isEdit?"Update Data":"Add Data"}</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="mb-3">
                                        <label htmlFor="category" className="form-label"> <b>Category:</b> </label>
                                        <select name="category" id="category" className='form-select' value={note.category} onChange=
                                            {handleChange}>
                                            <option value="" disabled>Select Category</option>
                                            <option value="Shopping">Shopping</option>
                                            <option value="Bill">Bill</option>
                                            <option value=" Transport">Transport</option>
                                            <option value="Entertainment">Entertainment</option>
                                            <option value="Rent">Rent</option>
                                            <option value="Fuel">Fuel</option>
                                            <option value="Insurance">Insurance</option>
                                            <option value="Sports">Sports</option>
                                            <option value="Kids">Kids</option>
                                        </select>
                                    </div>

                                    <div className='mb-3'>
                                        <label htmlFor="birthdaytime"><b>Date and Time:</b> </label>
                                        <input type="datetime-local" id="dateTime" name="dateTime" value={note.dateTime} className='form-control my-2' onChange={handleChange} />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="description" className="form-label"><b>Description:</b> </label>
                                        <input type="text" className="form-control" id="description" name='description' value={note.description} onChange={handleChange} />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="amount" className="form-label"><b>Amount:</b> </label>
                                        <input type="number" className="form-control" id="amount" name='amount' value={note.amount} onChange={handleChange} />
                                    </div>
                                </form>

                            </div>
                            <div className="modal-footer">
                                <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary"  onClick={saveData} disabled={note.category==="" ||note.dateTime==="" || note.description==="" ||note.amount===""} >{isEdit?"Update Data":"Add Data"}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container">
                <h1>Details</h1>
                <div className="row">
                    {allNote.map((exp, index) => {
                         return <div className="col-lg-4 col-md-6 col-sm-1 my-2" key={index}>
                         <div className="card">
                            <div className="card-body">
                                <div className='d-flex justify-content-between'>
                               <h5 className="card-title">Category: {exp.category}</h5>
                                <div>
                                    <i className="fa-solid fa-file-pen mx-2 text-success fs-4" style={{ cursor: "pointer" }} onClick={() => updateData(exp, index)}></i>
                                    <i className="fa-solid fa-trash text-danger fs-4" style={{ cursor: "pointer" }} onClick={() => deleteData(index)}></i>
                                </div>
                                </div>
                                <h6 className="card-subtitle mb-2 text-muted">Date and Time: {exp.dateTime}</h6>
                                <p className="card-text"> <b>Description:</b> {exp.description}</p>
                                <p className="card-text"><b>Amount:</b>  {exp.amount}</p>

                            </div>
                            </div>
                        </div>
                    })}
                </div>
            </div>
        </div>
    )
}

export default Expenses
