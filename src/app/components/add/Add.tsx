"use client"

import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from 'react-bootstrap/Button';
import { HiOutlineDocumentAdd, HiCheckCircle, HiXCircle } from "react-icons/hi";
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { mongoObject } from "@/app/interface/interface";

interface Props {
  tasks: mongoObject[];
  setTasks: any;
  setFilterPr: any;
  setFilterDate: any;
  setSort: any;
}

export default function Add(props: Props) {
  const { tasks, setTasks, setFilterPr, setFilterDate, setSort } = props;
  const [name, setName] = useState<string>("")
  const [due, setDue] = useState<string>("")
  const [prior, setPrior] = useState<number>(3)
  const [des, setDes] = useState<string>("")


  const [validName, setValidName] = useState<boolean>(true)
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const resetAll = () => {
    setFilterPr([]);
    setFilterDate("");
    setSort([0, 0]);
  };

  return (
    <>
      <Button 
        variant="primary" 
        className="d-flex align-items-center justify-content-center"
        style={{ fontSize: "16px", color:"white", backgroundColor:"#00684A", borderColor: "#00684A" }}
        onClick={handleShow}
      >
        Add&nbsp;<HiOutlineDocumentAdd />
      </Button>

      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title style={{ fontSize: "28px", fontWeight: "700" }}>
            Add task
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" style={{ width: "40%"}} controlId="exampleForm.ControlInput1">
              <Form.Label>Task name ({name.length}/30)</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Enter task name" 
                required={true}
                value={name}
                onChange={(e) => {
                  const input = e.target.value;
                  if (input.length <=  30) setName(e.target.value)
                }}  
              />
              {
                name.length !== 0 &&
                <Form.Text id="passwordHelpBlock" className="d-flex align-items-center gx-2 mt-2" style={{ fontSize: "13px"}}>
                  {
                    tasks.some(obj => obj.name === name) ?                   
                    <>
                      <HiXCircle className="text-danger"/>
                      <p className="text-danger m-0 ms-1"> Task name already exists</p>
                    </>
                      :
                    <>
                    <HiCheckCircle className="text-success" />
                    <p className="text-success m-0 ms-1">Valid task name</p>
                  </>
                  }
                </Form.Text>
              }
            </Form.Group>
            <Form.Group>
              <Row className="mb-4">
                <Col style={{ borderRight: "1px solid #dee2e6"}}>
                  <Form.Label>Task due date</Form.Label>
                  <Form.Control 
                    type="date" 
                    placeholder="Normal text" 
                    value={due}
                    onChange={(e)=> {
                      setDue(e.target.value)
                    }}
                  />
                  <Button
                    variant="link"
                    className="px-0 py-2 pb-0"
                    style={{ fontSize: "13px" }}
                    onClick={() => {
                      setDue("yyyy-mm-dd")
                      setDue("")
                    }}
                  >
                    Clear this choice
                  </Button>
                </Col>
                <Col>
                  <Form.Label>Task priority</Form.Label>
                  <Form.Check 
                    type="radio"
                    name="group-1"
                    id={`default-radio11`}
                    label={`high`}
                    checked={prior === 3 ? true : false}
                    onChange={()=>setPrior(3)}
                  />
                  <Form.Check 
                    type="radio"
                    name="group-1"
                    id={`default-radio21`}
                    label={`medium`}
                    checked={prior === 2 ? true : false}
                    onChange={()=>setPrior(2)}
                    />
                  <Form.Check 
                    type="radio"
                    name="group-1"
                    id={`default-radio31`}
                    label={`low`}
                    checked={prior === 1 ? true : false}
                    onChange={()=>setPrior(1)}
                  /> 
                </Col>
              </Row>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>Task description ({des.length}/500)</Form.Label>
              <Form.Control
                as="textarea" 
                rows={3} 
                placeholder="Enter task description (Optional)"
                value={des}
                onChange={(e) => {
                  const input = e.target.value;
                  if (input.length <=  500) setDes(e.target.value)
                }}  
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button 
            variant="danger" 
            disabled={name === "" && due === "" && prior === 3 && des === ""}
            onClick={() => {
              setName("")
              setDue("")
              setPrior(3)
              setDes("")
            }}
          >
            Clear
          </Button>
          <Button 
            variant="primary" 
            disabled={name === "" || due === "" || tasks.some(obj => obj.name === name)}
            onClick={async() => {
              const response = await fetch('/api', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, due, prior, des })
              });
              const { tasks } = await response.json();
              setTasks(tasks)
              handleClose();
              resetAll();
            }}
          >
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
