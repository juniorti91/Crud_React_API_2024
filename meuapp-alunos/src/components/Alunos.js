import React from 'react';
import { Table, Button, Form, Modal } from 'react-bootstrap';
 
class Alunos extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            id: 0,
            nome: '',
            email: '',
            alunos : [],
            modalAberta: false
        }
    }

    // obter o estado do nome
    atualizaNome = (e) => {
        this.setState(
            {
                nome: e.target.value
            }
        )
    }

    // obter o estado do e-mail
    atualizaEmail = (e) => {
        this.setState(
            {
                email: e.target.value
            }
        )
    }

    // Quando o componente é montado na Tela chamar os dados da API
    componentDidMount() {
        this.buscarAluno();
    }

    // Quando o componente é desmontado da Tela essa função é chamada 
    componentWillUnmount() {

    }

    // função para listar todo os alunos
    buscarAluno = () => {
        fetch("https://localhost:7236/api/Aluno")
            .then(resposta => resposta.json())
            .then(dados => {
                this.setState({ alunos : dados })
            })
    }

    // função para remover 1 aluno pelo id
    deletarAluno = (id) => {
        fetch("https://localhost:7236/api/Aluno/" + id, { method: 'DELETE' })
            .then(resposta =>  {
                if (resposta.ok) {
                    this.buscarAluno();
                }
        })
    }

    // função para Cadastra Aluno
    cadastraAluno = (aluno) => {
        fetch("https://localhost:7236/api/Aluno", { 
            method: "POST", 
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(aluno)
        })
            .then(resposta =>  {
                if (resposta.ok) {
                    this.buscarAluno();
                } else {
                    alert('Não foi possivel adicionar o Aluno!');
                }
        })
    }

    // função para Cadastra Aluno
    atualizarAluno = (aluno) => {
        fetch("https://localhost:7236/api/Aluno/" + aluno.id, { 
            method: "PUT", 
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(aluno)
        })
            .then(resposta =>  {
                if (resposta.ok) {
                    this.buscarAluno();
                } else {
                    alert('Não foi possivel atualizar os dados do Aluno!');
                }
        })
    }

    // função para Listar o Aluno pelo ID
    carregarDados = (id) => {
        fetch("https://localhost:7236/api/Aluno/" + id, { method: 'GET' })
            .then(resposta => resposta.json())
            .then(aluno => {
                this.setState({
                     id : aluno.id, 
                     nome: aluno.nome,
                     email: aluno.email,
                })
                this.abrirModal();
            })
    }

    submit = (e) => {
        //e.preventDefault();  // Impede o comportamento padrão de recarregar a página

        if (this.state.id === 0){
            const aluno = {
                nome: this.state.nome,
                email: this.state.email,
                status: true,
                alunoCursos: []
            }
            this.cadastraAluno(aluno);
        } else {
            const aluno = {
                id: this.state.id,
                nome: this.state.nome,
                email: this.state.email,
                status: true,
                alunoCursos: []
            }
            this.atualizarAluno(aluno);
        }
        this.fecharModal();
    }

    // limpar os campos para adicionar um novo
    reset = () => {
        this.setState(
            {
                id: 0,
                nome: '',
                email: ''
            }
        )
        this.abrirModal();
    }

    // abrir o modal
    fecharModal = () => {
        this.setState(
            {
                modalAberta: false,
            }
        )
    }

    // fechar o modal
    abrirModal = () => {
        this.setState(
            {
                modalAberta: true,
            }
        )
    }

    // Tabela para listar todos os Alunos
    renderTabela() {
        return (
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Opções</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.alunos.map((aluno) => 
                            <tr key={aluno.id}>
                                <td> {aluno.nome} </td>
                                <td> {aluno.email} </td>
                                <td>
                                    <Button variant="outline-secondary" className='me-2' onClick={() => this.carregarDados(aluno.id)}>Atualizar</Button>  
                                    <Button variant="outline-danger" onClick={() => this.deletarAluno(aluno.id)}>Excluir</Button>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </Table>
        )
    }

    // Tabela para cadastrar um Aluno chamando logo no final a tabela de listar todos os alunos 
    render() {
        return (
            <div>

                <Modal show={this.state.modalAberta} onHide={this.fecharModal}>
                    <Modal.Header closeButton>
                    <Modal.Title>Dados do Aluno</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                            <Form>
                            <Form.Group className="mb-3" >
                                <Form.Label>Id</Form.Label>
                                <Form.Control type="text" value={this.state.id} readOnly={true}/>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Nome</Form.Label>
                                <Form.Control type="text" placeholder="Digite o nome do aluno" value={this.state.nome} onChange={this.atualizaNome} />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" placeholder="Digite o email do aluno" value={this.state.email} onChange={this.atualizaEmail} />
                                <Form.Text className="text-muted">
                                </Form.Text>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={this.fecharModal}>
                        Close
                    </Button>
                    <Button variant="primary" type="submit" onClick={this.submit}>
                        Salvar
                    </Button>
                    </Modal.Footer>
                </Modal>

                
                <Button variant="warning" type="submit" onClick={this.reset}>
                    Novo
                </Button>


                

                {this.renderTabela()}
            </div>

            
        )
    }
}

export default Alunos;