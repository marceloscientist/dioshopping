import { Grid, Button, TextField } from '@material-ui/core/';
import { useState, useEffect } from 'react';

const Contatos = () => {
   
    const url = 'http://localhost:5000/message'
    const [message, setMessage] = useState([])
    const [author, setAuthor] = useState('')
    const [authorMessage, setAuthorMessage] = useState('')
    const [validator, setValidator] = useState(false)
    const [render, setRender] = useState(false)
    const [success, setSuccess] = useState(false)


    useEffect(async()=>{
        const response = await fetch(url)
        const data = await response.json()
        setMessage(data);

    },[render])

    const sendMessage = () => {
        setValidator(false)    
        if(author.length <= 0 || authorMessage.length <= 0) {
            return setValidator(!validator);
        }

        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: author,
                message: authorMessage
            })
        })
        .then((response) => response.json())
        .then((data)=> {
            if(data.id) {
                setRender(true)
                setSuccess(true)
                setTimeout(() => {
                    setSuccess(false)
                }, 3000);
            }
        })

        setAuthor('')
        setAuthorMessage('')
    }

    return(
        <>
            <Grid container direction="row" xs={12}>
                <TextField id="name" label="Name" 
                value={author} 
                onChange={(event)=>{setAuthor(event.target.value)}} 
                fullWidth/>
                
                <TextField id="message" label="Message" 
                value={authorMessage}
                onChange={(event)=>{setAuthorMessage(event.target.value)}}
                fullWidth/>
            </Grid>
            { validator &&
                <div className="alert alert-warning alert-dismissible fade show mt-2" role="alert">
                    <strong>Por favor, precisa preencher todos os campos!</strong>
                    <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            }

            { success &&
                <div className="alert alert-success alert-dismissible fade show mt-2" role="alert">
                    <strong>Enviado com sucesso!</strong>
                </div>
            }
            <Button className="mt-2" 
            variant="contained" color="primary"
            onClick={sendMessage}
            >
                Sent
            </Button>
            {message.map((content) => {
                return (
                    <div className="card mt-2" key={content.id}>
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
