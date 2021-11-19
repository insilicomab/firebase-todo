import React, { FC, useState } from "react";
import firebase from "firebase/app";
import { ListItem, TextField, Grid } from "@material-ui/core";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import { db } from "../firebase";
import styles from "../css/TaskItem.module.css";

interface Props {
  id: string;
  title: string;
}

const TaskItem: FC<Props> = (props) => {
  const [title, setTitle] = useState(props.title);

  const editTask = () => {
    db.collection("tasks").doc(props.id).set({ title: title }, { merge: true });
  };

  const deleteTask = () => {
    db.collection("tasks").doc(props.id).delete();
  };

  return (
    <div>
      <ListItem>
        <h2>{props.title}</h2>
        <Grid container justifyContent="flex-end">
          <TextField
            InputLabelProps={{
              shrink: true,
            }}
            label="Edit Task"
            value={title}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setTitle(e.target.value)
            }
          />
        </Grid>
        <button className={styles.taskitem__icon} onClick={editTask}>
          <EditOutlinedIcon />
        </button>
        <button className={styles.taskitem__icon} onClick={deleteTask}>
          <DeleteOutlineOutlinedIcon />
        </button>
      </ListItem>
    </div>
  );
};

export default TaskItem;
