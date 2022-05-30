import React, { Component } from "react";
import { connect } from "react-redux";
import { ThemeProvider } from "styled-components";
import { Button } from "./components/Button";
import { Container } from "./components/Container";
import { Dropdown } from "./components/Dropdown";
import { Heading1, Heading3 } from "./components/Heading";
import { Table, Th, Thead, Tr } from "./components/Table";
import { Input, Label } from "./components/TextField";
import {
  checkTask,
  deleteTask,
  editTask,
  handleChangeTheme,
  setTask,
  updateTask,
} from "./redux/actions/todo.actions";
import { arrTheme } from "./themes/ThemesManager";

class ToDoList extends Component {
  state = {
    name: "",
    disabled: true,
  };

  renderOptionTheme = () => {
    return arrTheme.map((item) => {
      return (
        <option key={item.id} value={item.id}>
          {item.name}
        </option>
      );
    });
  };

  renderTaskToDo = () => {
    //* Tìm kiếm object có item.done = false để map
    return this.props.taskList
      .filter((item) => !item.done)
      .map((item) => {
        return (
          <Tr key={item.id}>
            <Th>{item.name}</Th>
            <Th style={{ textAlign: "right" }}>
              <Button
                onClick={() => {
                  this.props.dispatch(deleteTask(item.id));
                }}
              >
                <i className="fa fa-trash-alt"></i>
              </Button>
              <Button
                onClick={() => {
                  this.setState(
                    {
                      disabled: false,
                    },
                    () => {
                      this.props.dispatch(editTask(item));
                    }
                  );
                }}
                style={{ margin: "0 7px" }}
              >
                <i className="fa fa-edit"></i>
              </Button>
              <Button
                onClick={() => {
                  this.props.dispatch(checkTask(item.id));
                }}
              >
                <i className="fa fa-check"></i>
              </Button>
            </Th>
          </Tr>
        );
      });
  };

  renderTaskCompleted = () => {
    //* Tìm kiếm object có item.done = true để map
    return this.props.taskList
      .filter((item) => item.done)
      .map((item) => {
        return (
          <Tr key={item.id}>
            <Th>{item.name}</Th>
            <Th className="text-right">
              <Button
                onClick={() => {
                  this.props.dispatch(deleteTask(item.id));
                }}
              >
                <i className="fa fa-trash-alt"></i>
              </Button>
            </Th>
          </Tr>
        );
      });
  };

  render() {
    let { theme, dispatch } = this.props;
    return (
      <ThemeProvider theme={theme}>
        <Container style={{ width: "60%" }}>
          <Dropdown
            onChange={(e) => {
              let { value } = e.target;
              dispatch(handleChangeTheme(value));
            }}
          >
            //* Render option theme
            {this.renderOptionTheme()}
          </Dropdown>
          <Heading1>To do list</Heading1>
          <Label
            style={{ display: "block", marginLeft: "13px", marginTop: "30px" }}
          >
            Task name
          </Label>
          <Input
            value={this.state.name}
            onChange={(e) => {
              this.setState({
                name: e.target.value,
              });
            }}
            style={{ marginLeft: "13px", marginTop: "13px", width: "50%" }}
          ></Input>
          {/* //* Dùng toán tử 3 ngôi để disabled nút add và update */}
          {this.state.disabled ? (
            <Button
              onClick={() => {
                let { name } = this.state;

                //* Tạo object mới trước khi dispatch lên redux
                let newTask = {
                  id: Date.now(),
                  name,
                  done: false,
                };

                this.setState(
                  {
                    name: "",
                  },
                  () => {
                    dispatch(setTask(newTask));
                  }
                );
              }}
              className="mx-2"
            >
              <i className="fa fa-plus"></i> Add task
            </Button>
          ) : (
            <Button
              className="mx-2"
              onClick={() => {
                // * Tạo biến trước khi mà set lại giá trị cho nó bằng rỗng
                let { name } = this.state;

                // * Đảm bảo rằng setState trước khi mà dispatch chạy
                this.setState(
                  {
                    disabled: true,
                    name: "",
                  },
                  () => {
                    dispatch(updateTask(name));
                  }
                );
              }}
            >
              <i className="fa fa-upload"></i> Update task
            </Button>
          )}
          <Heading3 className="mt-5 mb-4">Task to do</Heading3>
          <Table>
            {/* //* Render ra task cần làm */}
            <Thead>{this.renderTaskToDo()}</Thead>
          </Table>
          <Heading3 className="my-4">Task completed</Heading3>
          <Table>
            {/* //* Render ra task đã hoàn thành */}
            <Thead>{this.renderTaskCompleted()}</Thead>
          </Table>
        </Container>
      </ThemeProvider>
    );
  }

  //* So sánh nếu props trước khác props hiện tại thì setState lại
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.taskEdit.name !== this.props.taskEdit.name) {
      this.setState({
        name: this.props.taskEdit.name,
      });
    }
  }
}

let mapStateToProps = (state) => {
  return {
    theme: state.ToDoReducer.theme,
    taskList: state.ToDoReducer.taskList,
    taskEdit: state.ToDoReducer.taskEdit,
  };
};

export default connect(mapStateToProps)(ToDoList);
