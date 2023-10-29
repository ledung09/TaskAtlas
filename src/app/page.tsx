"use client";

import Image from "next/image";

import styles from "./page.module.css";
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

import { GrPowerCycle, GrAdd, GrSort } from "react-icons/gr";
import Filter from "./components/filter/Filter";
import Add from "./components/add/Add";
import Task from "./components/task/Task";
import Search from "./components/search/Search";

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

  // useEffect(() => {
  //   const getFilter = async () => {
  //     const response = await fetch("/api/filter?due=14/10/2023&sort=-1&sort=1");
  //     const { tasks } = await response.json();
  //     console.log(tasks);
  //   };
  //   getFilter();
  // }, []);


  //   useEffect(() => {
  //   const getAll = async () => {
  //     const response = await fetch('/api', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         name: 'value',
  //         due: 'anotherValue',
  //         prior: 'anotherValue',
  //         des: 'anotherValue'
  //       })
  //     });
  //     const { tasks } = await response.json();
  //     console.log(tasks)
  //     // setTasks([])
  //   };
  //   getAll();
  // }, []);

  // useEffect(() => {
  //   const tasks = async () => {
  //     const REALM_APP_ID: string = process.env.NEXT_PUBLIC_REALM_APP_ID!;
  //     const app = new Realm.App({ id: REALM_APP_ID });
  //     const credentials = Realm.Credentials.anonymous();
  //     try {
  //       const user = await app.logIn(credentials);
  //       const getTasks = await user.functions.getTasks();
  //       setTasks(getTasks);
  //     } catch (err) {
  //       console.error("Failed to log in", err);
  //     }
  //   };
  //   tasks();
  // }, []);

  console.log(tasks);
  return (
    <main className={styles.main}>
      <Container
        className={styles.container}
        style={{ backgroundColor: "white" }}
      >
        <div className={styles.appNameLogo}>
          <Image 
            src={"/logo.png"}
            width={0}
            height={0}
            style={{
              width: "auto",
              height: "100px",
              objectFit: "contain",
            }}
            priority={true}
            alt={"TaskAlas logo"}
          />

          <h1 
            className={styles.appName}
          >
            TASKATLAS
          </h1>

        </div>
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
          />
        </Stack>
        <Form.Check // prettier-ignore
          type="switch"
          id="custom-switch"
          label="Search suggestion"
          className="w-100 d-flex justify-content-end gap-2 mb-0"
          style={{ marginTop: "16px"}}
          onChange={(e)=> {
            setAutoComplete(e.target.checked)
          }}
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
            />
          );
        })}
      </Container>
    </main>
  );
}
