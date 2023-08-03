import React, {useState, useEffect, Fragment} from "react";
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CheatMealManage = () => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const[date, setDate] =  useState('')
    const[week, setWeek] =  useState('')
    const[mealTime, setMealTime] =  useState('')
    const[description, setDescription] =  useState('')

    const[editId, setEditId] =  useState('')
    const[editDate, setEditDate] =  useState('')
    const[editWeek, setEditWeek] =  useState('')
    const[editMealTime, setEditMealTime] =  useState('')
    const[editDescription, setEditDescription] =  useState('')
 
    const cheatMealData = [
        {
            workoutId : 1,
            Date : '2023/09/08',
            Week : 1,
            ExcercisePattern : 'test',
            Duration : '10 min',
        },
        {
            workoutId : 2,
            Date : '2023/09/08',
            Week : 1,
            ExcercisePattern : 'test11',
            Duration : '10 min',
        },
        {
            workoutId : 3,
            Date : '2023/09/08',
            Week : 1,
            ExcercisePattern : 'test22',
            Duration : '20 min',
        }
    ]

    const [data, setData] = useState([]);

    useEffect(() =>{
        getData();
    }, [])

    const getData = () =>{
        console.log("111");
        axios.get('https://localhost:7061/api/CheatMeal')
        .then((result)=>{
            console.log(result);
            setData(result.data)
        })
        .catch((error)=>{
            console.log(error)
        })
    }

    const handleEdit =(id) =>{
        handleShow();
        axios.get(`https://localhost:7061/api/CheatMeal/${id}`)
        .then((result)=>{
            setEditDate(result.data.date);
            setEditWeek(result.data.week);
            setEditMealTime(result.data.mealTime);
            setEditDescription(result.data.description);
            setEditId(id);
        })
        .catch((error)=>{
            console.log(error)
        })
    }
    const handleDelete =(id) =>{
        console.log('id', id);
        if(window.confirm("Are you  want to delete this Cheat Meal?") == true){
            axios.delete(`https://localhost:7061/api/CheatMeal/${id}`)
            .then((result)=>{
                if(result.status === 200){
                    toast.success('Cheat Meal has been deleted sucessfully');
                    getData();
                }
            })
            .catch((error)=>{
                toast.error(error);
           })
        }
    }

    const handleUpdate =() =>{
        const url = `https://localhost:7061/api/CheatMeal/${editId}`;
        const data = {
            "cheatmealId":editId,
            "date": editDate,
            "week": editWeek,
            "mealTime": editMealTime,
            "description": editDescription,
           }
           axios.put(url, data)
           .then((result)=>{
              handleClose();
               getData();
               clear();
               toast.success('Cheat Meal has been added updated sucessfully');
           }).catch((error)=>{
                toast.error(error);
           })
       
    }

    const handleSave =(id) =>{
       const url = 'https://localhost:7061/api/CheatMeal';
       const data = {
        "date": date,
        "week": week,
        "mealTime": mealTime,
        "description": description,

       }
       axios.post(url, data)
       .then((result)=>{
           getData();
           clear();
           toast.success('Cheat Meal has been added sucessfully');
       }).catch((error)=>{
            toast.error(error);
       })
    }

    const clear = () =>{
        setDate('');
        setWeek('');
        setMealTime('');
        setDescription('');
        setEditDate('');
        setEditWeek('');
        setEditMealTime('');
        setEditDescription('');
    }


    return(
        <Fragment>
            <ToastContainer/>
             <Container>
                <div style={textContainerStyle}>
                        <p style={textStyle2}>Cheat Meal</p>
                </div>
                <Col>
                    <Col>
                    <p style={textStyle}>Date</p>
                    <input type="text" className="form-control" placeholder="Enter Date"
                    value={date} onChange={(e)=> setDate(e.target.value)}
                    />
                    </Col><br></br>
                    <Col>
                    <p style={textStyle}>Week</p>
                    <input type="text" className="form-control" placeholder="Enter week"
                    value={week} onChange={(e)=> setWeek(e.target.value)}
                    />
                    </Col><br></br>
                    <Col>
                    <p style={textStyle}>Meal Time</p>
                    <input type="text" className="form-control" placeholder="Enter Meal Time"
                    value={mealTime} onChange={(e)=> setMealTime(e.target.value)}
                    />
                    </Col><br></br>
                    <Col>
                    <p style={textStyle}>Description</p>
                    <input type="text" className="form-control" placeholder="Enter Description"
                    value={description} onChange={(e)=> setDescription(e.target.value)}
                    />
                    </Col><br></br>
                    <Col>
                    <button className="btn btn-success" onClick={()=>handleSave()}>Submit</button>
                    </Col>

                </Col>
            </Container>
            <br></br>
              <Table striped bordered hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>Date</th>
          <th>Week</th>
          <th>MealTime</th>
          <th>Description</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {
            data && data.length > 0 ?
                data.map((item, index) => {
                    return(
                        <tr key={index}>
                            <td>{index+1}</td>
                            <td>{item.date}</td>
                            <td>{item.week}</td>
                            <td>{item.mealTime}</td>
                            <td>{item.description}</td>
                            <td colSpan={2}>
                                <button className="btn btn-primary" onClick={()=> handleEdit(item.cheatmealId)}>Edit</button> &nbsp;
                                <button className="btn btn-danger" onClick={()=> handleDelete(item.cheatmealId)}>Delete</button>
                            </td>
                        </tr>
                    )
                })
                :
                'Wait Cheat Meals are Loading..'
        }
        
        
      </tbody>
    </Table>

    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Cheat Meal Details</Modal.Title>
        </Modal.Header>
            <Modal.Body>
                    <Row>
                    <p style={textStyle}>Date</p>
                    <input type="text" className="form-control" placeholder="Enter Date"
                    value={editDate} onChange={(e)=> setEditDate(e.target.value)}
                    />
                    </Row><br></br>
                    <Row>
                    <p style={textStyle}>Week</p>
                    <input type="text" className="form-control" placeholder="Enter week"
                    value={editWeek} onChange={(e)=> setEditWeek(e.target.value)}
                    />
                    </Row><br></br>
                    <Row>
                    <p style={textStyle}>Meal Time</p>
                    <input type="text" className="form-control" placeholder="Enter Meal Time"
                    value={editMealTime} onChange={(e)=> setEditMealTime(e.target.value)}
                    />
                    </Row><br></br>
                    <Row>
                    <p style={textStyle}>Description</p>
                    <input type="text" className="form-control" placeholder="Enter Description"
                    value={editDescription} onChange={(e)=> setEditDescription(e.target.value)}
                    />
                    </Row>
            </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
        </Fragment>
    )
}


const textStyle = {
    fontSize: "16px",
    fontWeight: "bold",
    color: "black", 
};
const textContainerStyle = {
    textAlign: "center",
    margin: "10px",
  };
  
const textStyle2 = {
    fontSize: "30px",
    fontWeight: "bold",
    color: "Green", 
};

export default CheatMealManage;