import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import { Button, Container, Paper } from '@mui/material';

export default function Estudante() {
    const paperStyle = { padding: '50px 20px', width:600, margin:"20px auto"};
    const[nome, setNome] = useState('');
    const[endereco, setEndereco] = useState('');
    const[estudantes, setEstudantes] = useState([]);

    const handleClick=(e)=>{
        e.preventDefault();
        const estudante={nome, endereco};
        if(nome.length > 0 && endereco.length > 0){
            fetch("http://localhost:8080/estudante/add", {
                method: "POST",
                headers:{"Content-Type": "application/json"},
                body: JSON.stringify(estudante)
            }).then(()=>{
                window.alert("Estudante cadastrado com sucesso!");
            });
    
            window.location.reload(false);
        } else{
            window.alert("Todos os campos são obrigatórios!");
        }
    }

    
    function deletar(id){
        const confirm = window.confirm("Deseja realmente apagar esse dado?");
        if(confirm){
            fetch(`http://localhost:8080/estudante/delete/${id}`, {
            method: "DELETE"
            }).then(() => {
            window.alert("Estudante deletado com sucesso!");
            window.location.reload(false);
            }).catch((e) => console.error("Erro ao tentar deletar: ", e));
        }
    }

    useEffect(()=> {
        fetch("http://localhost:8080/estudante/getAll")
        .then(res=> res.json())
        .then((result) => {
            setEstudantes(result);
        }
    )
    }, []);

  return (
    <Container>
        <Paper elevation={3} style={paperStyle}>
            <h1 style={{color:"blue"}}> <u>ADICIONAR ESTUDANTE</u></h1>
            <form noValidate autoComplete='off'>
                <TextField id="outlined-basic" 
                           label="Nome" 
                           variant="outlined"  
                           fullWidth 
                           value={nome}
                           onChange={(e) => setNome(e.target.value)}/>
                <TextField id="outlined-basic" 
                           label="Endereço" 
                           variant="outlined" 
                           fullWidth 
                           value={endereco}
                           onChange={(e) => setEndereco(e.target.value)}/>
                <Button variant="contained" color='secondary' onClick={handleClick}>
                    ADICIONAR ESTUDANTE
                </Button>
            </form>
        </Paper>
        
        <h1 style={{color:"blue"}}>ESTUDANTES</h1>
        
        <Paper elevation={6} style={paperStyle}>
            {estudantes.map(estudante => (
                <Paper elevation={6} style={{margin: "10px", padding: "15px", textAlign:"left"}} key={estudante.id}>
                    ID: {estudante.id} <br/>
                    Nome: {estudante.nome} <br/>
                    Endereço: {estudante.endereco} <br/><br/>
                    <Button variant='contained' color='error' onClick={() => deletar(estudante.id)}>
                        DELETAR
                    </Button>
                </Paper>
            ))}
        </Paper>
    </Container>

  );
}
