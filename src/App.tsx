import { FormControl, List, TextField } from "@material-ui/core";
import React, { useEffect, FC } from "react";
import AddToPhotosIcon from "@material-ui/icons/AddToPhotos";
import styles from "./css/App.module.css";
import { db } from "./firebase";
import TaskItem from "./components/TaskItem";
import { makeStyles } from "@material-ui/core";
import { auth } from "./firebase";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { useNavigate } from "react-router-dom";

import { useNewTask } from "./hooks/useNewTask";

const useStyles = makeStyles({
  field: {
    marginTop: 30,
    marginBottom: 20,
  },
  list: {
    margin: "auto",
    width: "40%",
  },
});

const App: FC = () => {
  const { tasks, setTasks, input, setInput, newTask } = useNewTask();
  const classes = useStyles();
  const navigate = useNavigate();

  useEffect(() => {
    const unSub = auth.onAuthStateChanged((user) => {
      !user && navigate("login");
    });
    return () => unSub();
  });

  useEffect(() => {
    const unSub = db.collection("tasks").onSnapshot((snapshot) => {
      setTasks(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          title: doc.data().title,
        }))
      );
    });
    return () => unSub();
  }, []);

  return (
    <div className={styles.app__root}>
      <h1>ToDo App by React/Firebase</h1>
      <button
        className={styles.app__logout}
        onClick={async () => {
          try {
            await auth.signOut();
            navigate("login");
          } catch (error: any) {
            alert(error.message);
          }
        }}
      >
        <ExitToAppIcon />
      </button>
      <br />
      <FormControl>
        <TextField
          className={classes.field}
          InputLabelProps={{
            shrink: true,
          }}
          label="New Task?"
          value={input}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setInput(e.target.value)
          }
        />
      </FormControl>
      <button className={styles.app__icon} disabled={!input} onClick={newTask}>
        <AddToPhotosIcon />
      </button>

      <List className={classes.list}>
        {tasks.map((task) => (
          <TaskItem key={task.id} id={task.id} title={task.title} />
        ))}
      </List>
    </div>
  );
};

export default App;
