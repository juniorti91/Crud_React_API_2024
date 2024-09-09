import React from 'react';
import { Table } from 'react-bootstrap';
 
class Cursos extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            cursos : [],
        }
    }

    // Quando o componente é montado na Tela chamar os dados da API
    componentDidMount() {
        fetch("https://localhost:7236/api/AlunoCurso")
            .then(resposta => resposta.json())
            .then(dados => {
                this.setState({ cursos : dados })
            })
    }

    // Quando o componente é desmontado da Tela
    componentWillUnmount() {

    }

    render() {
        return (
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Nome do Curso</th>
                        <th>Nome do Aluno</th>
                        <th>Opções</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.cursos.map((curso) => 
                            <tr>
                                <td> {curso.cursoNome} </td>
                                <td> {curso.alunoId} </td>
                                <td>Atualizar  Excluir</td>
                            </tr>
                        )
                    }
                </tbody>
            </Table>
        )
    }
}

export default Cursos;