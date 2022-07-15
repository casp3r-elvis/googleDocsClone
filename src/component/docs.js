import React,{useState, useEffect, useRef} from 'react'
import Model from './Model'
import { addDoc, collection, onSnapshot } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

//main component
const Docs = ({database}) => {
    const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const[title, setTitle] = useState('');
  const collectionRef = collection(database, 'docsData')
  const isMounted = useRef()
  const [docsData, setDocsData] = useState([])
  let navigate = useNavigate();
  
  //function to get id from each docs.
  
  
//read data from firebase database


    //handle input data
  const addData=()=> {
        addDoc(collectionRef, {
            title: title,
            docsDesc:''
        })
        .then(() => {
            alert('Data Added')
           handleClose();
        })
        .catch(() => {
            alert('Cannot add data')
        })
  }
     const getData = () => {
        onSnapshot(collectionRef, (data) => {
            setDocsData(data.docs.map((doc) => {
                return { ...doc.data(), id: doc.id }
            }))
        })
    }

    const getID = (id) => {
        navigate(`/editDocs/${id}`)
    }
    useEffect(() => {
        if (isMounted.current) {
            return
        }

        isMounted.current = true;
        getData()
    })
//return data to app.js
  return (
    <div className='docs-main'>
    
        <h1>Google Docs Clone</h1>
        <button className="add-docs"
        onClick={handleOpen}>
            Add a Document
        </button>
        <Model open={open}
        setOpen={setOpen}
        title={title}
        setTitle={setTitle}
        addData={addData}
        />
      <div className='grid-main'> 
          {docsData.map((doc)=>{
            return(
                <div className='grid-child' onClick={()=>getID(doc.id)}>
                    <p>{doc.title}</p>
                </div>
            )
        })}</div>     
    </div>
    
  )
}
export default Docs;