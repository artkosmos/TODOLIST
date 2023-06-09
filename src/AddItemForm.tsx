import React, {ChangeEvent, KeyboardEvent, memo, useState} from 'react';
import style from "./ToDoList.module.css";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

type AddItemFormPropsType = {
  callBack: (text: string) => void
}

export const AddItemForm = memo((props: AddItemFormPropsType) => {

  const [text, setText] = useState('')
  const [error, setError] = useState<boolean>(false)

  const anotherTask = () => {
    if (text.trim()) {
      props.callBack(text.trim())
      setText('')
    } else {
      setError(true)
    }
  }

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setError(false)
    setText(event.currentTarget.value)
  }

  const onPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      anotherTask()
    }
  }

  const buttonStyles = {
    maxWidth: '40px',
    maxHeight: '40px',
    minWidth: '40px',
    minHeight: '40px',
    marginLeft: '10px'
  }

  return (
    <div>
      <div>
        {/*<input className={error ? style.error : ''}
               value={text}
               onChange={onChangeHandler}
               onKeyDown={onPressHandler}
        />*/}
        <TextField
          error={error}
          size={'small'}
          id="outlined-basic"
          label={error ? "Title is required" : "Write something..."}
          variant="outlined"
          value={text}
          onChange={onChangeHandler}
          onKeyDown={onPressHandler}
        />
        {/*<button onClick={anotherTask}>Add</button>*/}
        <Button onClick={anotherTask} style={buttonStyles} variant="contained">Add</Button>
      </div>
      {/*{error && <div className={style.errorMessage}>{error}</div>}*/}
    </div>
  );
})

