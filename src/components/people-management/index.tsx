import React, {useEffect, useState} from 'react';
import { Row, Form, FormGroup, Table, Label, Input, Button, Modal, ModalHeader, ModalBody, Col } from 'reactstrap';
import {getPeople, deletePeople, updatePeople, createPeople} from './people-management.reducer'
import { validate } from 'gerador-validador-cpf'
import {faUserPen, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const PeopleManagement = ()=> {

    const [peopleList, setPeopleList] = useState([]);
    const [isCreate, setIsCreate] = useState(false);
    const [peopleToEdit, setPeopleToEdit] = useState();
    const [modalIsOpen, _setModalIsOpen] = useState(false);
    const [modalCreateIsOpen, _setModalCreateIsOpen] = useState(false);
    const [peopleReference, setPeopleReference] = useState({});
    const [defaultPicture, setDefaultPicture] = useState();
    const [filters, setFilters] = useState({});
    const [validationStates, setValidationStates] = useState({
        "name": '',
        "cpf": '',
        "email": '',
        "picture":'',
    });
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let timer:any = null;
    

    const getPeopleList = () =>{
        getPeople(filters, 1).then((data) =>{
            setPeopleList(data.data)
        })
    }

    const deletePeopleFromList = (idPeople:Number) =>{
        deletePeople(idPeople).then(()=>{
            setPeopleList(peopleList.filter((object) =>{
                return object['id'] != idPeople
            }))
        })
    }

    useEffect(()=>{
        getPeopleList()
    },[])


    useEffect(()=>{
        if(peopleToEdit !== undefined){
            setDefaultPicture(peopleToEdit['picture'])
        }
    },[peopleToEdit])

    const setModalIsOpen = () =>{
        _setModalIsOpen(!modalIsOpen)
        setPeopleReference({})
        if(modalIsOpen == false){
            setPeopleToEdit(undefined)
            setDefaultPicture(undefined)
        }
    }

    const setModalCreateIsOpen = () =>{
        setPeopleReference({})
        _setModalCreateIsOpen(!modalCreateIsOpen)
        if(modalCreateIsOpen == false){
            setDefaultPicture(undefined)
        }
    }

    const editPeople = (people:any) =>{
        setModalIsOpen()
        setPeopleToEdit(people)
    }

    const setName = (name:string) =>{
        if(name.length <= 150 ){
            setPeopleReference({...peopleReference, name})
            setValidationStates({...validationStates, 'cpf':'has-success' });
        }else{
            setValidationStates({...validationStates, 'cpf':'has-danger' });
        }
    }

    const setCPF = (cpf:string) =>{
        if(timer != null){
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            
            if (validate(cpf)) {
                setValidationStates({...validationStates, 'cpf':'has-success' });
                setPeopleReference({...peopleReference, cpf})
            } else {
                setValidationStates({...validationStates, 'cpf':'has-danger' });
            }
            
        }, 500);
        return () => clearTimeout(timer);
    }


    const setEmail = (email:string) =>{
        

        if (emailRegex.test(email)) {
            setValidationStates({...validationStates, 'email':'has-success' });
            setPeopleReference({...peopleReference, email})
        } else {
            setValidationStates({...validationStates, 'email':'has-danger' });
        }
    }

    const setFile = (file:any) =>{
        setDefaultPicture(file)
        setPeopleReference({...peopleReference, 'picture': file})
    }

    const setDate = (date:any) =>{
        setPeopleReference({...peopleReference, 'birthday_date': date})
    }


    const onSubmit = async (event:any) => {
        event.preventDefault();
        
        if(peopleToEdit !== undefined){
            updatePeople(peopleToEdit['id'], peopleReference).then((data)=>{
                getPeopleList()
                setModalIsOpen()
                setPeopleReference({})
            })
        }
        
        
    }

    const addFilter = (method:string, value:string) =>{
        let referenceObj:any= filters
        referenceObj[method] = value
        setFilters(referenceObj)
    }

    const onSubmitCreate = async (event:any) => {
        event.preventDefault();
        createPeople(peopleReference).then((data)=>{
            getPeopleList()
            setModalCreateIsOpen()
            setIsCreate(false)
        })   
    }

    return (
        <Row>
            <Row className='headerPeopleManagement'>
                <h1>People Management</h1>
            </Row>
            <Row>
                <Form>
                    <Row>
                        <Col sm="3">
                            <FormGroup>
                                <Label for="filterName">
                                    Filter by Name
                                </Label>
                                <Input
                                    id="filterName"
                                    name="filterName"
                                    type="text"
                                    onChange={(e) => addFilter('name',e.target.value)}
                                />
                                    
                            </FormGroup>
                        </Col>
                        <Col sm="3">
                            <FormGroup>
                                <Label for="filterCPF">
                                    Filter by CPF
                                </Label>
                                <Input
                                    id="filterCPF"
                                    name="filterCPF"
                                    type="text"
                                    onChange={(e) => addFilter('cpf',e.target.value)}
                                />
                                    
                            </FormGroup>
                        </Col>
                        <Col sm="2">
                            <FormGroup>
                                <Label for="filterBirthday">
                                    Filter by Birthday Date
                                </Label>
                                <Input
                                    id="filterBirthday"
                                    name="filterBirthday"
                                    type="date"
                                    onChange={(e) => addFilter('birthday_date',e.target.value)}
                                />
                                    
                            </FormGroup>
                        </Col>
                        <Col sm="2">
                            <FormGroup>
                                <Label for="filterEmail">
                                    Filter by Email
                                </Label>
                                <Input
                                    id="filterEmail"
                                    name="filterEmail"
                                    type="email"
                                    onChange={(e) => addFilter('email',e.target.value)}
                                />
                                    
                            </FormGroup>
                        </Col>
                        <Col sm="2">
                            <Button color='primary' className='btnFilter' onClick={getPeopleList}>Filter</Button>
                            <Button color='success' className='btnFilter btnActions' onClick={setModalCreateIsOpen}>New</Button>
                        </Col>
                    </Row>
                    
                    
                </Form>
            </Row>
            <Table>
                <thead>
                    <tr>
                        <th>
                            
                        </th>
                        <th>
                            Name
                        </th>
                        <th>
                            CPF
                        </th>
                        <th>
                            Birthday Date
                        </th>
                        <th>
                            Email
                        </th>
                        <th>
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {peopleList.map((data, i) => (
                        <tr key={i}>
                            <th scope="row">
                                <img className='profile-pic' src={data['picture']} alt={data['name']} />
                            </th>
                            <td>
                                {data['name']}
                            </td>
                            <td>
                                {data['cpf']}

                            </td>
                            <td>
                            {data['birthday_date']}
                            </td>
                            <td>
                                {data['email']}
                            </td>
                            <td>
                                <Button color='primary' onClick={() => editPeople(data)}><FontAwesomeIcon icon={faUserPen} /></Button>
                                <Button className='btnActions' color='danger' onClick={()=> deletePeopleFromList(data['id']) }><FontAwesomeIcon icon={faTrash} /></Button>
                            </td>
                        </tr>
                    ))}
                    
                </tbody>
            </Table>
            <Modal isOpen={modalIsOpen} toggle={setModalIsOpen}>
                <ModalHeader toggle={setModalIsOpen}>
                    {isCreate ? 'New People':'Edit'} {peopleToEdit !== undefined ? peopleToEdit['name']:''} 
                </ModalHeader>
                <ModalBody>
                    <Form onSubmit={onSubmit}>
                        <FormGroup>
                            <Label for="name">
                                Name
                            </Label>
                            <Input
                                id="name"
                                name="name"
                                defaultValue={peopleToEdit !== undefined ? peopleToEdit['name']:''}
                                type="text"
                                onChange={(e) => setName(e.target.value)}
                                maxLength={150}
                                valid={validationStates.name  === 'has-success' }
                                invalid={validationStates.name === 'has-danger' }
                                required
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="name">
                                CPF
                            </Label>
                            <Input
                                id="name"
                                name="name"
                                defaultValue={peopleToEdit !== undefined ? peopleToEdit['cpf']:''}
                                type="text"
                                onChange={(e:any) => setCPF(e.target.value)}
                                valid={validationStates.cpf  === 'has-success' }
                                invalid={validationStates.cpf === 'has-danger' }
                                required
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="exampleEmail">
                                Email
                            </Label>
                            <Input
                            id="exampleEmail"
                                name="email"
                                defaultValue={peopleToEdit !== undefined ? peopleToEdit['email']:''}
                                type="email"
                                onChange={(e:any) => setEmail(e.target.value)}
                                maxLength={150}
                                valid={validationStates.email === 'has-success' }
                                invalid={validationStates.email === 'has-danger' }
                                required
                            />
                        </FormGroup>
                        <FormGroup>
                                <Row xs="2">
                                    <Col>
                                        <Label for="picture">
                                            Image URL
                                        </Label>
                                        <Input
                                            id="picture"
                                            name="picture"
                                            defaultValue={peopleToEdit !== undefined ? peopleToEdit['picture']:''}
                                            type="text"
                                            onChange={(e) => setFile(e.target.value)}
                                            valid={validationStates.picture  === 'has-success' }
                                            invalid={validationStates.picture === 'has-danger' }
                                            required={isCreate ? true:false}
                                        />
                                    </Col>
                                    <Col>
                                        <img className='profile-pic-modal' src={defaultPicture}/>
                                    </Col>
                                </Row>
                        </FormGroup>
                        <FormGroup>
                            <Label for="birthdayDate"> Birthday Date </Label>
                            <Input
                                id="birthdayDate"
                                name="date"
                                defaultValue={peopleToEdit !== undefined ? peopleToEdit['birthday_date']:''}
                                type="date"
                                onChange={(e) => setDate(e.target.value)}
                                required={isCreate ? true:false}
                            />
                        </FormGroup>
                        <Button onClick={setModalIsOpen}> Cancel </Button>
                        <Button color="primary">Save</Button>
                    </Form>
                </ModalBody>
            </Modal>
            <Modal isOpen={modalCreateIsOpen} toggle={setModalCreateIsOpen}>
                    <ModalHeader toggle={setModalCreateIsOpen}>
                        New People
                    </ModalHeader>
                    <ModalBody>
                        <Form onSubmit={onSubmitCreate}>
                            <FormGroup>
                                <Label for="name">
                                    Name
                                </Label>
                                <Input
                                    id="name"
                                    name="name"
                                    type="text"
                                    onChange={(e) => setName(e.target.value)}
                                    maxLength={150}
                                    valid={validationStates.name  === 'has-success' }
                                    invalid={validationStates.name === 'has-danger' }
                                    required
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="name">
                                    CPF
                                </Label>
                                <Input
                                    id="name"
                                    name="name"
                                    type="text"
                                    onChange={(e:any) => setCPF(e.target.value)}
                                    valid={validationStates.cpf  === 'has-success' }
                                    invalid={validationStates.cpf === 'has-danger' }
                                    required
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="email">
                                    Email
                                </Label>
                                <Input
                                id="email"
                                    name="email"
                                    type="email"
                                    onChange={(e:any) => setEmail(e.target.value)}
                                    maxLength={150}
                                    valid={validationStates.email === 'has-success' }
                                    invalid={validationStates.email === 'has-danger' }
                                    required
                                />
                            </FormGroup>
                            <FormGroup>
                                    <Row xs="2">
                                        <Col>
                                            <Label for="picture">
                                                Image URL
                                            </Label>
                                            <Input
                                                id="picture"
                                                name="picture"
                                                type="text"
                                                onChange={(e) => setFile(e.target.value)}
                                                valid={validationStates.picture  === 'has-success' }
                                                invalid={validationStates.picture === 'has-danger' }
                                                required={isCreate ? true:false}
                                            />
                                        </Col>
                                        <Col>
                                            <img className='profile-pic-modal' src={defaultPicture}/>
                                        </Col>
                                    </Row>
                            </FormGroup>
                            <FormGroup>
                                <Label for="birthdayDate"> Birthday Date </Label>
                                <Input
                                    id="birthdayDate"
                                    name="date"
                                    type="date"
                                    onChange={(e) => setDate(e.target.value)}
                                    required={isCreate ? true:false}
                                />
                            </FormGroup>
                            <Button onClick={setModalCreateIsOpen}> Cancel </Button>
                            <Button color="primary">Save</Button>
                        </Form>
                    </ModalBody>
                </Modal>
        </Row>
    );
}

export default PeopleManagement;
