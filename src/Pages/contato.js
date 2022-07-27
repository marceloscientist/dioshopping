import { Grid, Button, TextField } from '@material-ui/core/';
import { useState, useEffect } from 'react';

const Contatos = () => {
   
    const [message, setMessage] = useState([])
    useEffect(async()=>{
        const response = await fetch('http://localhost:5000/message')
        const data = await response.json()
        setMessage(data);

    },[])


    console.log(message)

    return(
        <>
            <Grid container direction="row" xs={12}>
                <TextField id="name" label="Name" fullWidth/>
                <TextField id="message" label="Message" fullWidth/>
            </Grid>

            <Button className="mt-2" variant="contained" color="primary">
                Sent
            </Button>
            {message.map((content) => {
                return (
                    <div className="card mt-2">
                    <div className="card-body">
                        <h5 className="card-title">{content.email}</h5>
                        <p className="card-text">{content.message}</p>
                        <p className="card-text">
                            <small className="text-muted">{content.created_at}</small>
                        </p>
                    </div>
                    </div>

                )
            })}
        </>
    )
}

export default Contatos;
