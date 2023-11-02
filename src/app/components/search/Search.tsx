"use client";

import styles from "./search.module.css";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import ListGroup from 'react-bootstrap/ListGroup';

import { mongoObject } from "@/app/interface/interface";

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
            if (sortQuer === "") {
              const response = await fetch(`/api`);
              const { tasks } = await response.json();
              setTasks(tasks)
            } else {
              const response = await fetch(`/api/filter?` + sortQuer);
              const { tasks } = await response.json();
              setTasks(tasks)
            }
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
