"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Stack from "react-bootstrap/Stack";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Filter from "./components/filter/Filter";
import Add from "./components/add/Add";
import Task from "./components/task/Task";
import Search from "./components/search/Search";
import AppInfo from "./components/appInfo/AppInfo"

interface mongoObject {
  _id: any;
  name: string;
  due: any;
  priority: number;
  description: string;
}

export default function Home() {
  const [tasks, setTasks] = useState<mongoObject[]>([]);
  const [input, setInput] = useState<string>("")
  const [sortQuer, setSortQuer] = useState<string>("")

  const [filterPr, setFilterPr] = useState<number[]>([]);
  const [filterDate, setFilterDate] = useState<string>("");
  const [sort, setSort] = useState<number[]>([0, 0]);

  const [autocomplete, setAutoComplete] = useState<boolean>(false)

  useEffect(() => {
    const getAll = async () => {
      const response = await fetch('/api');
      const { tasks } = await response.json();
      setTasks(tasks)
    };
    getAll();
  }, []);

  return (
    <main className={styles.main}>
      <Container
        className={styles.container}
        style={{ backgroundColor: "white" }}
      >
        <AppInfo />
        <Stack direction="horizontal" gap={2}>
          <Search
            tasks={tasks}
            setTasks={setTasks}
            input={input}
            setInput={setInput}
            autocomplete={autocomplete}
            sortQuer={sortQuer}
          />
          <div className="vr" />
          <Filter
            filterPr={filterPr}
            filterDate={filterDate}
            sort={sort}
            setFilterPr={setFilterPr}
            setFilterDate={setFilterDate}
            setSort={setSort}
            setTasks={setTasks}
            input={input}
            setInput={setInput}
            setSortQuer={setSortQuer}
          />
          <Add 
            tasks={tasks}
            setTasks={setTasks}
            setFilterPr={setFilterPr}
            setFilterDate={setFilterDate}
            setSort={setSort}
          />
        </Stack>
        <Form.Check 
          type="switch"
          id="custom-switch"
          label="Search suggestion"
          className="w-100 d-flex justify-content-end gap-2 mb-0"
          style={{ marginTop: "16px"}}
          onChange={(e)=> setAutoComplete(e.target.checked)}
        />
        <hr style={{ marginTop: "12px"}} />
        <Row className="px-3">
          <Col md={6}>
            <p className="mb-2">Name</p>
          </Col>
          <Col md={2}>
            <p className="text-center mb-2">Due date</p>
          </Col>
          <Col md={2}>
            <p className="text-center mb-2">Priority</p>
          </Col>
          <Col md={2}>
            <p className="text-center mb-2">Action</p>
          </Col>
        </Row>
        {tasks.map((task: mongoObject, idx: number) => {
          return (
            <Task
              key={idx}
              id={JSON.stringify(task._id).slice(1, -1)}
              _name={task.name}
              _due={JSON.stringify(task.due).slice(1, 11)}
              _prior={task.priority}
              _des={task.description}
              tasks={tasks}
              setTasks={setTasks}
              setInput={setInput}
              setFilterPr={setFilterPr}
              setFilterDate={setFilterDate}
              setSort={setSort}
            />
          );
        })}
      </Container>
    </main>
  );
}
