"use client"

import { mongoObject } from "@/app/interface/interface";

import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Accordion from 'react-bootstrap/Accordion';
import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { HiOutlineTrash, HiCheckCircle, HiXCircle, HiOutlinePencilAlt, HiExclamationCircle } from "react-icons/hi";
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


const renderTooltip = (props:any) => (
  <Tooltip id="button-tooltip" {...props}>
    Click me to view description!
  </Tooltip>
);

function CustomToggle({ children, eventKey } : {children: React.ReactNode, eventKey: string}) {
  const decoratedOnClick = useAccordionButton(eventKey);
  return (
    <div
      style={{ cursor: "pointer"}}
      onClick={decoratedOnClick}
    >
      {children}
    </div>
  );
}

function coverDate(inputDate: string): string {
  const [year, month, day] = inputDate.split("-");
  return `${day}/${month}/${year}`;
}

interface Props {
  key: number;
  id: string;
  _name: string;
  _due: string;
  _prior: number;
  _des: string;
  tasks: mongoObject[];
  setTasks: any;
  setInput: any;
  setFilterPr: any;
  setFilterDate: any;
  setSort: any;
}

export default function Task(props: Props) {
  const { id, _name, _due, _prior, _des, tasks, setTasks, setInput, setFilterDate, setFilterPr, setSort } = props;
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [name, setName] = useState<string>(_name)
  const [due, setDue] = useState<string>(_due)
  const [prior, setPrior] = useState<number>(_prior)
  const [des, setDes] = useState<string>(_des)

  useEffect(() => {
    setName(_name)
    setDue(_due)
    setPrior(_prior)
    setDes(_des)
  }, [_name, _due, _prior, _des])

  const resetAll = () => {
    setFilterPr([]);
    setFilterDate("");
    setSort([0, 0]);
  };

  return (
    <>
      <Accordion defaultActiveKey="0">
        <Card className="mb-2">
          <Card.Header className="" style={{ paddingTop: "10px", paddingBottom: "10px" }}>
            <Row className="align-items-center">
              <Col sm={6}>
                <OverlayTrigger
                  placement="top"
                  delay={{ show: 150, hide: 100 }}
                  overlay={renderTooltip}
                >
                  <div className="m-0" style={{ width: "fit-content", fontWeight: "600"}}>
                    <CustomToggle eventKey="1">{_name}</CustomToggle>
                  </div>
                </OverlayTrigger>
              </Col>
              <Col sm={2} className="d-flex justify-content-center">
                <Badge bg="dark" className="px-2">{coverDate(_due)}</Badge>
              </Col>
              <Col sm={2} className="d-flex justify-content-center">
                <Badge 
                  // pill 
                  bg={
                    _prior === 3 ? "danger" : _prior === 2 ? "warning" : "success"
                  }
                >
                  {
                    _prior === 3 ? "high" : _prior === 2 ? "medium" : "low"
                  }
                </Badge>
              </Col>
              <Col sm={2} className="d-flex justify-content-center">
                
                <HiOutlinePencilAlt 
                  style={{fontSize: "20px", cursor: "Pointer", color:"#00684A"}}
                  onClick={() => {
                    handleShow();
                  }}
                />
                <HiOutlineTrash 
                className="ms-3"
                style={{fontSize: "20px", cursor: "Pointer", color: "rgb(220,53,69)"}}
                onClick={async() => {
                  const isConfirmed = confirm('Do you want to delete this task?');
                  if (isConfirmed) {
                    // performAction();
                    const response = await fetch('/api', {
                      method: 'DELETE',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({ id })
                    });
                    const { tasks } = await response.json();
                    setTasks(tasks);
                    setInput("")
                    resetAll();
                  }
                }}
                />
              </Col>
            </Row>
            
          </Card.Header>
          <Accordion.Collapse eventKey="1">
            <Card.Body className="mx-3" style={{ fontSize: "14px" }}>{_des}</Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>



      <Modal size="lg" show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title style={{ fontSize: "28px", fontWeight: "700" }}>
          Update task
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" style={{ width: "40%"}} controlId="exampleForm.ControlInput1">
            <Form.Label>Task name ({_name.length}/30)</Form.Label>
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
              name.length === 0 ? 
                <Form.Text id="passwordHelpBlock" className="d-flex align-items-center gx-2 mt-2" style={{ fontSize: "13px"}}>
                  <HiExclamationCircle className="text-danger" />
                  <p className="text-danger m-0 ms-1">Do not leave empty!</p>
                </Form.Text>
              :
              name !== _name &&
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
          disabled={name === "" && due === "" && prior === 3 && des === "" || ((name === _name && due === _due && prior === _prior && des === _des))}
          onClick={() => {
            setName(_name)
            setDue(_due)
            setPrior(_prior)
            setDes(_des)
          }}
        >
          Reset
        </Button>
        <Button 
          variant="primary" 
          disabled={name === "" || due === "" || (name === _name && due === _due && prior === _prior && des === _des) || (name !== _name && tasks.some(obj => obj.name === name))}
          // disable if name exist
          onClick={async() => {
            const response = await fetch('/api', {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ id, name, due, prior, des })
            });
            const { tasks } = await response.json();
            setTasks(tasks)
            setInput("")
            resetAll();
            handleClose();
          }}
        >
          Update
        </Button>
      </Modal.Footer>
      </Modal>
    </>
  )
}
