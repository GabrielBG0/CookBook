import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Navbar, NavDropdown, Brand, Nav, Form, FormControl, Button, Image, Card, Container, Row, Col, CardDeck, Media, Badge, OverlayTrigger, Popover } from 'react-bootstrap/'
import logoImg from '../../assets/img/logo-white.png'
import sushi from '../../assets/img/sushi.jpg'
import pizza from '../../assets/img/pizza.jpg'
import hamburguer from '../../assets/img/hamburguer.jpg'
import user from '../../assets/img/user-icon.png'
import bg from '../../assets/img/food-background.jpg'
import { BrowserRouter as Router } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa'
import { FaPlusCircle } from 'react-icons/fa'
import { FaClock } from 'react-icons/fa'
import { FaPen } from 'react-icons/fa'
import { FaEllipsisV } from 'react-icons/fa'
import { FaTrash } from 'react-icons/fa'
import Nbar from '../NavBar/NavBar'
import api from '../../services/api'





export default function ProfileSubmited() {
    const [recipes, setRecipes] = useState([])
    var userName = localStorage.getItem('name')
    var user_id = localStorage.getItem('id')

    useEffect(() => {
        async function fetchData() {
            const response = await api.get('/recipeByUser/' + user_id)
            setRecipes(response.data)
        }
        fetchData()
    }, [recipes])


    {
        return (
            <>
                {Nbar(true)}

                <Row className="justify-content-md-start">
                    <Col xs="auto">
                        <Image className="foto"
                            width={150}
                            height={150}
                            src={user}
                            roundedCircle
                        />
                    </Col>
                </Row>
                <Row>
                    <Col></Col>
                    <Col>
                        <h5 class="title-section-profile">{userName}</h5>
                    </Col>
                    <Col>
                        <Link>
                            <Button variant="flat" id="Edit" >
                                <FaPen size={20} color="#FF0000" fontWeight="bolder" />
                            </Button>
                        </Link>
                    </Col>
                </Row>

                <Nav className="navPill" variant="pills" defaultActiveKey="/profilesubmited">
                    <Nav.Item>
                        <Nav.Link href="/profile">Receitas salvas</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="/profilesubmited">Receitas submetidas</Nav.Link>
                    </Nav.Item>
                </Nav>


                {recipes.map(recipe => ( //resolver segundo acesso ao banco e trocar para indexbyrating
                    (<>
                        <Row>
                            <Col></Col>
                            <Col>
                                <Card>
                                    <Card.Img
                                        width={300}
                                        height={180}
                                        src={recipe[0].image} alt="" />
                                </Card>
                            </Col>
                            <Col>
                                <Row>
                                    <h3>  </h3>
                                    {['right'].map((placement) => (
                                        <>
                                            <OverlayTrigger
                                                trigger="click"
                                                key={placement}
                                                placement={placement}
                                                overlay={
                                                    <Popover id={`popover-positioned-${placement}`}>
                                                        <Popover.Title as="h3">{}</Popover.Title>
                                                        <Popover.Content>
                                                            <Link to={"/edit/"+ recipe[0].id}>
                                                                <Button variant="flat" id="subEdit" >
                                                                    Editar
                                                            <FaPen size={10} color="#FF0000" fontWeight="bolder" />
                                                                </Button>
                                                            </Link>
                                                        </Popover.Content>
                                                        <Popover.Content>
                                                            <Link>
                                                                <Button variant="flat" id="subEdit" >
                                                                    Excluir
                                                            <FaTrash size={10} color="#FF0000" fontWeight="bolder" />
                                                                </Button>
                                                            </Link>
                                                        </Popover.Content>
                                                    </Popover>
                                                }
                                            >
                                                <Button variant="flat" id="More">
                                                    <FaEllipsisV size={20} color="#FF0000" fontWeight="bolder" />
                                                </Button>
                                            </OverlayTrigger>{' '}
                                        </>
                                    ))}
                                </Row>

                                <Row>
                                    <h5>Tempo de preparo</h5>
                                </Row>
                                <Row>
                                    <Badge pill variant="secondary">
                                        {recipe[0].prepTime}
                                    </Badge>{' '}
                                    <Badge pill variant="secondary">
                                        {recipe[0].prepUnit}
                                    </Badge>{' '}
                                    <FaClock size={20} color="#FF0000" fontWeight="bolder" />
                                </Row>
                                <Row>
                                            <h7>{recipe[0].description}</h7>
                                </Row>
                                <Row>
                                    <Link to={'/recipe/' + recipe[0].id}>
                                        <Button block variant="flat">
                                            Ver mais
                                    </Button>
                                    </Link>
                                </Row>
                            </Col>
                            <Col></Col>
                        </Row>
                        <br></br>
                    </>
                    )
                ))
                }

            </>


        )
    }
}

