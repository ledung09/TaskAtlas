"use client";

import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { HiOutlineFilter } from "react-icons/hi";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

interface Props {
  filterPr: number[];
  filterDate: string;
  sort: number[];
  input: string;
  setFilterPr: any;
  setFilterDate: any;
  setSort: any;
  setTasks: any;
  setInput: any;
  setSortQuer: any;
}

export default function Filter(props: Props) {
  const {
    filterPr,
    filterDate,
    sort,
    input,
    setFilterPr,
    setFilterDate,
    setSort,
    setTasks,
    setInput,
    setSortQuer
  } = props;

  const [filterDates, setFilterDates] = useState<string>("");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const modifyFilterPr = (e: any, value: number) => {
    setFilterPr((p: number[]) => {
      let p_ = [...p];
      if (e.target.checked) {
        p_.push(value);
      } else {
        let index = p_.indexOf(value);
        if (index !== -1) {
          p_.splice(index, 1);
        }
      }
      return p_;
    });
  };

  const modifySort = (e: any, type: number, idx: number, value: number) => {
    setSort((p: number[]) => {
      let p_ = [...p];
      if (type === 0) {
        if (idx === 0) p_[idx] = e.target.checked ? -1 : 0;
        if (idx === 1) p_[idx] = e.target.checked ? 1 : 0;
      } else p_[idx] = value;
      return p_;
    });
  };

  const resetAll = () => {
    setFilterPr([]);
    setFilterDates("");
    setSort([0, 0]);
    setSortQuer("")
  };

  return (
    <div className="filter d-flex">
      <Button
        variant="primary"
        className="d-flex align-items-center justify-content-center"
        style={{ fontSize: "16px", color: "white", backgroundColor:"#00684A", borderColor: "#00684A" }}
        onClick={handleShow}
      >
        Filter&nbsp; <HiOutlineFilter />
      </Button>
      <Modal size={"lg"} show={show} onHide={handleClose}>
        <Modal.Header
          closeButton
          className="pb-0"
          style={{ borderBottom: "none" }}
        >
          <Modal.Title style={{ fontSize: "28px", fontWeight: "700" }}>
            Filter
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col style={{ borderRight: "1px solid #dee2e6" }}>
              <h5 className="pb-1">Due date</h5>
              <Form.Group controlId="duedate">
                <Form.Control
                  type="date"
                  placeholder="Normal text"
                  value={filterDates}
                  onChange={(e) => {
                    setFilterDates(e.target.value);
                    setFilterDate(e.target.value);
                  }}
                />
              </Form.Group>
              <Button
                variant="link"
                className="px-0 py-3 pb-0"
                style={{ fontSize: "13px" }}
                onClick={() => {
                  setFilterDates("yyyy-mm-dd");
                  setFilterDates("");
                  setFilterDate("");
                }}
              >
                Clear this choice
              </Button>
            </Col>
            <Col>
              <h5 className="pb-1">Priority</h5>
              <Form>
                <Form.Check
                  type="checkbox"
                  name="group1"
                  id={`default-checkbox1`}
                  label={`high`}
                  onChange={(e) => modifyFilterPr(e, 3)}
                  checked={filterPr.indexOf(3) !== -1}
                />
                <Form.Check
                  type="checkbox"
                  name="group1"
                  id={`default-checkbox2`}
                  label={`medium`}
                  onChange={(e) => modifyFilterPr(e, 2)}
                  checked={filterPr.indexOf(2) !== -1}
                />
                <Form.Check
                  type="checkbox"
                  name="group1"
                  id={`default-checkbox3`}
                  label={`low`}
                  onChange={(e) => modifyFilterPr(e, 1)}
                  checked={filterPr.indexOf(1) !== -1}
                />
              </Form>
              <Button
                variant="link"
                className="px-0 py-3 pb-0"
                style={{ fontSize: "13px" }}
                onClick={() => setFilterPr([])}
              >
                Clear this choice
              </Button>
            </Col>
          </Row>
          <hr />
          <h4
            className="m-0 pb-3"
            style={{ fontSize: "28px", fontWeight: "700" }}
          >
            Sort
          </h4>
          <Row>
            <Col style={{ borderRight: "1px solid #dee2e6" }}>
              <Form className="d-flex align-items-center mt-1">
                <Form.Check
                  inline
                  type="checkbox"
                  name="group6"
                  id={`default-check10`}
                  label={`Due date`}
                  disabled={filterDates !== ""}
                  onChange={(e) => modifySort(e, 0, 1, -1)}
                  checked={sort[1] !== 0}
                />
                <Form.Check
                  inline
                  type="radio"
                  name="group5"
                  id={`default-radio3`}
                  label={`Ascending (default)`}
                  disabled={filterDates !== "" || sort[1] === 0}
                  checked={sort[1] === 1}
                  onClick={(e) => modifySort(e, 1, 1, 1)}
                />
                <Form.Check
                  inline
                  type="radio"
                  name="group5"
                  id={`default-radio4`}
                  label={`Descending`}
                  disabled={filterDates !== "" || sort[1] === 0}
                  checked={sort[1] === -1}
                  onClick={(e) => modifySort(e, 1, 1, -1)}
                />
              </Form>
              <Form className="d-flex align-items-center mt-2">
                <Form.Check
                  inline
                  type="checkbox"
                  name="group3"
                  id={`default-check1`}
                  label={`Priority`}
                  disabled={filterPr.length !== 0}
                  onChange={(e) => modifySort(e, 0, 0, -1)}
                  checked={sort[0] !== 0}
                />
                <Form.Check
                  inline
                  type="radio"
                  name="group2"
                  id={`default-radio1`}
                  label={`Ascending`}
                  disabled={filterPr.length !== 0 || sort[0] === 0}
                  checked={sort[0] === 1}
                  onClick={(e) => modifySort(e, 1, 0, 1)}
                />
                <Form.Check
                  inline
                  type="radio"
                  name="group2"
                  id={`default-radio2`}
                  label={`Descending (default)`}
                  disabled={filterPr.length !== 0 || sort[0] === 0}
                  checked={sort[0] === -1}
                  onClick={(e) => modifySort(e, 1, 0, -1)}
                />
              </Form>   
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer className="py-2" style={{ borderTop: "none" }}>
          <Button
            disabled={
              filterPr.length === 0 &&
              filterDates === "" &&
              JSON.stringify(sort) === JSON.stringify([0, 0])
                ? true
                : false
            }
            variant="danger"
            onClick={async() => {
              resetAll();
              if (input.length === 0) {
                const response = await fetch(`/api`);
                const { tasks } = await response.json();
                setTasks(tasks);
              } else {
                const response = await fetch(`/api/search?query=${input}`);
                const { tasks } = await response.json();
                setTasks(tasks);
              }
            }}
          >
            Reset
          </Button>
          <Button
            disabled={
              filterPr.length === 0 &&
              filterDates === "" &&
              JSON.stringify(sort) === JSON.stringify([0, 0])
                ? true
                : false
            }
            variant="primary"
            onClick={async () => {
              if (
                filterPr.length === 0 &&
                filterDates === "" &&
                JSON.stringify(sort) === JSON.stringify([0, 0])
              ) {
              } else {
                let query = "";
                query += filterPr
                  .sort((a, b) => a - b)
                  .map((value) => `prior=${value}`)
                  .join("&");
                query += filterDate !== "" ? `&due=${filterDate}` : "";
                const sortStr = sort.map((value) => `sort=${value}`).join("&");
                query += sortStr === "" ? "" : `&${sortStr}`;
                setSortQuer(query)
                handleClose();
                if (input.length === 0) {
                  const response = await fetch("/api/filter?" + query);
                  const { tasks } = await response.json();
                  setTasks(tasks);
                } else {
                  const response = await fetch(`/api/search?query=${input}&` + query);
                  const { tasks } = await response.json();
                  setTasks(tasks);
                }
              }
              // resetAll();
            }}
          >
            Apply
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
