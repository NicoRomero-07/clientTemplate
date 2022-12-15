import { ButtonGroup, Card, Col,Image, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { deleteDataById } from '../../api/FetchDB';

export const CardComponent = ({element,username}) => {

    const {
        isAuthenticated,
      } = useAuth0();

    function Editar(){
        if(isAuthenticated){
            return <Link to={`/template/edit/${element.id}`}><button type="button" className="btn btn-md btn-success">Editar</button></Link>
        }
        return null;
    }

    function refreshPage() {
        window.location.reload(false);
      }

    async function eliminarHandler(){
        console.log("Eliminar");
        await deleteDataById(element.id);
        refreshPage();
    }
    function Eliminar(){
        if(isAuthenticated){
            return <Button onClick={eliminarHandler} className='btn btn-md btn-danger'>Eliminar</Button>
        }
        return null;
    }

    return (
        <Col>
            <Card>
           {/*  <Carousel>
                    {element.photo.map((photo) => (
                    <Carousel.Item key={photo}>
                        <Image src={image}
                            style={{
                                height: "300px"
                            }}
                        ></Image>
                    </Carousel.Item>
                    ))}
                      
                </Carousel> */}
                <Image src={element.image}
                    style={{
                        height: "300px"
                    }}
                ></Image>
                <Card.Body>
                    <Card.Title>{element.name}</Card.Title>
                    <Card.Text className='p-2 mb-4'>{element.description}</Card.Text>

                    <ButtonGroup>
                            <Link to={`/template/${element.id}`}><button type="button" className="btn btn-md btn-primary">Mostrar</button></Link>
                            {Editar()}
                            {Eliminar()}
                            
                        </ButtonGroup>
                </Card.Body>
            </Card>
        </Col>
    );
}

export default CardComponent;