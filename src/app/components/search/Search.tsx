"use client";

import styles from "./search.module.css";
import { useEffect, useState } from "react";
import * as Realm from "realm-web";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Stack from "react-bootstrap/Stack";

import Accordion from "react-bootstrap/Accordion";
import { useAccordionButton } from "react-bootstrap/AccordionButton";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { HiTrash } from "react-icons/hi";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from 'react-bootstrap/ListGroup';

interface mongoObject {
  _id: any;
  name: string;
  due: any;
  priority: number;
  description: string;
}

interface QueryRes {
  _id: any;
  name: string;
}

interface Props {
  tasks: mongoObject[];
  setTasks: any;
  input: string;
  setInput: any;
  autocomplete: boolean;
  sortQuer: string;
}

export default function Search(props: Props) {
  const { setTasks, input, setInput, autocomplete, sortQuer } = props;
  
  const [queryRes, setQueryRes] = useState<QueryRes[]>([])
  const [showQueryRes, setShowQueryRes] = useState<boolean>(true)

  return (
    <div 
      style={{ 
        flex: 1,
        position: "relative",
        height: "fit-content",
      }}
    >
      <Form.Control
        className={styles.searchInput}
        onFocus={()=>setShowQueryRes(true)}
        onBlur={()=>setShowQueryRes(false)}
          
        onClick={(e) => {
          console.log(e)
        }}
        style={{
          width: "100%",
          boxShadow: "none",
          borderBottomLeftRadius: (queryRes.length === 0 || !autocomplete || !showQueryRes) ? "0.375rem" : "0",
          borderBottomRightRadius: (queryRes.length === 0 || !autocomplete || !showQueryRes) ? "0.375rem" : "0",
          // borderBottom: queryRes.length === 0 ? "1px solid #dee2e6" : "none",
          
        }}
        placeholder="Search your task here..."
        value={input}
        onChange={async(e) => {
          setInput(e.target.value);
          if (e.target.value.length !== 0) {
            const response = await fetch(`/api/search?query=${e.target.value}&` + sortQuer);
            const { taskName, tasks } = await response.json();
            if (typeof taskName === "undefined" || taskName === "") setQueryRes([])
            else setQueryRes(taskName)
            setTasks(tasks)
          } else {
            setQueryRes([]);
            const response = await fetch(`/api/filter?` + sortQuer);
            const { tasks } = await response.json();
            console.log(tasks)
            setTasks(tasks)
            console.log("dangitg")
          }
        }}
      />
      {
        autocomplete && queryRes.length !== 0 && showQueryRes &&
        <ListGroup 
          style={{
            position: "absolute", 
            zIndex: "1000",
            width: "100%",
            borderTopLeftRadius: "0px",
            borderTopRightRadius: "0px",
            boxShadow: "none"
          }}
        >
          {
            queryRes.map((quer: QueryRes)=>{
              return (
                <ListGroup.Item 
                  className={styles.queryItem}
                  key={quer._id} 
                  action 
                  onMouseDown={async()=>{
                    setInput(quer.name)
                    const response = await fetch(`/api/task?id=${quer._id}`);
                    const { tasks } = await response.json();
                    let taskDisplay = []
                    taskDisplay.push(tasks)
                    setTasks(taskDisplay);
                  }}  
                >
                  {quer.name}
                </ListGroup.Item>
              )
            })
          }
          {/* <ListGroup.Item action >Cras justo odio</ListGroup.Item>
          <ListGroup.Item action >Dapibus ac facilisis in</ListGroup.Item>
          <ListGroup.Item action >Morbi leo risus</ListGroup.Item>
          <ListGroup.Item action >Porta ac consectetur ac</ListGroup.Item> */}
        </ListGroup>
      }
    </div>
  )
}
