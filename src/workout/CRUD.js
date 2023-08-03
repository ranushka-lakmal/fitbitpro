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

const CRUD = () => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const[date, setDate] =  useState('')
    const[week, setWeek] =  useState('')
    const[excercisePattern, setPattern] =  useState('')
    const[duration, setDuration] =  useState('')
    const[burnedCalories, setCalories] =  useState('')
    const[height, setHeight] =  useState('')
    const[weight, setWeight] =  useState('')

    const[editId, setEditId] =  useState('')
    const[editDate, setEditDate] =  useState('')
    const[editWeek, setEditWeek] =  useState('')
    const[editExcercisePattern, setEditPattern] =  useState('')
    const[editDuration, setEditDuration] =  useState('')
    const[editBurnedCalories, setEditCalories] =  useState('')
    const[editHeight, setEditHeight] =  useState('')
    const[editWeight, setEditWeight] =  useState('')

    const workoutdata = [
        {
            workoutId : 1,
            Date : '2023/09/08',
            Week : 1,
            ExcercisePattern : 'test',
            Duration : '10 min',
            BurnedCalories : '250',
            Height : '5',
            Weight : '30'
        },
        {
            workoutId : 2,
            Date : '2023/09/08',
            Week : 1,
            ExcercisePattern : 'test11',
            Duration : '10 min',
            BurnedCalories : '250',
            Height : '5',
            Weight : '60'
        },
        {
            workoutId : 3,
            Date : '2023/09/08',
            Week : 1,
            ExcercisePattern : 'test22',
            Duration : '20 min',
            BurnedCalories : '350',
            Height : '6',
            Weight : '50'
        }
    ]

    const [data, setData] = useState([]);

    useEffect(() =>{
        getData();
    }, [])

    const getData = () =>{
        axios.get('https://localhost:7093/api/Workout')
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
        axios.get(`https://localhost:7093/api/Workout/${id}`)
        .then((result)=>{
            setEditDate(result.data.date);
            setEditWeek(result.data.week);
            setEditPattern(result.data.excercisePattern);
            setEditDuration(result.data.duration);
            setEditCalories(result.data.burnedCalories);
            setEditHeight(result.data.height);
            setEditWeight(result.data.weight);
            setEditId(id);
        })
        .catch((error)=>{
            console.log(error)
        })
    }
    const handleDelete =(id) =>{
        if(window.confirm("Are you sure you want to delete this workout?") == true){
            axios.delete(`https://localhost:7093/api/Workout/${id}`)
            .then((result)=>{
                if(result.status === 200){
                    toast.success('Workout has been deleted sucessfully');
                    getData();
                }
            })
            .catch((error)=>{
                toast.error(error);
           })
        }
    }

    const handleUpdate =() =>{
        const url = `https://localhost:7093/api/Workout/${editId}`;
        const data = {
            "workoutId":editId,
            "date": editDate,
            "week": editWeek,
            "excercisePattern": editExcercisePattern,
            "duration": editDuration,
            "burnedCalories": editBurnedCalories,
            "height": editHeight,
            "weight": editWeight
    
           }
           axios.put(url, data)
           .then((result)=>{
              handleClose();
               getData();
               clear();
               toast.success('Workout has been updated sucessfully');
           }).catch((error)=>{
                toast.error(error);
           })
       
    }

    const handleSave =(id) =>{
       const url = 'https://localhost:7093/api/Workout';
       const data = {
        "date": date,
        "week": week,
        "excercisePattern": excercisePattern,
        "duration": duration,
        "burnedCalories": burnedCalories,
        "height": height,
        "weight": weight

       }
       axios.post(url, data)
       .then((result)=>{
           getData();
           clear();
           toast.success('Workout has been added sucessfully');
       }).catch((error)=>{
            toast.error(error);
       })
    }

    const clear = () =>{
        setDate('');
        setWeek('');
        setPattern('');
        setDuration('');
        setCalories('');
        setHeight('');
        setWeight('');
        setEditDate('');
        setEditWeek('');
        setEditPattern('');
        setEditDuration('');
        setEditCalories('');
        setEditHeight('');
        setEditWeight('');
    }


    return(
        <Fragment>
            <ToastContainer/>
             <Container>
                <div style={textContainerStyle}>
                        <p style={textStyle2}>Workout</p>
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
                    <p style={textStyle}>Excercised Pattern</p>
                    <input type="text" className="form-control" placeholder="Enter Excercised Pattern"
                    value={excercisePattern} onChange={(e)=> setPattern(e.target.value)}
                    />
                    </Col><br></br>
                    <Col>
                    <p style={textStyle}>Duration</p>
                    <input type="text" className="form-control" placeholder="Enter Duration"
                    value={duration} onChange={(e)=> setDuration(e.target.value)}
                    />
                    </Col><br></br>
                    <Col>
                    <p style={textStyle}>Burned Calories</p>
                    <input type="text" className="form-control" placeholder="Enter Burned Calories"
                    value={burnedCalories} onChange={(e)=> setCalories(e.target.value)}
                    />
                    </Col><br></br>
                    <Col>
                    <p style={textStyle}>Height</p>
                    <input type="text" className="form-control" placeholder="Enter Height"
                    value={height} onChange={(e)=> setHeight(e.target.value)}
                    />
                    </Col><br></br>
                    <Col>
                    <p style={textStyle}>Weight</p>
                    <input type="text" className="form-control" placeholder="Enter Weight"
                    value={weight} onChange={(e)=> setWeight(e.target.value)}
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
          <th>ExcercisePattern</th>
          <th>Duration</th>
          <th>BurnedCalories</th>
          <th>Height</th>
          <th>Weight</th>
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
                            <td>{item.excercisePattern}</td>
                            <td>{item.duration}</td>
                            <td>{item.burnedCalories}</td>
                            <td>{item.height}</td>
                            <td>{item.weight}</td>
                            <td colSpan={2}>
                                <button className="btn btn-primary" onClick={()=> handleEdit(item.workoutId)}>Edit</button> &nbsp;
                                <button className="btn btn-danger" onClick={()=> handleDelete(item.workoutId)}>Delete</button>
                            </td>
                        </tr>
                    )
                })
                :
                'Wait Workouts are Loading..'
        }
        
        
      </tbody>
    </Table>

    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Workout Details</Modal.Title>
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
                    <p style={textStyle}>Excercised Pattern</p>
                    <input type="text" className="form-control" placeholder="Enter Excercised Pattern"
                    value={editExcercisePattern} onChange={(e)=> setEditPattern(e.target.value)}
                    />
                    </Row><br></br>
                    <Row>
                    <p style={textStyle}>Duration</p>
                    <input type="text" className="form-control" placeholder="Enter Duration"
                    value={editDuration} onChange={(e)=> setEditDuration(e.target.value)}
                    />
                    </Row><br></br>
                    <Row>
                    <p style={textStyle}>Burned Calories</p>
                    <input type="text" className="form-control" placeholder="Enter Burned Calories"
                    value={editBurnedCalories} onChange={(e)=> setEditCalories(e.target.value)}
                    />
                    </Row><br></br>
                    <Row>
                    <p style={textStyle}>Height</p>
                    <input type="text" className="form-control" placeholder="Enter Height"
                    value={editHeight} onChange={(e)=> setEditHeight(e.target.value)}
                    />
                    </Row><br></br>
                    <Row>
                    <p style={textStyle}>Weight</p>
                    <input type="text" className="form-control" placeholder="Enter Weight"
                    value={editWeight} onChange={(e)=> setEditWeight(e.target.value)}
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

export default CRUD;